import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MonthlyReportUpdateReducerInterface {
  sectionIndex: number
  subSectionIndex: number
  currentProjectDetails: any
  currentProjectDetailsUUID: string
  mainProjectDetails: any
  showMandatoryFieldModal: boolean
  isApiCallSuccess: boolean
  toMoveSectionIndex: boolean
}
const initialState: MonthlyReportUpdateReducerInterface = {
  sectionIndex: 0,
  subSectionIndex: 0,
  currentProjectDetails: null,
  currentProjectDetailsUUID: '',
  mainProjectDetails: null,
  showMandatoryFieldModal: false,
  isApiCallSuccess: false,
  toMoveSectionIndex: false,
}
const MonthlyReportUpdate = createSlice({
  name: 'MonthlyReportUpdate',
  initialState,
  reducers: {
    setSectionIndex: (state, action: PayloadAction<any>) => {
      state.sectionIndex = action.payload
    },
    setSubSectionIndex: (state, action: PayloadAction<any>) => {
      state.subSectionIndex = action.payload
    },
    setCurrentProjectDetails: (state, action: PayloadAction<any>) => {
      state.currentProjectDetails = action.payload
    },
    setCurrentProjectDetailsUUID: (state, action: PayloadAction<any>) => {
      state.currentProjectDetailsUUID = action.payload
    },
    setMainProjectDetails: (state, action: PayloadAction<any>) => {
      state.mainProjectDetails = action.payload
    },
    setShowMandatoryFieldModal: (state, action: PayloadAction<any>) => {
      state.showMandatoryFieldModal = action.payload
    },
    setIsApiCallSuccess: (state, action: PayloadAction<any>) => {
      state.isApiCallSuccess = action.payload
    },
    setToMoveSectionIndex: (state, action: PayloadAction<any>) => {
      state.toMoveSectionIndex = action.payload
    },
  },
})

export const {
  setSectionIndex,
  setSubSectionIndex,
  setCurrentProjectDetails,
  setShowMandatoryFieldModal,
  setCurrentProjectDetailsUUID,
  setMainProjectDetails,
  setIsApiCallSuccess,
  setToMoveSectionIndex,
} = MonthlyReportUpdate.actions

export default MonthlyReportUpdate.reducer
