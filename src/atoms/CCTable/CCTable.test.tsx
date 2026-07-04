import React from 'react'
import { render, screen } from '@testing-library/react'
import CCTable from './CCTable'

const headings = ['Name', 'Age']
const rows = [
  ['Sam', '22'],
  ['Paul', '25'],
]
test('CCTable renders single heading row', () => {
  render(<CCTable headings={headings} rows={rows} />)
  const headingRow = screen.getAllByTestId('cc-table-heading')
  expect(headingRow.length).toEqual(1)
})
test('CCTable renders correct no. of data row[s]', () => {
  render(<CCTable headings={headings} rows={rows} />)
  const rowsCount = screen.getAllByTestId('cc-table-row')
  expect(rowsCount.length).toEqual(2)
})
test('CCTable renders headings', () => {
  render(<CCTable headings={headings} rows={rows} />)
  const value1 = screen.getByText(/Name/i)
  const value2 = screen.getByText(/Age/i)
  expect(value1).toBeInTheDocument()
  expect(value2).toBeInTheDocument()
})
test('CCTable renders rows', () => {
  render(<CCTable headings={headings} rows={rows} />)
  const value1 = screen.getByText(/Sam/i)
  const value2 = screen.getByText(/22/i)
  const value3 = screen.getByText(/Paul/i)
  const value4 = screen.getByText(/25/i)
  expect(value1).toBeInTheDocument()
  expect(value2).toBeInTheDocument()
  expect(value3).toBeInTheDocument()
  expect(value4).toBeInTheDocument()
})
test('CCTable renders pagination when passed as true in props', () => {
  render(<CCTable headings={headings} rows={rows} pagination={true} />)
  const value1 = screen.getByText(/Rows per page/i)
  expect(value1).toBeInTheDocument()
})
