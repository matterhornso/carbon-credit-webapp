import React from 'react'
import { render, screen } from '@testing-library/react'
import CCTitleValue from './CCTitleValue'

test('CCTitleValue renders title correctly', () => {
  render(<CCTitleValue title={'Test Title'}></CCTitleValue>)
  const CCTitleValueElement = screen.getByText(/Test Title/i)
  expect(CCTitleValueElement).toBeInTheDocument()
})
test('CCTitleValue renders value correctly', () => {
  render(
    <CCTitleValue title={'Test Title'} value={'Test Value'}></CCTitleValue>
  )
  const CCTitleValueElement = screen.getByText(/Test Value/i)
  expect(CCTitleValueElement).toBeInTheDocument()
})
