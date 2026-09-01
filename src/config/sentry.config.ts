import * as Sentry from '@sentry/react'

/**
 * Sentry stays dormant until REACT_APP_SENTRY_DSN is set, so builds without a
 * DSN behave exactly as before rather than failing or logging noise.
 */
const DSN = process.env.REACT_APP_SENTRY_DSN

/**
 * This app puts JWTs in query strings and logs auth payloads, so an error
 * reporter is a plausible new leak path. Anything matching these keys is
 * redacted before an event leaves the browser.
 */
const SENSITIVE_KEY = /(authorization|jwt|token|otp|password|passwordhash|passwordsalt|secret|private_?key|api_?key|captcha)/i

const REDACTED = '[redacted]'

const scrub = (value: any, depth = 0): any => {
  if (depth > 6 || value === null || value === undefined) return value
  if (Array.isArray(value)) return value.map((v) => scrub(v, depth + 1))
  if (typeof value !== 'object') return value

  const out: any = {}
  for (const [key, val] of Object.entries(value)) {
    out[key] = SENSITIVE_KEY.test(key) ? REDACTED : scrub(val, depth + 1)
  }
  return out
}

/** Strip a `token=` style query param from any URL before it is reported. */
const scrubUrl = (url?: string) => {
  if (!url) return url
  return url.replace(
    /([?&](?:token|jwt|jwtToken|apiKey|api_key)=)[^&#]*/gi,
    `$1${REDACTED}`
  )
}

export const initSentry = () => {
  if (!DSN) return

  Sentry.init({
    dsn: DSN,
    environment: process.env.REACT_APP_ENVIRONMENT || 'development',
    release: process.env.REACT_APP_RELEASE || undefined,
    // Never attach cookies, headers or IP automatically.
    sendDefaultPii: false,
    tracesSampleRate: 0,
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'ResizeObserver loop completed with undelivered notifications',
      // MetaMask surfaces user-cancelled signatures as errors.
      'User rejected the request',
      'User denied transaction signature',
      'Non-Error promise rejection captured',
    ],
    beforeSend(event) {
      if (event.request) {
        event.request.url = scrubUrl(event.request.url)
        if (event.request.headers) {
          event.request.headers = scrub(event.request.headers)
        }
        if (event.request.query_string) {
          event.request.query_string = scrubUrl(
            String(event.request.query_string)
          ) as any
        }
      }
      if (event.extra) event.extra = scrub(event.extra)
      if (event.contexts) event.contexts = scrub(event.contexts)
      return event
    },
    beforeBreadcrumb(breadcrumb) {
      if (breadcrumb.data?.url) {
        breadcrumb.data.url = scrubUrl(breadcrumb.data.url)
      }
      return breadcrumb
    },
  })
}

/**
 * Attaches the signed-in user to subsequent events. Only the opaque id and role
 * are sent - deliberately no email, wallet address or name.
 */
export const setSentryUser = (userId?: string, role?: string) => {
  if (!DSN) return
  if (!userId) {
    Sentry.setUser(null)
    return
  }
  Sentry.setUser({ id: userId })
  if (role) Sentry.setTag('role', role)
}

export const captureError = (error: unknown, context?: Record<string, any>) => {
  if (!DSN) {
    console.error('[captureError]', error, context)
    return
  }
  Sentry.captureException(error, context ? { extra: scrub(context) } : undefined)
}

export const isSentryEnabled = () => Boolean(DSN)
