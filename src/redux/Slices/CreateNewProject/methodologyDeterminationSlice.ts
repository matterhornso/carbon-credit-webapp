import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MethodologyDeterminationInterface {
  //goal: string
  //activityQuestions: any
  methodology: any
}
const initialState: MethodologyDeterminationInterface = {
  methodology: {
    goal: '',
    activities: [],
  },
}

const methodologyDetermination = createSlice({
  name: 'methodologyDetermination',
  initialState,
  reducers: {
    setMethodologyDetermination: (state, action: PayloadAction<any>) => {
      state.methodology = action.payload
    },
    resetMethodologyDetermination: () => initialState,
  },
})

export const { setMethodologyDetermination, resetMethodologyDetermination } =
  methodologyDetermination.actions

export default methodologyDetermination.reducer
