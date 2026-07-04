import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DashboardProjectListReducerInterface {
  newTabAllProjects: any
  verificationTabAllProjects: any
  registerTabAllProjects: any
}

const initialState: DashboardProjectListReducerInterface = {
  newTabAllProjects: null,
  verificationTabAllProjects: null,
  registerTabAllProjects: null,
}

const dashboardProjectList = createSlice({
  name: 'dashboardProjectList',
  initialState,
  reducers: {
    setNewTabAllProjects: (state, action: PayloadAction<any>) => {
      state.newTabAllProjects = action.payload
    },
    setVerificationTabAllProjects: (state, action: PayloadAction<any>) => {
      state.verificationTabAllProjects = action.payload
    },
    setRegisterTabAllProjects: (state, action: PayloadAction<any>) => {
      state.registerTabAllProjects = action.payload
    },
  },
})

export const {
  setNewTabAllProjects,
  setVerificationTabAllProjects,
  setRegisterTabAllProjects,
} = dashboardProjectList.actions

export default dashboardProjectList.reducer
