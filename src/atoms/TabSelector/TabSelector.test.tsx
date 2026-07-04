import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import TabSelector from './TabSelector'

test('renders TabSelector', () => {
  const tabIndex = 1
  const setTabIndex = jest.fn()
  render(
    <TabSelector
      tabArray={['Tab 1', 'Tab 2']}
      tabIndex={tabIndex}
      setTabIndex={setTabIndex}
    />
  )
  const field = screen.getByTestId('tab-selector-container')
  expect(field).toBeInTheDocument()
})
test('TabSelector calls setTabIndex', () => {
  const tabIndex = 1
  const setTabIndex = jest.fn()
  render(
    <TabSelector
      tabArray={['Tab 1', 'Tab 2']}
      tabIndex={tabIndex}
      setTabIndex={setTabIndex}
    />
  )
  const field = screen.getAllByTestId('tab-selector-tab')
  fireEvent.click(field[0])
  expect(setTabIndex).toBeCalledTimes(1)
})
test('TabSelector renders correct no. of tabs', () => {
  const tabIndex = 1
  const setTabIndex = jest.fn()
  render(
    <TabSelector
      tabArray={['Tab 1', 'Tab 2']}
      tabIndex={tabIndex}
      setTabIndex={setTabIndex}
    />
  )
  const field = screen.getAllByTestId('tab-selector-tab')
  expect(field.length).toEqual(2)
})
test('TabSelector renders all tabs', () => {
  const tabIndex = 1
  const setTabIndex = jest.fn()
  render(
    <TabSelector
      tabArray={['Tab 1', 'Tab 2']}
      tabIndex={tabIndex}
      setTabIndex={setTabIndex}
    />
  )
  const tab1 = screen.getByText(/Tab 1/i)
  const tab2 = screen.getByText(/Tab 2/i)
  expect(tab1).toBeInTheDocument()
  expect(tab2).toBeInTheDocument()
})
