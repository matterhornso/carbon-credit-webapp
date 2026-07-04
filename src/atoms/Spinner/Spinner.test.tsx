import React from "react";
import { render, screen } from "@testing-library/react";
import Spinner from './Spinner';

test("renders Spinner", () => {
  render(<Spinner />)
  const field = screen.getByTestId('spinner')
  expect(field).toBeInTheDocument()
});
