import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CreateNewProjectInterface {
  editorData: any
  projectUUID: string
  savedProjectDetails: any
  savedProjectDetailsLoader: boolean | null
  openCommentModal: boolean
}
const initialState: CreateNewProjectInterface = {
  editorData: null,
  projectUUID: '',
  savedProjectDetails: {},
  savedProjectDetailsLoader: null,
  openCommentModal: false,
}
const createNewProject = createSlice({
  name: 'createNewProject',
  initialState,
  reducers: {
    setEditorData: (state, action: PayloadAction<any>) => {
      state.editorData = action.payload
    },
    setProjectUUID: (state, action: PayloadAction<any>) => {
      state.projectUUID = action.payload
    },
    setSavedProjectDetails: (state, action: PayloadAction<any>) => {
      state.savedProjectDetails = action.payload
    },
    setSavedProjectDetailsLoader: (state, action: PayloadAction<boolean>) => {
      state.savedProjectDetailsLoader = action.payload
    },
    setOpenCommentModal: (state, action: PayloadAction<boolean>) => {
      state.openCommentModal = action.payload
    },
    resetCreateNewProject: () => initialState,
  },
})

export const {
  setEditorData,
  setProjectUUID,
  setSavedProjectDetails,
  setSavedProjectDetailsLoader,
  setOpenCommentModal,
  resetCreateNewProject,
} = createNewProject.actions

export default createNewProject.reducer
