import axios from 'axios'
import { captureError } from '../../config/sentry.config'
import { getLocalItem } from '../../utils/Storage'
import { BASE_URL } from './Endpoints'

/**
 * One shared instance with interceptors registered once at module scope.
 * These used to be registered inside the request helper, so every API call
 * appended another interceptor to the global axios object and none were ever
 * ejected - unbounded growth over a session.
 */
const client = axios.create({ baseURL: BASE_URL })

/** Endpoints where a 401 is a normal answer, not an expired session. */
const AUTH_CHALLENGE_PATHS = [
  '/auth/login',
  '/auth/verify-otp',
  '/auth/resend-otp',
  '/auth/getCaptcha',
  '/auth/verifyCaptcha',
  '/users/forgotPassword',
  '/users/resetPassword',
]

/** Pages where redirecting to login would loop or surprise the user. */
const NO_REDIRECT_PATHS = ['/login', '/register', '/reset-password', '/logout']

let redirecting = false

const isOurApi = (url?: string) => {
  if (!url) return false
  // Relative URLs resolve against BASE_URL; absolute ones only count if they
  // match it, so a 401 from OpenAI or the AI service never logs the user out.
  if (!/^https?:\/\//i.test(url)) return true
  return typeof BASE_URL === 'string' && url.startsWith(BASE_URL)
}

const isAuthChallenge = (url?: string) =>
  Boolean(url) && AUTH_CHALLENGE_PATHS.some((p) => url!.includes(p))

const handleExpiredSession = () => {
  if (redirecting) return
  if (NO_REDIRECT_PATHS.some((p) => window.location.pathname.startsWith(p))) {
    return
  }
  redirecting = true

  localStorage.removeItem('userDetails')
  localStorage.removeItem('userDetails2')
  localStorage.removeItem('loggedIn')
  localStorage.removeItem('profileCompleted')
  localStorage.removeItem('AI_user_id')
  // Read by LoginPage to explain why the user landed there.
  sessionStorage.setItem('sessionExpired', '1')

  window.location.assign('/login')
}

client.interceptors.request.use(
  (req: any) => {
    const jwtToken = getLocalItem('userDetails')?.jwtToken
    if (jwtToken) {
      req.headers = req.headers || {}
      req.headers.Authorization = 'Bearer ' + jwtToken
    }
    return req
  },
  (error: any) => Promise.reject(error)
)

client.interceptors.response.use(
  (res: any) => res,
  (error: any) => {
    const status = error?.response?.status
    const url: string | undefined = error?.config?.url
    const hadSession = Boolean(getLocalItem('userDetails')?.jwtToken)

    if (status === 401 && hadSession && isOurApi(url) && !isAuthChallenge(url)) {
      handleExpiredSession()
    } else if (status >= 500) {
      // Server faults are worth reporting; 4xx are usually the caller's problem.
      captureError(error, { url, status, method: error?.config?.method })
    }

    return Promise.reject(error)
  }
)

export const AxiosHelper = async (
  url: string,
  method: string,
  payload?: any
) => {
  const call = () => {
    switch (method) {
      case 'GET':
        return client.get(url)
      case 'GET_IMAGE':
        return client.get(url, { responseType: 'blob' })
      case 'POST_IMAGE':
        return client.post(url, payload, { responseType: 'blob' })
      case 'POST':
        return client.post(url, payload)
      case 'AI_POST':
        return client.post(url, payload, { headers: { Accept: '*/*' } })
      default:
        return client.get(url)
    }
  }

  return await call()
}

export default client
