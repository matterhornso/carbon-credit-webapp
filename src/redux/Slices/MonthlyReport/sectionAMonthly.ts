import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SectionAInterface {
  // A1

  A1: any
}

const initialState: SectionAInterface = {
  // A1

  A1: { total_GHG_emission: '' },
}

const sectionAMonthly = createSlice({
  name: 'sectionAMonthly',
  initialState,
  reducers: {
    // A1 Handlers

    setA1: (state, action: PayloadAction<any>) => {
      const { name, value } = action.payload
      state.A1[name] = value
    },
    resetSectionA: () => initialState,
  },
})

export const { setA1, resetSectionA } = sectionAMonthly.actions

export default sectionAMonthly.reducer
