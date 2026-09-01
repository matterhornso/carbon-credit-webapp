import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface OriginationProjectStateInterface {
  currentProject: any | null
  caseDocument: any | null
  sourceDocuments: any[]
  applicability: any | null
  loading: boolean
  generatingSectionKey: string | null // which section is mid-generation, for per-section spinners
  error: string | null
}

const initialState: OriginationProjectStateInterface = {
  currentProject: null,
  caseDocument: null,
  sourceDocuments: [],
  applicability: null,
  loading: false,
  generatingSectionKey: null,
  error: null,
}

const projectSlice = createSlice({
  name: 'originationProject',
  initialState,
  reducers: {
    setCurrentProject: (state, action: PayloadAction<any>) => {
      state.currentProject = action.payload
    },
    setCaseDocument: (state, action: PayloadAction<any>) => {
      state.caseDocument = action.payload
    },
    setSourceDocuments: (state, action: PayloadAction<any[]>) => {
      state.sourceDocuments = action.payload
    },
    setApplicability: (state, action: PayloadAction<any>) => {
      state.applicability = action.payload
    },
    setOriginationLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setGeneratingSectionKey: (state, action: PayloadAction<string | null>) => {
      state.generatingSectionKey = action.payload
    },
    setOriginationError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    resetOriginationState: () => initialState,
  },
})

export const {
  setCurrentProject,
  setCaseDocument,
  setSourceDocuments,
  setApplicability,
  setOriginationLoading,
  setGeneratingSectionKey,
  setOriginationError,
  resetOriginationState,
} = projectSlice.actions

export default projectSlice.reducer
