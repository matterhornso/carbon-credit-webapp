import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface initialStateInterface {
  adminChangesUnattendedArr: any
  adminDataChangesObj: any
}

const initialState: initialStateInterface = {
  adminChangesUnattendedArr: [],
  adminDataChangesObj: {},
}

const unattendedChangesSlice = createSlice({
  name: 'unattendedChanges',
  initialState,
  reducers: {
    setAdminChangesUnattended: (state, action: PayloadAction<any>) => {
      state.adminChangesUnattendedArr = action.payload
    },
    setAdminDataChanges: (state, action: PayloadAction<any>) => {
      // console.log('payloadAction', action.payload)
      state.adminDataChangesObj = action.payload
    },
    resetAdminEditChanges: () => initialState,
  },
})

export const {
  setAdminChangesUnattended,
  setAdminDataChanges,
  resetAdminEditChanges,
} = unattendedChangesSlice.actions

export default unattendedChangesSlice.reducer
