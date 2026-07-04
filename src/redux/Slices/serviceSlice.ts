import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface serviceSliceInterface {
  selectedService: string
}

const initialState: serviceSliceInterface = {
  selectedService: 'carbon',
}

const selectedServiceSlice = createSlice({
  name: 'serviceSlice',
  initialState,
  reducers: {
    setSelectedService: (state, action: PayloadAction<any>) => {
      state.selectedService = action.payload
    },
  },
})

export const { setSelectedService } = selectedServiceSlice.actions

export default selectedServiceSlice.reducer
