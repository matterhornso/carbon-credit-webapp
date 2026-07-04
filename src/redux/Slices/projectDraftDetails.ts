import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface projectDraftDetailsSlice {
  currentProjectDraftDetails: any
}

const initialState: projectDraftDetailsSlice = {
  currentProjectDraftDetails: null,
}

const projectDraftDetailsSlice = createSlice({
  name: 'projectDraftDetails',
  initialState,
  reducers: {
    setCurrentProjectDraftDetails: (state, action: PayloadAction<any>) => {
      state.currentProjectDraftDetails = action.payload
    },
  },
})

export const { setCurrentProjectDraftDetails } =
  projectDraftDetailsSlice.actions

export default projectDraftDetailsSlice.reducer
