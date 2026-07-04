import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SectionBInterface {
  // B1
  B1: any
  // B2
  B2: any
  // B3
  B3: any
}

const initialState: SectionBInterface = {
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
  B3: {
    project_boundary: '',
    eligibility: '',
    funding: '',
    ownership: '',
    ownership_file_attach: [],
    other_certifications: '',
    participation_under_GHG_programs: '',
    other_benefits: '',
  },
}

const sectionB = createSlice({
  name: 'sectionB',
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
    // B3 Handlers
    setB3: (state, action: PayloadAction<any>) => {
      const { name, value } = action.payload
      state.B3[name] = value
    },
    resetSectionB: () => initialState,
  },
})

export const { setB1, setB2, setB3, resetSectionB } = sectionB.actions

export default sectionB.reducer
