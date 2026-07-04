import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CreateNewProjectSectionInterface {
  selectedSection: any
  sectionIndex: number
}
const initialState: CreateNewProjectSectionInterface = {
  selectedSection: null,
  sectionIndex: 0,
}
const createNewProjectSection = createSlice({
  name: 'createNewProjectSection',
  initialState,
  reducers: {
    setSelectedSection: (state, action: PayloadAction<any>) => {
      state.selectedSection = action.payload
    },
    setSectionIndex: (state, action: PayloadAction<any>) => {
      state.sectionIndex = action.payload
    },
    resetCreateNewProjectSection: () => initialState,
  },
})

export const {
  setSelectedSection,
  setSectionIndex,
  resetCreateNewProjectSection,
} = createNewProjectSection.actions

export default createNewProjectSection.reducer
