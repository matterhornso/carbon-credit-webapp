import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface pddDashboardCacheSliceInterface {
  pddDashboardCacheTableData: any
}
const initialState: pddDashboardCacheSliceInterface = {
  pddDashboardCacheTableData: [],
}

const pddDashboardCacheSlice = createSlice({
  name: 'pddDashboardCache',
  initialState,
  reducers: {
    setPddDashboardCacheTableData: (state, action: PayloadAction<any>) => {
      state.pddDashboardCacheTableData = action.payload
    },
  },
})

export const { setPddDashboardCacheTableData } = pddDashboardCacheSlice.actions

export default pddDashboardCacheSlice.reducer
