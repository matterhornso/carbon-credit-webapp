import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface cachingReducerInterface {
  issuerNewProjects: any
  issuerRegisteredProjects: any
  issuerVerificationProjects: any
  verifierNewProjects: any
  verifierRegisteredProjects: any
  verifierAcceptedProjects: any
  verifierRejectedProjects: any
  registryDraftProjects: any
  registryNewProjects: any
  registryReviewedProjects: any
  adminDraftProjects: any
  // project developers draft tab data will be stored here
  pdDraftProjects: any
  tabIndex: number
}
const initialState: cachingReducerInterface = {
  issuerNewProjects: null,
  issuerRegisteredProjects: null,
  issuerVerificationProjects: null,
  verifierNewProjects: null,
  verifierRegisteredProjects: null,
  verifierAcceptedProjects: null,
  verifierRejectedProjects: null,
  registryDraftProjects: null,
  registryNewProjects: null,
  registryReviewedProjects: null,
  adminDraftProjects: null,
  // pd draft tab
  pdDraftProjects: null,
  tabIndex: 1,
}
const dashboardSlice = createSlice({
  name: 'dashboardSlice',
  initialState,
  reducers: {
    setIssuerNewProjects: (state, action: PayloadAction<any>) => {
      state.issuerNewProjects = action.payload
    },
    setIssuerRegisteredProjects: (state, action: PayloadAction<any>) => {
      state.issuerRegisteredProjects = action.payload
    },
    setIssueVerificationProjects: (state, action: PayloadAction<any>) => {
      state.issuerVerificationProjects = action.payload
    },
    setVerifierNewProjects: (state, action: PayloadAction<any>) => {
      state.verifierNewProjects = action.payload
    },
    setVerifierRegisteredProjects: (state, action: PayloadAction<any>) => {
      state.verifierRegisteredProjects = action.payload
    },
    setVerifierAcceptedProjects: (state, action: PayloadAction<any>) => {
      state.verifierAcceptedProjects = action.payload
    },
    setVerifierRejectedProjects: (state, action: PayloadAction<any>) => {
      state.verifierRejectedProjects = action.payload
    },
    setRegistryNewProjects: (state, action: PayloadAction<any>) => {
      state.registryNewProjects = action.payload
    },
    setRegistryDraftProjects: (state, action: PayloadAction<any>) => {
      state.registryDraftProjects = action.payload
    },
    setRegistryReviewedProjects: (state, action: PayloadAction<any>) => {
      state.registryReviewedProjects = action.payload
    },
    setTabIndex: (state, action: PayloadAction<any>) => {
      state.tabIndex = action.payload
    },
    setAdminDraftProjects: (state, action: PayloadAction<any>) => {
      state.adminDraftProjects = action.payload
    },
    setPdDraftProjects: (state, action: PayloadAction<any>) => {
      state.pdDraftProjects = action.payload
    },
  },
})

export const {
  setIssuerNewProjects,
  setIssuerRegisteredProjects,
  setIssueVerificationProjects,
  setVerifierNewProjects,
  setVerifierRegisteredProjects,
  setVerifierAcceptedProjects,
  setVerifierRejectedProjects,
  setRegistryDraftProjects,
  setRegistryNewProjects,
  setRegistryReviewedProjects,
  setTabIndex,
  setAdminDraftProjects,
  setPdDraftProjects,
} = dashboardSlice.actions

export default dashboardSlice.reducer
