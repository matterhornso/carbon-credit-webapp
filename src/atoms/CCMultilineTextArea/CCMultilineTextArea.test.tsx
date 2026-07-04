import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import CCMultilineTextArea from './CCMultilineTextArea'

test('should render CCMultilineTextArea', () => {
  render(
    <CCMultilineTextArea
      //Giving color since it's giving "TypeError : 'main' not defined" error when rendering CCMultilineTextArea(TextField from MUI)
      color="primary"
    />
  )
  const field = screen.getByTestId('cc-input-field-multiline')
  expect(field).toBeInTheDocument()
})
test('should render correct placeholder', () => {
  render(
    <CCMultilineTextArea
      placeholder="Test placeholder"
      label="Test label"
      onChange={jest.fn()}
      //Giving color since it's giving "TypeError : 'main' not defined" error when rendering CCMultilineTextArea(TextField from MUI)
      color="primary"
    />
  )
  const field = screen.getByTestId('cc-input-field-multiline')
  expect(field).toBeInTheDocument()
  expect(field.getAttribute('placeholder')).toBe('Test placeholder')
})
test('CCMultilineTextArea should fire onChange', () => {
  const handleChange = jest.fn()
  render(
    <CCMultilineTextArea
      onChange={handleChange}
      //Giving color since it's giving "TypeError : 'main' not defined" error when rendering CCMultilineTextArea(TextField from MUI)
      color="primary"
    />
  )
  const field = screen.getByTestId('cc-input-field-multiline')
  fireEvent.change(field, { target: { value: 'google it' } })
  expect(handleChange).toHaveBeenCalled()
})
test('value is getting updated in CCMultilineTextArea', () => {
  const handleChange = jest.fn()
  render(
    <CCMultilineTextArea
      onChange={handleChange}
      //Giving color since it's giving "TypeError : 'main' not defined" error when rendering CCMultilineTextArea(TextField from MUI)
      color="primary"
    />
  )
  const field = screen.getByTestId('cc-input-field-multiline')
  fireEvent.change(field, { target: { value: 'google it' } })
  //Unable to test value since it is giving "value not found in HTMLElement"
  //link : https://stackoverflow.com/questions/12989741/the-property-value-does-not-exist-on-value-of-type-htmlelement
  // Solution : cast the result of getElementById()/getByTestId to HTMLInputElement
  const val = (field as HTMLInputElement).value
  expect(val).toBe('google it')
})
