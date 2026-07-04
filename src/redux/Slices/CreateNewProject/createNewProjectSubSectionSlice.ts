import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CreateNewProjectSubSectionInterface {
  projectIntroductionStep: number
  subSectionIndex: number
}
const initialState: CreateNewProjectSubSectionInterface = {
  projectIntroductionStep: 1,
  subSectionIndex: 0,
}

const createNewProjectSubSection = createSlice({
  name: 'createNewProjectSubSection',
  initialState,
  reducers: {
    setProjectIntroductionStep: (state, action: PayloadAction<any>) => {
      state.projectIntroductionStep = action.payload
    },
    setSubSectionIndex: (state, action: PayloadAction<any>) => {
      state.subSectionIndex = action.payload
    },
    resetCreateNewProjectSubSection: () => initialState,
  },
})

export const {
  setProjectIntroductionStep,
  setSubSectionIndex,
  resetCreateNewProjectSubSection,
} = createNewProjectSubSection.actions

export default createNewProjectSubSection.reducer
