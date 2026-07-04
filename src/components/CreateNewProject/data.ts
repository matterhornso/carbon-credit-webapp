import CompletePDDCompilation from './Sections/CompletePDDCompilation/CompletePDDCompilation'
import DraftPDDCompilation from './Sections/DraftPDDCompilation/DraftPDDCompilation'
import DraftPDDValidation from './Sections/DraftPDDValidation/DraftPDDValidation'
import GenerateDraftPDD from './Sections/GenerateDraftPDD/GenerateDraftPDD'
import MethodologyDetermination from './Sections/MethodologyDetermination/MethodologyDetermination'
// ProjectIntroduction Steps
import ProjectIntroduction from './Sections/ProjectIntroduction/ProjectIntroduction'
import ProjectIntroductionStepFive from './Sections/ProjectIntroduction/StepFive'
import ProjectIntroductionStepFour from './Sections/ProjectIntroduction/StepFour'
import ProjectIntroductionStepOne from './Sections/ProjectIntroduction/StepOne'
import ProjectIntroductionStepSix from './Sections/ProjectIntroduction/StepSix'
import ProjectIntroductionStepSeven from './Sections/ProjectIntroduction/StepSeven'
import ProjectIntroductionStepEight from './Sections/ProjectIntroduction/StepEight'
import ProjectIntroductionStepThree from './Sections/ProjectIntroduction/StepThree'
import ProjectIntroductionStepTwo from './Sections/ProjectIntroduction/StepTwo'
import ProjectIntrodutionStepNine from './Sections/ProjectIntroduction/StepNine'
import ProjectIntroductionStepTen from './Sections/ProjectIntroduction/StepTen'
import ProjectIntroductionLeftSection from './Sections/ProjectIntroduction/LeftSection'
import ProjectIntroductionRightSection from './Sections/ProjectIntroduction/RightSection'
//Methodology Determination Steps
import MethodologyDeterminationStepOne from './Sections/MethodologyDetermination/StepOne'
import MethodologyDeterminationStepThree from './Sections/MethodologyDetermination/StepThree'
import MethodologyDeterminationStepTwo from './Sections/MethodologyDetermination/StepTwo'
import MethodologyDeterminationStepFour from './Sections/MethodologyDetermination/StepFour'
import MethodologyDeterminationStepFive from './Sections/MethodologyDetermination/StepFive'
import MethodologyDeterminationLeftSection from './Sections/MethodologyDetermination/LeftSection'
import MethodologyDeterminationRightSection from './Sections/MethodologyDetermination/RightSection'
// Draft PDD Compilation Steps
import DraftPDDCompilationLeftSection from './Sections/DraftPDDCompilation/LeftSection'
import DraftPDDCompilationRightSection from './Sections/DraftPDDCompilation/RightSection'
import { ROLES } from '../../config/constants.config'
// generate draft pdd
import GenerateDraftPDDLeftSection from './Sections/GenerateDraftPDD/LeftSection'
import GenerateDraftPDDRightSection from './Sections/GenerateDraftPDD/RightSection'
// Draft PDD Validation
import DraftPDDValidationLeftSection from './Sections/DraftPDDValidation/LeftSection'
import DraftPDDValidationRightSection from './Sections/DraftPDDValidation/RightSection'
// Complete PDD Compilation
import CompletePDDCompilationLeftSection from './Sections/CompletePDDCompilation/LeftSection'
import CompletePDDCompilationRightSection from './Sections/CompletePDDCompilation/RightSection'

// dispatch Fn
import {
  setAdditionally,
  setCrediting,
  setMethodology,
  setProjectDescription,
  setSafeGuards,
  setBaselineScenario,
  setProjectBoundary,
  setQuantificationGHGEmissionMitigations,
  setManagementDataQuality,
  setMonitoring,
  resetDraftPDDCompilation,
} from '../../redux/Slices/CreateNewProject/draftPDDCompilationV2Slice'
import {
  resetProjectIntroductionSlice,
  setProjectIntroduction,
} from '../../redux/Slices/CreateNewProject/projectIntroductionV2Slice'
import {
  resetMethodologyDetermination,
  setMethodologyDetermination,
} from '../../redux/Slices/CreateNewProject/methodologyDeterminationSlice'
import PdfActions from './Sections/GenerateDraftPDD/PdfActions'

export const SECTIONS = [
  {
    name: 'Project Introduction',
    component: ProjectIntroduction,
    leftSection: ProjectIntroductionLeftSection,
    rightSection: ProjectIntroductionRightSection,
    // noOfSteps: 10,
    noOfSteps: 8,
    subSections: [
      {
        component: ProjectIntroductionStepOne,
        title: 'Getting Started',
      },
      {
        component: ProjectIntroductionStepTwo,
        title: '1. What is the name of your project?',
      },
      {
        component: ProjectIntroductionStepThree,
        title: '2. Select Sectoral Scope for your project from below options',
      },
      {
        component: ProjectIntroductionStepFour,
        title: '3. What is the scale of the project?',
      },
      {
        component: ProjectIntroductionStepFive,
        title: '4. What is the location of your project?',
      },
      {
        component: ProjectIntroductionStepSix,
        title: '5. What is the project area?',
      },
      {
        component: ProjectIntroductionStepSeven,
        title: '6. What is the project start date?',
      },
      {
        component: ProjectIntroductionStepEight,
        title: '7. What is the project duration?',
      },
      // { component: ProjectIntrodutionStepNine, title: '8. Upload cover image' },
      // {
      //   component: ProjectIntroductionStepTen,
      //   title: '9. What are the SGDs applied to your project?',
      // },
    ],
    roles: [ROLES.ISSUER],
    statusCheck: { [ROLES.ISSUER]: 1000 },
    // tabPermission: [1000],
    // tabPermission: 1000,
    roleBasedTabPermissions: { [ROLES.ISSUER]: 1000, [ROLES.ADMIN]: null },
  },
  // {
  //   name: 'Methodology Determination',
  //   component: MethodologyDetermination,
  //   leftSection: MethodologyDeterminationLeftSection,
  //   // rightSection: MethodologyDeterminationRightSection,
  //   // leftSection: ProjectIntroductionLeftSection,
  //   rightSection: ProjectIntroductionRightSection,
  //   noOfSteps: 3,
  //   subSections: [
  //     {
  //       component: MethodologyDeterminationStepOne,
  //       title: 'Methodology Determination',
  //     },
  //     {
  //       component: MethodologyDeterminationStepTwo,
  //       title: 'What are the goals of your project? ',
  //     },
  //     {
  //       component: MethodologyDeterminationStepThree,
  //       title: 'Select the activities that apply to your project',
  //     },
  //     //{
  //     //  component: MethodologyDeterminationStepFour,
  //     //  title: 'Review Methodology',
  //     //},
  //     //{
  //     //  component: MethodologyDeterminationStepFive,
  //     //  title: 'Review Methodology',
  //     //},
  //   ],
  //   roles: [ROLES.ISSUER, ROLES.ADMIN],
  //   statusCheck: { [ROLES.ISSUER]: 1050, [ROLES.ADMIN]: 1050 },
  //   // tabPermission: [1000],
  //   // tabPermission: 1000,
  //   roleBasedTabPermissions: { [ROLES.ISSUER]: 1000, [ROLES.ADMIN]: 1000 },
  // },
  // {
  //   name: 'Edit Draft PDD',
  //   component: DraftPDDCompilation,
  //   leftSection: DraftPDDCompilationLeftSection,
  //   rightSection: DraftPDDCompilationRightSection,
  //   roles: [ROLES.ADMIN],
  //   statusCheck: { [ROLES.ADMIN]: 1300 },
  //   // tabPermission: [1050],
  //   // tabPermission: 1050,
  //   roleBasedTabPermissions: { [ROLES.ISSUER]: null, [ROLES.ADMIN]: 1200 },
  // },

  // {
  //   name: 'Draft PDD Compilation',
  //   leftSection: DraftPDDCompilationLeftSection,
  //   rightSection: DraftPDDCompilationRightSection,
  //   component: DraftPDDCompilation,
  //   roles: [ROLES.ISSUER],
  //   // statusCheck: 1100,
  //   statusCheck: { [ROLES.ISSUER]: 1100 },
  //   // tabPermission: [1000, 1050, 1060, 1100],
  //   tabPermission: 1000,
  //   roleBasedTabPermissions: { [ROLES.ISSUER]: 1000, [ROLES.ADMIN]: null },
  // },
  // {
  //   name: 'Preview Draft PDD',
  //   leftSection: GenerateDraftPDDLeftSection,
  //   rightSection: GenerateDraftPDDRightSection,
  //   subHeaderComp: PdfActions,
  //   component: GenerateDraftPDD,
  //   roles: [ROLES.ISSUER, ROLES.REGISTRY, ROLES.ADMIN],
  //   statusCheck: { [ROLES.ISSUER]: 1150, [ROLES.ADMIN]: 1400 },
  //   // tabPermission: 1100,
  //   roleBasedTabPermissions: { [ROLES.ISSUER]: 1100, [ROLES.ADMIN]: 1300 },
  // },
  // {
  //   name: 'Draft PDD Validation',
  //   component: DraftPDDValidation,
  //   leftSection: DraftPDDValidationLeftSection,
  //   rightSection: DraftPDDValidationRightSection,
  //   roles: [ROLES.ISSUER],
  //   // tabPermission: 1200,
  //   roleBasedTabPermissions: { [ROLES.ISSUER]: 1200, [ROLES.ADMIN]: null },
  // },
  // {
  //   name: 'Complete PDD Compilation',
  //   component: CompletePDDCompilation,
  //   leftSection: CompletePDDCompilationLeftSection,
  //   rightSection: CompletePDDCompilationRightSection,
  //   roles: [ROLES.ISSUER],
  //   // tabPermission: 1400,
  //   roleBasedTabPermissions: { [ROLES.ISSUER]: null, [ROLES.ADMIN]: null },
  // },
  // {
  //   name: 'Complete PDD verification',
  //   component: null,
  //   leftSection: null,
  //   rightSection: null,
  //   roles: [ROLES.ISSUER],
  //   roleBasedTabPermissions: { [ROLES.ISSUER]: null, [ROLES.ADMIN]: null },
  //   // tabPermission:
  // },
]

export const dispatchData = [
  { sectionName: 'projectIntroduction', dispatchFn: setProjectIntroduction },
  { sectionName: 'methodology', dispatchFn: setMethodologyDetermination },
  {
    sectionName: 'project_description',
    dispatchFn: setProjectDescription,
  },
  {
    sectionName: 'crediting',
    dispatchFn: setCrediting,
  },
  {
    sectionName: 'safeguards',
    dispatchFn: setSafeGuards,
  },
  {
    sectionName: 'baseline_scenario',
    dispatchFn: setBaselineScenario,
  },
  {
    sectionName: 'project_boundary',
    dispatchFn: setProjectBoundary,
  },
  {
    sectionName: 'quantificationGHGEmissionMitigations',
    dispatchFn: setQuantificationGHGEmissionMitigations,
  },
  {
    sectionName: 'management_data_quality',
    dispatchFn: setManagementDataQuality,
  },
  {
    sectionName: 'monitoring',
    dispatchFn: setMonitoring,
  },
  {
    sectionName: 'methodologies',
    dispatchFn: setMethodology,
  },
  {
    sectionName: 'additionally',
    dispatchFn: setAdditionally,
  },
]
