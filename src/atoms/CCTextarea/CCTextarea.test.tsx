import React from "react";
import { fireEvent, render, screen } from '@testing-library/react'
import CCTextarea from './CCTextarea'

test('renders CCTextarea', () => {
  render(<CCTextarea data-testid="cc-textarea" />)
  const field = screen.getByTestId('cc-textarea')
  expect(field).toBeInTheDocument()
})
test('CCTextarea should render correct placeholder', () => {
  render(
    <CCTextarea
      data-testid="cc-textarea"
      placeholder="Test placeholder"
      aria-labelledby="Test label"
      onChange={jest.fn()}
    />
  )
  const textfield = screen.getByTestId('cc-textarea')
  expect(textfield).toBeInTheDocument()
  expect(textfield.getAttribute('placeholder')).toBe('Test placeholder')
})
test('CCTextarea should fire onChange', () => {
  const handleChange = jest.fn()
  render(<CCTextarea data-testid="cc-textarea" onChange={handleChange} />)
  const textfield = screen.getByTestId('cc-textarea')
  fireEvent.change(textfield, { target: { value: 'google it' } })
  expect(handleChange).toHaveBeenCalled()
})
test('value is getting updated in CCTextarea', () => {
  const handleChange = jest.fn()
  render(<CCTextarea data-testid="cc-textarea" onChange={handleChange} />)
  const textfield = screen.getByTestId('cc-textarea')
  fireEvent.change(textfield, { target: { value: 'google it' } })
  //Unable to test value since it is giving "value not found in HTMLElement"
  //link : https://stackoverflow.com/questions/12989741/the-property-value-does-not-exist-on-value-of-type-htmlelement
  // Solution : cast the result of getElementById()/getByTestId to HTMLInputElement
  const val = (textfield as HTMLInputElement).value
  expect(val).toBe('google it')
})