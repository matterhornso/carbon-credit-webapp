import React from "react";
import { render, screen } from "@testing-library/react";
import CCTableSkeleton from './CCTableSkeleton';

test('renders CCTableSkeleton', () => {
  render(<CCTableSkeleton />)
  const field = screen.getByTestId('cc-table-skeleton')
  expect(field).toBeInTheDocument()
})
test('renders correct no.of skeleton rows', () => {
  render(<CCTableSkeleton items={2} />)
  const field = screen.getAllByTestId('cc-table-skeleton-row')
  expect(field.length).toEqual(2)
})
