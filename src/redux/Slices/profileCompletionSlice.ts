import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ProfileCompletionReducerInterface {
  userDetails: any
  profileComplete: boolean
  profilePercentage: number
  updateUserPayload: any
  profileCompletionLoading: boolean
}
const initialState: ProfileCompletionReducerInterface = {
  userDetails: null,
  profileComplete: true,
  profilePercentage: 0,
  updateUserPayload: null,
  profileCompletionLoading: false,
}
const profileCompletion = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<any>) => {
      state.userDetails = action.payload
    },
    setProfileComplete: (state, action: PayloadAction<any>) => {
      state.profileComplete = action.payload
    },
    setProfilePercentage: (state, action: PayloadAction<any>) => {
      state.profilePercentage = action.payload
    },
    setUpdateUserPayload: (state, action: PayloadAction<any>) => {
      state.updateUserPayload = action.payload
    },
  },
})

export const {
  setUserDetails,
  setProfileComplete,
  setProfilePercentage,
  setUpdateUserPayload,
} = profileCompletion.actions

export default profileCompletion.reducer
