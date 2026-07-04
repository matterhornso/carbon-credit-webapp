import React from "react";
import { fireEvent, render, screen } from '@testing-library/react'
import CCInputField from './CCInputField'

test('should render CCInputField', () => {
  render(
    <CCInputField
      onChange={jest.fn()}
      //Giving color since it's giving "TypeError : 'main' not defined" error when rendering CCInputField(TextField from MUI)
      color="primary"
    />
  )
  const field = screen.getByTestId('cc-input-field')
  expect(field).toBeInTheDocument()
})
test('should render correct placeholder', () => {
  render(
    <CCInputField
      placeholder="Test placeholder"
      aria-labelledby="Test label"
      onChange={jest.fn()}
      //Giving color since it's giving "TypeError : 'main' not defined" error when rendering CCInputField(TextField from MUI)
      color="primary"
    />
  )
  const field = screen.getByTestId('cc-input-field')
  expect(field).toBeInTheDocument()
  expect(field.getAttribute('placeholder')).toBe('Test placeholder')
})
test('CCInputField should fire onChange', () => {
  const handleChange = jest.fn()
  render(
    <CCInputField
      onChange={handleChange}
      //Giving color since it's giving "TypeError : 'main' not defined" error when rendering CCInputField(TextField from MUI)
      color="primary"
    />
  )
  const field = screen.getByTestId('cc-input-field')
  fireEvent.change(field, { target: { value: 'google it' } })
  expect(handleChange).toHaveBeenCalled()
})
test('value is getting updated in CCInputField', () => {
  const handleChange = jest.fn()
  render(
    <CCInputField
      onChange={handleChange}
      //Giving color since it's giving "TypeError : 'main' not defined" error when rendering CCInputField(TextField from MUI)
      color="primary"
    />
  )
  const field = screen.getByTestId('cc-input-field')
  fireEvent.change(field, { target: { value: 'google it' } })
  //Unable to test value since it is giving "value not found in HTMLElement"
  //link : https://stackoverflow.com/questions/12989741/the-property-value-does-not-exist-on-value-of-type-htmlelement
  // Solution : cast the result of getElementById()/getByTestId to HTMLInputElement
  const val = (field as HTMLInputElement).value
  expect(val).toBe('google it')
})
