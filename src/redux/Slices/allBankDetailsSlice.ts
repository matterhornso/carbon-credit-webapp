import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface allBankDetailsSliceReducerInterface {
  //Will get from create new project call
  allBankDetails: any
}
const initialState: allBankDetailsSliceReducerInterface = {
  //Will get from create new project call
  allBankDetails: {},
}
const allBankDetailsSlice = createSlice({
  name: 'allBankDetailsSlice',
  initialState,
  reducers: {
    setAllBankDetailsList: (state, action: PayloadAction<any>) => {
      state.allBankDetails = action.payload
    },
  },
})

export const { setAllBankDetailsList } = allBankDetailsSlice.actions

export default allBankDetailsSlice.reducer
