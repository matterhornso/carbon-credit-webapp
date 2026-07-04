import MethodologyDetermination from './Sections/MethodologyDetermination/MethodologyDetermination'
import MethodologyDeterminationLeftSection from './Sections/MethodologyDetermination/LeftSection'
import ProjectIntroductionRightSection from './Sections/ProjectIntroduction/RightSection'
import MethodologyDeterminationStepOne from './Sections/MethodologyDetermination/StepOne'
import MethodologyDeterminationStepTwo from './Sections/MethodologyDetermination/StepTwo'
import MethodologyDeterminationStepThree from './Sections/MethodologyDetermination/StepThree'
import DraftPDDCompilation from './Sections/DraftPDDCompilation/DraftPDDCompilation'
import DraftPDDCompilationLeftSection from './Sections/DraftPDDCompilation/LeftSection'
import DraftPDDCompilationRightSection from './Sections/DraftPDDCompilation/RightSection'
import ReviewDraftPDD from './Sections/ReviewDraftPDD/ReviewDraftPDD'

const ADMIN_SECTIONS = [
  {
    name: 'Methodology Determination',
    component: MethodologyDetermination,
    leftSection: MethodologyDeterminationLeftSection,
    rightSection: ProjectIntroductionRightSection,
    noOfSteps: 3,
    subSections: [
      {
        component: MethodologyDeterminationStepOne,
        title: 'Methodology Determination',
      },
      {
        component: MethodologyDeterminationStepTwo,
        title: 'What are the goals of your project? ',
      },
      {
        component: MethodologyDeterminationStepThree,
        title: 'Select the activities that apply to your project',
      },
    ],
  },
  {
    name: 'Edit Draft PDD',
    component: DraftPDDCompilation,
    leftSection: DraftPDDCompilationLeftSection,
    rightSection: DraftPDDCompilationRightSection,
  },
  // {
  //     name:'Review Draft PdDD',
  //     component:ReviewDraftPDD,
  //     leftSection:,
  //     rightSection:
  // }
]

export default ADMIN_SECTIONS
