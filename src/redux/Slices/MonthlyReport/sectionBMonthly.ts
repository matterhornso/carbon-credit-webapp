import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface sectionBMonthlyInterface {
  // B1
  B1: any
  // B2
  B2: any
}

const initialState: sectionBMonthlyInterface = {
  // B1
  B1: {
    general_description: '',
    technical_description: '',
    data_tables_technical_description_attach: [],
    operational_description: '',
    shut_down_details_attach: [],
    implementation_milestones_attach: [],
    project_timeline_attach: [],
  },

  // B2
  B2: {
    temporary_deviation: '',
    corrections: '',
    permanent_changes_from_registered_monitoring_plan: '',
    typeOf_changes_specific: '',
    change_project_design: '',
    change_startDate_creditPeriod: '',
  },
}

const sectionBMonthly = createSlice({
  name: 'sectionBMonthly',
  initialState,
  reducers: {
    // B1 Handlers
    setB1: (state, action: PayloadAction<any>) => {
      const { name, value } = action.payload
      state.B1[name] = value
    },
    // B2 Handlers
    setB2: (state, action: PayloadAction<any>) => {
      const { name, value } = action.payload
      state.B2[name] = value
    },
    resetSectionB: () => initialState,
  },
})

export const { setB1, setB2, resetSectionB } = sectionBMonthly.actions

export default sectionBMonthly.reducer
