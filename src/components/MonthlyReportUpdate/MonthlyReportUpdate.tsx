import { Grid, Modal, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { KeyboardArrowLeft } from '@mui/icons-material'
import { Colors } from '../../theme'
import { Box } from '@mui/system'
import SectionA1 from './SectionA/SectionA1'
import SectionE1 from './SectionE/SectionE1'
import SectionE2 from './SectionE/SectionE2'
import SectionE3 from './SectionE/SectionE3'
import SectionE4 from './SectionE/SectionE4'
import SectionE5 from './SectionE/SectionE5'
import SectionE6 from './SectionE/SectionE6'
import SectionE7 from './SectionE/SectionE7'
import SectionD1 from './SectionD/SectionD1'
import SectionD2 from './SectionD/SectionD2'
import SectionD3 from './SectionD/SectionD3'
import SectionB2 from './SectionB/SectionB2'
import SectionB1 from './SectionB/SectionB1'
import SectionC1 from './SectionC1/SectionC1'
import ProjectCompletionProgress from './ProjectCompletionProgress'
import ListNewProject from '../ListNewProject'
import './MonthlyReportUpdate.css'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import {
  setIsApiCallSuccess,
  setSectionIndex,
  setShowMandatoryFieldModal,
  setSubSectionIndex,
  setToMoveSectionIndex,
} from '../../redux/Slices/MonthlyReportUpdate'
// import { moveToNextSection } from '../../utils/MonthlyReportUpdate.utils'
import CCButton from '../../atoms/CCButton'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import SelectDate from '../SelectDate'
// import { moveToNextSection } from '../../utils/monthlyReportUpdate.utils'
import CCButtonOutlined from '../../atoms/CCButtonOutlined'
import { isDataModifiedCheckFunc } from '../../utils/IssuanceDataCollectionModal.utils'
import CloseIcon from '@mui/icons-material/Close'
import { resetSectionA } from '../../redux/Slices/MonthlyReport/sectionAMonthly'
import { resetSectionB } from '../../redux/Slices/MonthlyReport/sectionBMonthly'
import { resetSectionC } from '../../redux/Slices/MonthlyReport/sectionCMonthly'
import { resetSectionD } from '../../redux/Slices/MonthlyReport/sectionDMonthly'
import { resetSectionE } from '../../redux/Slices/MonthlyReport/sectionEMonthly'
import { resetSelectDate } from '../../redux/Slices/SelectDateSlice'
import { useReport } from '../../hooks/useReport'

const sections = [
  { name: 'Select Time Period' },
  { name: 'Section A: Description of Project Activity' },
  { name: 'Section B: Implementation of the project activity' },
  { name: 'Section C: Description of Monitoring Activity' },
  { name: 'Section D: Data and parameters' },
  {
    name: 'Section E: Calculation of emission reductions or GHG removals by sinks',
  },
]

const sectionATabs = [
  [{ name: 'Select Time Period', component: SelectDate }],
  [{ name: 'A1: Purpose & General description', component: SectionA1 }],
  [
    {
      name: 'B1: Description of implemented registered project activity',
      component: SectionB1,
    },
    { name: 'B2: Post registration changes', component: SectionB2 },
  ],
  [
    {
      name: 'Section C: Description of Monitoring Activity',
      component: SectionC1,
    },
  ],
  [
    { name: 'D1: Data and parameters at ex-ante ', component: SectionD1 },
    { name: 'D2: Data & parameters monitored', component: SectionD2 },
    { name: 'D3: Implementation of Sampling Plan', component: SectionD3 },
  ],
  [
    {
      name: 'E1: Calculation of baseline emissions or  net GHG removals',
      component: SectionE1,
    },
    {
      name: 'E2: Calculation of project emissions or actual net GHG removals',
      component: SectionE2,
    },
    { name: 'E3: Calculation of leakage', component: SectionE3 },
    {
      name: 'E4: Calculation summary of emission reductions or net anthropogenic GHG removals',
      component: SectionE4,
    },
    {
      name: 'E5: Comparison of actual emission reductions or net anthropogenic GHG removals',
      component: SectionE5,
    },
    {
      name: 'E6: Remarks on difference from estimated value',
      component: SectionE6,
    },
    {
      name: 'E7: Actual emission reductions or net anthropogenic GHG removals during 1st commitment period',
      component: SectionE7,
    },
  ],
]

const MonthlyReportUpdate = () => {
  const A1 = useAppSelector(
    ({ sectionAMonthly }) => sectionAMonthly.A1,
    shallowEqual
  )
  const B1 = useAppSelector(
    ({ sectionBMonthly }) => sectionBMonthly.B1,
    shallowEqual
  )
  const B2 = useAppSelector(
    ({ sectionBMonthly }) => sectionBMonthly.B2,
    shallowEqual
  )
  const C1 = useAppSelector(
    ({ sectionCMonthly }) => sectionCMonthly.C1,
    shallowEqual
  )
  const D1 = useAppSelector(
    ({ sectionDMonthly }) => sectionDMonthly.D1,
    shallowEqual
  )
  const D2 = useAppSelector(
    ({ sectionDMonthly }) => sectionDMonthly.D2,
    shallowEqual
  )
  const D3 = useAppSelector(
    ({ sectionDMonthly }) => sectionDMonthly.D3,
    shallowEqual
  )
  const E1 = useAppSelector(
    ({ sectionEMonthly }) => sectionEMonthly.E1,
    shallowEqual
  )
  const E2 = useAppSelector(
    ({ sectionEMonthly }) => sectionEMonthly.E2,
    shallowEqual
  )
  const E3 = useAppSelector(
    ({ sectionEMonthly }) => sectionEMonthly.E3,
    shallowEqual
  )
  const E4 = useAppSelector(
    ({ sectionEMonthly }) => sectionEMonthly.E4,
    shallowEqual
  )
  const E5 = useAppSelector(
    ({ sectionEMonthly }) => sectionEMonthly.E5,
    shallowEqual
  )
  const E6 = useAppSelector(
    ({ sectionEMonthly }) => sectionEMonthly.E6,
    shallowEqual
  )
  const E7 = useAppSelector(
    ({ sectionEMonthly }) => sectionEMonthly.E7,
    shallowEqual
  )

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [nextBtn, setNextBtn] = useState(true)
  const [modal, setModal] = useState<boolean>(false)
  const [subSectionIndexState, setSubSectionIndexState] = useState<number>()
  const [sectionIndexState, setSectionIndexState] = useState<number>()
  const [changeInSection, setChangeInSection] = useState<boolean>(false)

  const showMandatoryFieldModal = useAppSelector(
    ({ MonthlyReportUpdate }) => MonthlyReportUpdate.showMandatoryFieldModal,
    shallowEqual
  )

  const loading = useAppSelector(
    ({ newProject }) => newProject.loading,
    shallowEqual
  )

  const currentProjectDetails = useAppSelector(
    ({ MonthlyReportUpdate }) => MonthlyReportUpdate.currentProjectDetails,
    shallowEqual
  )
  const sectionIndex = useAppSelector(
    ({ MonthlyReportUpdate }) => MonthlyReportUpdate.sectionIndex,
    shallowEqual
  )

  const subSectionIndex = useAppSelector(
    ({ MonthlyReportUpdate }) => MonthlyReportUpdate.subSectionIndex,
    shallowEqual
  )

  const isApiCallSuccess = useAppSelector(
    ({ MonthlyReportUpdate }) => MonthlyReportUpdate.isApiCallSuccess,
    shallowEqual
  )

  const toMoveSectionIndex = useAppSelector(
    ({ MonthlyReportUpdate }) => MonthlyReportUpdate.toMoveSectionIndex,
    shallowEqual
  )

  useEffect(() => {
    return () => {
      dispatch(resetSelectDate())
      dispatch(resetSectionA())
      dispatch(resetSectionB())
      dispatch(resetSectionC())
      dispatch(resetSectionD())
      dispatch(resetSectionE())
      dispatch(setSubSectionIndex(0))
    }
  }, [])

  useEffect(() => {
    if (isApiCallSuccess) {
      handleSectionIndexFromModal()
    }
  }, [isApiCallSuccess])

  useEffect(() => {
    if (
      currentProjectDetails &&
      currentProjectDetails?.projectCompleted &&
      sectionIndex === 5
    )
      setNextBtn(false)
    else {
      setNextBtn(true)
    }
  }, [currentProjectDetails, sectionIndex])

  const getSectionName = () => {
    return sections[sectionIndex]?.name
  }
  const {moveToNextSection} = useReport()
  const handleSave = () => {
    moveToNextSection(sectionIndex, subSectionIndex)
  }

  const handlePrevious = () => {
    if (sectionIndex > 0) {
      const isDataModified = handleDataCheck()

      if (isDataModified) {
        setModal(true)
        setChangeInSection(true)
        setSectionIndexState(sectionIndex - 1)
        setSubSectionIndexState(0)
      } else if (!isDataModified) {
        dispatch(setSectionIndex(sectionIndex - 1))
        dispatch(setSubSectionIndex(0))
      }
    }
  }

  const handleNextBtnFromSectionE = () => {
    navigate(pathNames.PROFILE_DETAILS_ISSUANCE_INFO)

    // else if (!nextBtn) {
    //   if (currentProjectDetails?.project_status === 0) {
    //     navigate(pathNames.SELECT_VERIFIER)
    //   } else navigate(pathNames.PROFILE_DETAILS_ISSUANCE_INFO)
    // }
  }

  const handleNext = () => {
    if (sectionIndex > 0) {
      const isDataModified = handleDataCheck()

      if (isDataModified) {
        setModal(true)
        setChangeInSection(true)
        setSectionIndexState(sectionIndex + 1)
        setSubSectionIndexState(0)
      } else if (!isDataModified) {
        if (sectionIndex !== 5) {
          dispatch(setSectionIndex(sectionIndex + 1))
        }
        dispatch(setSubSectionIndex(0))
      }
      //handling next btn as per section data collection percentage
      !isDataModified && sectionIndex === 5 && handleNextBtnFromSectionE()
    } else if (sectionIndex === 0) dispatch(setSectionIndex(sectionIndex + 1))
  }

  const handleDataCheck = () => {
    const paramsData = [
      {
        sectionName: A1,
        subSectionRow:
          currentProjectDetails['section_a'][`step${subSectionIndex + 1}`],
        section: 1,
        subSection: 0,
      },

      {
        sectionName: B1,
        subSectionRow:
          currentProjectDetails['section_b'][`step${subSectionIndex + 1}`],
        section: 2,
        subSection: 0,
      },
      {
        sectionName: B2,
        subSectionRow:
          currentProjectDetails['section_b'][`step${subSectionIndex + 1}`],
        section: 2,
        subSection: 1,
      },
      {
        sectionName: C1,
        subSectionRow:
          currentProjectDetails['section_c'][`step${subSectionIndex + 1}`],
        section: 3,
        subSection: 0,
      },
      {
        sectionName: D1,
        subSectionRow:
          currentProjectDetails['section_d'][`step${subSectionIndex + 1}`],
        section: 4,
        subSection: 0,
      },
      {
        sectionName: D2,
        subSectionRow:
          currentProjectDetails['section_d'][`step${subSectionIndex + 1}`],
        section: 4,
        subSection: 1,
      },
      {
        sectionName: D3,
        subSectionRow:
          currentProjectDetails['section_d'][`step${subSectionIndex + 1}`],
        section: 4,
        subSection: 2,
      },
      {
        sectionName: E1,
        subSectionRow:
          currentProjectDetails['section_e'][`step${subSectionIndex + 1}`],
        section: 5,
        subSection: 0,
      },
      {
        sectionName: E2,
        subSectionRow:
          currentProjectDetails['section_e'][`step${subSectionIndex + 1}`],
        section: 5,
        subSection: 1,
      },
      {
        sectionName: E3,
        subSectionRow:
          currentProjectDetails['section_e'][`step${subSectionIndex + 1}`],
        section: 5,
        subSection: 2,
      },
      {
        sectionName: E4,
        subSectionRow:
          currentProjectDetails['section_e'][`step${subSectionIndex + 1}`],
        section: 5,
        subSection: 3,
      },
      {
        sectionName: E5,
        subSectionRow:
          currentProjectDetails['section_e'][`step${subSectionIndex + 1}`],
        section: 5,
        subSection: 4,
      },
      {
        sectionName: E6,
        subSectionRow:
          currentProjectDetails['section_e'][`step${subSectionIndex + 1}`],
        section: 5,
        subSection: 5,
      },
      {
        sectionName: E7,
        subSectionRow:
          currentProjectDetails['section_e'][`step${subSectionIndex + 1}`],
        section: 5,
        subSection: 6,
      },
    ]
    let dataModified = false

    //filtering the params from data to pass to function
    const params = paramsData.filter((i: any) => {
      return i?.section === sectionIndex && i?.subSection === subSectionIndex
    })

    if (params.length) {
      dataModified = isDataModifiedCheckFunc(
        params[0].sectionName,
        params[0].subSectionRow,
        sectionIndex,
        subSectionIndex
      )
    }
    return dataModified
  }

  const handleSubSectionClick = (index?: number) => {
    //will only check if issuer is clicking on other subsection
    if (index !== subSectionIndex) {
      const dataModified = handleDataCheck()
      if (dataModified) {
        setSubSectionIndexState(index)
        setModal(true)
      } else if (!dataModified) {
        dispatch(setSubSectionIndex(index))
      }
    }
  }

  const handleQuitWithoutSave = () => {
    setModal(false)
    if (sectionIndex === 5) {
      handleNextBtnFromSectionE()
    } else {
      handleSectionIndexFromModal()
    }
  }

  const handleSectionIndexFromModal = () => {
    dispatch(setSubSectionIndex(subSectionIndexState))
    //ChangeInSection is to know whether the issuer has clicked on section level next or he clicked on subSection level
    if (changeInSection) {
      dispatch(setSectionIndex(sectionIndexState))
      setChangeInSection(false)
    }
    dispatch(setIsApiCallSuccess(false))
  }
  const handleModalSave = () => {
    setModal(false)
    dispatch(setToMoveSectionIndex(true))
    handleSave()
  }

  const renderTab = () => {
    const SelectedSubSectionComp =
      sectionATabs[sectionIndex][subSectionIndex]?.component
    return <SelectedSubSectionComp />
  }

  return (
    <>
      <Grid container>
        <Grid item xs={9}>
          <Paper sx={{ p: 3 }}>
            <Grid
              container
              xs={12}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Grid item container xs={6} alignItems={'center'}>
                <KeyboardArrowLeft
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate(-1)
                  }}
                />
                <Typography sx={{ fontSize: 28, color: Colors.tertiary }}>
                  Monthly Report Update
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                <CCButton
                  sx={{
                    backgroundColor: Colors.darkPrimary1,
                    padding: '8px 24px',
                    minWidth: '50px',
                    color: '#fff',
                    borderRadius: 10,
                    fontSize: 14,
                    mr: 1,
                  }}
                  onClick={handleSave}
                >
                  {loading ? 'Saving ...' : 'Save'}
                </CCButton>
                {sectionIndex !== 0 && (
                  <Box
                    sx={{
                      backgroundColor: '#F6F9F7',
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      p: 1,
                      mr: 1,
                      cursor: 'pointer',
                    }}
                    onClick={handlePrevious}
                  >
                    <ArrowBackIcon
                      sx={{ color: '#006B5E', fontSize: 18, mr: 1 }}
                    />
                    <Typography
                      sx={{
                        color: '#006B5E',
                        fontWeight: 500,
                      }}
                    >
                      Previous
                    </Typography>
                  </Box>
                )}
                <Box
                  sx={{
                    backgroundColor: '#F6F9F7',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    p: 1,
                    cursor: 'pointer',
                    opacity: currentProjectDetails ? 1 : 0.5,
                    pointerEvents: currentProjectDetails ? 'all' : 'none',
                  }}
                  onClick={handleNext}
                >
                  <Typography
                    sx={{
                      color: '#006B5E',
                      fontWeight: 500,
                      mr: 1,
                    }}
                  >
                    {nextBtn ? 'Next' : 'Complete'}
                  </Typography>
                  <ArrowForwardIcon sx={{ color: '#006B5E', fontSize: 18 }} />
                </Box>
              </Grid>
            </Grid>
            <Grid
              container
              xs={12}
              sx={{ mt: 3 }}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Grid
                item
                sx={{
                  p: 1,
                  backgroundColor: '#DAF7F0',
                  borderBottom: '2px solid #005046',
                  borderRadius: '6px 6px 0 0',
                  color: '#1D4B44',
                  fontWeight: 500,
                }}
              >
                {getSectionName()}
              </Grid>
            </Grid>
            <Grid container xs={12}>
              {sectionIndex !== 0 && (
                <Box sx={{ mt: 3 }} className="tabs-container">
                  <Box className="tabs">
                    {sectionATabs[sectionIndex]?.map((tab, index) => (
                      <Box
                        key={index}
                        className={`${
                          subSectionIndex === index ? 'selected-tab' : 'tab'
                        }`}
                        onClick={() => handleSubSectionClick(index)}
                      >
                        <Box className="tab-title">{tab.name}</Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
              <Box sx={{ width: '100%' }}>{renderTab()}</Box>
            </Grid>
          </Paper>
        </Grid>
        <Grid item container xs={3}>
          <ProjectCompletionProgress sectionIndex={sectionIndex} />
        </Grid>
      </Grid>
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(56, 142, 129, 0.4)',
        }}
      >
        <Paper
          sx={{
            px: 10,
            py: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 3,
            outline: 'none',
          }}
        >
          <Box>
            <Typography
              textAlign="center"
              sx={{ fontWeight: 500, fontSize: 20 }}
            >
              Save Changes?
            </Typography>
            <Typography sx={{ fontWeight: 500, fontSize: 14, pt: 3, pb: 5 }}>
              Your unsaved changes will be lost. Save changes before closing ?
            </Typography>
          </Box>
          <Stack direction="row" justifyContent={'space-between'}>
            <CCButtonOutlined
              sx={{
                minWidth: 0,
                padding: '6px 17px',
                borderRadius: 10,
                mr: 3,
                fontSize: 14,
                fontWeight: 500,
              }}
              onClick={handleQuitWithoutSave}
            >
              Quit without saving
            </CCButtonOutlined>
            <CCButton
              onClick={handleModalSave}
              sx={{
                minWidth: 0,
                padding: '6px 68px',
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Save
            </CCButton>
          </Stack>
        </Paper>
      </Modal>
      <Modal
        open={showMandatoryFieldModal}
        onClose={() => dispatch(setShowMandatoryFieldModal(false))}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(56, 142, 129, 0.4)',
        }}
      >
        <>
          <Box
            sx={{ position: 'absolute', top: 50, right: 50 }}
            onClick={() => dispatch(setShowMandatoryFieldModal(false))}
          >
            <CloseIcon
              sx={{ color: '#FFFFFF', fontSize: 30, cursor: 'pointer' }}
            />
          </Box>
          <Paper
            sx={{
              px: 9,
              py: 5,
              display: 'flex',
              flexDirection: 'row',
              borderRadius: 3,
              outline: 'none',
            }}
          >
            <Stack direction={'column'} alignItems="center">
              <Typography
                textAlign="center"
                sx={{ fontWeight: 500, fontSize: 19 }}
              >
                Please Enter All the Mandatory Fields
              </Typography>
              <CCButton
                onClick={() => {
                  dispatch(setShowMandatoryFieldModal(false))
                  //below line will make the triggered redux to false if the mandatory fields in sections so that the section or subsection wont' change when clicks on save from out of modal
                  toMoveSectionIndex && dispatch(setToMoveSectionIndex(false))
                }}
                sx={{
                  mt: 3,
                  minWidth: 0,
                  padding: '10px 26px',
                  fontSize: 19,
                  fontWeight: 500,
                }}
              >
                Ok
              </CCButton>
            </Stack>
          </Paper>
        </>
      </Modal>
    </>
  )
}

export default MonthlyReportUpdate
