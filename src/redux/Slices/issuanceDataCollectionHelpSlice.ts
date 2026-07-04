import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { data } from '../../components/IssuanceDataCollectionHelp/data'

interface IssuanceDataCollectionHelpReducerInterface {
  title: string
  projectType: string
  methodology: string
  standard: string
  filteredRows: any
}
const initialState: IssuanceDataCollectionHelpReducerInterface = {
  title: '',
  projectType: '',
  methodology: '',
  standard: '',
  filteredRows: data,
}
const issuanceDataCollectionHelp = createSlice({
  name: 'issuanceDataCollectionHelp',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<any>) => {
      state.title = action.payload
    },
    setProjectType: (state, action: PayloadAction<any>) => {
      state.projectType = action.payload
    },
    setMethodology: (state, action: PayloadAction<any>) => {
      state.methodology = action.payload
    },
    setStandard: (state, action: PayloadAction<any>) => {
      state.standard = action.payload
    },
    setFilteredRows: (state, action: PayloadAction<any>) => {
      state.filteredRows = action.payload
    },
    resetIssuanceDataCollectionHelpReducer: () => initialState,
  },
})

export const {
  setTitle,
  setProjectType,
  setMethodology,
  setStandard,
  setFilteredRows,
  resetIssuanceDataCollectionHelpReducer,
} = issuanceDataCollectionHelp.actions

export default issuanceDataCollectionHelp.reducer
