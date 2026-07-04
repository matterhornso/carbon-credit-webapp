import React from "react";
import { render, screen } from "@testing-library/react";
import Logo from './Logo';
import { BrowserRouter as Router } from 'react-router-dom'

test('Logo renders headings', () => {
  render(
    <Router>
      <Logo />
    </Router>
  )
  const logoElem = screen.getByTestId('logo-img')
  expect(logoElem).toBeInTheDocument()
})
