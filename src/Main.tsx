import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import { shallowEqual } from 'react-redux'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import { ErrorProvider } from './context/ErrorController'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import { setThroughIFrame } from './redux/Slices/appSlice'

interface Props {}

const Main = (props: Props) => {
  const dispatch = useAppDispatch()

  const themeOptions = useAppSelector(
    ({ theme }: { theme: any }) => theme,
    shallowEqual
  )

  const theme = createTheme(themeOptions)

  window.Object.freeze = function (obj: any) {
    return obj
  }

  const loader = () => {
    console.log('window.self == window.top', window.self == window.top)
    dispatch(setThroughIFrame(window.self !== window.top))

    return true
    if (window.self == window.top) {
      // Everything checks out, show the page.
      // document.documentElement.style.display = "block";
      return true
    } else {
      // Break out of the frame.
      // window.top.location = window.self.location;
      return false
    }
  }

  return loader() ? (
    <ErrorProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Inside ThemeProvider so the recovery screen is themed. */}
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </ThemeProvider>
    </ErrorProvider>
  ) : (
    <></>
  )
}

export default Main
