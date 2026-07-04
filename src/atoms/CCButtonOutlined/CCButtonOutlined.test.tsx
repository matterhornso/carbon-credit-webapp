import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import CCButtonOutlined from './CCButtonOutlined'

test('renders CCButtonOutlined', () => {
  render(
    <CCButtonOutlined>
      <div>Test Button</div>
    </CCButtonOutlined>
  )
  const buttonElement = screen.getByText(/Test Button/i)
  expect(buttonElement).toBeInTheDocument()
})
test('CCButtonOutlined handles click events', () => {
  const onClick = jest.fn()
  render(
    <CCButtonOutlined onClick={onClick}>
      <div>Test Button</div>
    </CCButtonOutlined>
  )
  const buttonElement = screen.getByText(/Test Button/i)
  fireEvent.click(buttonElement)
  expect(onClick).toBeCalledTimes(1)
})
