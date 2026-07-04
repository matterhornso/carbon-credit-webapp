import pdf_intro_icr_logo from '../assets/Images/logo/pdf_intro_icr_logo.png'
// import pdf_climat_logo from '../assets/Images/logo/pdf_climat_logo.png'
import pdf_climat_logo from '../assets/Images/logo/ClimatIconRevised.png'

export const sectionNamesAsPerAPIRes = {
  project_description: false,
  crediting: false,
  safeguards: false,
  methodology: false,
  additionally: false,
  baseline_scenario: false,
  project_boundary: false,
  //quantificationGHGEmissionMitigations: false,
  management_data_quality: false,
  monitoring: false,
}

export const nestedSubSectionNames: any = {
  roles_responsibility: '1.7 Roles and Responsibilities',
  chronological_planOrImplementation: '1.8 Chronological Plan/Implementation',
  consultation_parties_and_communication:
    '3.3 Consultation with Intrested Parties and Communications',
  applicability_methodology: '4.2 Applicability of Methodology',
  quantificationGHGEmissionMitigations:
    '8. Quantification of GHG emission mitigations',
}

export const pdfSectionNames: any = {
  project_description: '1. Project Description',
  crediting: '2. Crediting',
  safeguards: '3. Safeguards',
  methodology: '4. Methodology',
  additionally: '5. Additionality',
  baseline_scenario: '6. Baseline Scenario',
  project_boundary: '7. Project Boundary',
  // quantification_GHG_emission_mitigations:
  //   '8. Quantification of GHG emission mitigations',
  management_data_quality: '9. Management of data quality',
  monitoring: '10. Monitoring',
}

export const pdfSubSectionNames: any = {
  project_description: {
    purpose_objective_general_description:
      '1.1 Purpose Objective General Description',
    type_sectoral_scope: '1.2 Project Type and Sectoral Scope',
    location: '1.3 Location',
    conditions: '1.4 Conditions Prior to initiation',
    technology_applied: '1.5 Technology Applied',
    aggregated_GHG_emissions: '1.6 Aggregated GHG Emissions Mitigations',
    roles_responsibility: {
      roles_responsibility_1: '1.7.1 Project propnent(s)',
      roles_responsibility_2: '1.7.2 Others Involved in the Project',
    },
    chronological_planOrImplementation: {
      chronological_planOrImplementation_1: '1.8.1 Start Date',
      chronological_planOrImplementation_2: '1.8.2 Baseline',
      chronological_planOrImplementation_3: '1.8.3 Termination of the Project',
      chronological_planOrImplementation_4:
        '1.8.4 Frequency of monitoring, report, crediting period',
      chronological_planOrImplementation_5:
        '1.8.5 Validations & verification activities',
    },
    eligibility: '1.9 Eligiblity',
    funding: '1.10 Funding',
    ownership: '1.11 Qwnership',
    other_certificate: '1.12 Other Certifications',
    participation_other_GHG_programs:
      '1.13 Participation Under other GHG Programs',
    other_benefits: '1.14 other Benefits',
    host_country_attestation: '1.15 Host Country Attestation',
    eligibility_criteria_for_grouped_project:
      '1.16 Eligibility Criteria For Grouped Project',
    additional_information: '1.17 Additional Information',
  },
  crediting: {
    project_start_date: '2.1 Project Start Date',
    expected_operational_lifetimeOrTermination_date:
      '2.2 Expected Operational Lifetime or Termination Date',
    credit_period: '2.3 Crediting Period',
  },
  safeguards: {
    statutory_requirements: '3.1 Statutory Requirements',
    potential_negative_and_socio_economic_impacts:
      '3.2 Potential Negative Environmental and Socio-Economic Impacts',
    consultation_parties_and_communication: {
      consultation_parties_and_communication_1: '',
      consultation_parties_and_communication_2: '',
    },
    EIA: '3.4 Environmental Impacts Assessment(EIA)',
    risk_assessment: '3.5 RIsk Assessment',
    additional_information_risk_management:
      '3.6 Additional Information on Risk Management',
  },
  methodology: {
    reference_applied_methodology: '4.1 Reference to the Applied Methodology',
    applicability_methodology: {
      applicability_methodology_1: '',
      applicability_methodology_2: '',
      applicability_methodology_3: '',
      applicability_methodology_4: '',
    },
    deviation_methodology: '4.3 Deviation from Methodology',
    other_information_relating_methodology_application:
      '4.4 Other Information Relating to Methodology Application',
  },
  additionally: {
    additionally: 'Additionally',
    level1_ISO_14064_2GHG_emission:
      '5.1 Level 1 - ISO 14064-2 GHG Emissions Additionality',
    level2a_statutory: '5.2 Level 2a - Statutory Additionality',
    level2b_non_enforcement: '5.3 Level 2b - Non-enforcement Additionality',
    level3_technology_institutional_common_practice:
      '5.4 Techonology, Institutional, Common Practice Additionality',
    level4a_financial_additionally_1:
      '5.5 Level 4a - Financial Additionality I',
    level4b_financial_additionally_2:
      '5.6 Level 4b - Financial Additionality II',
    level5_policy_additionality: '5.7 Level 5 - Policy Additionality',
  },
  baseline_scenario: {},
  project_boundary: {
    project_boundary_1: '7.1 Project Boundary',
    project_boundary_2: '7.2 Project Boundary',
  },
  quantification_GHG_emission_mitigations: {
    criteria_and_procedures_quantification: {
      criteria_and_procedures_quantification:
        '8.1 Criteria and Procedures for Quantification',
      baseline_emissions: '8.1.1 Baseline emissions',
      project_emissions: '8.1.2 Project emissions',
      leakage: '8.1.3 Leakage',
    },
    quantification_net_GHG_emissions: {
      quantification_net_GHG_emissions_1:
        '8.2 Quantification of Net-GHG Emissions and/or Removals',
      quantification_net_GHG_emissions_2: '',
    },
    risk_Assessment_permanence: '8.3 Risk Assessment  for Performance',
  },
  management_data_quality: {},
  monitoring: {
    monitoring_plan: '10.1 Monitoring plan',
    data_and_parameters_remaining_constant:
      '10.2 Data and Parameters Remaining Constant',
    data_and_parameters_monitored: '10.3 Data and Parameters Montiroed',
  },
}

export const TOCCONSTANTS = [
  {
    name: '1. Project Description',
    list: [
      '1.1 Purpose, Objectives, and General Description of the Project',
      '1.2 Project Type and Sectoral Scope',
      '1.3 Location',
      '1.4 Conditions Prior to Initiation',
      '1.5 Technology Applied',
      '1.6 Aggregated GHG Emission Mitigations',
      '1.7 Roles and Responsibilities',
      '1.7.1 Project Proponent(s)',
      '1.7.2 Others Involved in the Project',
      '1.8 Chronological Plan/Implementation',
      '1.9 Eligibility',
      '1.10 Funding',
      '1.11 Ownership',
      '1.12 Other Certifications',
      '1.13 Participation under Other GHG Programs',
      '1.14 Other Benefits',
      '1.15 Host Country Attestation',
      '1.16 Eligibility criteria for Grouped Project',
      '1.17 Additional Information',
    ],
  },
  {
    name: '2.Crediting',
    list: [
      '2.1 Project Start Date',
      '2.2 Expected Operational Lifetime or Termination Date',
      '2.3 Crediting Period',
    ],
  },
  {
    name: '3. Safeguards',
    list: [
      '3.1 Statutory Requirements',
      '3.2 Potential Negative Environmental and Socio-Economic Impacts',
      '3.3 Consultation with Interested Parties and Communications',
      '3.4 Environmental Impact Assessment (EIA)',
      '3.5 Risk assessment',
      '3.6 Additional Information on Risk Management',
    ],
  },
  {
    name: '4. Methodology',
    list: [
      '4.1 Reference to the Applied Methodology',
      '4.2 Applicability of Methodology',
      '4.3 Deviation from Methodology',
      '4.4 Other Information Relating to Methodology Application',
    ],
  },
  {
    name: '5. Additionality',
    list: [
      '5.1 Level 1 - ISO 14064-2 GHG Emissions Additionality',
      '5.2 Level 2a – Statutory Additionality',
      '5.2 Level 2a – Statutory Additionality',
      '5.4 Level 3 – Technology, Institutional, Common Practice Additionality',
      '5.4 Level 3 – Technology, Institutional, Common Practice Additionality',
      '5.6 Level 4b – Financial Additionality II',
      '5.6 Level 4b – Financial Additionality II',
    ],
  },
  { name: '6. Baseline Scenario', list: [] },
  { name: '7. Project Boundary', list: [] },
  {
    name: '8. Quantification of GHG emission mitigations',
    list: [
      '8.1 Criteria and Procedures for Quantification',
      '8.1.1 Baseline emissions',
      '8.1.1 Baseline emissions',
      '8.1.3 Leakage',
      '8.2 Quantification of Net-GHG Emissions and/or Removals',
      '8.3 Risk Assessment for Permanence',
    ],
  },
  { name: '9. Management of data quality', list: [] },
  {
    name: '10. Monitoring',
    list: [
      'Monitoring',
      '10.2 Data and Parameters Remaining Constant',
      '10.3 Data and Parameters Monitored',
    ],
  },
]

export const PROJECT_DESIGNING_DESCRIPTION_DATA = (data: any) => {
  return [
    {
      leftText: 'ID of project',
      rightText: data?.uuid || '-',
    },
    {
      leftText: 'Project name',
      rightText: data?.name || '-',
    },
    {
      leftText: 'Project proponent',
      rightText: data?.projectProponent || '-',
    },
    {
      leftText: 'Representative',
      rightText: data?.representative || 'Name, title, email, tel.',
    },
    {
      leftText: 'First date of submission',
      rightText: data?.dateofSubmission || 'Date',
    },
    {
      leftText: 'Date of validation',
      rightText: data?.dateOfValidation || 'Date',
    },
    {
      leftText: 'Date of version',
      rightText: data?.dateOfVersion || 'Date',
    },
    {
      leftText: 'Host country(ies)',
      rightText: data?.hostCountry || '-',
    },
    {
      leftText: 'Sectoral scope of project activity',
      rightText: data?.sectoralScope || '-',
    },
    {
      leftText: 'Grouped project',
      rightText: data?.groupedProject || '-',
    },
    {
      leftText: 'Other requirements applied',
      rightText: data?.otherRequirements || '-',
    },
    {
      leftText: 'Methodology(ies) applied and version number',
      rightText: data?.methodologyAndVersion || '-',
    },
    {
      leftText: 'Type (CDR, avoidance, hybrid)',
      rightText: data?.type || '-',
    },
    {
      leftText: 'MRV cycle:',
      rightText: data?.mrvCycle || '-',
    },
    {
      leftText: 'Other certifications:',
      rightText: data?.otherCerts || '-',
    },
    {
      leftText: 'Estimated annual average GHG emission mitigation (t CO2-e)',
      rightText: data?.annualAvgGHGEmission || '-',
    },
  ]
}

export const GENERATE_PDF_INTRO_DATA = (
  name: string,
  methodologyReference: string,
  description: string,
  logo: string,
  projectProponent: string
) => {
  return [
    {
      type: 'image',
      content: pdf_climat_logo,
      styles: {
        fit: [100, 150],
        alignment: 'center',
        margin: [0, 2, 0, 10],
      },
    },
    {
      type: 'image',
      content: pdf_intro_icr_logo,
      styles: {
        //fit: [750, 100],
        width: 490,
        height: 118,
        alignment: 'center',
        margin: [0, 50, 0, 70],
      },
    },
    {
      type: 'text',
      content: name || '-',
      styles: {
        alignment: 'right',
        fontSize: 28,
        fontWeight: 400,
        color: '#0D0E0E',
        margin: [0, 0, 0, 10],
      },
    },
    {
      type: 'text',
      content: methodologyReference || 'Methodology reference (if applicable)',
      styles: {
        alignment: 'right',
        fontSize: 14,
        fontWeight: 500,
        color: '#6E7976',
      },
    },
    {
      type: 'text',
      content: 'Abstract',
      styles: {
        alignment: 'right',
        fontSize: 14,
        fontWeight: 500,
        color: '#0D0E0E',
        margin: [0, 45, 0, 5],
      },
    },
    {
      type: 'text',
      content:
        description ||
        'Provide a brief description of the project no longer than 500 letters.',
      styles: {
        alignment: 'left',
        fontSize: 12,
        fontWeight: 400,
        color: '#6E7976',
        margin: [0, 0, 0, 90],
      },
    },
    {
      type: 'image',
      content: logo || pdf_intro_icr_logo,
      styles: {
        fit: [100, 150],
        alignment: 'right',
        margin: [0, 8],
      },
    },
    {
      type: 'text',
      content: projectProponent || '-',
      styles: { alignment: 'right', fontSize: 14, fontWeight: 500 },
    },
  ]
}
