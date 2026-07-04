import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ReviewMethodologyInterface {
  methodologyReference: any
  methodologyApplicability: any
  deviationFromMethodology: any
  otherMethodologyApplicationInformation: any
}
const initialState: ReviewMethodologyInterface = {
  methodologyReference: {
    blocks: [
      {
        type: 'paragraph',
        data: {
          text: 'Title, version, and reference number of:',
        },
      },
      {
        type: 'paragraph',
        data: {
          text: '- Selected methodology.',
        },
      },
      {
        type: 'paragraph',
        data: {
          text: '- Any other methodologies or methodological tools to which the selected methodology refers to.',
        },
      },
      {
        type: 'paragraph',
        data: {
          text: '- Link to the applicable website to referenced methodologies and methodological tools.',
        },
      },
    ],
  },
  methodologyApplicability: {},
  deviationFromMethodology: {},
  otherMethodologyApplicationInformation: {},
}
const reviewMethodology = createSlice({
  name: 'reviewMethodology',
  initialState,
  reducers: {
    setMethodologyReference: (state, action: PayloadAction<any>) => {
      state.methodologyReference = action.payload
    },
    setmethodologyApplicability: (state, action: PayloadAction<any>) => {
      state.methodologyApplicability = action.payload
    },
    setDeviationFromMethodology: (state, action: PayloadAction<any>) => {
      state.deviationFromMethodology = action.payload
    },
    setOtherMethodologyApplicationInformation: (
      state,
      action: PayloadAction<any>
    ) => {
      state.otherMethodologyApplicationInformation = action.payload
    },
  },
})

export const {
  setMethodologyReference,
  setmethodologyApplicability,
  setDeviationFromMethodology,
  setOtherMethodologyApplicationInformation,
} = reviewMethodology.actions

export default reviewMethodology.reducer
