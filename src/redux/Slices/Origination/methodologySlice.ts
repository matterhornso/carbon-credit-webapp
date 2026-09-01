import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MethodologyStateInterface {
  list: any[]
  selected: any | null
  loading: boolean
}

const initialState: MethodologyStateInterface = {
  list: [],
  selected: null,
  loading: false,
}

const methodologySlice = createSlice({
  name: 'originationMethodology',
  initialState,
  reducers: {
    setMethodologyList: (state, action: PayloadAction<any[]>) => {
      state.list = action.payload
    },
    setSelectedMethodology: (state, action: PayloadAction<any>) => {
      state.selected = action.payload
    },
    setMethodologyLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    resetMethodologyState: () => initialState,
  },
})

export const {
  setMethodologyList,
  setSelectedMethodology,
  setMethodologyLoading,
  resetMethodologyState,
} = methodologySlice.actions

export default methodologySlice.reducer
