import client, { AxiosHelper } from './AxiosHelper'

/**
 * Exercises the response interceptor's 401 handling: an expired session should
 * clear auth state and bounce to /login, but a rejected login attempt or a 401
 * from a third-party API must not log the user out.
 */

const assign = jest.fn()

beforeAll(() => {
  Object.defineProperty(window, 'location', {
    writable: true,
    value: { pathname: '/dashboard', assign },
  })
})

const rejectWith = (status: number, url: string) => {
  client.defaults.adapter = ((config: any) =>
    Promise.reject({
      config: { ...config, url },
      response: { status, data: {} },
    })) as any
}

const signIn = () =>
  localStorage.setItem('userDetails', JSON.stringify({ jwtToken: 'tok-123' }))

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
  assign.mockClear()
  ;(window.location as any).pathname = '/dashboard'
})

const call = async (url: string) => {
  try {
    await AxiosHelper(url, 'GET')
  } catch {
    /* rejection is expected; we assert on the side effects */
  }
}

test('401 on an authenticated call clears the session and redirects', async () => {
  signIn()
  rejectWith(401, '/carbon/api/v1/project/getAllProjects')

  await call('/carbon/api/v1/project/getAllProjects')

  expect(localStorage.getItem('userDetails')).toBeNull()
  expect(sessionStorage.getItem('sessionExpired')).toBe('1')
  expect(assign).toHaveBeenCalledWith('/login')
})

test('401 from the login endpoint does not trigger a session redirect', async () => {
  signIn()
  rejectWith(401, '/auth/api/v1/auth/login')

  await call('/auth/api/v1/auth/login')

  expect(localStorage.getItem('userDetails')).not.toBeNull()
  expect(assign).not.toHaveBeenCalled()
})

test('401 with no stored session does not redirect a public visitor', async () => {
  rejectWith(401, '/carbon/api/v1/project/getVerifiedProjects')

  await call('/carbon/api/v1/project/getVerifiedProjects')

  expect(assign).not.toHaveBeenCalled()
})

test('401 from a third-party host does not log the user out', async () => {
  signIn()
  rejectWith(401, 'https://api.openai.com/v1/chat/completions')

  await call('https://api.openai.com/v1/chat/completions')

  expect(localStorage.getItem('userDetails')).not.toBeNull()
  expect(assign).not.toHaveBeenCalled()
})

test('a single shared instance is used, so interceptors do not accumulate', async () => {
  const before = (client.interceptors.request as any).handlers.length
  rejectWith(500, '/carbon/api/v1/project/getAllProjects')

  await call('/carbon/api/v1/project/getAllProjects')
  await call('/carbon/api/v1/project/getAllProjects')
  await call('/carbon/api/v1/project/getAllProjects')

  expect((client.interceptors.request as any).handlers.length).toBe(before)
})
