import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IssuanceDataCollectionReducerInterface {
  sectionIndex: number
  subSectionIndex: number
  currentProjectDetails: any
  currentProjectDetailsUUID: string
  showMandatoryFieldModal: boolean
  isApiCallSuccess: boolean
  toMoveSectionIndex: boolean
  showPopUp: boolean
  showResubmitPDFModal: boolean
  fileUploadInProgress: boolean
}

const initialState: IssuanceDataCollectionReducerInterface = {
  sectionIndex: 0,
  subSectionIndex: 0,
  currentProjectDetails: null,
  currentProjectDetailsUUID: '',
  showMandatoryFieldModal: false,
  isApiCallSuccess: false,
  toMoveSectionIndex: false,
  showPopUp: false,
  showResubmitPDFModal: false,
  fileUploadInProgress: false,
}

const issuanceDataCollection = createSlice({
  name: 'issuanceDataCollection',
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
    setShowMandatoryFieldModal: (state, action: PayloadAction<any>) => {
      state.showMandatoryFieldModal = action.payload
    },
    setIsApiCallSuccess: (state, action: PayloadAction<any>) => {
      state.isApiCallSuccess = action.payload
    },
    setToMoveSectionIndex: (state, action: PayloadAction<any>) => {
      state.toMoveSectionIndex = action.payload
    },
    setShowPopUp: (state, action: PayloadAction<any>) => {
      state.showPopUp = action.payload
    },
    setShowResubmitPDFModal: (state, action: PayloadAction<any>) => {
      state.showResubmitPDFModal = action.payload
    },
    setFileUploadInProgress: (state, action: PayloadAction<boolean>) => {
      state.fileUploadInProgress = action.payload
    },
  },
})

export const {
  setSectionIndex,
  setSubSectionIndex,
  setCurrentProjectDetails,
  setCurrentProjectDetailsUUID,
  setShowMandatoryFieldModal,
  setIsApiCallSuccess,
  setToMoveSectionIndex,
  setShowPopUp,
  setShowResubmitPDFModal,
  setFileUploadInProgress,
} = issuanceDataCollection.actions

export default issuanceDataCollection.reducer
