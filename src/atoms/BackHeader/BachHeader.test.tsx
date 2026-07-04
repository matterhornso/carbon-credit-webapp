import React from 'react'
import { render, screen } from '@testing-library/react'
import BackHeader from './BackHeader'

test('renders BackHeader', () => {
  render(<BackHeader title={'Test Title'}></BackHeader>)
  const backHeaderElement = screen.getByText(/Test Title/i)
  expect(backHeaderElement).toBeInTheDocument()
})
