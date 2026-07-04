import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  fireEvent,
  queryByTestId,
  render,
  screen,
} from '@testing-library/react'
import Login from './LoginPage'
import * as router from 'react-router'
import * as ReactRedux from 'react-redux'
import { Provider } from 'react-redux'
import { store } from '../../redux/store'
import { ThemeProvider } from '@mui/material'
import { act, createRenderer, isElement } from 'react-dom/test-utils'
import { initialState } from '../../redux/Slices/themeSlice'

const navigate = jest.fn()

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})

jest.mock('react-redux', () => {
  const { Provider, useSelector } = jest.requireActual('react-redux')

  return {
    useDispatch: jest.fn(),
    // we ensure that these are original
    useSelector,
    Provider,
  }
})

test('render sLogin Me in to React', () => {
  isElement(<Login />)
})
