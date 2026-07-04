import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface sectionEMonthlyInterface {
  //E1
  E1: any
  E2: any
  E3: any
  E4: any
  E5: any
  E6: any
  E7: any
}

const initialState: sectionEMonthlyInterface = {
  E1: {
    calculation_of_baselineEmissions_or_net_GHG: '',
    attach_relevant_docs: [],
  },
  E2: {
    calculation_of_projectEmissions_or_net_GHG: '',
    attach_relevant_docs: [],
  },
  E3: {
    calculation_of_leakage: '',
    attach_relevant_docs: [],
  },
  E4: {
    calculation_of_emissions_reduction: '',
    attach_relevant_docs: [],
  },
  E5: {
    comparison_of_actual_emission_reduction: '',
    attach_relevant_docs: [],
  },
  E6: {
    remark_on_difference_from_estimate_value: '',
    attach_relevant_docs: [],
  },
  E7: {
    actual_emission_reductions: '',
    attach_relevant_docs: [],
  },
}

const sectionEMonthly = createSlice({
  name: 'sectionEMonthly',
  initialState,
  reducers: {
    //E1
    setE1: (state, action: PayloadAction<any>) => {
      const { name, value } = action.payload
      state.E1[name] = value
    },
    //E2
    setE2: (state, action: PayloadAction<any>) => {
      const { name, value } = action.payload
      state.E2[name] = value
    },
    //E3
    setE3: (state, action: PayloadAction<any>) => {
      const { name, value } = action.payload
      state.E3[name] = value
    },
    //E4
    setE4: (state, action: PayloadAction<any>) => {
      const { name, value } = action.payload
      state.E4[name] = value
    },
    //E5
    setE5: (state, action: PayloadAction<any>) => {
      const { name, value } = action.payload
      state.E5[name] = value
    },
    //E6
    setE6: (state, action: PayloadAction<any>) => {
      const { name, value } = action.payload
      state.E6[name] = value
    },
    setE7: (state, action: PayloadAction<any>) => {
      const { name, value } = action.payload
      state.E7[name] = value
    },
    resetSectionE: () => initialState,
  },
})

export const {
  setE1,
  setE2,
  setE3,
  setE4,
  setE5,
  setE6,
  setE7,
  resetSectionE,
} = sectionEMonthly.actions

export default sectionEMonthly.reducer
