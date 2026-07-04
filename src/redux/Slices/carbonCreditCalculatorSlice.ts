import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  AFFORESTATION_PROJECT_TYPE_INPUT_FIELDS,
  OTHER_PROJECT_TYPE_INPUT_FIELDS,
  RECYCLING_PROJECT_TYPE_INPUT_FIELDS,
} from '../../config/carbonCalculator.config'

interface carbonCreditCalculatorInterface {
  selectedProjectType: any
  afforestationInputFields: any
  afforestationPayload: any
  recyclingInputFields: any
  recyclingPayload: any
  PETaInputFields: any
  PETaPayload: any
  PETbgInputFields: any
  PETbgPayload: any
  HDPEInputFields: any
  HDPEPayload: any
  LDPEInputFields: any
  LDPEPayload: any
  PPInputFields: any
  PPPayload: any
  PSInputFields: any
  PSPayload: any
  EPSInputFields: any
  EPSPayload: any
  PURInputFields: any
  PURPayload: any
  PVCInputFields: any
  PVCPayload: any
  EUmixInputFields: any
  EUmixPayload: any
}
const initialState: carbonCreditCalculatorInterface = {
  selectedProjectType: '',
  afforestationInputFields: AFFORESTATION_PROJECT_TYPE_INPUT_FIELDS,
  recyclingInputFields: RECYCLING_PROJECT_TYPE_INPUT_FIELDS,
  afforestationPayload: {
    no_of_years: null,
    trees_per_area: null,
    area: null,
    type: 'bamboo',
  },
  recyclingPayload: {
    no_of_tons_recycled: null,
    type: 'pet',
  },
  PETaInputFields: OTHER_PROJECT_TYPE_INPUT_FIELDS,
  PETaPayload: {
    no_of_kgs: null,
    type: 'peta',
  },
  PETbgInputFields: OTHER_PROJECT_TYPE_INPUT_FIELDS,
  PETbgPayload: {
    no_of_kgs: null,
    type: 'petbg',
  },
  HDPEInputFields: OTHER_PROJECT_TYPE_INPUT_FIELDS,
  HDPEPayload: {
    no_of_kgs: null,
    type: 'hdpe',
  },
  LDPEInputFields: OTHER_PROJECT_TYPE_INPUT_FIELDS,
  LDPEPayload: {
    no_of_kgs: null,
    type: 'ldpe',
  },
  PPInputFields: OTHER_PROJECT_TYPE_INPUT_FIELDS,
  PPPayload: {
    no_of_kgs: null,
    type: 'pp',
  },
  PSInputFields: OTHER_PROJECT_TYPE_INPUT_FIELDS,
  PSPayload: {
    no_of_kgs: null,
    type: 'ps',
  },
  EPSInputFields: OTHER_PROJECT_TYPE_INPUT_FIELDS,
  EPSPayload: {
    no_of_kgs: null,
    type: 'eps',
  },
  PURInputFields: OTHER_PROJECT_TYPE_INPUT_FIELDS,
  PURPayload: {
    no_of_kgs: null,
    type: 'pur',
  },
  PVCInputFields: OTHER_PROJECT_TYPE_INPUT_FIELDS,
  PVCPayload: {
    no_of_kgs: null,
    type: 'pvc',
  },
  EUmixInputFields: OTHER_PROJECT_TYPE_INPUT_FIELDS,
  EUmixPayload: {
    no_of_kgs: null,
    type: 'eumix',
  },
}

const carbonCreditCalculator = createSlice({
  name: 'carbonCreditCalculator',
  initialState,
  reducers: {
    setSelectedProjectType: (state, action: PayloadAction<any>) => {
      state.selectedProjectType = action.payload
    },
    setAfforestationInputFields: (state, action: PayloadAction<any>) => {
      state.afforestationInputFields = action.payload
    },
    setAfforestationPayload: (state, action: PayloadAction<any>) => {
      state.afforestationPayload = action.payload
    },
    setRecyclingInputFields: (state, action: PayloadAction<any>) => {
      state.recyclingInputFields = action.payload
    },
    setRecyclingPayload: (state, action: PayloadAction<any>) => {
      state.recyclingPayload = action.payload
    },
    setPETaInputFields: (state, action: PayloadAction<any>) => {
      state.PETaInputFields = action.payload
    },
    setPETaPayload: (state, action: PayloadAction<any>) => {
      state.PETaPayload = action.payload
    },
    setPETbgInputFields: (state, action: PayloadAction<any>) => {
      state.PETbgInputFields = action.payload
    },
    setPETbgPayload: (state, action: PayloadAction<any>) => {
      state.PETbgPayload = action.payload
    },
    setHDPEInputFields: (state, action: PayloadAction<any>) => {
      state.HDPEInputFields = action.payload
    },
    setHDPEPayload: (state, action: PayloadAction<any>) => {
      state.HDPEPayload = action.payload
    },
    setLDPEInputFields: (state, action: PayloadAction<any>) => {
      state.LDPEInputFields = action.payload
    },
    setLDPEPayload: (state, action: PayloadAction<any>) => {
      state.LDPEPayload = action.payload
    },
    setPPInputFields: (state, action: PayloadAction<any>) => {
      state.PPInputFields = action.payload
    },
    setPPPayload: (state, action: PayloadAction<any>) => {
      state.PPPayload = action.payload
    },
    setPSInputFields: (state, action: PayloadAction<any>) => {
      state.PSInputFields = action.payload
    },
    setPSPayload: (state, action: PayloadAction<any>) => {
      state.PSPayload = action.payload
    },
    setEPSInputFields: (state, action: PayloadAction<any>) => {
      state.EPSInputFields = action.payload
    },
    setEPSPayload: (state, action: PayloadAction<any>) => {
      state.EPSPayload = action.payload
    },
    setPURInputFields: (state, action: PayloadAction<any>) => {
      state.PURInputFields = action.payload
    },
    setPURPayload: (state, action: PayloadAction<any>) => {
      state.PURPayload = action.payload
    },
    setPVCInputFields: (state, action: PayloadAction<any>) => {
      state.PVCInputFields = action.payload
    },
    setPVCPayload: (state, action: PayloadAction<any>) => {
      state.PVCPayload = action.payload
    },
    setEUmixInputFields: (state, action: PayloadAction<any>) => {
      state.EUmixInputFields = action.payload
    },
    setEUmixPayload: (state, action: PayloadAction<any>) => {
      state.EUmixPayload = action.payload
    },
    resetCarbonCreditCalculatorSlice: () => initialState,
  },
})

export const {
  setSelectedProjectType,
  setAfforestationInputFields,
  setAfforestationPayload,
  setRecyclingInputFields,
  setRecyclingPayload,
  setPETaInputFields,
  setPETaPayload,
  setPETbgInputFields,
  setPETbgPayload,
  setHDPEInputFields,
  setHDPEPayload,
  setLDPEInputFields,
  setLDPEPayload,
  setPPInputFields,
  setPPPayload,
  setPSInputFields,
  setPSPayload,
  setEPSInputFields,
  setEPSPayload,
  setPURInputFields,
  setPURPayload,
  setPVCInputFields,
  setPVCPayload,
  setEUmixInputFields,
  setEUmixPayload,
  resetCarbonCreditCalculatorSlice,
} = carbonCreditCalculator.actions

export default carbonCreditCalculator.reducer
