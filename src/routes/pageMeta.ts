export const APP_NAME = 'Climat'

/**
 * A title for every screen. The tab title is the only name a screen has in the
 * browser's history, in a bookmark and in a row of open tabs, and every screen in
 * this app used to be called "Carbon Credit".
 *
 * First match wins, so the more specific pattern goes first.
 */
const TITLES: Array<[RegExp, string]> = [
  [/^\/login\/?$/, 'Sign in'],
  [/^\/register\/?$/, 'Create an account'],
  [/^\/reset-password/, 'Reset your password'],
  [/^\/twofa/, 'Two-step verification'],
  [/^\/logout/, 'Signed out'],
  [/^\/origination\/?$/, 'New project'],
  [/^\/origination\/.+/, 'Project'],
  [/^\/(all-projects|projects|projects-list|see-all-projects)/, 'Projects'],
  [/^\/final-pdf\//, 'Project document'],
  [/^\/marketplace/, 'Marketplace'],
  [/^\/(wallet|issuer-wallet)/, 'Wallet'],
  [/^\/profile/, 'Profile'],
  [/^\/help-center/, 'Help center'],
  [/^\/carbon_calculator/, 'Carbon calculator'],
  [/^\/maintenance-page/, 'Maintenance'],
  [/^\/$/, 'Dashboard'],
]

export function titleFor(pathname: string): string {
  const hit = TITLES.find(([pattern]) => pattern.test(pathname))
  return hit ? `${hit[1]} | ${APP_NAME}` : APP_NAME
}

/**
 * Set the title for a route, and keep the app out of search indexes.
 *
 * Nothing in the app is meant to be found through search: every route except
 * sign-in and registration sits behind an account and redirects an anonymous
 * visitor, so a crawler would record the sign-in page many times over under
 * different addresses. The public site is where people should land. The same
 * directive is sent as an X-Robots-Tag header by the server (nginx.conf.template)
 * and written into public/index.html; this keeps it true after client-side
 * navigation as well.
 */
export function applyRouteMeta(pathname: string, doc: Document = document): void {
  doc.title = titleFor(pathname)

  let robots = doc.head.querySelector('meta[name="robots"]')
  if (!robots) {
    robots = doc.createElement('meta')
    robots.setAttribute('name', 'robots')
    doc.head.appendChild(robots)
  }
  robots.setAttribute('content', 'noindex, nofollow')
}
