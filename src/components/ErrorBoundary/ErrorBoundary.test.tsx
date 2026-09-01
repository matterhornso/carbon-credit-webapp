import { render, screen } from '@testing-library/react'
import React from 'react'
import ErrorBoundary from './ErrorBoundary'

const Boom = (): JSX.Element => {
  throw new Error('kaboom')
}

describe('ErrorBoundary', () => {
  let consoleError: jest.SpyInstance

  beforeEach(() => {
    // React logs caught render errors; silence it so test output stays readable.
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {
      /* swallow the log */
    })
  })

  afterEach(() => consoleError.mockRestore())

  it('renders children when nothing throws', () => {
    render(
      <ErrorBoundary>
        <p>all good</p>
      </ErrorBoundary>
    )
    expect(screen.getByText('all good')).toBeInTheDocument()
  })

  it('renders the recovery screen instead of unmounting the tree', () => {
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    )
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /reload page/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /back to dashboard/i })
    ).toBeInTheDocument()
  })

  it('invokes onError with the thrown error', () => {
    const onError = jest.fn()
    render(
      <ErrorBoundary onError={onError}>
        <Boom />
      </ErrorBoundary>
    )
    expect(onError).toHaveBeenCalledTimes(1)
    expect(onError.mock.calls[0][0]).toBeInstanceOf(Error)
    expect(onError.mock.calls[0][0].message).toBe('kaboom')
  })

  it('renders a custom fallback when provided', () => {
    render(
      <ErrorBoundary fallback={<p>panel unavailable</p>}>
        <Boom />
      </ErrorBoundary>
    )
    expect(screen.getByText('panel unavailable')).toBeInTheDocument()
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
  })
})
