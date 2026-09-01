import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setSentryUser } from '../../config/sentry.config'
import { removeAllItem, setLocalItem } from '../../utils/Storage'

interface AuthReducerInterface {
  loggedIn: boolean
  data: any
}
const initialState: AuthReducerInterface = {
  loggedIn: false,
  data: null,
}
const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<any>) => {
      state.loggedIn = true
      state.data = { roles: [action.payload?.type] }
      setLocalItem('loggedIn', { roles: [action.payload?.type] })
      setLocalItem('userDetails', action.payload)
      // Opaque id + role only, so errors are attributable without shipping PII.
      setSentryUser(
        action.payload?.user_id ?? action.payload?.uuid,
        action.payload?.type
      )
    },
    logoutAction: () => {
      setSentryUser(undefined)
      // removeAllItem()
      // localStorage.removeItem('persist:root')
      localStorage.removeItem('userDetails')
      localStorage.removeItem('profileCompleted')
      localStorage.removeItem('userDetails2')
      localStorage.removeItem('loggedIn')
      localStorage.removeItem('AI_user_id')
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    },
  },
})

export const { loginAction, logoutAction } = auth.actions

export default auth.reducer
