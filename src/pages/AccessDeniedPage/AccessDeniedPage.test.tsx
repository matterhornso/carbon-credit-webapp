import React from 'react'
import { render, screen } from '@testing-library/react'
import AccessDeniedPage from './AccessDeniedPage'

test('renders learn react link', () => {
    render(<AccessDeniedPage />)
    const linkElement = screen.getByText(/Access Denied/i)
    expect(linkElement).toBeInTheDocument()
})
