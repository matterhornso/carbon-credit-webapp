import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SelectDateSliceReducerInterface {
  startDate: Date | null
  endDate: Date | null
  loading: boolean

  //Will get from create new project call
  selectDateSliceUUID: string
  newProjectUUID: string
}
const initialState: SelectDateSliceReducerInterface = {
  startDate: null,
  endDate: null,
  loading: false,

  //Will get from create new project call
  selectDateSliceUUID: '',
  newProjectUUID: '',
}
const selectDate = createSlice({
  name: 'selectDateSlice',
  initialState,
  reducers: {
    setStartDate: (state, action: PayloadAction<any>) => {
      state.startDate = action.payload
    },
    setEndDate: (state, action: PayloadAction<any>) => {
      state.endDate = action.payload
    },
    setLoading: (state, action: PayloadAction<any>) => {
      state.loading = action.payload
    },
    setNewProjectUUID: (state, action: PayloadAction<any>) => {
      state.newProjectUUID = action.payload
    },
    resetSelectDate: () => initialState,
  },
})

export const {
  setStartDate,
  setEndDate,
  setLoading,
  setNewProjectUUID,
  resetSelectDate,
} = selectDate.actions

export default selectDate.reducer
