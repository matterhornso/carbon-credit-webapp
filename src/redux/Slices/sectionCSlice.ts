import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SectionCInterface {
  C1: any
  C2: any
}

const initialState: SectionCInterface = {
  C1: {
    description: '',
    monitoring_plan: '',
    attach_org_structure_and_responsibilities_chart: [],
    project_proponents_upload: [],
    others_involved_upload: [],
    specific_data_monitored: '',
    training_and_maintenance: '',
    management_of_data_quality: '',
  },
  C2: {
    criteria_and_procedures: '',
    baseline_emissions: '',
    baseline_emissions_upload: [],
    project_emissions: '',
    project_emissions_upload: [],
    leakage: '',
    leakage_upload: [],
    quantification_of_net_GHG_emission: '',
    quantification_of_net_GHG_emission_upload: [],
  },
}

const sectionC = createSlice({
  name: 'sectionC',
  initialState,
  reducers: {
    // C1 Handlers
    setC1: (state, action: PayloadAction<any>) => {
      const { name, value } = action.payload
      state.C1[name] = value
    },
    // C2 Handlers
    setC2: (state, action: PayloadAction<any>) => {
      const { name, value } = action.payload
      state.C2[name] = value
    },
    resetSectionC: () => initialState,
  },
})

export const { setC1, setC2, resetSectionC } = sectionC.actions

export default sectionC.reducer
