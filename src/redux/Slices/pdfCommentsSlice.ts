import { PayloadAction, createSlice } from '@reduxjs/toolkit'
interface pdfCommentsProps {
  commentsData: any
  exportPdfFn: any
}

const initialState: pdfCommentsProps = {
  commentsData: null,
  exportPdfFn: null,
}

const pdfCommentsSlice = createSlice({
  name: 'pdfComments',
  initialState,
  reducers: {
    setCommentsData: (state, action: PayloadAction<any>) => {
      state.commentsData = action.payload
    },
    setExportPdfFn: (state, action: PayloadAction<any>) => {
      state.exportPdfFn = action.payload
    },
  },
})

export const { setCommentsData, setExportPdfFn } = pdfCommentsSlice.actions
export default pdfCommentsSlice.reducer
