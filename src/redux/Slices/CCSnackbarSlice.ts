import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface CCSnackbarInterface {
  snackbarData: any
  snackbarPosition: any
}
const initialState: CCSnackbarInterface = {
  snackbarData: {
    showSnackbar: false,
    success: true,
    message: '',
  },
  snackbarPosition: {
    vertical: 'top',
    horizontal: 'center',
  },
}

const CCSnackbar = createSlice({
  name: 'CCSnackbar',
  initialState,
  reducers: {
    setSnackbarData: (state, action: PayloadAction<any>) => {
      state.snackbarData = action.payload
    },
    setSnackbarPosition: (state, action: PayloadAction<any>) => {
      state.snackbarPosition = action.payload
    },
  },
})

export const { setSnackbarData, setSnackbarPosition } = CCSnackbar.actions

export default CCSnackbar.reducer
