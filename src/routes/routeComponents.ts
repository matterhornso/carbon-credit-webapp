import loadable from '@loadable/component'
import { ROLES } from '../config/constants.config'
import SelectRegistry from '../pages/SelectRegistry/SelectRegistry'
// import BankDetails from '../pages/BankDetails'
// import BuyerOnboarding from '../pages/BuyerOnboarding'
// import CompleteProfile from '../pages/CompleteProfile/CompleteProfile'
// import HelpCentre from '../pages/HelpCentre/HelpCentre'
// import IssuanceDataCollection from '../pages/IssuanceDataCollection'
// import IssuanceDataCollectionHelp from '../pages/IssuanceDataCollectionHelp/IssuanceDataCollectionHelp'
// import ProjectsPage from '../pages/Issuer/ProjectsPage/ProjectsPage'
// import SelectVerifier from '../pages/Issuer/SelectVerifierPage/SelectVerifier'
// import IssuerWallet from '../pages/IssuerWallet'
// import ListNewProject from '../pages/ListNewProject'
// import LogoutPage from '../pages/LogoutPage'
// import Marketplace from '../pages/Marketplace/Marketplace'
// import MarketplaceHome from '../pages/MarketplaceHome'
// import MarketplaceProjectDetails from '../pages/MarketplaceProjectDetails'
// import MonthlyReportUpdate from '../pages/MonthlyReportUpdate'
// import Onboarding from '../pages/OnboardingOld'
// import OrganisationalDetails from '../pages/OrganisationalDetails'
// import Profile from '../pages/Profile'
// import ProfileDetailsIssuanceInfo from '../pages/ProfileDetailsIssuanceInfo'
// import ProjectDetails from '../pages/ProjectDetails'
// import ProjectDetailsRegistryAcc from '../pages/ProjectDetailsRegistryAcc/ProjectDetailsRegistryAcc'
// import ProjectList from '../pages/ProjectList'
// import ProjectListsWithFilter from '../pages/ProjectListsWithFilter/ProjectListsWithFilter'
// import ProjectPage from '../pages/ProjectPage'
// import RegistryReviewReport from '../pages/RegistryReviewReport/RegistryReviewReport'
// import ReportsViewCommentsPage from '../pages/ReportsViewCommentsPage/ReportsViewCommentsPage'
// import RetireTokens from '../pages/RetireTokens'
// import ReviewAndComment from '../pages/ReviewAndComment/ReviewAndComment'
// import RiskDashboard from '../pages/RiskDashboard'
// import TokenAndContractPage from '../pages/TokenAndContractPage/TokenAndContractPage'
// import TokenRetirementPage from '../pages/TokenRetirementPage/TokenRetirementPage'
// import TransactionHistory from '../pages/TransactionHistory'
// import VerifierDashboard from '../pages/VerifierDashboard'
// import VerifierProfileSetup from '../pages/VerifierProfileSetup'
// import VerifierProjectDetails from '../pages/VerifierProjectDetails'
// import VerifierProjects from '../pages/VerifierProjects'
// import VerifierProjectsList from '../pages/VerifierProjectsList'
// import VerifierVerifyReport from '../pages/VerifierVerifyReport'
// import Wallet from '../pages/Wallet'
import { linkLabels, pathNames } from './pathNames'
import FinalPDF from '../pages/FinalPDF/FinalPDF'
import CarbonCalculator from '../pages/CarbonCalculator/CarbonCalculator'

const BankDetails = loadable(() => import('../pages/BankDetails'))
const BuyerOnboarding = loadable(() => import('../pages/BuyerOnboarding'))
const CompleteProfile = loadable(
  () => import('../pages/CompleteProfile/CompleteProfile')
)
const HelpCentre = loadable(() => import('../pages/HelpCentre/HelpCentre'))
const IssuanceDataCollection = loadable(
  () => import('../pages/IssuanceDataCollection')
)
const IssuanceDataCollectionHelp = loadable(
  () => import('../pages/IssuanceDataCollectionHelp/IssuanceDataCollectionHelp')
)
const ProjectsPage = loadable(
  () => import('../pages/Issuer/ProjectsPage/ProjectsPage')
)
const SelectVerifier = loadable(
  () => import('../pages/Issuer/SelectVerifierPage/SelectVerifier')
)
const IssuerWallet = loadable(() => import('../pages/IssuerWallet'))
const ListNewProject = loadable(() => import('../pages/ListNewProject'))
const LogoutPage = loadable(() => import('../pages/LogoutPage'))
const Marketplace = loadable(() => import('../pages/Marketplace/Marketplace'))
const MarketplaceHome = loadable(() => import('../pages/MarketplaceHome'))
const MarketplaceProjectDetails = loadable(
  () => import('../pages/MarketplaceProjectDetails')
)
const MonthlyReportUpdate = loadable(
  () => import('../pages/MonthlyReportUpdate')
)
const Onboarding = loadable(() => import('../pages/OnboardingOld'))
const OrganisationalDetails = loadable(
  () => import('../pages/OrganisationalDetails')
)
const Profile = loadable(() => import('../pages/Profile'))
const ProfileDetailsIssuanceInfo = loadable(
  () => import('../pages/ProfileDetailsIssuanceInfo')
)
const ProjectDetails = loadable(() => import('../pages/ProjectDetails'))
const ProjectDetailsRegistryAcc = loadable(
  () => import('../pages/ProjectDetailsRegistryAcc/ProjectDetailsRegistryAcc')
)
const ProjectList = loadable(() => import('../pages/ProjectList'))
const ProjectListsWithFilter = loadable(
  () => import('../pages/ProjectListsWithFilter/ProjectListsWithFilter')
)
const RegistryReviewReport = loadable(
  () => import('../pages/RegistryReviewReport/RegistryReviewReport')
)
const ReportsViewCommentsPage = loadable(
  () => import('../pages/ReportsViewCommentsPage/ReportsViewCommentsPage')
)
const RetireTokens = loadable(() => import('../pages/RetireTokens'))
const ReviewAndComment = loadable(
  () => import('../pages/ReviewAndComment/ReviewAndComment')
)
const RiskDashboard = loadable(() => import('../pages/RiskDashboard'))
const TokenAndContractPage = loadable(
  () => import('../pages/TokenAndContractPage/TokenAndContractPage')
)
const TokenRetirementPage = loadable(
  () => import('../pages/TokenRetirementPage/TokenRetirementPage')
)
const TransactionHistory = loadable(() => import('../pages/TransactionHistory'))
const VerifierDashboard = loadable(() => import('../pages/VerifierDashboard'))
const VerifierProfileSetup = loadable(
  () => import('../pages/VerifierProfileSetup')
)
const VerifierProjectDetails = loadable(
  () => import('../pages/VerifierProjectDetails')
)
const VerifierProjects = loadable(() => import('../pages/VerifierProjects'))
const VerifierProjectsList = loadable(
  () => import('../pages/VerifierProjectsList')
)
const VerifierVerifyReport = loadable(
  () => import('../pages/VerifierVerifyReport')
)
const Wallet = loadable(() => import('../pages/Wallet'))

//const PdfPage = loadable(() => import('../pages/PdfPage/PdfPage'))
const AllProjects = loadable(() => import('../pages/AllProjects/AllProjects'))

const OriginationWizard = loadable(
  () => import('../components/Origination/OriginationWizard')
)

export const privateRouteComponents = [
  {
    path: pathNames.DASHBOARD,
    //component: DashboardPage,
    component: ProjectsPage,

    sidebarName: linkLabels.Dashboard,
    roles: [
      ROLES.ISSUER,
      ROLES.VERIFIER,
      ROLES.BUYER,
      ROLES.REGISTRY,
      ROLES.ADMIN,
    ],
  },
  {
    path: pathNames.TOKEN_CONTRACT,
    component: TokenAndContractPage,
    sidebarName: linkLabels.Token_Contract,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.ONBOARDING,
    component: Onboarding,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.ISSUANCE_DATA_COLLECTION,
    component: IssuanceDataCollection,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.ISSUANCE_DATA_COLLECTION_HELP,
    component: IssuanceDataCollectionHelp,
    roles: [ROLES.ISSUER, ROLES.REGISTRY],
  },
  {
    path: pathNames.PROFILE_DETAILS_ISSUANCE_INFO,
    component: ProfileDetailsIssuanceInfo,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.MARKETPLACE_OLD,
    component: MarketplaceHome,
    // sidebarName: linkLabels.Marketplace,
    roles: [ROLES.ISSUER, ROLES.BUYER],
  },
  {
    path: pathNames.MARKETPLACE,
    component: Marketplace,
    // sidebarName: linkLabels.Marketplace,
    roles: [ROLES.ISSUER, ROLES.BUYER],
  },
  {
    path: pathNames.PROJECT_LISTS_WITH_FILTER,
    component: ProjectListsWithFilter,
    sidebarName: linkLabels.Marketplace,
    roles: [ROLES.ISSUER, ROLES.BUYER],
  },
  {
    path: pathNames.MARKETPLACE_PROJECT_DETAILS,
    component: MarketplaceProjectDetails,
    roles: [ROLES.ISSUER],
  },
  // {
  //   path: pathNames.PROJECTS,
  //   component: ProjectsPage,
  //   roles: [ROLES.ISSUER],
  // },
  {
    path: pathNames.PROJECTS_LIST,
    component: ProjectList,
    roles: [ROLES.ISSUER],
  },
  // {
  //   path: pathNames.SEE_ALL_PROJECTS,
  //   component: SeeAllProject,
  //   roles: [ROLES.ISSUER],
  //   sidebarName: linkLabels.Projects,
  // },
  // {
  //   path: pathNames.LIST_NEW_PROJECT,
  //   component: ListNewProject,
  //   roles: [ROLES.ISSUER],
  // },
  // {
  //   path: pathNames.REGISTRY_ALL_PROJECTS,
  //   component: RegistryAllProjects,
  //   roles: [ROLES.REGISTRY],
  //   sidebarName: linkLabels.Projects,
  // },
  {
    path: pathNames.PROFILE_DETAILS_ISSUANCE_INFO,
    component: ProfileDetailsIssuanceInfo,
    roles: [ROLES.ISSUER],
  },

  {
    path: pathNames.LOGOUT,
    component: LogoutPage,
    roles: [
      ROLES.ISSUER,
      ROLES.VERIFIER,
      ROLES.BUYER,
      ROLES.REGISTRY,
      ROLES.ADMIN,
    ],
  },
  {
    path: pathNames.SELECT_VERIFIER,
    component: SelectVerifier,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.VERIFIER_DASHBOARD,
    component: VerifierDashboard,
    roles: [ROLES.VERIFIER],
  },
  {
    path: pathNames.VERIFIER_PROFILE_SETUP,
    component: VerifierProfileSetup,
    roles: [ROLES.VERIFIER],
  },
  {
    path: pathNames.VERIFIER_PROJECTS,
    component: VerifierProjects,
    roles: [ROLES.VERIFIER],
  },
  {
    path: pathNames.VERIFIER_PROJECTS_LIST,
    component: VerifierProjectsList,
    roles: [ROLES.VERIFIER],
  },
  {
    path: pathNames.VERIFIER_PROJECTS_DETAILS,
    component: VerifierProjectDetails,
    roles: [ROLES.VERIFIER],
  },
  {
    path: pathNames.VERIFIER_VERIFY_REPORT,
    component: VerifierVerifyReport,
    roles: [ROLES.VERIFIER],
  },
  {
    path: pathNames.ISSUER_WALLET,
    component: IssuerWallet,

    roles: [ROLES.ISSUER, ROLES.BUYER],
  },
  {
    path: pathNames.TRANSACTION_HISTORY,
    component: TransactionHistory,
    roles: [ROLES.ISSUER, ROLES.BUYER],
  },
  {
    path: pathNames.BANK_DETAILS,
    component: BankDetails,
    roles: [ROLES.ISSUER, ROLES.BUYER],
  },
  {
    path: pathNames.MONTHLY_REPORT_UPDATE,
    component: MonthlyReportUpdate,

    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.REPORT_VIEW_COMMENTS,
    component: ReportsViewCommentsPage,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.BUYER_ONBOARDING,
    component: BuyerOnboarding,
    roles: [ROLES.BUYER],
  },
  {
    path: pathNames.ORGANISATIONAL_DETAILS,
    component: OrganisationalDetails,
    roles: [ROLES.BUYER],
  },
  {
    path: pathNames.RETIRE_TOKENS,
    component: RetireTokens,
    roles: [ROLES.BUYER, ROLES.ISSUER],
  },
  {
    path: pathNames.TOKENS_RETIREMENT,
    sidebarName: linkLabels.TokenRetirement,
    component: TokenRetirementPage,
    roles: [ROLES.ISSUER, ROLES.BUYER],
  },

  {
    path: pathNames.PROFILE,
    component: Profile,
    roles: [ROLES.ISSUER, ROLES.VERIFIER, ROLES.BUYER, ROLES.REGISTRY],
  },
  {
    path: pathNames.HELP_CENTER,
    component: HelpCentre,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.PROJECT_DETAILS,
    component: ProjectDetails,
    roles: [ROLES.ISSUER, ROLES.REGISTRY],
  },
  {
    path: pathNames.PROJECT_DETAILS_REGISTRY_ACC,
    component: ProjectDetailsRegistryAcc,
    roles: [ROLES.REGISTRY, ROLES.VERIFIER],
  },
  {
    path: pathNames.REGISTRY_REVIEW_REPORT,
    component: RegistryReviewReport,
    roles: [ROLES.REGISTRY, ROLES.VERIFIER],
  },
  // commented as see all projects in dashboard is removed
  //{
  //  path: pathNames.PROJECTS,
  //  component: ProjectPage,
  //  roles: [ROLES.REGISTRY, ROLES.ISSUER, ROLES.VERIFIER],
  //  sidebarName: linkLabels.Projects,
  //},
  {
    path: pathNames.COMPLETE_PROFILE,
    component: CompleteProfile,
    roles: [ROLES.ISSUER, ROLES.BUYER, ROLES.VERIFIER, ROLES.REGISTRY],
  },
  {
    path: pathNames.MARKETPLACE_V2,
    component: ProjectListsWithFilter,
    // component: MarketplaceV2,
    roles: [ROLES.ISSUER, ROLES.BUYER, ROLES.VERIFIER, ROLES.REGISTRY],
  },
  {
    path: pathNames.REVIEW_AND_COMMENT,
    component: ReviewAndComment,
    roles: [ROLES.VERIFIER, ROLES.ISSUER],
  },
  {
    path: pathNames.WALLET,
    component: Wallet,
    sidebarName: linkLabels.Wallet,
    roles: [ROLES.ISSUER, ROLES.BUYER, ROLES.VERIFIER, ROLES.REGISTRY],
  },
  {
    path: pathNames.RISK_DASHBOARD,
    component: RiskDashboard,

    roles: [ROLES.ISSUER, ROLES.BUYER, ROLES.VERIFIER, ROLES.REGISTRY],
  },
  //{
  //  path: pathNames.PDF,
  //  //component: DashboardPage,
  //  component: PdfPage,

  //  sidebarName: linkLabels.Dashboard,
  //  roles: [ROLES.ISSUER, ROLES.VERIFIER, ROLES.BUYER, ROLES.REGISTRY],
  //},
  {
    path: pathNames.ALL_PROJECTS,
    component: AllProjects,
    sidebarName: linkLabels.All_Projects,
    roles: [ROLES.ISSUER, ROLES.VERIFIER, ROLES.BUYER, ROLES.REGISTRY],
  },
  {
    path: pathNames.SELECT_REGISTRY,
    component: SelectRegistry,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.ORIGINATION_NEW,
    component: OriginationWizard,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.ORIGINATION,
    component: OriginationWizard,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.FINAL_PDF,
    component: FinalPDF,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.CARBON_CALCULATOR,
    component: CarbonCalculator,
    sidebarName: linkLabels.Calculator,
    roles: [ROLES.ISSUER],
  },
]
