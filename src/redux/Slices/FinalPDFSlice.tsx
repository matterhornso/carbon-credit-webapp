import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FinalPDFReducerInterface {
  projectData: any
  aiSectionData: any
  pdfCoverPageData: any
}
const initialState: FinalPDFReducerInterface = {
  projectData: null,
  aiSectionData: null,
  pdfCoverPageData: null,
}
const finalPDFSlice = createSlice({
  name: 'finalPDF',
  initialState,
  reducers: {
    setProjectData: (state, action: PayloadAction<any>) => {
      state.projectData = action.payload
    },
    setAISectionData: (state, action: PayloadAction<any>) => {
      state.aiSectionData = action.payload
    },
    setPdfCoverPageData: (state, action: PayloadAction<any>) => {
      state.pdfCoverPageData = action.payload
    },
  },
})

export const { setProjectData, setAISectionData, setPdfCoverPageData } =
  finalPDFSlice.actions

export default finalPDFSlice.reducer
