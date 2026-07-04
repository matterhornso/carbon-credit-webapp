import { pathNames } from '../routes/pathNames'

export const PROJECT_DRAFT_STATUS_CONSTS = {
  CREATED_PROJECT: 1000,
  METHODOLOGY_QUESTIONS_ANSWERED: 1050,
  ADMIN_UPDATED_METHODOLOGY_QUESTIONS: 1060,
  DRAFT_PDD_COMPILATION_COMPLETED: 1100,
  GENERATE_PDD_DOC: 1150,
  SUMBIT_PROJECT_TO_ADMIN: 1200,
  UNDER_REVIEW_BY_ADMIN: 1250,
  ADMIN_APPROVED: 1300,
  PDD_ACCEPTS_ADMIN_CHANGES: 1350,
  ADMIN_SUBMITS_TO_REGISTRY: 1400,
  UNDER_REVIEW_REGISTRY: 1450,
  REGISTRY_VALIDATED: 1500,
  REGISTRY_REJECTED: 1550,
}

export const SECTORAL_SCOPE = [
  { title: 'Afforestation/Reforestation', name: 'A/R' },
  {
    title: 'Agriculture',
    name: 'Agriculture',
  },
  {
    title: 'Blue Carbon- Wetland marshes, mangroves, seagrass meadows',
    name: 'Blue Carbon',
  },
]

export const ALL_PROJECTS_STATUS = [
  {
    name: 'Under Registration',
    title: 'underRegistration',
    applicableStatuses: [
      1000, 1050, 1060, 1100, 1150, 1250, 1300, 1350, 1400, 1450,
    ],
  },
  {
    name: 'Registration',
    title: 'registration',
    applicableStatuses: [1500],
  },
]

export const PROJECT_STATUS_FILTER = [
  {
    name: 'Draft',
    title: 'draft',
    status: [1000, 1050, 1060, 1100, 1150],
    backgroundColor: '#C9CCC4',
    color: '#434343',
    role: ['ISSUER', 'ADMIN'],
  },
  {
    name: 'Under Validation',
    title: 'underValidation',
    status: [1200, 1250, 1300, 1350],
    backgroundColor: '#D4FFFF',
    color: '#0EABAB',
    role: ['ISSUER', 'ADMIN'],
  },
  {
    name: 'Validated',
    title: 'validated',
    status: [1400],
    backgroundColor: '#C2DFFF',
    color: '#3289E8',
    role: ['ISSUER', 'ADMIN', 'REGISTRY'],
  },
  {
    name: 'Undergoing Registration',
    title: 'undergoingRegistration',
    status: [1450],
    backgroundColor: '#FFECDE',
    color: '#F9954D',
    role: ['ISSUER', 'ADMIN', 'REGISTRY'],
  },
  {
    name: 'Rejected By Admin',
    title: 'rejectedByAdmin',
    status: [1550],
    backgroundColor: '#FCBDBD',
    color: '#E33131',
    role: ['ISSUER', 'ADMIN', 'REGISTRY'],
  },
  {
    name: 'Registered',
    title: 'registered',
    status: [1500],
    backgroundColor: '#DEFFDC',
    color: '#5AB852',
    role: ['ISSUER', 'ADMIN', 'REGISTRY'],
  },
  {
    name: 'Under Verification',
    title: 'underVerification',
    status: [],
    backgroundColor: '#FBF6C8',
    color: '#8B7E09',
    role: ['ISSUER', 'ADMIN', 'REGISTRY'],
  },
  {
    name: 'Verified',
    title: 'verified',
    status: [],
    backgroundColor: '#F7DEFC',
    color: '#D37EE3',
    role: ['ISSUER', 'ADMIN', 'REGISTRY'],
  },
]

// export const DASHBOARD_STATUS: any = {
//   Draft: [1000, 1050, 1060, 1150],
//   'Under Validation': [1200, 1250, 1300, 1350],
//   Validated: [1400],
//   'Undergoing Registration': [],
//   'Rejected By Admin': [],
//   Registered: [],
//   'Under Verification': [],
//   Verified: [],
// }

type DashboardStatus = {
  [key: string]: {
    values: number[]
    backgroundColor: string
    color: string
  }
}
