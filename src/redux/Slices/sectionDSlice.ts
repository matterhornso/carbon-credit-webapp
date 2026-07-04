import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SectionDInterface {
  D1: any
  D2: any
  D3: any
}

const initialState: SectionDInterface = {
  D1: {
    data_and_parameter_fixed_ExAnte: '',
    attach_ex_ante_table: [],
  },
  // D2
  D2: {
    data_and_parameter_monitored_ExPost: '',
    attach_ex_ante_table: [],
  },
  D3: { implementation_of_sampling_plan: '' },
}

const sectionD = createSlice({
  name: 'sectionD',
  initialState,
  reducers: {
    // D1 Handlers
    setD1: (state, action: PayloadAction<any>) => {
      const { name, value } = action.payload
      state.D1[name] = value
    },
    setD2: (state, action: PayloadAction<any>) => {
      const { name, value } = action.payload
      state.D2[name] = value
    },

    // D3 Handlers
    setD3: (state, action: PayloadAction<any>) => {
      const { name, value } = action.payload
      state.D3[name] = value
    },
    resetSectionD: () => initialState,
  },
})

export const { setD1, setD2, setD3, resetSectionD } = sectionD.actions

export default sectionD.reducer
