import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AppReducerInterface {
  throughIFrame: boolean
  showMessageModal: boolean
  messageModalText: string
}
const initialState: AppReducerInterface = {
  throughIFrame: false,
  showMessageModal: false,
  messageModalText: '',
}
const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setThroughIFrame: (state, action: PayloadAction<any>) => {
      state.throughIFrame = action.payload
    },
    setShowMessageModal: (state, action: PayloadAction<any>) => {
      state.showMessageModal = action.payload
    },
    setMessageModalText: (state, action: PayloadAction<any>) => {
      state.messageModalText = action.payload
    },
  },
})

export const { setThroughIFrame, setShowMessageModal, setMessageModalText } =
  app.actions

export default app.reducer
