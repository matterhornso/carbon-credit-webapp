import React from "react";
import { fireEvent, render, screen } from '@testing-library/react'
import CCButton from './CCButton'

test('renders CCButton', () => {
  render(
    <CCButton>
      <div>Test Button</div>
    </CCButton>
  )
  const buttonElement = screen.getByText(/Test Button/i)
  expect(buttonElement).toBeInTheDocument()
})
test('CCButton handles click events', () => {
  const onClick = jest.fn()
  render(
    <CCButton onClick={onClick}>
      <div>Test Button</div>
    </CCButton>
  )
  const buttonElement = screen.getByText(/Test Button/i)
  fireEvent.click(buttonElement)
  expect(onClick).toBeCalledTimes(1)
})

