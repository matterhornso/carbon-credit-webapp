import { setSnackbarData } from '../redux/Slices/CCSnackbarSlice'
import { store } from '../redux/store'
import { getErrorMessage, handleApiError, showSuccess } from './errorHandler'

jest.mock('../config/sentry.config', () => ({
  captureError: jest.fn(),
  setSentryUser: jest.fn(),
  initSentry: jest.fn(),
  isSentryEnabled: () => false,
}))

const { captureError } = jest.requireMock('../config/sentry.config')

const axiosError = (status: number, data?: any) => ({
  response: { status, data },
  config: { url: '/x' },
})

const snack = () => store.getState().CCSnackbar.snackbarData

beforeEach(() => {
  captureError.mockClear()
  store.dispatch(
    setSnackbarData({ showSnackbar: false, success: true, message: '' })
  )
})

describe('getErrorMessage', () => {
  it('prefers a usable server message', () => {
    expect(getErrorMessage(axiosError(400, { error: 'Quantity must be > 0' })))
      .toBe('Quantity must be > 0')
    expect(getErrorMessage(axiosError(400, { message: 'Invalid captcha' })))
      .toBe('Invalid captcha')
    expect(getErrorMessage(axiosError(400, 'plain string failure'))).toBe(
      'plain string failure'
    )
  })

  it('suppresses internal errors that leak Mongoose/stack detail', () => {
    const leaky = axiosError(500, {
      error:
        'CastError: Cast to ObjectId failed for value "abc" at path "_id" for model "project"',
    })
    expect(getErrorMessage(leaky)).toBe(
      'The server ran into a problem. Please try again.'
    )
  })

  it('translates wallet rejections instead of showing provider strings', () => {
    expect(getErrorMessage({ code: 4001 })).toBe(
      'You cancelled the request in your wallet.'
    )
    expect(
      getErrorMessage({
        message: 'MetaMask Tx Signature: User denied transaction signature.',
      })
    ).toBe('You cancelled the request in your wallet.')
  })

  it('explains network and timeout failures in user terms', () => {
    expect(getErrorMessage({ code: 'ERR_NETWORK' })).toMatch(/reach the server/i)
    expect(getErrorMessage({ message: 'Network Error' })).toMatch(
      /reach the server/i
    )
    expect(getErrorMessage({ code: 'ECONNABORTED' })).toMatch(/too long/i)
  })

  it('maps common status codes', () => {
    expect(getErrorMessage(axiosError(403))).toMatch(/permission/i)
    expect(getErrorMessage(axiosError(404))).toMatch(/could not be found/i)
    expect(getErrorMessage(axiosError(503))).toMatch(/server ran into a problem/i)
  })

  it('falls back when there is nothing usable', () => {
    expect(getErrorMessage({}, 'Could not load projects.')).toBe(
      'Could not load projects.'
    )
  })
})

describe('handleApiError', () => {
  it('reports to Sentry and shows a failure snackbar', () => {
    handleApiError(axiosError(500, { error: 'boom' }), {
      action: 'projectCalls.getAllProjects',
    })

    expect(captureError).toHaveBeenCalledTimes(1)
    expect(captureError.mock.calls[0][1]).toMatchObject({
      action: 'projectCalls.getAllProjects',
      status: 500,
    })
    expect(snack()).toMatchObject({ showSnackbar: true, success: false })
    expect(snack().message).toBeTruthy()
  })

  it('stays silent for polling callers but still reports', () => {
    handleApiError(axiosError(500), {
      action: 'transactionCalls.getTransactionById',
      silent: true,
    })

    expect(captureError).toHaveBeenCalledTimes(1)
    expect(snack().showSnackbar).toBe(false)
  })

  it('shows nothing on 401 - the interceptor already redirects', () => {
    handleApiError(axiosError(401), { action: 'projectCalls.getAllProjects' })

    expect(captureError).toHaveBeenCalledTimes(1)
    expect(snack().showSnackbar).toBe(false)
  })

  it('uses the caller fallback when the server says nothing useful', () => {
    handleApiError({}, {
      action: 'x',
      fallback: "Couldn't load your wallet balances.",
    })
    expect(snack().message).toBe("Couldn't load your wallet balances.")
  })
})

describe('showSuccess', () => {
  it('dispatches a success snackbar', () => {
    showSuccess('Tokens retired successfully.')
    expect(snack()).toMatchObject({
      showSnackbar: true,
      success: true,
      message: 'Tokens retired successfully.',
    })
  })
})
