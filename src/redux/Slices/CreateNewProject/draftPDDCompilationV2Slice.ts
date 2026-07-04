import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  AGGREGATED_GHG_EMISSIONS,
  EIGHT_POINT_TWO_POINT_ONE,
  EIGHT_POINT_TWO_POINT_TWO,
  INITIAL_DATA,
  TYPE_SECTORAL_SCOPE,
} from './initialData'
import { sectionNamesAsPerAPIRes } from '../../../config/pdf.config'
interface initialStateInterface {
  project_description: any
  crediting: any
  safeguards: any
  methodology: any
  additionally: any
  baseline_scenario: any
  project_boundary: any
  quantification_GHG_emission_mitigations: any
  management_data_quality: any
  monitoring: any
  trackingChangesOfDraftPDDCompilationData: any[]
  checkSectionsStatus: any
}

const initialState: initialStateInterface = {
  project_description: {
    purpose_objective_general_description: {},
    type_sectoral_scope: TYPE_SECTORAL_SCOPE,
    location: {},
    conditions: {},
    technology_applied: {},
    aggregated_GHG_emissions: AGGREGATED_GHG_EMISSIONS,
    roles_responsibility: {
      data: {
        roles_responsibility_1:
          INITIAL_DATA.draftPDDCompilation.projectProponents,
        roles_responsibility_2:
          INITIAL_DATA.draftPDDCompilation.othersInvolvedInProject,
      },
    },
    chronological_planOrImplementation: {
      data: {
        chronological_planOrImplementation_1: {},
        chronological_planOrImplementation_2: {},
        chronological_planOrImplementation_3: {},
        chronological_planOrImplementation_4: {},
        chronological_planOrImplementation_5: {},
      },
    },
    eligibility: {},
    funding: {},
    ownership: {},
    other_certificate: {},
    participation_other_GHG_programs: {},
    other_benefits: {},
    host_country_attestation: {},
    eligibility_criteria_for_grouped_project: {},
    additional_information: {},
  },
  crediting: {
    expected_operational_lifetimeOrTermination_date: {},
    credit_period: {},
    project_start_date: {},
  },
  safeguards: {
    statutory_requirements: {},
    potential_negative_and_socio_economic_impacts: {},
    consultation_parties_and_communication: {
      data: {
        consultation_parties_and_communication_1: {},
        consultation_parties_and_communication_2:
          INITIAL_DATA.draftPDDCompilation.safeGuardsTable,
      },
    },
    EIA: {},
    risk_assessment: {},
    additional_information_risk_management: {},
  },
  methodology: {
    reference_applied_methodology: {},
    applicability_methodology: {
      data: {
        applicability_methodology_1: {},
        applicability_methodology_2:
          INITIAL_DATA.draftPDDCompilation.applicablityOfCDMmethodology,
        applicability_methodology_3: {},
        applicability_methodology_4:
          INITIAL_DATA.draftPDDCompilation.toolsForEstimationOfChange,
      },
    },
    deviation_methodology: {},
    other_information_relating_methodology_application: {},
  },
  additionally: {
    additionally: {},
    level1_ISO_14064_2GHG_emission: {},
    level2a_statutory: {},
    level2b_non_enforcement: {},
    level3_technology_institutional_common_practice: {},
    level4a_financial_additionally_1: {},
    level4b_financial_additionally_2: {},
    level5_policy_additionality: {},
  },
  baseline_scenario: {},
  project_boundary: {
    data: {
      project_boundary_1: {},
      project_boundary_2: INITIAL_DATA.draftPDDCompilation.sectionSevenTable,
    },
  },
  quantification_GHG_emission_mitigations: {
    criteria_and_procedures_quantification: {
      criteria_and_procedures_quantification: {},
      baseline_emissions: {},
      project_emissions: {},
      leakage: {},
    },
    quantification_net_GHG_emissions: {
      data: {
        quantification_net_GHG_emissions_1: EIGHT_POINT_TWO_POINT_ONE,
        quantification_net_GHG_emissions_2: EIGHT_POINT_TWO_POINT_TWO,
      },
    },
    risk_Assessment_permanence: {},
  },
  management_data_quality: {},
  monitoring: {
    monitoring_plan: {},
    data_and_parameters_remaining_constant: {
      data: INITIAL_DATA.draftPDDCompilation
        .dataAndParametersRemainingConstantTable1,
    },
    data_and_parameters_monitored: {
      data: INITIAL_DATA.draftPDDCompilation.dataAndParametersMonitored,
    },
  },
  trackingChangesOfDraftPDDCompilationData: [
    { sectionIndex: 0, payload: '', changed: false },
    {
      sectionIndex: 1,
      payload: '',
      changed: false,
    },
    {
      sectionIndex: 2,
      payload: '',
      changed: false,
    },
    {
      sectionIndex: 3,
      payload: '',
      changed: false,
    },
    {
      sectionIndex: 4,
      payload: '',
      changed: false,
    },
    {
      sectionIndex: 5,
      payload: '',
      changed: false,
    },
    {
      sectionIndex: 6,
      payload: '',
      changed: false,
    },
    {
      sectionIndex: 7,
      payload: '',
      changed: false,
    },
    {
      sectionIndex: 8,
      payload: '',
      changed: false,
    },
    {
      sectionIndex: 9,
      payload: '',
      changed: false,
    },
  ],
  checkSectionsStatus: sectionNamesAsPerAPIRes,
}

const draftPDDCompilationV2Slice = createSlice({
  name: 'draftPDDCompilationV2',
  initialState,
  reducers: {
    setTrackingChangesOfDraftPDDCompilationData: (
      state,
      action: PayloadAction<any>
    ) => {
      const {
        payload: { sectionIndex, sectionPayload, changed = true },
      } = action
      const trackingChangesOfDraftPDDCompilationDataCopy = [
        ...state.trackingChangesOfDraftPDDCompilationData,
      ]
      const modifiedArr = trackingChangesOfDraftPDDCompilationDataCopy.map(
        (item) =>
          item.sectionIndex === sectionIndex
            ? { ...item, changed: changed, payload: sectionPayload }
            : item
      )
      state.trackingChangesOfDraftPDDCompilationData = modifiedArr
    },
    // resetTrackingChangesofDraftPddCompilationData:(state, action:PayloadAction<any>) => {
    //   state.
    // },
    setProjectDescription: (state, action: PayloadAction<any>) => {
      state.project_description = action.payload
    },
    setCrediting: (state, action: PayloadAction<any>) => {
      state.crediting = action.payload
    },
    setSafeGuards: (state, action: PayloadAction<any>) => {
      state.safeguards = action.payload
    },
    setMethodology: (state, action: PayloadAction<any>) => {
      state.methodology = action.payload
    },
    setAdditionally: (state, action: PayloadAction<any>) => {
      state.additionally = action.payload
    },
    setBaselineScenario: (state, action: PayloadAction<any>) => {
      state.baseline_scenario = action.payload
    },
    setProjectBoundary: (state, action: PayloadAction<any>) => {
      state.project_boundary = action.payload
    },
    setQuantificationGHGEmissionMitigations: (
      state,
      action: PayloadAction<any>
    ) => {
      console.log('setting qghg in reducer', action.payload)
      state.quantification_GHG_emission_mitigations = action.payload
    },
    setManagementDataQuality: (state, action: PayloadAction<any>) => {
      state.management_data_quality = action.payload
    },
    setMonitoring: (state, action: PayloadAction<any>) => {
      state.monitoring = action.payload
    },
    setCheckSectionsStatus: (state, action: PayloadAction<any>) => {
      state.checkSectionsStatus = action.payload
    },
    resetDraftPDDCompilation: () => initialState,
  },
})

export const {
  setProjectDescription,
  setTrackingChangesOfDraftPDDCompilationData,
  setCrediting,
  setSafeGuards,
  setMethodology,
  setAdditionally,
  setBaselineScenario,
  setProjectBoundary,
  setQuantificationGHGEmissionMitigations,
  setManagementDataQuality,
  setMonitoring,
  resetDraftPDDCompilation,
  setCheckSectionsStatus,
} = draftPDDCompilationV2Slice.actions

export default draftPDDCompilationV2Slice.reducer
