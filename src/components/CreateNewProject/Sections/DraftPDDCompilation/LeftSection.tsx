import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import {
  setMenuIndex,
  setSubMenuIndex,
} from '../../../../redux/Slices/CreateNewProject/draftPDDCompilationSlice'
// for showing the red dots of unread changes.
import {
  DRAFT_PDD_MONITORING,
  DRAFT_PDD_PROJECT_ADDITIONALLY,
  DRAFT_PDD_PROJECT_BASELINESCENARIO,
  DRAFT_PDD_PROJECT_CREDITING,
  DRAFT_PDD_PROJECT_DESCRIPTION,
  DRAFT_PDD_PROJECT_METHODOLOGY,
  DRAFT_PDD_PROJECT_PROJECT_BOUNDARY,
  DRAFT_PDD_PROJECT_QUANTIFICATION_GHG_EMISSION_MITIGATIONS,
  DRAFT_PDD_PROJECT_SAFEGUARDS,
  DRAFT_PPD_MANAGEMENT_DATA_QUALITY,
} from '../../../../config/constants.config'
import { useCountChanges } from '../../../../hooks/useCountChanges'
// css for red dot
import './countContainer.css'
import DraftPDDCompilationIntroPage from './DraftPDDCompilationIntroPage'

const LeftSection = () => {
  const dispatch = useAppDispatch()

  const showFourthSectionOnly = false

  const [showSubMenu, setShowSubMenu] = useState<boolean>(true)
  // get total count for a section , and subsection of admin updtes .
  const { getTotalCount } = useCountChanges()
  // draft pdd list
  let data = [
    {
      menuName: '1. Project Description',
      // getStartComp:DraftPDDCompilationIntroPage,
      totalCount: getTotalCount(DRAFT_PDD_PROJECT_DESCRIPTION),
      subMenu: [
        {
          subMenuName:
            '1.1 Purpose, Objectives, and General Description of the Project',
          count: getTotalCount(['purpose_objective_general_description']),
          // component: OnePointOne,
        },
        {
          subMenuName: '1.2 Project Type and Sectoral Scope',
          count: getTotalCount(['type_sectoral_scope']),
          // component: OnePointTwo,
        },
        {
          subMenuName: '1.3 Location',
          count: getTotalCount(['location']),
          // component: OnePointThree,
        },
        {
          subMenuName: '1.4 Conditions Prior to Initiation',
          count: getTotalCount(['conditions']),
          // component: OnePointFour,
        },
        {
          subMenuName: '1.5 Technology Applied',
          count: getTotalCount(['technology_applied']),
          // component: OnePointFive,
        },
        {
          subMenuName: '1.6 Aggregated GHG Emission Mitigations',
          count: getTotalCount(['aggregated_GHG_emissions']),
          // component: OnePointSix,
        },
        {
          subMenuName: '1.7 Roles and Responsibilities',
          count: getTotalCount(['roles_responsibility']),
          // component: OnePointSeven,
        },
        {
          subMenuName: '1.8 Chronological Plan/Implementation',
          count: getTotalCount(['chronological_planOrImplementation']),
          // component: OnePointEight,
        },
        {
          subMenuName: '1.9 Eligibility',
          count: getTotalCount(['eligibility']),
          // component: OnePointNine,
        },
        {
          subMenuName: '1.10 Funding',
          count: getTotalCount(['funding']),
          // component: OnePointTen,
        },
        {
          subMenuName: '1.11 Ownership',
          count: getTotalCount(['ownership']),
          // component: OnePointEleven,
        },
        {
          subMenuName: '1.12 Other Certifications',
          count: getTotalCount(['other_certificate']),
          // component: OnePointTwelve,
        },
        {
          subMenuName: '1.13 Participation under Other GHG Programs',
          count: getTotalCount(['participation_other_GHG_programs']),
          // component: OnePointThirteen,
        },
        {
          subMenuName: '1.14 Other Benefits',
          count: getTotalCount(['other_benefits']),
          // component: OnePointFourteen,
        },
        {
          subMenuName: '1.15 Host Country Attestation',
          count: getTotalCount(['host_country_attestation']),
          // component: OnePointFifteen,
        },
        {
          subMenuName: '1.16 Eligibility criteria for Grouped Project',
          count: getTotalCount(['eligibility_criteria_for_grouped_project']),
          // component: OnePointSixteen,
        },
        {
          subMenuName: '1.17 Additional Information',
          count: getTotalCount(['additional_information']),
          // component: OnePointSeventeen,
        },
      ],
    },
    {
      menuName: '2. Crediting',
      totalCount: getTotalCount(DRAFT_PDD_PROJECT_CREDITING),
      subMenu: [
        {
          subMenuName: '2.1 Project Start Date',
          count: getTotalCount(['project_start_date']),
          // component: TwoPointOne,
        },
        {
          subMenuName: '2.2 Expected Operational Lifetime or Termination Date',
          count: getTotalCount([
            'expected_operational_lifetimeOrTermination_date',
          ]),
          // component: TwoPointTwo,
        },
        {
          subMenuName: '2.3 Crediting Period',
          count: getTotalCount(['credit_period']),
          // component: TwoPointThree,
        },
      ],
    },
    {
      menuName: '3. Safeguards',
      totalCount: getTotalCount(DRAFT_PDD_PROJECT_SAFEGUARDS),
      subMenu: [
        {
          subMenuName: '3.1 Statutory Requirements',
          count: getTotalCount(['statutory_requirements']),
          // component: ThreePointOne,
        },
        {
          subMenuName:
            '3.2 Potential Negative Environmental and Socio-Economic Impacts',
          count: getTotalCount([
            'potential_negative_and_socio_economic_impacts',
          ]),
          // component: ThreePointTwo,
        },
        {
          subMenuName:
            '3.3 Consultation with Interested Parties and Communications',
          count: getTotalCount(['consultation_parties_and_communication']),
          // component: ThreePointThree,
        },
        {
          subMenuName: '3.4 Environmental Impact Assessment (EIA)',
          count: getTotalCount(['EIA']),
          // component: ThreePointFour,
        },
        {
          subMenuName: '3.5 Risk assessment',
          count: getTotalCount(['risk_assessment']),
          // component: ThreePointFive,
        },
        {
          subMenuName: '3.6 Additional Information on Risk Management',
          count: getTotalCount(['additional_information_risk_management']),
          // component: ThreePointSix,
        },
      ],
    },
    {
      menuName: '4. Methodology',
      totalCount: getTotalCount(DRAFT_PDD_PROJECT_METHODOLOGY),
      subMenu: [
        {
          subMenuName: '4.1 Reference to the Applied Methodology',
          count: getTotalCount(['reference_applied_methodology']),
          // component: FourPointOne,
        },
        {
          subMenuName: '4.2 Applicablity Of Methodology',
          count: getTotalCount(['applicability_methodology']),
          // component: FourPointTwo,
        },
        {
          subMenuName: '4.3 Deviation from Methodology',
          count: getTotalCount(['deviation_methodology']),
          // component: FourPointThree,
        },
        {
          subMenuName:
            '4.4 Other Information Relating to Methodology Application',
          count: getTotalCount([
            'other_information_relating_methodology_application',
          ]),
          // component: FourPointFour,
        },
      ],
    },
    {
      menuName: '5. Additionality',
      totalCount: getTotalCount(DRAFT_PDD_PROJECT_ADDITIONALLY),
      subMenu: [
        {
          subMenuName: '5.1 Explain',
          count: getTotalCount(['additionally']),
          // component: SectionFiveExplain,
        },
        {
          subMenuName: '5.2 Level 1 - ISO 14064-2 GHG Emissions Additionality',
          count: getTotalCount(['level1_ISO_14064_2GHG_emission']),
          // component: SectionFiveLevel1,
        },
        {
          subMenuName: '5.3 Level 2a – Statutory Additionality',
          count: getTotalCount(['level2a_statutory']),
          // component: SectionFiveLevel2a,
        },
        {
          subMenuName: '5.4 Level 2b – Non-enforcement additionality',
          count: getTotalCount(['level2b_non_enforcement']),
          // component: SectionFiveLevel2b,
        },
        {
          subMenuName:
            '5.5 Level 3 – Technology, Institutional, Common Practice Additionality',
          count: getTotalCount([
            'level3_technology_institutional_common_practice',
          ]),
          // component: SectionFiveLevel3,
        },
        {
          subMenuName: '5.6 Level 4a – Financial Additionality I',
          count: getTotalCount(['level4a_financial_additionally_1']),
          // component: SectionFiveLevel4a,
        },
        {
          subMenuName: '5.7 Level 4b – Financial Additionality II',
          count: getTotalCount(['level4b_financial_additionally_2']),
          // component: SectionFiveLevel4b,
        },
        {
          subMenuName: '5.8 Level 5 – Policy Additionality',
          count: getTotalCount(['level5_policy_additionality']),
          // component: SectionFiveLevel5,
        },
      ],
    },
    {
      menuName: '6. Baseline Scenario',
      // component: SectionSix,
      totalCount: getTotalCount(DRAFT_PDD_PROJECT_BASELINESCENARIO),
      subMenu: [],
    },
    {
      menuName: '7. Project Boundary',
      // component: SectionSeven,
      totalCount: getTotalCount(DRAFT_PDD_PROJECT_PROJECT_BOUNDARY),
      subMenu: [],
    },
    {
      menuName: '8. Quantification of GHG emission mitigations',
      totalCount: getTotalCount(
        DRAFT_PDD_PROJECT_QUANTIFICATION_GHG_EMISSION_MITIGATIONS
      ),
      subMenu: [
        {
          subMenuName: '8.1 Criteria and Procedures for Quantification',
          count: getTotalCount(['criteria_and_procedures_quantification']),
          // component: EightPointOne,
        },
        {
          subMenuName:
            '8.2 Quantification of Net-GHG Emissions and/or Removals',
          count: getTotalCount(['quantification_net_GHG_emissions']),
          // component: EightPointTwo,
        },
        {
          subMenuName: '8.3 Risk Assessment for Permanence',
          count: getTotalCount(['risk_Assessment_permanence']),
          // component: EightPointThree,
        },
      ],
    },
    {
      menuName: '9. Management of data quality',
      totalCount: getTotalCount(DRAFT_PPD_MANAGEMENT_DATA_QUALITY),
      // component: SectionNine,
      subMenu: [],
    },
    //

    {
      menuName: '10. Monitoring',
      totalCount: getTotalCount(DRAFT_PDD_MONITORING),
      subMenu: [
        {
          subMenuName: '10.1 Monitoring Plan',
          count: getTotalCount(['monitoring_plan']),
          // component: TenPointOne,
        },
        {
          subMenuName: '10.2 Data and Parameters Remaining Constant',
          count: getTotalCount(['data_and_parameters_remaining_constant']),
          // component: TenPointTwo,
        },
        {
          subMenuName: '10.3 Data and Parameters Monitored',
          count: getTotalCount(['data_and_parameters_monitored']),
          // component: TenPointThree,
        },
      ],
    },
  ]

  data = showFourthSectionOnly
    ? data.filter(
        (section: any, index: number) => section.menuName === '4. Methodology'
      )
    : data

  const [menuData, setMenuData] = useState<any>(data)
  const unattendedAdminChangesArr = useAppSelector(
    ({ unattendedAdminChanges }) =>
      unattendedAdminChanges?.adminChangesUnattendedArr,
    shallowEqual
  )

  const menuIndex: any = useAppSelector(
    ({ draftPDDCompilation }) => draftPDDCompilation?.menuIndex,
    shallowEqual
  )

  const subMenuIndex: any = useAppSelector(
    ({ draftPDDCompilation }) => draftPDDCompilation?.subMenuIndex,
    shallowEqual
  )

  useEffect(() => {
    dispatch(setSubMenuIndex(0))
  }, [menuIndex])

  useEffect(() => {
    setShowSubMenu(true)
  }, [menuIndex, subMenuIndex])

  useEffect(() => {
    // if (unattendedAdminChangesArr.length) {
    setMenuData(data)
    // console.log('ARRAY', unattendedAdminChangesArr)
    // }
  }, [unattendedAdminChangesArr])

  return (
    <Box
      className="hide-scrollbar"
      sx={{
        p: 2,
        background: '#E6F5F7',
        height: !showFourthSectionOnly ? '100%' : null,
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
        borderRadius: '16px 0 0 16px',
        overflowY: 'hidden',
      }}
    >
      <Box
        className="hide-scrollbar"
        sx={{
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
          overflowY: 'scroll',
        }}
      >
        {menuData.map((section: any, index: number) => (
          <Box
            key={index}
            sx={{
              background: index === menuIndex ? '#BEF7FE' : '#E6F5F7',
              borderRadius: '2px',
              cursor: 'pointer',
            }}
            onClick={() => {
              dispatch(setMenuIndex(index))
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onClick={() => {
                // if (index === menuIndex) setShowSubMenu(false)
                // else setShowSubMenu(true)
                if (index === menuIndex)
                  setShowSubMenu((showSubMenu) => !showSubMenu)
              }}
            >
              <Box
                sx={{
                  py: 1,
                  px: 3,
                  fontSize: '14px',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                }}
              >
                {section?.menuName?.length > 29
                  ? section?.menuName?.slice(0, 24) + '...'
                  : section?.menuName}
                {section?.totalCount > 0 ? (
                  <Box>
                    <div
                      className={`unread-count ${
                        section?.totalCount === 0 ? 'fade-out' : ''
                      }`}
                    >
                      <span
                        style={{
                          margin: '0px 8px 0px 8px',
                        }}
                      >
                        {section?.totalCount}
                      </span>
                    </div>
                  </Box>
                ) : null}
              </Box>

              {section?.subMenu?.length ? (
                <Box>
                  {showSubMenu && index === menuIndex ? (
                    <ArrowDropUpIcon sx={{ color: '#029FB3' }} />
                  ) : (
                    <ArrowDropDownIcon sx={{ color: '#029FB3' }} />
                  )}
                </Box>
              ) : null}
            </Box>
            {showSubMenu && index === menuIndex ? (
              <Box>
                {section?.subMenu.map(
                  (subMenu: any, subMenuMapIndex: number) => (
                    <Box
                      key={subMenuMapIndex}
                      sx={{
                        py: 1,
                        px: 2,
                        background:
                          subMenuMapIndex === subMenuIndex ? '#fff' : '',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '7px',
                      }}
                      onClick={() => {
                        dispatch(setSubMenuIndex(subMenuMapIndex))
                      }}
                    >
                      <Box
                        sx={{
                          fontSize: '14px',
                          textOverflow: 'ellipsis',
                          maxWidth: '85%',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          fontWeight: 400,
                          color: '#01434B',
                        }}
                      >
                        {subMenu?.subMenuName?.length > 53
                          ? subMenu?.subMenuName?.slice(0, 46) + '...'
                          : subMenu?.subMenuName}
                      </Box>
                      <Box>
                        {subMenu?.count > 0 && (
                          <div
                            className={`unread-count ${
                              subMenu?.count === 0 ? 'fade-out' : ''
                            }`}
                          >
                            <span
                              style={{
                                margin: '0px 8px 0px 8px',
                              }}
                            >
                              {subMenu?.count}
                            </span>
                          </div>
                        )}
                      </Box>
                    </Box>
                  )
                )}
              </Box>
            ) : null}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default LeftSection
