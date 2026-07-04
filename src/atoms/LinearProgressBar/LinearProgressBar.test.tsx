import { render, screen } from '@testing-library/react'
import React from 'react'
import LinearProgressBar from './LinearProgressBar'

test('renders LinearProgressBar', () => {
  render(<LinearProgressBar value={70} />)
  const linkElement = screen.getByText(/70%/i)
  expect(linkElement).toBeInTheDocument()
})
test('LinearProgressBar renders correct value', () => {
  render(<LinearProgressBar value={70} />)
  const linkElement = screen.getByText(/70%/i)
  expect(linkElement).toBeInTheDocument()
})
