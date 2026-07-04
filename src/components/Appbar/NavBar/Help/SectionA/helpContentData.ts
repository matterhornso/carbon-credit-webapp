import { pathNames } from '../../../../../routes/pathNames'
import { Images } from '../../../../../theme'

export const IssuanceHelpContentData = {
  projectIntro: {
    title: 'Project Introduction',
    description:
      'The Project developer would provide basic details related to the project like the project name, project type(user can select multiple projects in case the project falls under multiple project categories from the list), location of the project, start and end date of the project (end date if optional in case the project owner is not aware of it), Size of the project in SqKm. ',
    imgSrcEmptyFields: Images.INTROEMPTY,
    imgSrcFields: Images.INTROFILLED,
    footerText: 'Sample of project introduction with details filled out.',
    footerTextWith: 'Sample of project introduction with details filled .',
  },

  A1: {
    title: 'A1: Purpose & General description',
    description:
      'Project developer provides a brief description of the project, measures that the project would take that would help in the reduction or removal of greenhouse gas emissions, technology and types of equipment that they would be using in the facility to help achieve the goals of greenhouse gas reduction. Details of important dates of the project like the construction date of the project, post-construction when did the project start (commissioned) and duration of the project or operational period of the project. Total Co2 reduced so far in case the project has started and Co2 was removed during the monitoring period. ',
    imgSrcEmptyFields: Images.A1EMPTY,
    imgSrcFields: Images.A1FILLED,
    footerText: 'Sample of project description with details filled out.',
    footerTextWith: 'Sample of project description with details filled .',
  },
  A2: {
    title: 'A2: Location',
    description:
      'Project developer provides details of the location of the project. Location details include Country, State, District, Pincode and any distinct landmark around the project location. They can upload images of the project location and google maps for the verifier to easily verify the project location.  ',
    footerText: 'Sample of project location with details filled out.',
    footerTextWith: 'Sample of project location with details filled .',
    imgSrcEmptyFields: Images.A2EMPTY,
    imgSrcFields: Images.A2FILLED,
  },
  A3: {
    title: 'A3: Parties & Project Participants',
    description:
      'User needs to provide information about the owner of the project, private and public owners/ participants that might be supporting the project i.e they could be from another country other than the project location and indicator if the parties wish to be listed as project participants. Users can select from the Yes, No, or Not sure options. ',
    imgSrcEmptyFields: Images.A3EMPTY,
    imgSrcFields: Images.A3FILLED,
    footerText:
      'Sample of project parties and project participants with details filled out.',
    footerTextWith:
      'Sample of project parties and project participants with details filled.',
  },
  A4: {
    title: 'A4: Reference & Applied Methodology',
    description:
      'Based on the project and project types users can select one or more methodologies and provide the details of each methodology, the methodology version and the tools they will use to monitor the project.',
    imgSrcEmptyFields: Images.A4EMPTY,
    imgSrcFields: Images.A4FILLED,

    footerText:
      'Sample of project reference and applied methodology with details filled out.',
    footerTextWith:
      'Sample of project reference and applied methodology with details filled .',
  },
  A5: {
    title: 'A5: Crediting Period',
    description:
      'Project developers provide the details of the crediting period, information like the first crediting date, start date and end date of the crediting period. Users can also elaborate on the crediting period in the detail section. ',
    imgSrcEmptyFields: Images.A5EMPTY,
    imgSrcFields: Images.A5FILLED,
    footerText: 'Sample of project crediting period with details filled out.',
    footerTextWith: 'Sample of project crediting period with details filled .',
  },
  B1: {
    title: 'B1: Description of implemented registered project activity',
    description:
      'User should provide details related to ongoing project activities and events that have previously occurred. All the major details of the project like what activities would be done to run the project, their purpose and their details should be provided. User should be able to all the technical details and data that they might have related to the project and different project activities. Details of the operation of the project should be provided if available. All events like major shut downs, reasons and dates, operational timeline of the project should be provided. A sample of the uploading document has been provided with the questions to the user for their reference. Users can take reference of the samples provided by clicking on check sample data. Sample of registration documents is also provided for the ease of users, users can filter the documents based on the project type.',
    imgSrcEmptyFields: Images.B1EMPTY,
    imgSrcFields: Images.B1FILLED,
    footerText: 'Sample of project crediting period with details filled out.',
    footerTextWith: 'Sample of project crediting period with details filled .',
  },
  B2: {
    title: 'B2: Post registration changes',
    description:
      'Project developer needs to provide details regarding any changes that might happen or have happened post registration on the platform. Details like any temporary and permanent changes that happened in the methodologies that were mentioned previously or any changes that might have happen to the monitoring plan. If any corrections that are done over time or post registration connections that need to be made should be mentioned by the user. Changes to details like project design, crediting period along with the reason of change can be listed here in case applicable. Afforestation and reforestation changes can be specificaly mentioned by the user. ',
    imgSrcEmptyFields: Images.B2EMPTY,
    imgSrcFields: Images.B2FILLED,
    footerText: 'Sample of project crediting period with details filled out.',
    footerTextWith: 'Sample of project crediting period with details filled .',
  },
  C1: {
    title: 'C1: Description of Monitoring Activity',
    description:
      'Project developer should provide with details regarding the monitoring plan, how and the duration of the sampling period as per the monitoring plan. A detailed description of Monitoring Plan needs to be provide along with flow of the plan if possible. Users also need to provide details of the organizational Structure, different responsibilities in the organization and the roles and responsibilities via a Flow chart if possible. They can also provide details on different training that is conducted in the organization for different project activities to keep the employes updated. Any maintenance that were done or a done periodically. The user should also provide any data that was monitoring as per the registered and applicable methodologies of the project.Sample of organizational structure and role and responsibility is provide on the platform for the ease of users, users can click on check sample data to view the sample for reference.',
    imgSrcEmptyFields: Images.C1EMPTY,
    imgSrcFields: Images.C1FILLED,
    footerText: 'Sample of project crediting period with details filled out.',
    footerTextWith: 'Sample of project crediting period with details filled .',
  },
  D1: {
    title: 'D1: Data and parameters at ex-ante',
    description:
      'User should provide the data that they might have collected for different parameters before the registration of the project. Incase the project was initiated before the registration or any observations that were done before the actual monitoring began, the user can provide the data and parameters for those in this section. ',
    imgSrcEmptyFields: Images.D1EMPTY,
    imgSrcFields: Images.D1FILLED,
    footerText: 'Sample of project crediting period with details filled out.',
    footerTextWith: 'Sample of project crediting period with details filled .',
  },
  D2: {
    title: 'D2: Data & parameters monitored',
    description:
      'User should provide the data that they might have collected for different parameters during the monitoring of the project. They can upload different parameters that they might be monitoring as per the project and methodologies applicable to the project. The data observed could be of different types of emissions like baseline emissions that they might have defined, project emission that were observed during the project activities and leakage emissions. Sample of different types are provide on the platform for the ease of users, users can click on check sample data to view the samples for reference. ',
    imgSrcEmptyFields: Images.D2EMPTY,
    imgSrcFields: Images.D2FILLED,
    footerText: 'Sample of project crediting period with details filled out.',
    footerTextWith: 'Sample of project crediting period with details filled .',
  },
  D3: {
    title: 'D3: Implementation of Sampling Plan',
    description:
      'User should provide a detailed description on how the sampling plan was implemented to conclude the data and parameters that they have provided. ',
    imgSrcEmptyFields: Images.D3EMPTY,
    imgSrcFields: Images.D3FILLED,
    footerText: 'Sample of project crediting period with details filled out.',
    footerTextWith: 'Sample of project crediting period with details filled .',
  },
  E1: {
    title: 'E1: Calculation of baseline emissions or net GHG removals',
    description:
      'User needs to brief about the activities that have resulted in emission reduction. They can provide the calculations and formulas used to calculate the baseline emissions. The baseline emissions should also be inline with the project methodologies and versions they have selected and provide data for the same. Sample of baseline emission calculation is provided on the platform for the ease of users, users can click on check sample data to view the samples for reference.',
    imgSrcEmptyFields: Images.E1EMPTY,
    imgSrcFields: Images.E1FILLED,
    footerText: 'Sample of project crediting period with details filled out.',
    footerTextWith: 'Sample of project crediting period with details filled .',
  },
  E2: {
    title: 'E2: Calculation of project emissions or actual net GHG removals',
    description:
      'User needs to brief about the project emissions or actual net GHG removals by sinks. They can provide the calculations and formulas used to calculate the actual project emissions for the given monitoring period in accordance to the methodologies selected by them. Sample of project emission calculation is provided on the platform for the ease of users, users can click on check sample data to view the samples for reference. ',
    imgSrcEmptyFields: Images.E2EMPTY,
    imgSrcFields: Images.E2FILLED,
    footerText: 'Sample of project crediting period with details filled out.',
    footerTextWith: 'Sample of project crediting period with details filled .',
  },
  E3: {
    title: 'E3: Calculation of leakage',
    description:
      'User needs to brief about the possible emissions leakage that could happen. They can provide the reason of the leakage if any along with the calculations and formulas used to calculate the leakage emissions for the given monitoring period in accordance to the methodologies selected by them. Incase of no leakage they can mention the same along with the reason.',
    imgSrcEmptyFields: Images.E3EMPTY,
    imgSrcFields: Images.E3FILLED,
    footerText: 'Sample of project crediting period with details filled out.',
    footerTextWith: 'Sample of project crediting period with details filled .',
  },
  E4: {
    title:
      'E4: Calculation summary of emission reductions or net anthropogenic GHG removals',
    description:
      'User needs to brief about the Emission reductions or net anthropogenic GHG removals by sinks. In general emission reduction is calculated by reducing leakage emissions and project emissions from baseline emissions. Sample of emission reduction calculation is provided on the platform for the ease of users, users can click on check sample data to view the samples for reference.',
    imgSrcEmptyFields: Images.E4EMPTY,
    imgSrcFields: Images.E4FILLED,
    footerText: 'Sample of project crediting period with details filled out.',
    footerTextWith: 'Sample of project crediting period with details filled .',
  },
  E5: {
    title:
      'E5: Comparison of actual emission reductions or net anthropogenic GHG removals',
    description:
      'The user has to compare the values estimated in ex-ante calculation of registered PDD with actual values achieved during the given monitoring period. Sample of the comparison is provided on the platform for the ease of users, users can click on check sample data to view the samples for reference. ',
    imgSrcEmptyFields: Images.E5EMPTY,
    imgSrcFields: Images.E5FILLED,
    footerText: 'Sample of project crediting period with details filled out.',
    footerTextWith: 'Sample of project crediting period with details filled .',
  },
  E6: {
    title: 'E6: Remarks on difference from estimated value',
    description:
      'The user needs to provide their remarks on the difference that might be there from estimated value.  ',
    imgSrcEmptyFields: Images.E6EMPTY,
    imgSrcFields: Images.E6FILLED,
    footerText: 'Sample of project crediting period with details filled out.',
    footerTextWith: 'Sample of project crediting period with details filled .',
  },
  E7: {
    title:
      'E7: Actual emission reductions or net anthropogenic GHG removals during 1st commitment period',
    description:
      'The user should provide details on the amount of actual emission that was reduced or net anthropogenic GHG removed during the 1st commitment period.',
    imgSrcEmptyFields: Images.E7EMPTY,
    imgSrcFields: Images.E7FILLED,
    footerText: 'Sample of project crediting period with details filled out.',
    footerTextWith: 'Sample of project crediting period with details filled .',
  },
}

export const SectionAHelpContentData = [
  IssuanceHelpContentData?.A1,
  IssuanceHelpContentData?.A2,
  IssuanceHelpContentData?.A3,
  IssuanceHelpContentData?.A4,
  IssuanceHelpContentData?.A5,
]

export const SectionBHelpContentData = [
  IssuanceHelpContentData?.B1,
  IssuanceHelpContentData?.B2,
]

export const SectionCHelpContentData = [IssuanceHelpContentData?.C1]
export const SectionDHelpContentData = [
  IssuanceHelpContentData?.D1,
  IssuanceHelpContentData?.D2,
  IssuanceHelpContentData?.D3,
]
export const SectionEHelpContentData = [
  IssuanceHelpContentData?.E1,
  IssuanceHelpContentData?.E2,
  IssuanceHelpContentData?.E3,
  IssuanceHelpContentData?.E4,
  IssuanceHelpContentData?.E5,
  IssuanceHelpContentData?.E6,
  IssuanceHelpContentData?.E7,
]
export const DashboardHelpSectionFAQ = {
  title: 'FAQs',
  sectionDescription:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum aenean amet, hac ultricies enim donec suscipit sed duis. In vulputate pellentesque sed quam tincidunt nec et lectus.',
  questions: [
    // { title: 'How to create/link wallet', value: '' },
    { title: 'How to list a new  project', value: pathNames.HELP_CENTER },
  ],
}

export const HelpContentIssuanceAllData = {
  title: 'How to list a new project',
  description:
    'The project developer needs to provide the details listed out. The Data required to register the project and verify the project has been divided into different steps based on the sections namely Step 1: Project Introduction, Step 2: Section A: Description of Project Activity, Step 3: Section B: Implementation of the Project Activity, Step 3 : Implementation of the Project Activity, Step 4 : Description of Monitoring Activity, Step 5 : Data and Parameters and Step 6 : Section E: Calculation of Emission Reductions or GHG Removals by Sinks. The mandatory data that the user needs to provide are marked with an asterisk next to the field name. The ones without asterisk are non-mandatory fields and can be provided if they have these data fields. Samples data for for all the steps are provided as reference. ',
  steps: [
    {
      title: 'Step 1 : Project Introduction',
      description:
        'The Project developer would provide basic details related to the project like the project name, project type(user can select multiple projects in case the project falls under multiple project categories from the list), location of the project, start and end date of the project (end date if optional in case the project owner is not aware of it), Size of the project in SqKm. ',
      imgSrcEmptyFields: Images.INTROEMPTY,
      imgSrcFields: Images.INTROFILLED,
      footerText: 'Sample of project introduction with details filled out.',
      footerTextWith: 'Sample of project introduction with details filled .',
    },
    {
      title: 'Step 2: Section A: Description of Project Activity',
      description:
        'Project developer provides details related to the project that they wish to register. Details like general details, purpose, location, parties directly or indirectly involved, and methodologies that would be used to calculate the amount of Co2 sequestration. ',
      subSections: SectionAHelpContentData,
    },
    {
      title: 'Step 3: Section B: Implementation of the project activity',
      description:
        'Project developer should provide details regarding the project activity. They are required to mention any previous events, ongoing activities and changes that would occur post registration. ',
      subSections: SectionBHelpContentData,
    },
    {
      title: 'Step 4: Section C:  Description of Monitoring Activity',
      description:
        'Project developer should provide with details regarding the monitoring plan, how and the duration of the sampling period as per the monitoring plan. A detailed description of Monitoring Plan needs to be provide along with flow of the plan if possible. Users also need to provide details of the organizational Structure, different responsibilities in the organization and the roles and responsibilities via a Flow chart if possible. They can also provide details on different training that is conducted in the organization for different project activities to keep the employes updated. Any maintenance that were done or a done periodically. The user should also provide any data that was monitoring as per the registered and applicable methodologies of the project.Sample of organizational structure and role and responsibility is provide on the platform for the ease of users, users can click on check sample data to view the sample for reference',
      imgSrcEmptyFields: Images.C1EMPTY,
      imgSrcFields: Images.C1FILLED,
      footerText: 'Sample of project introduction with details filled out.',
      footerTextWith: 'Sample of project introduction with details filled .',
    },
    {
      title: 'Step 5: Section D: Data and parameters',
      description:
        'Project developer should provide details of the data and different parameters that were monitored before and registration, expected and actual data that was collected of different parameters post registration during the monitoring period. The user  should also elaborate on how the sampling plan was implemented during a given monitoring period. ',
      subSections: SectionDHelpContentData,
    },
    {
      title: 'Step 6: Section E: Implementation of the project activity',
      description:
        'Project developers have to provide information regarding the calculation of emission reductions or GHG removals in detail. They can upload the data they have collected through the selected methodology. In this section they should provide their calculations on baseline emissions, project emissions and procedure of the calculation, leakage calculations, emission reductions, do a comparison of the actual emission reduction and estimated emissions and give their remarks on the difference if any. This section is not mandatory during project registration and users can provide these data during registration if they have. ',
      subSections: SectionEHelpContentData,
    },
  ],
}
