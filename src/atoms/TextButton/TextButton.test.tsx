import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import TextButton from './TextButton'

test('renders TextButton', () => {
  render(<TextButton title={'Test Button'} />)
  const buttonElement = screen.getByText(/Test Button/i)
  expect(buttonElement).toBeInTheDocument()
})
test('TextButton handles click events', () => {
  const onClick = jest.fn()
  render(<TextButton title={'Test Button'} onClick={onClick} />)
  const buttonElement = screen.getByText(/Test Button/i)
  fireEvent.click(buttonElement)
  expect(onClick).toBeCalledTimes(1)
})
