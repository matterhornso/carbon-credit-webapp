import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface VerifierReducerInterface {
  profileCompletionPercent: number
  profileUpdated: boolean
  verifierStatsReload: boolean
  verifierDashboardTableLoading: boolean
  verifierTableNewTabModal: boolean
  verifierTableNewTabModalMsg: string
  verifierTableNewTabModalActionData: any
}
const initialState: VerifierReducerInterface = {
  profileCompletionPercent: 0,
  profileUpdated: false,
  verifierStatsReload: true,
  verifierDashboardTableLoading: false,
  verifierTableNewTabModal: false,
  verifierTableNewTabModalMsg: '',
  verifierTableNewTabModalActionData: null,
}
const verifier = createSlice({
  name: 'verifier',
  initialState,
  reducers: {
    setProfileCompletionPercent: (state, action: PayloadAction<any>) => {
      state.profileCompletionPercent = action.payload
    },
    setProfileUpdated: (state, action: PayloadAction<any>) => {
      state.profileUpdated = action.payload
    },
    setVerifierStatsReload: (state, action: PayloadAction<any>) => {
      state.verifierStatsReload = action.payload
    },
    setVerifierDashboardTableLoading: (state, action: PayloadAction<any>) => {
      state.verifierDashboardTableLoading = action.payload
    },
    setVerifierTableNewTabModal: (state, action: PayloadAction<boolean>) => {
      state.verifierTableNewTabModal = action.payload
    },
    setVerifierTableNewTabModalMsg: (state, action: PayloadAction<string>) => {
      state.verifierTableNewTabModalMsg = action.payload
    },
    setVerifierTableNewTabModalActionData: (
      state,
      action: PayloadAction<any>
    ) => {
      state.verifierTableNewTabModalActionData = action.payload
    },
  },
})

export const {
  setProfileCompletionPercent,
  setProfileUpdated,
  setVerifierStatsReload,
  setVerifierDashboardTableLoading,
  setVerifierTableNewTabModal,
  setVerifierTableNewTabModalMsg,
  setVerifierTableNewTabModalActionData,
} = verifier.actions

export default verifier.reducer
