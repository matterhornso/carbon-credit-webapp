import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface sectionCMonthlyInterface {
  C1: any
}

const initialState: sectionCMonthlyInterface = {
  C1: {
    description: '',
    monitoring_plan: '',
    attach_org_structure_and_responsibilities_chart: [],
    specific_data_monitored: '',
  },
}

const sectionCMonthly = createSlice({
  name: 'sectionCMonthly',
  initialState,
  reducers: {
    // C1 Handlers
    setC1: (state, action: PayloadAction<any>) => {
      const { name, value } = action.payload
      state.C1[name] = value
    },
    resetSectionC: () => initialState,
  },
})

export const { setC1, resetSectionC } = sectionCMonthly.actions

export default sectionCMonthly.reducer
