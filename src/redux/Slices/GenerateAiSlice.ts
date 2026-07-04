import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface generateAiInitialStateInterface {
  showAiField: any
  editorBlockMethods: any
  editorIsReady: boolean
  editorBlockAction: any
  editorBlockActionInsertParams: any
  editorBlockActionUpdateParams: any
  editorBlockActionDeleteParams: any
  showAIFieldfromBtn: any
}
const generateAiInitialState: generateAiInitialStateInterface = {
  showAiField: {},
  editorBlockMethods: {},
  editorIsReady: false,
  editorBlockAction: {},
  editorBlockActionInsertParams: {},
  editorBlockActionUpdateParams: {},
  editorBlockActionDeleteParams: null,
  showAIFieldfromBtn: {},
}

const generateAiSlice = createSlice({
  name: 'generateAi',
  initialState: generateAiInitialState,
  reducers: {
    setShowAiField: (state, action: PayloadAction<any>) => {
      state.showAiField = action.payload
    },
    setEditorBlockMethods: (state, action: PayloadAction<any>) => {
      state.editorBlockMethods = action.payload
    },
    setEditorIsReady: (state, action: PayloadAction<any>) => {
      state.editorIsReady = action.payload
    },
    setEditorBlockAction: (state, action: PayloadAction<any>) => {
      state.editorBlockAction = action.payload
    },
    setEditorBlockActionInsertParams: (state, action: PayloadAction<any>) => {
      state.editorBlockActionInsertParams = action.payload
    },
    setEditorBlockActionUpdateParams: (state, action: PayloadAction<any>) => {
      state.editorBlockActionUpdateParams = action.payload
    },
    setEditorBlockActionDeleteParams: (state, action: PayloadAction<any>) => {
      state.editorBlockActionDeleteParams = action.payload
    },
    setShowAIFieldfromBtn: (state, action: PayloadAction<any>) => {
      state.showAIFieldfromBtn = action.payload
    },
  },
})

export const {
  setShowAiField,
  setEditorBlockMethods,
  setEditorIsReady,
  setEditorBlockAction,
  setEditorBlockActionInsertParams,
  setEditorBlockActionUpdateParams,
  setEditorBlockActionDeleteParams,
  setShowAIFieldfromBtn,
} = generateAiSlice.actions

export default generateAiSlice.reducer
