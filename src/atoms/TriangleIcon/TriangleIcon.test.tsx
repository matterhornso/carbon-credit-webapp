import React from "react";
import { render, screen } from "@testing-library/react";
import TriangleIcon from './TriangleIcon';

test("renders TriangleIcon", () => {
  // render(<App />);
  // const linkElement = screen.getByText(/TriangleIcon/i);
  // expect(linkElement).toBeInTheDocument();
render(<TriangleIcon />)
const field = screen.getByTestId('triangle-icon')
expect(field).toBeInTheDocument()
});
