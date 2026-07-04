import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface reportsViewCommentsReducerInterface {
  viewCommentsData: any
}

const initialState: reportsViewCommentsReducerInterface = {
  viewCommentsData: {},
}

const reportsViewComments = createSlice({
  name: 'reportsViewComments',
  initialState,
  reducers: {
    setViewCommentsData: (state, action: PayloadAction<any>) => {
      state.viewCommentsData = action.payload
    },
  },
})

export const { setViewCommentsData } = reportsViewComments.actions

export default reportsViewComments.reducer
