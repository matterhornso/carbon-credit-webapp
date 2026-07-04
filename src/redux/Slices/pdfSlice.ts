import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PdfReducerInterface {
  pdfData: any
  sectionA: number
  sectionB: number
  sectionC: number
  sectionD: number
  sectionE: number
  childrenElement: any
  pageHeight: number
}
const initialState: PdfReducerInterface = {
  pdfData: null,
  sectionA: 0,
  sectionB: 0,
  sectionC: 0,
  sectionD: 0,
  sectionE: 0,
  childrenElement: [],
  pageHeight: 0,
}
const pdfPage = createSlice({
  name: 'pdf',
  initialState,
  reducers: {
    setPdfData: (state, action: PayloadAction<any>) => {
      state.pdfData = action.payload
    },

    setSectionA: (state, action: PayloadAction<any>) => {
      state.sectionA = action.payload
    },
    setSectionB: (state, action: PayloadAction<any>) => {
      state.sectionB = action.payload
    },
    setSectionC: (state, action: PayloadAction<any>) => {
      state.sectionC = action.payload
    },
    setSectionD: (state, action: PayloadAction<any>) => {
      state.sectionD = action.payload
    },
    setSectionE: (state, action: PayloadAction<any>) => {
      state.sectionE = action.payload
    },
    setChildrenElement: (state, action: PayloadAction<any>) => {
      state.childrenElement = action.payload
    },
    setPageHeight: (state, action: PayloadAction<any>) => {
      state.pageHeight = action.payload
    },
    resetSectionNewProjectDetails: () => initialState,
  },
})

export const {
  setPdfData,
  setSectionA,
  setSectionB,
  setSectionC,
  setSectionD,
  setSectionE,
  setChildrenElement,
  setPageHeight,
} = pdfPage.actions

export default pdfPage.reducer
