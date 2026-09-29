import { applyRouteMeta, titleFor } from './pageMeta'

describe('titleFor', () => {
  it('names the public screens', () => {
    expect(titleFor('/login')).toBe('Sign in | Climat')
    expect(titleFor('/register')).toBe('Create an account | Climat')
  })

  it('tells a new project apart from an existing one', () => {
    expect(titleFor('/origination')).toBe('New project | Climat')
    expect(titleFor('/origination/6f1c')).toBe('Project | Climat')
  })

  it('names the dashboard only at the root', () => {
    expect(titleFor('/')).toBe('Dashboard | Climat')
    expect(titleFor('/marketplace/project-details')).toBe('Marketplace | Climat')
  })

  it('falls back to the product name rather than a wrong title', () => {
    expect(titleFor('/somewhere-new')).toBe('Climat')
  })

  it('never returns the scaffold title', () => {
    for (const path of ['/', '/login', '/origination', '/nowhere']) {
      expect(titleFor(path)).not.toMatch(/Carbon Credit|React App/)
    }
  })
})

describe('applyRouteMeta', () => {
  beforeEach(() => {
    document.head.innerHTML = ''
    document.title = ''
  })

  it('sets the title for the route', () => {
    applyRouteMeta('/login')
    expect(document.title).toBe('Sign in | Climat')
  })

  it('keeps every screen out of search indexes, public or not', () => {
    for (const path of ['/login', '/register', '/', '/origination/6f1c']) {
      applyRouteMeta(path)
      expect(
        document.head.querySelector('meta[name="robots"]')?.getAttribute('content')
      ).toBe('noindex, nofollow')
    }
  })

  it('reuses the tag already in the page instead of adding one per navigation', () => {
    document.head.innerHTML = '<meta name="robots" content="noindex, nofollow">'
    applyRouteMeta('/login')
    applyRouteMeta('/register')
    applyRouteMeta('/')
    expect(document.head.querySelectorAll('meta[name="robots"]')).toHaveLength(1)
  })
})
