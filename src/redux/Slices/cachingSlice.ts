import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface cachingReducerInterface {
  cachedIssuerDashboardProjects: any
  cachedIssuerStats: any
  cachedNewTabAllProjects: any
  cachedVerificationTabAllProjects: any
  cachedRegisterTabAllProjects: any
  cachedVerifierDashboardProjects: any
  cachedRegistryNewTabAllProjects: any
  cachedRegistryReviewedTabAllProjects: any
  // admin projects
  cachedAdminDashboardProjects: any
  // draft projects
  cachedDraftProjects: any
  // draft tab registry projects
  cachedRegistryDraftTabProjects: any
  // admin stas
  cachedAdminStats: any
  tabIndex: number
}
const initialState: cachingReducerInterface = {
  cachedIssuerStats: null,
  cachedIssuerDashboardProjects: null,
  cachedNewTabAllProjects: [],
  cachedVerificationTabAllProjects: [],
  cachedRegisterTabAllProjects: [],
  cachedVerifierDashboardProjects: [],
  cachedRegistryNewTabAllProjects: [],
  cachedRegistryReviewedTabAllProjects: [],
  // admin projects
  cachedAdminDashboardProjects: [],
  // draft projects
  cachedDraftProjects: [],
  // draft tab registry projects
  cachedRegistryDraftTabProjects: [],
  // admin stats
  cachedAdminStats: null,
  tabIndex: 1,
}
const cachingSlice = createSlice({
  name: 'cachingSlice',
  initialState,
  reducers: {
    setCachedIssuerDashboardProject: (state, action: PayloadAction<any>) => {
      state.cachedIssuerDashboardProjects = action.payload
    },
    setCachedNewTabAllProjects: (state, action: PayloadAction<any>) => {
      state.cachedNewTabAllProjects = action.payload
    },
    setCachedVerificationTabAllProjects: (
      state,
      action: PayloadAction<any>
    ) => {
      state.cachedVerificationTabAllProjects = action.payload
    },
    setCachedRegisterTabAllProjects: (state, action: PayloadAction<any>) => {
      state.cachedRegisterTabAllProjects = action.payload
    },
    setCachedIssuerStats: (state, action: PayloadAction<any>) => {
      state.cachedIssuerStats = action.payload
    },
    setCachedVerifierDashboardProject: (state, action: PayloadAction<any>) => {
      state.cachedVerifierDashboardProjects = action.payload
    },
    setCachedRegistryNewTabAllProjects: (state, action: PayloadAction<any>) => {
      state.cachedRegistryNewTabAllProjects = action.payload
    },
    setCachedRegistryReviewedTabAllProjects: (
      state,
      action: PayloadAction<any>
    ) => {
      state.cachedRegistryReviewedTabAllProjects = action.payload
    },
    setTabIndex: (state, action: PayloadAction<any>) => {
      state.tabIndex = action.payload
    },
    // admin dashboard projects
    setCachedAdminDashboardProjects: (state, action: PayloadAction<any>) => {
      state.cachedAdminDashboardProjects = action.payload
    },
    // cached draft projects
    setCachedDraftProjects: (state, action: PayloadAction<any>) => {
      state.cachedDraftProjects = action.payload
    },

    setCachedRegistryDraftTabProjects: (state, action: PayloadAction<any>) => {
      state.cachedRegistryDraftTabProjects = action.payload
    },
    // admin stats
    setCachedAdminStats: (state, action: PayloadAction<any>) => {
      state.cachedAdminStats = action.payload
    },
  },
})

export const {
  setCachedIssuerDashboardProject,
  setCachedIssuerStats,
  setCachedNewTabAllProjects,
  setCachedRegisterTabAllProjects,
  setCachedVerificationTabAllProjects,
  setCachedVerifierDashboardProject,
  setCachedRegistryNewTabAllProjects,
  setCachedRegistryReviewedTabAllProjects,
  setTabIndex,
  // admin projects
  setCachedAdminDashboardProjects,
  // cached projects
  setCachedDraftProjects,
  setCachedRegistryDraftTabProjects,
  //cached Admin stats
  setCachedAdminStats,
} = cachingSlice.actions

export default cachingSlice.reducer
