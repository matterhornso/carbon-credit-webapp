import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface generateProjectWithAISliceInterface {
  selectedSectionForGenerateProjectWithAI: any
  userPrompt: string
  // userAssistantConversationChat: any
  finalisedPDDPDF: any
  uploadedFiles: any
  uploadedImages: any
  expandFinalisedPDD: boolean
  finalisedPDDSectionWise: any
  showLoader: boolean
  currentProjectDetailsForAI: any
  chatLoader: boolean
  chatSectionLoader: boolean
  finalPDDContenLoader: boolean
  loaderForStoringAsstIds: boolean
  updatedCompiledDataByUser: any
}
// {
//     value: '1.1 Purpose, Objectives, and General Description of the Project',
//     label: '1.1',
//   }
const initialState: generateProjectWithAISliceInterface = {
  selectedSectionForGenerateProjectWithAI: {},
  userPrompt: '',
  // userAssistantConversationChat: null,
  finalisedPDDPDF: '',
  uploadedFiles: [],
  uploadedImages: [],
  expandFinalisedPDD: false,
  finalisedPDDSectionWise: {},
  showLoader: false,
  currentProjectDetailsForAI: {},
  chatLoader: false,
  chatSectionLoader: false,
  finalPDDContenLoader: false,
  updatedCompiledDataByUser: [],
  loaderForStoringAsstIds: false,
}

const generateProjectWithAISlice = createSlice({
  name: 'generateProjectWithAISlice',
  initialState,
  reducers: {
    setSelectedSectionForGenerateProjectWithAI: (
      state,
      action: PayloadAction<any>
    ) => {
      state.selectedSectionForGenerateProjectWithAI = action.payload
    },
    setUserPrompt: (state, action: PayloadAction<any>) => {
      state.userPrompt = action.payload
    },
    // setUserAssistantConversationChat: (state, action: PayloadAction<any>) => {
    //   state.userAssistantConversationChat = action.payload
    // },
    setFinalisedPDDPDF: (state, action: PayloadAction<any>) => {
      state.finalisedPDDPDF = action.payload
    },
    setUploadedFiles: (state, action: PayloadAction<any>) => {
      state.uploadedFiles = action.payload
    },
    setUploadedImages: (state, action: PayloadAction<any>) => {
      state.uploadedImages = action.payload
    },
    setExpandFinalisedPDD: (state, action: PayloadAction<any>) => {
      state.expandFinalisedPDD = action.payload
    },
    setFinalisedPDDSectionWise: (state, action: PayloadAction<any>) => {
      state.finalisedPDDSectionWise = action.payload
    },
    setShowLoader: (state, action: PayloadAction<any>) => {
      state.showLoader = action.payload
    },
    setCurrentProjectDetailsForAI: (state, action: PayloadAction<any>) => {
      state.currentProjectDetailsForAI = action.payload
    },
    setChatLoader: (state, action: PayloadAction<any>) => {
      state.chatLoader = action.payload
    },
    setChatSectionLoader: (state, action: PayloadAction<any>) => {
      state.chatSectionLoader = action.payload
    },
    setFinalPDDContenLoader: (state, action: PayloadAction<any>) => {
      state.finalPDDContenLoader = action.payload
    },
    setUpdatedCompiledDataByUser: (state, action: PayloadAction<any>) => {
      state.updatedCompiledDataByUser = action.payload
    },
    setLoaderForStoringAsstIds: (state, action: PayloadAction<any>) => {
      state.loaderForStoringAsstIds = action.payload
    },

    resetGenerateProjectWithAISlice: () => initialState,
  },
})

export const {
  setSelectedSectionForGenerateProjectWithAI,
  setUserPrompt,
  // setUserAssistantConversationChat,
  setFinalisedPDDPDF,
  setUploadedFiles,
  setUploadedImages,
  setExpandFinalisedPDD,
  setFinalisedPDDSectionWise,
  setShowLoader,
  resetGenerateProjectWithAISlice,
  setCurrentProjectDetailsForAI,
  setChatLoader,
  setChatSectionLoader,
  setFinalPDDContenLoader,
  setUpdatedCompiledDataByUser,
  setLoaderForStoringAsstIds,
} = generateProjectWithAISlice.actions

export default generateProjectWithAISlice.reducer
