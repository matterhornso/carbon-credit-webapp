import React from 'react'

export interface ErrorBoundaryProps {
  children: React.ReactNode
  /** Optional custom fallback, e.g. for boundaries scoped to one panel. */
  fallback?: React.ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export interface ErrorBoundaryState {
  hasError: boolean
  /** Sentry event id, surfaced to the user as a support reference. */
  eventId?: string
}
