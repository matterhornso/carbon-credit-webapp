import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface pdfV2InitialState {
  pdfData: any
  pdfIntroPageData: any
}

const initialState: pdfV2InitialState = {
  pdfData: {},
  pdfIntroPageData: null,
}

const pdfV2Slice = createSlice({
  name: 'pdfV2Slice',
  initialState,
  reducers: {
    setPdfData: (state, action: PayloadAction<any>) => {
      state.pdfData = action.payload
    },
    setPdfIntroPageData: (state, action: PayloadAction<any>) => {
      state.pdfIntroPageData = action.payload
    },
  },
})

export const { setPdfData, setPdfIntroPageData } = pdfV2Slice.actions

export default pdfV2Slice.reducer
