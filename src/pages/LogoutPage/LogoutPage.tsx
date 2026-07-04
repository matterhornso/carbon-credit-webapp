import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { logoutAction } from '../../redux/Slices/authSlice'
import { LogoutPageProps } from './LogoutPage.interface'
const LogoutPage = (props: LogoutPageProps) => {
  const dispatch = useAppDispatch()
  const userData = useAppSelector((state) => state.auth.data, shallowEqual)

  useEffect(() => {
    const payload = { roles: {} }

    // payload.jwtToken = userData?.loggedInData?.jwtToken
    callLogout(payload)
  }, [])

  const callLogout = (payload: any) => {
    dispatch(logoutAction())
  }
  return (
    <Grid
      container
      justifyContent={'center'}
      alignItems={'center'}
      sx={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'primary.main',
        zIndex: 100000000,
        color: 'primary.light',
      }}
    >
      Logging out...
    </Grid>
  )
}
export default LogoutPage
