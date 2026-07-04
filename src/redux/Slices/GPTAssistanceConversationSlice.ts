import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface generateProjectWithAISliceInterface {
  initialisedAssistanceDetails: any
  threadDetails: any
  chatConversationHistory: any
  internalConversationMsgIds: any
  previousConversationHistory: any
  previousConversationThreadIds: any
  imageStrBasedOnGeoLocation: any
  compiledSectionPddContent: any
  asstChatIds: any
  asstAPICallInProgress: any
}

const initialState: generateProjectWithAISliceInterface = {
  initialisedAssistanceDetails: {},
  threadDetails: {},
  chatConversationHistory: [],
  internalConversationMsgIds: {},
  previousConversationHistory: [],
  previousConversationThreadIds: {},
  imageStrBasedOnGeoLocation: [],
  compiledSectionPddContent: {},
  asstChatIds: {},
  asstAPICallInProgress: false,
}

const GPTAssistanceConversationSlice = createSlice({
  name: 'GPTAssistanceConversationSlice',
  initialState,
  reducers: {
    setInitialisedAssistanceDetails: (state, action: PayloadAction<any>) => {
      state.initialisedAssistanceDetails = action.payload
    },
    setThreadDetails: (state, action: PayloadAction<any>) => {
      state.threadDetails = action.payload
    },
    setConversationChatHistory: (state, action: PayloadAction<any>) => {
      state.chatConversationHistory = action.payload
    },
    setInternalConversationMsgIds: (state, action: PayloadAction<any>) => {
      state.internalConversationMsgIds = action.payload
    },
    setPreviousConversationHistory: (state, action: PayloadAction<any>) => {
      state.previousConversationHistory = action.payload
    },
    setPreviousConversationThreadIds: (state, action: PayloadAction<any>) => {
      state.previousConversationHistory = action.payload
    },
    setImageStrBasedOnGeoLocation: (state, action: PayloadAction<any>) => {
      state.imageStrBasedOnGeoLocation = action.payload
    },
    setCompiledSectionPddContent: (state, action: PayloadAction<any>) => {
      state.compiledSectionPddContent = action.payload
    },
    setAsstChatIds: (state, action: PayloadAction<any>) => {
      state.asstChatIds = action.payload
    },
    setAsstAPICallInProgress: (state, action: PayloadAction<any>) => {
      state.asstAPICallInProgress = action.payload
    },
    resetGPTAssistanceConversationSlice: () => initialState,
  },
})

export const {
  setThreadDetails,
  setInitialisedAssistanceDetails,
  setConversationChatHistory,
  setInternalConversationMsgIds,
  setPreviousConversationHistory,
  setPreviousConversationThreadIds,
  setImageStrBasedOnGeoLocation,
  resetGPTAssistanceConversationSlice,
  setCompiledSectionPddContent,
  setAsstAPICallInProgress,
  setAsstChatIds,
} = GPTAssistanceConversationSlice.actions

export default GPTAssistanceConversationSlice.reducer
