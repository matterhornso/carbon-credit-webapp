import OnePointEight from './SectionOne/OnePointEight'
import OnePointEleven from './SectionOne/OnePointEleven'
import OnePointFifteen from './SectionOne/OnePointFifteen'
import OnePointFive from './SectionOne/OnePointFive'
import OnePointFour from './SectionOne/OnePointFour'
import OnePointFourteen from './SectionOne/OnePointFourteen'
import OnePointNine from './SectionOne/OnePointNine'
import OnePointOne from './SectionOne/OnePointOne'
import OnePointSeven from './SectionOne/OnePointSeven'
import OnePointSeventeen from './SectionOne/OnePointSeventeen'
import OnePointSix from './SectionOne/OnePointSix'
import OnePointSixteen from './SectionOne/OnePointSixteen'
import OnePointTen from './SectionOne/OnePointTen'
import OnePointThirteen from './SectionOne/OnePointThirteen'
import OnePointThree from './SectionOne/OnePointThree'
import OnePointTwelve from './SectionOne/OnePointTwelve'
import OnePointTwo from './SectionOne/OnePointTwo'
// Section Two
import TwoPointOne from './SectionTwo/TwoPointOne'
import TwoPointTwo from './SectionTwo/TwoPointTwo'
import TwoPointThree from './SectionTwo/TwoPointThree'
// Section Three
import ThreePointOne from './SectionThree/ThreePointOne'
import ThreePointTwo from './SectionThree/ThreePointTwo'
import ThreePointThree from './SectionThree/ThreePointThree'
import ThreePointFour from './SectionThree/ThreePointFour'
import ThreePointFive from './SectionThree/ThreePointFive'
import ThreePointSix from './SectionThree/ThreePointSix'
import SectionNine from './SectionNine/SectionNine'

//section 5
import SectionFiveExplain from './SectionFive/SectionFiveExplain'
import SectionFiveLevel1 from './SectionFive/SectionFiveLevel1'
import SectionFiveLevel2a from './SectionFive/SectionFiveLevel2a'
import SectionFiveLevel2b from './SectionFive/SectionFiveLevel2b'
import SectionFiveLevel3 from './SectionFive/SectionFiveLevel3'
import SectionFiveLevel4a from './SectionFive/SectionFiveLevel4a'
import SectionFiveLevel4b from './SectionFive/SectionFiveLevel4b'
import SectionFiveLevel5 from './SectionFive/SectionFiveLevel5'

//section 6
import SectionSix from './SectionSix/SectionSix'

//Section Four
import FourPointOne from './SectionFour/FourPointOne'
import FourPointTwo from './SectionFour/FourPointTwo'
import FourPointThree from './SectionFour/FourPointThree'
import FourPointFour from './SectionFour/FourPointFour'

//Section Eight
import EightPointOne from './SectionEight/EightPointOne'
import EightPointTwo from './SectionEight/EightPointTwo'
import EightPointThree from './SectionEight/EightPointThree'
//Section 10 --Monitoring
import TenPointOne from './SectionTen/TenPointOne'
import TenPointTwo from './SectionTen/TenPointTwo'
import TenPointThree from './SectionTen/TenPointThree'
//section seven
import SectionSeven from './SectionSeven/SectionSeven'
import DraftPDDCompilationIntroPage from './DraftPDDCompilationIntroPage'

export const DraftPDDCompilationMenu = [
  {
    menuName: '1. Project Description',
    // getStartedComp: DraftPDDCompilationIntroPage,
    subMenu: [
      // {
      //   subMenuName: 'Draft PDD Compilation',
      //   component: DraftPDDCompilationIntroPage,
      // },
      {
        subMenuName:
          '1.1 Purpose, Objectives, and General Description of the Project',
        component: OnePointOne,
      },
      {
        subMenuName: '1.2 Project Type and Sectoral Scope',
        component: OnePointTwo,
      },
      { subMenuName: '1.3 Location', component: OnePointThree },
      {
        subMenuName: '1.4 Conditions Prior to Initiation',
        component: OnePointFour,
      },
      {
        subMenuName: '1.5 Technology Applied',
        component: OnePointFive,
      },
      {
        subMenuName: '1.6 Aggregated GHG Emission Mitigations',
        component: OnePointSix,
      },
      {
        subMenuName: '1.7 Roles and Responsibilities',
        component: OnePointSeven,
      },
      {
        subMenuName: '1.8 Chronological Plan/Implementation',
        component: OnePointEight,
      },
      { subMenuName: '1.9 Eligibility', component: OnePointNine },
      { subMenuName: '1.10 Funding', component: OnePointTen },
      { subMenuName: '1.11 Ownership', component: OnePointEleven },
      {
        subMenuName: '1.12 Other Certifications',
        component: OnePointTwelve,
      },
      {
        subMenuName: '1.13 Participation under Other GHG Programs',
        component: OnePointThirteen,
      },
      {
        subMenuName: '1.14 Other Benefits',
        component: OnePointFourteen,
      },
      {
        subMenuName: '1.15 Host Country Attestation',
        component: OnePointFifteen,
      },
      {
        subMenuName: '1.16 Eligibility criteria for Grouped Project',
        component: OnePointSixteen,
      },
      {
        subMenuName: '1.17 Additional Information',
        component: OnePointSeventeen,
      },
    ],
  },
  {
    menuName: '2. Crediting',
    subMenu: [
      {
        subMenuName: '2.1 Project Start Date',
        component: TwoPointOne,
      },
      {
        subMenuName: '2.2 Expected Operational Lifetime or Termination Date',
        component: TwoPointTwo,
      },
      {
        subMenuName: '2.3 Crediting Period',
        component: TwoPointThree,
      },
    ],
  },
  {
    menuName: '3. Safeguards',
    subMenu: [
      {
        subMenuName: '3.1 Statutory Requirements',
        component: ThreePointOne,
      },
      {
        subMenuName:
          '3.2 Potential Negative Environmental and Socio-Economic Impacts',
        component: ThreePointTwo,
      },
      {
        subMenuName:
          '3.3 Consultation with Interested Parties and Communications',
        component: ThreePointThree,
      },
      {
        subMenuName: '3.4 Environmental Impact Assessment (EIA)',
        component: ThreePointFour,
      },
      {
        subMenuName: '3.5 Risk assessment',
        component: ThreePointFive,
      },
      {
        subMenuName: '3.6 Additional Information on Risk Management',
        component: ThreePointSix,
      },
    ],
  },
  {
    menuName: '4. Methodology',
    subMenu: [
      {
        subMenuName: '4.1 Reference to the Applied Methodology',
        component: FourPointOne,
      },
      {
        subMenuName: '4.2 Applicablity Of Methodology',
        component: FourPointTwo,
      },
      {
        subMenuName: '4.3 Deviation from Methodology',
        component: FourPointThree,
      },
      {
        subMenuName:
          '4.4 Other Information Relating to Methodology Application',
        component: FourPointFour,
      },
    ],
  },
  {
    menuName: '5. Additionality',
    subMenu: [
      {
        subMenuName: '5.1 Explain',
        component: SectionFiveExplain,
      },
      {
        subMenuName: '5.2 Level 1 - ISO 14064-2 GHG Emissions Additionality',
        component: SectionFiveLevel1,
      },
      {
        subMenuName: '5.3 Level 2a – Statutory Additionality',
        component: SectionFiveLevel2a,
      },
      {
        subMenuName: '5.4 Level 2b – Non-enforcement additionality',
        component: SectionFiveLevel2b,
      },
      {
        subMenuName:
          '5.5 Level 3 – Technology, Institutional, Common Practice Additionality',
        component: SectionFiveLevel3,
      },
      {
        subMenuName: '5.6 Level 4a – Financial Additionality I',
        component: SectionFiveLevel4a,
      },
      {
        subMenuName: '5.7 Level 4b – Financial Additionality II',
        component: SectionFiveLevel4b,
      },
      {
        subMenuName: '5.8 Level 5 – Policy Additionality',
        component: SectionFiveLevel5,
      },
    ],
  },
  {
    menuName: '6. Baseline Scenario',
    component: SectionSix,
    subMenu: [],
  },
  {
    menuName: '7. Project Boundary',
    component: SectionSeven,
    subMenu: [],
  },
  {
    menuName: '8. Quantification of GHG emission mitigations',
    subMenu: [
      {
        subMenuName: '8.1 Criteria and Procedures for Quantification',
        component: EightPointOne,
      },
      {
        subMenuName: '8.2 Quantification of Net-GHG Emissions and/or Removals',
        component: EightPointTwo,
      },
      {
        subMenuName: '8.3 Risk Assessment for Permanence',
        component: EightPointThree,
      },
    ],
  },
  {
    menuName: '9. Management of data quality',
    component: SectionNine,
    subMenu: [],
  },
  //

  {
    menuName: '10. Monitoring',
    subMenu: [
      {
        subMenuName: '10.1 Monitoring Plan',
        component: TenPointOne,
      },
      {
        subMenuName: '10.2 Data and Parameters Remaining Constant',
        component: TenPointTwo,
      },
      {
        subMenuName: '10.3 Data and Parameters Monitored',
        component: TenPointThree,
      },
    ],
  },
]
