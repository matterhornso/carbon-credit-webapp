import { Box, Button, Stack, Typography } from '@mui/material'
import * as Sentry from '@sentry/react'
import React from 'react'
import { isSentryEnabled } from '../../config/sentry.config'
import { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.interface'

/**
 * Catches render-time exceptions so a single broken component shows a recovery
 * screen instead of unmounting the whole tree into a blank page.
 *
 * Must stay a class component - React exposes no hook equivalent of
 * componentDidCatch / getDerivedStateFromError.
 */
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, eventId: undefined }
  }

  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    let eventId: string | undefined
    if (isSentryEnabled()) {
      eventId = Sentry.captureException(error, {
        contexts: { react: { componentStack: errorInfo.componentStack } },
      })
    } else {
      console.error('Unhandled render error:', error, errorInfo.componentStack)
    }
    this.setState({ eventId })
    this.props.onError?.(error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.assign('/')
  }

  render() {
    if (!this.state.hasError) return this.props.children

    if (this.props.fallback) return this.props.fallback

    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
          textAlign: 'center',
        }}
      >
        <Stack spacing={2} alignItems="center" sx={{ maxWidth: 520 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Something went wrong
          </Typography>

          <Typography variant="body1" color="text.secondary">
            This page ran into an unexpected problem. Your work up to the last
            save is not affected. Try reloading — if it keeps happening, contact
            support with the reference below.
          </Typography>

          {this.state.eventId && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontFamily: 'monospace' }}
            >
              Reference: {this.state.eventId}
            </Typography>
          )}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
            <Button variant="contained" onClick={this.handleReload}>
              Reload page
            </Button>
            <Button variant="outlined" onClick={this.handleGoHome}>
              Back to dashboard
            </Button>
          </Stack>
        </Stack>
      </Box>
    )
  }
}

export default ErrorBoundary
