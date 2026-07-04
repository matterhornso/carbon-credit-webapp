import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TraceabilityReducerInterface {
  projectDeveloper: string
  verifier: string
  choosenVerifiers: any
  txIDForTab: string
  reportPDF: string
}
const initialState: TraceabilityReducerInterface = {
  projectDeveloper: '',
  verifier: '',
  choosenVerifiers: null,
  txIDForTab: '',
  reportPDF: '',
}
const traceability = createSlice({
  name: 'traceability',
  initialState,
  reducers: {
    setProjectDeveloper: (state, action: PayloadAction<any>) => {
      state.projectDeveloper = action.payload
    },
    setVerifier: (state, action: PayloadAction<any>) => {
      state.verifier = action.payload
    },
    setChoosenVerifiers: (state, action: PayloadAction<any>) => {
      state.choosenVerifiers = action.payload
    },
    setTxIDForTab: (state, action: PayloadAction<any>) => {
      state.txIDForTab = action.payload
    },
    setReportPDF: (state, action: PayloadAction<any>) => {
      state.reportPDF = action.payload
    },
  },
})

export const {
  setProjectDeveloper,
  setVerifier,
  setChoosenVerifiers,
  setTxIDForTab,
  setReportPDF,
} = traceability.actions

export default traceability.reducer
