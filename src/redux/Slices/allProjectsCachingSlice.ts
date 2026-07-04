import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface initialStateInterface {
  cachingAllProjects: []
}
const initialState: initialStateInterface = {
  cachingAllProjects: [],
}
const allProjectsCaching = createSlice({
  name: 'allProjectsCaching',
  initialState,
  reducers: {
    setCachingAllProjects: (state, action: PayloadAction<any>) => {
      state.cachingAllProjects = action.payload
    },
  },
})

export const { setCachingAllProjects } = allProjectsCaching.actions
export default allProjectsCaching.reducer
