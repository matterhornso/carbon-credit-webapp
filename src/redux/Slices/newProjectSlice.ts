import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NewProjectReducerInterface {
  startDate: Date | null
  projectType: string[]
  projectName: string
  projectLocation: string
  projectDuration: string
  projectArea: string
  loading: boolean
  endDate: Date | null
  //Will get from create new project call
  newProjectUUID: string
  bannerImage: any
  projectImage: any
}
const initialState: NewProjectReducerInterface = {
  projectName: '',
  projectType: [],
  projectLocation: '',
  startDate: null,
  projectDuration: '',
  projectArea: '',
  loading: false,
  endDate: null,

  //Will get from create new project call
  newProjectUUID: '',
  bannerImage: [],
  projectImage: [],
}
const newProject = createSlice({
  name: 'newProject',
  initialState,
  reducers: {
    setProjectName: (state, action: PayloadAction<any>) => {
      state.projectName = action.payload
    },
    setProjectType: (state, action: PayloadAction<any>) => {
      state.projectType = action.payload
    },
    setProjectLocation: (state, action: PayloadAction<any>) => {
      state.projectLocation = action.payload
    },
    setStartDate: (state, action: PayloadAction<any>) => {
      state.startDate = action.payload
    },
    setProjectDuration: (state, action: PayloadAction<any>) => {
      state.projectDuration = action.payload
    },
    setProjectArea: (state, action: PayloadAction<any>) => {
      state.projectArea = action.payload
    },
    setNewProjectUUID: (state, action: PayloadAction<any>) => {
      state.newProjectUUID = action.payload
    },
    setLoading: (state, action: PayloadAction<any>) => {
      state.loading = action.payload
    },
    setEndDate: (state, action: PayloadAction<any>) => {
      state.endDate = action.payload
    },
    setBannerImage: (state, action: PayloadAction<any>) => {
      state.bannerImage = action.payload
    },
    setProjectImage: (state, action: PayloadAction<any>) => {
      state.projectImage = action.payload
    },
    resetSectionNewProjectDetails: () => initialState,
  },
})

export const {
  setStartDate,
  setProjectType,
  setProjectName,
  setProjectLocation,
  setProjectDuration,
  setProjectArea,
  setNewProjectUUID,
  setLoading,
  setEndDate,
  resetSectionNewProjectDetails,
  setBannerImage,
  setProjectImage,
} = newProject.actions

export default newProject.reducer
