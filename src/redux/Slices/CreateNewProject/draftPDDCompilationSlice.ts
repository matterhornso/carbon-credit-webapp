import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { INITIAL_DATA } from './initialData'
import { INITIAL_DATA_SECTION_8 } from './initialDataSection8'

interface DraftPDDCompilationInterface {
  menuIndex: number
  subMenuIndex: number | null
  purposeObjectives: any
  projectTypeAndSectoralScope: any
  location: any
  initiationPriorCondition: any
  technologyApplied: any
  aggregatedGHGEmission: any
  // one point eight
  chronologicalPlanOrImplementationStartDate: any
  chronologicalPlanOrImplementationBaselineEmissions:any
  chronologicalPlanOrImplementationTermination:any
  chronologicalPlanOrImplementationFrequency:any
  chronologicalPlanOrImplementationValidation:any
  // one point eight
  eligibility: any
  funding: any
  ownership: any
  otherCertifications: any
  otherGHGProgramsParticipation: any
  otherBenefits: any
  hostCountryAttestation: any
  groupedProjectEligibilityCriteria: any
  additionalInformation: any
  startDate: any
  operationalLifetimeTerminationDate: any
  creditingPeriod: any
  statutoryRequirements: any
  negativeImpacts: any
  consultationAndCommunications: any
  consultationAndCommunicationsTable:any
  environmentalImpactAssessment: any
  riskAssessment: any
  riskManagementAdditionalInformation: any
  dataQualityManagement: any
  additionality: any
  baselineScenario: any
  appliedMethodologyReference:any
  // four point two
  applicablityOfMethodology:any
  applicablityOfCDMmethodologyTable:any
  applicablityOfCDMmethodologyText:any
  toolsForEstimationOfChange:any
  //four point two
  deviationFromMethodology:any
  otherInformationAboutMethodology:any
  criteriaAndProceduresForQuantification:any
  baselineEmissions:any
  projectEmissions:any
  leakage:any
  quantificationOfNetGHGEmissions:any
  riskAssessmentForPermanence:any
  identificationOfGHGSSRs:any
  monitoringPlan: any
  dataAndParameteresRemainingConstant: any
  dataAndParametersMonitored: any
  projectBoundary: any
  // one point seven
  rolesAndResponsiblities:any
  projectProponents:any
  othersInvolvedInProject:any

  //SECTION 7 table
  identificationOfGHGSSRsProjectBoundary:any
}
const initialState: DraftPDDCompilationInterface = {
  menuIndex: 0,
  subMenuIndex: 0,
  purposeObjectives: {},
  projectTypeAndSectoralScope:
    INITIAL_DATA.draftPDDCompilation.projectTypeAndSectoralScope,
  location: {},
  initiationPriorCondition: {},
  technologyApplied: {},
  aggregatedGHGEmission: {},
  // one point eight
  chronologicalPlanOrImplementationStartDate: {},
  chronologicalPlanOrImplementationBaselineEmissions:{},
  chronologicalPlanOrImplementationTermination:{},
  chronologicalPlanOrImplementationFrequency:{},
  chronologicalPlanOrImplementationValidation:{},
  // one point eight
  eligibility: {},
  funding: {},
  ownership: {},
  otherCertifications: {},
  otherGHGProgramsParticipation: {},
  otherBenefits: {},
  hostCountryAttestation: {},
  groupedProjectEligibilityCriteria: {},
  additionalInformation: {},
  startDate: {},
  operationalLifetimeTerminationDate: {},
  creditingPeriod: {},
  statutoryRequirements: {},
  negativeImpacts: {},
  consultationAndCommunications: {},
  consultationAndCommunicationsTable:INITIAL_DATA.draftPDDCompilation.safeGuardsTable,
  environmentalImpactAssessment: {},
  riskAssessment: {},
  riskManagementAdditionalInformation: {},
  dataQualityManagement: {},
  additionality: {},
  baselineScenario: {},
  appliedMethodologyReference:{},
  applicablityOfMethodology:{},
  applicablityOfCDMmethodologyTable:INITIAL_DATA.draftPDDCompilation.applicablityOfCDMmethodology,
  applicablityOfCDMmethodologyText:{},
  toolsForEstimationOfChange:INITIAL_DATA.draftPDDCompilation.toolsForEstimationOfChange,
  deviationFromMethodology:{},
  otherInformationAboutMethodology:{},
  criteriaAndProceduresForQuantification:{},
  baselineEmissions:{},
  projectEmissions:{},
  leakage:{},
  quantificationOfNetGHGEmissions:{},
  riskAssessmentForPermanence:{},
  identificationOfGHGSSRs:INITIAL_DATA.draftPDDCompilation.identificationOfGHG,
  identificationOfGHGSSRsProjectBoundary:INITIAL_DATA.draftPDDCompilation.sectionSevenTable,
  monitoringPlan: {},
  dataAndParameteresRemainingConstant:INITIAL_DATA.draftPDDCompilation.dataAndParametersRemainingConstantTable1,
  dataAndParametersMonitored: INITIAL_DATA.draftPDDCompilation.dataAndParametersMonitored,
  projectBoundary: {},
  // one point seven
  rolesAndResponsiblities:{},
  projectProponents:INITIAL_DATA.draftPDDCompilation.projectProponents,
  othersInvolvedInProject:INITIAL_DATA.draftPDDCompilation.othersInvolvedInProject,
}
const draftPDDCompilation = createSlice({
  name: 'draftPDDCompilation',
  initialState,
  reducers: {
    setMenuIndex: (state, action: PayloadAction<any>) => {
      state.menuIndex = action.payload
    },
    setSubMenuIndex: (state, action: PayloadAction<any>) => {
      state.subMenuIndex = action.payload
    },
    setPurposeObjectives: (state, action: PayloadAction<any>) => {
      state.purposeObjectives = action.payload
    },
    setProjectTypeAndSectoralScope: (state, action: PayloadAction<any>) => {
      state.projectTypeAndSectoralScope = action.payload
    },
    setLocation: (state, action: PayloadAction<any>) => {
      state.location = action.payload
    },
    setInitiationPriorCondition: (state, action: PayloadAction<any>) => {
      state.initiationPriorCondition = action.payload
    },
    setTechnologyApplied: (state, action: PayloadAction<any>) => {
      state.technologyApplied = action.payload
    },
    setAggregatedGHGEmission: (state, action: PayloadAction<any>) => {
      state.aggregatedGHGEmission = action.payload
    },
    // one point eight
    setChronologicalPlanOrImplementationStartDate: (
      state,
      action: PayloadAction<any>
    ) => {
      state.chronologicalPlanOrImplementationStartDate = action.payload
    },

    setChronologicalPlanOrImplementationBaselineEmission:(state,action:PayloadAction<any>)=>{
      state.chronologicalPlanOrImplementationBaselineEmissions=action.payload;
    },
    setChronologicalPlanOrImplementationTermination:(state,action:PayloadAction<any>)=>{
       state.chronologicalPlanOrImplementationTermination=action.payload;
    },
    setChronologicalPlanOrImplementationFrequency:(state,action:PayloadAction<any>)=>{
      state.chronologicalPlanOrImplementationFrequency=action.payload;
    },
    setChronologicalPlanOrImplementationValidation:(state,action:PayloadAction<any>)=>{
       state.chronologicalPlanOrImplementationValidation=action.payload 
    },
    // one point eight
    setEligibility: (state, action: PayloadAction<any>) => {
      state.eligibility = action.payload
    },
    setFunding: (state, action: PayloadAction<any>) => {
      state.funding = action.payload
    },
    setOwnership: (state, action: PayloadAction<any>) => {
      state.ownership = action.payload
    },
    setOtherCertifications: (state, action: PayloadAction<any>) => {
      state.otherCertifications = action.payload
    },
    setOtherGHGProgramsParticipation: (state, action: PayloadAction<any>) => {
      state.otherGHGProgramsParticipation = action.payload
    },
    setOtherBenefits: (state, action: PayloadAction<any>) => {
      state.otherBenefits = action.payload
    },
    setHostCountryAttestation: (state, action: PayloadAction<any>) => {
      state.hostCountryAttestation = action.payload
    },
    setGroupedProjectEligibilityCriteria: (
      state,
      action: PayloadAction<any>
    ) => {
      state.groupedProjectEligibilityCriteria = action.payload
    },
    setAdditionalInformation: (state, action: PayloadAction<any>) => {
      state.additionalInformation = action.payload
    },
    setStartDate: (state, action: PayloadAction<any>) => {
      state.startDate = action.payload
    },
    setOperationalLifetimeTerminationDate: (
      state,
      action: PayloadAction<any>
    ) => {
      state.operationalLifetimeTerminationDate = action.payload
    },
    setCreditingPeriod: (state, action: PayloadAction<any>) => {
      state.creditingPeriod = action.payload
    },
    setStatutoryRequirements: (state, action: PayloadAction<any>) => {
      state.statutoryRequirements = action.payload
    },
    setNegativeImpacts: (state, action: PayloadAction<any>) => {
      state.negativeImpacts = action.payload
    },
    setConsultationAndCommunications: (state, action: PayloadAction<any>) => {
      state.consultationAndCommunications = action.payload
    },
    setEnvironmentalImpactAssessment: (state, action: PayloadAction<any>) => {
      state.environmentalImpactAssessment = action.payload
    },
    setRiskAssessment: (state, action: PayloadAction<any>) => {
      state.riskAssessment = action.payload
    },
    setRiskManagementAdditionalInformation: (
      state,
      action: PayloadAction<any>
    ) => {
      state.riskManagementAdditionalInformation = action.payload
    },
    setAdditionality: (state, action: PayloadAction<any>) => {
      state.additionality = action.payload
    },
    setBaselineScenario: (state, action: PayloadAction<any>) => {
      state.baselineScenario = action.payload
    },
    setProjectBoundary: (state, action: PayloadAction<any>) => {
      state.projectBoundary = action.payload
    },
    setDataQualityManagement: (state, action: PayloadAction<any>) => {
      state.dataQualityManagement = action.payload
    },
    setMethodologyReference:(state,action:PayloadAction<any>)=>{
       state.appliedMethodologyReference=action.payload
    },
    setApplicablityOfMethodology:(state,action:PayloadAction<any>)=>{
       state.applicablityOfMethodology=action.payload
    },
    setDeviationFromMethodology:(state,action:PayloadAction<any>)=>{
      state.deviationFromMethodology=action.payload
    },
    setOtherInformationAboutMethodology:(state,action:PayloadAction<any>)=>{
       state.otherInformationAboutMethodology=action.payload
    },
    //
    setCriteriaAndProcedureForQuantififcation:(state,action:PayloadAction<any>)=>{
       state.criteriaAndProceduresForQuantification=action.payload
    },
    setBaseLineEmissions:(state,action:PayloadAction<any>)=>{
       state.baselineEmissions=action.payload;
    },
    setProjectEmissions:(state,action:PayloadAction<any>)=>{
      state.projectEmissions=action.payload;
    },
    setLeakage:(state,action:PayloadAction<any>)=>{
      state.leakage=action.payload;
    },
    setQuantificationOfNetGHGEmissions:(state,action:PayloadAction<any>)=>{
      state.quantificationOfNetGHGEmissions=action.payload
    },
    setRiskAssessmentForPermanence:(state,action:PayloadAction<any>)=>{
        state.riskAssessmentForPermanence=action.payload
    },
    setIdentificationOfGHGSSR:(state,action:PayloadAction<any>)=>{
      state.identificationOfGHGSSRs=action.payload
    },
    setMonitoringPlan: (state, action: PayloadAction<any>) => {
      state.monitoringPlan = action.payload
    },
    setDataAndParameteresRemainingConstant: (
      state,
      action: PayloadAction<any>
    ) => {
      state.dataAndParameteresRemainingConstant = action.payload
    },
    setDataAndParametersMonitored: (state, action: PayloadAction<any>) => {
      state.monitoringPlan = action.payload
    },
    // one point seven
    setRolesAndResponsiblities:(state,action:PayloadAction<any>)=>{
       state.rolesAndResponsiblities=action.payload;
    },
    setProjectProponents:(state,action:PayloadAction<any>)=>{
       state.projectProponents=action.payload
    },
    setOthersInvolvedInProject:(state,action:PayloadAction<any>)=>{
       state.othersInvolvedInProject=action.payload
    },
    setApplicablityOfCDMMethodologyTable:(state,action:PayloadAction<any>)=>{
       state.applicablityOfCDMmethodologyTable=action.payload
    },
    setApplicablityOfCDMMethodologyText:(state,action:PayloadAction<any>)=>{
        state.applicablityOfCDMmethodologyText=action.payload
    },
    setToolsForEstimationOfChange:(state,action:PayloadAction<any>)=>{
       state.toolsForEstimationOfChange=action.payload;
    },
    setConsultationAndCommunicationsTable:(state,action:PayloadAction<any>)=>{
        state.consultationAndCommunicationsTable=action.payload;
    },
    setSectionSevenTable:(state,action:PayloadAction<any>)=>{
      state.identificationOfGHGSSRsProjectBoundary=action.payload;
    }
  },
})

export const {
  setMenuIndex,
  setSubMenuIndex,
  setPurposeObjectives,
  setProjectTypeAndSectoralScope,
  setLocation,
  setInitiationPriorCondition,
  setTechnologyApplied,
  setAggregatedGHGEmission,
  // one point eight
  setChronologicalPlanOrImplementationStartDate,
  setChronologicalPlanOrImplementationBaselineEmission,
  setChronologicalPlanOrImplementationFrequency,
  setChronologicalPlanOrImplementationTermination,
  setChronologicalPlanOrImplementationValidation,
  // one point eight
  setEligibility,
  setFunding,
  setOwnership,
  setOtherCertifications,
  setOtherGHGProgramsParticipation,
  setOtherBenefits,
  setHostCountryAttestation,
  setGroupedProjectEligibilityCriteria,
  setAdditionalInformation,
  setStartDate,
  setOperationalLifetimeTerminationDate,
  setCreditingPeriod,
  setStatutoryRequirements,
  setNegativeImpacts,
  setConsultationAndCommunications,
  setEnvironmentalImpactAssessment,
  setRiskAssessment,
  setRiskManagementAdditionalInformation,
  setAdditionality,
  setBaselineScenario,
  setDataQualityManagement,
  setMethodologyReference,
  setApplicablityOfMethodology,
  setDeviationFromMethodology,
  setOtherInformationAboutMethodology,
  setCriteriaAndProcedureForQuantififcation,
  setBaseLineEmissions,
  setProjectEmissions,
  setLeakage,
  setQuantificationOfNetGHGEmissions,
  setRiskAssessmentForPermanence,
  setIdentificationOfGHGSSR,
  setMonitoringPlan,
  setDataAndParameteresRemainingConstant,
  setDataAndParametersMonitored,
  setProjectBoundary,
  // one point seven
  setRolesAndResponsiblities,
  setProjectProponents,
  setOthersInvolvedInProject,
  // four point two
  setApplicablityOfCDMMethodologyTable,
  setApplicablityOfCDMMethodologyText,
  setToolsForEstimationOfChange,
  //3.3
  setConsultationAndCommunicationsTable,
  //section 7
  setSectionSevenTable
} = draftPDDCompilation.actions

export default draftPDDCompilation.reducer
