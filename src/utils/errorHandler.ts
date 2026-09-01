import { captureError } from '../config/sentry.config'
import { setSnackbarData } from '../redux/Slices/CCSnackbarSlice'
import { store } from '../redux/store'

export interface HandleApiErrorOptions {
  /**
   * Technical description of what failed, e.g. "marketplaceCalls.getSellOrder".
   * Sent to Sentry only - never shown to the user.
   */
  action: string
  /** User-facing message when the server does not supply a usable one. */
  fallback?: string
  /**
   * Report to Sentry but show nothing. For polling and background refreshes,
   * where a toast every few seconds would be worse than silence.
   */
  silent?: boolean
}

const GENERIC = 'Something went wrong. Please try again.'
const OFFLINE =
  "Can't reach the server. Check your connection and try again."

/**
 * Pulls the most useful human-readable message out of an axios error.
 * This API is inconsistent - failures arrive as `error`, as `message`, as a
 * bare string, and sometimes as HTTP 200 with `success: false` - so each shape
 * is checked before falling back.
 */
export const getErrorMessage = (error: any, fallback = GENERIC): string => {
  // MetaMask rejections are routine in this app - the raw provider string
  // ("MetaMask Tx Signature: User denied...") is not worth showing.
  if (
    error?.code === 4001 ||
    /user (rejected|denied)/i.test(error?.message || '')
  ) {
    return 'You cancelled the request in your wallet.'
  }
  if (error?.code === 'ERR_NETWORK' || error?.message === 'Network Error') {
    return OFFLINE
  }
  if (error?.code === 'ECONNABORTED') {
    return 'The server took too long to respond. Please try again.'
  }

  const data = error?.response?.data
  const candidate =
    (typeof data === 'string' ? data : undefined) ??
    data?.error ??
    data?.message ??
    data?.data

  if (typeof candidate === 'string' && candidate.trim()) {
    // Don't surface stack traces or Mongoose internals that some endpoints
    // concatenate into their error strings.
    const looksInternal =
      /CastError|ValidationError|at\s+\w+\s+\(|node_modules|ObjectId/.test(
        candidate
      )
    if (!looksInternal && candidate.length <= 200) return candidate
  }

  const status = error?.response?.status
  if (status === 403) return "You don't have permission to do that."
  if (status === 404) return 'That item could not be found.'
  if (status >= 500) return 'The server ran into a problem. Please try again.'

  return fallback
}

/**
 * Replaces the `catch (e) { console.log(e) }` pattern: reports the failure and
 * tells the user something actually happened, instead of letting the screen
 * fall through to an empty state that reads as "you have no data".
 */
export const handleApiError = (
  error: any,
  options: HandleApiErrorOptions
): void => {
  const { action, fallback, silent } = options

  captureError(error, { action, status: error?.response?.status })

  if (silent) return

  // 401 is already handled by the axios interceptor, which clears the session
  // and redirects to /login. A toast here would flash and vanish.
  if (error?.response?.status === 401) return

  store.dispatch(
    setSnackbarData({
      showSnackbar: true,
      success: false,
      message: getErrorMessage(error, fallback),
    })
  )
}

/** Success counterpart, so confirmations stop going through window.alert(). */
export const showSuccess = (message: string): void => {
  store.dispatch(
    setSnackbarData({ showSnackbar: true, success: true, message })
  )
}
