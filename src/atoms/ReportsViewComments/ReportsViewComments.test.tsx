import React from 'react'
import { render, screen } from '@testing-library/react'
import ReportsViewComments from './ReportsViewComments'

const data = {
  company_name: 'Test Company',
  start_date: '2022-08-08T08:04:33.441Z',
  type: ['Test Type 1', 'Test Type 2'],
  location: 'Test Location',
}

test('should render ReportsViewComments', () => {
  // render(<ReportsViewComments projectDetails={data} />)
  // const field = screen.getByTestId('reports-view-comments')
  // expect(field).toBeInTheDocument()
})
test('ReportsViewComments renders correct comapny name', () => {
  // render(<ReportsViewComments projectDetails={data} />)
  // const field = screen.getByText(/Test Company/i)
  // expect(field).toBeInTheDocument()
})
test('ReportsViewComments renders correct no. of types', () => {
  // render(<ReportsViewComments projectDetails={data} />)
  // const field = screen.getAllByTestId('reports-view-comments-type')
  // expect(field.length).toEqual(2)
})
test('ReportsViewComments renders correct types', () => {
  // render(<ReportsViewComments projectDetails={data} />)
  // const field1 = screen.getByText(/Test Type 1/i)
  // expect(field1).toBeInTheDocument()
  // const field2 = screen.getByText(/Test Type 2/i)
  // expect(field2).toBeInTheDocument()
})
// test('ReportsViewComments renders correct comapny name', () => {
//   render(<ReportsViewComments projectDetails={data} />)
//   const field = screen.getByText(/Test Company/i)
//   expect(field).toBeInTheDocument()
// })
// test('ReportsViewComments renders correct no. of types', () => {
//   render(<ReportsViewComments projectDetails={data} />)
//   const field = screen.getAllByTestId('reports-view-comments-type')
//   expect(field.length).toEqual(2)
// })
// test('ReportsViewComments renders correct types', () => {
//   render(<ReportsViewComments projectDetails={data} />)
//   const field1 = screen.getByText(/Test Type 1/i)
//   expect(field1).toBeInTheDocument()
//   const field2 = screen.getByText(/Test Type 2/i)
//   expect(field2).toBeInTheDocument()
// })
