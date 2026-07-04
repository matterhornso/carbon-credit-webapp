import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import LabelInput from './LabelInput'

test('should render LabelInput', () => {
  render(<LabelInput label="Quantity" />)
  const field = screen.getByTestId('label-input')
  expect(field).toBeInTheDocument()
})
test('LabelInput should fire setValue', () => {
  const setValue = jest.fn()
  render(<LabelInput label="Quantity" setValue={setValue} />)
  const field = screen.getByTestId('label-input')
  fireEvent.change(field, { target: { value: 'google it' } })
  expect(setValue).toHaveBeenCalled()
})
// test('value is getting updated in LabelInput', () => {
//   const setValue = jest.fn()
//   render(<LabelInput label="Quantity" setValue={setValue} />)
//   const field = screen.getByTestId('label-input')
//   fireEvent.change(field, { target: { value: 'google it' } })
//   //Unable to test value since it is giving "value not found in HTMLElement"
//   //link : https://stackoverflow.com/questions/12989741/the-property-value-does-not-exist-on-value-of-type-htmlelement
//   // Solution : cast the result of getElementById()/getByTestId to HTMLInputElement
//   const val = (field as HTMLInputElement).value
//   expect(val).toBe('google it')
// })
