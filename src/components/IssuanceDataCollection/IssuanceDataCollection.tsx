import { Container, Grid, Modal, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { KeyboardArrowLeft } from '@mui/icons-material'
import { Colors, Images } from '../../theme'
import { Box } from '@mui/system'
import SectionA1 from './SectionA/SectionA1'
import SectionA2 from './SectionA/SectionA2'
import SectionA3 from './SectionA/SectionA3'
import SectionA4 from './SectionA/SectionA4'
import SectionA5 from './SectionA/SectionA5'
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
import SectionC1 from './SectionC/SectionC1'
import SectionA6 from './SectionA/SectionA6'
import SectionA7 from './SectionA/SectionA7'
import SectionB3 from './SectionB/SectionB3'
import SectionC2 from './SectionC/SectionC2'
import SectionE8 from './SectionE/SectionE8'
import ProjectCompletionProgress from './ProjectCompletionProgress'
import ListNewProject from '../ListNewProject'
import './issuanceDataCollection.css'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import {
  setSectionIndex,
  setSubSectionIndex,
  setShowMandatoryFieldModal,
  setIsApiCallSuccess,
  setToMoveSectionIndex,
  setShowResubmitPDFModal,
} from '../../redux/Slices/issuanceDataCollection'
// import { moveToNextSection } from '../../utils/issuanceDataCollection.utils'
import CCButton from '../../atoms/CCButton'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import CCButtonOutlined from '../../atoms/CCButtonOutlined'
import Spinner from '../../atoms/Spinner'
import _ from 'lodash'
import { setLocalItem } from '../../utils/Storage'
import { isDataModifiedCheckFunc } from '../../utils/IssuanceDataCollectionModal.utils'
import { store } from '../../redux/store'
import CloseIcon from '@mui/icons-material/Close'
import { resetSectionA } from '../../redux/Slices/sectionASlice'
import { resetSectionE } from '../../redux/Slices/sectionESlice'
import { resetSectionD } from '../../redux/Slices/sectionDSlice'
import { resetSectionB } from '../../redux/Slices/sectionBSlice'
import { resetSectionC } from '../../redux/Slices/sectionCSlice'
import { resetSectionNewProjectDetails } from '../../redux/Slices/newProjectSlice'
import { usePrompt } from '../../hooks/useCustomBlocker'
import { PROJECT_ALL_STATUS } from '../../config/constants.config'
import { useProject } from '../../hooks/useProject'
import MessageModal from '../../atoms/MessageModal/MessageModal'
import { setRetryFunction } from '../../redux/Slices/blockchainStatusModalSlice'

const sections = [
  { name: 'Project Introduction' },
  { name: 'Section A: Description of Project Activity' },
  { name: 'Section B: Implementation of the project activity' },
  { name: 'Section C: Description of Monitoring Activity' },
  { name: 'Section D: Data and parameters' },
  {
    name: 'Section E: Calculation of emission reductions or GHG removals by sinks',
  },
]

const sectionATabs = [
  [{ name: 'Project Introduction', component: ListNewProject }],
  [
    { name: 'A1: Purpose & General description', component: SectionA1 },
    { name: 'A2: Location', component: SectionA2 },
    { name: 'A3: Parties & Project Participants', component: SectionA3 },
    { name: 'A4: Reference & Applied Methodology', component: SectionA4 },
    { name: 'A5: Crediting Period', component: SectionA5 },
    { name: 'A6: Safeguards', component: SectionA6 },
    { name: 'A7: Additionally', component: SectionA7 },
  ],
  [
    {
      name: 'B1: Description of implemented registered project activity',
      component: SectionB1,
    },
    { name: 'B2: Post registration changes', component: SectionB2 },
    { name: 'B3: Additional details', component: SectionB3 },
  ],
  [
    {
      name: 'C1: Description of Monitoring Activity',
      component: SectionC1,
    },
    {
      name: 'C2: Quantification of GHG emission mitigations',
      component: SectionC2,
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
    {
      name: 'E8: Appendix',
      component: SectionE8,
    },
  ],
]

const IssuanceDataCollection = () => {
  const dispatch: any = useAppDispatch()
  const navigate = useNavigate()

  const sectionA = store.getState()?.sectionA

  const loading = useAppSelector(
    ({ newProject }) => newProject.loading,
    shallowEqual
  )
  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )
  const sectionIndex = useAppSelector(
    ({ issuanceDataCollection }) => issuanceDataCollection.sectionIndex,
    shallowEqual
  )
  const subSectionIndex = useAppSelector(
    ({ issuanceDataCollection }) => issuanceDataCollection.subSectionIndex,
    shallowEqual
  )
  const showMandatoryFieldModal = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.showMandatoryFieldModal,
    shallowEqual
  )
  const isApiCallSuccess = useAppSelector(
    ({ issuanceDataCollection }) => issuanceDataCollection.isApiCallSuccess,
    shallowEqual
  )
  const toMoveSectionIndex = useAppSelector(
    ({ issuanceDataCollection }) => issuanceDataCollection.toMoveSectionIndex,
    shallowEqual
  )
  const showResubmitPDFModal = useAppSelector(
    ({ issuanceDataCollection }) => issuanceDataCollection.showResubmitPDFModal,
    shallowEqual
  )
  const fileUploadInProgress = useAppSelector(
    ({ issuanceDataCollection }) => issuanceDataCollection.fileUploadInProgress,
    shallowEqual
  )

  const A1 = useAppSelector(({ sectionA }) => sectionA.A1)
  const A2 = useAppSelector(({ sectionA }) => sectionA.A2)
  const party_and_project_participants = useAppSelector(
    ({ sectionA }) => sectionA.party_and_project_participants
  )
  const A3 = useAppSelector(({ sectionA }) => sectionA.A3)
  const methodologies = useAppSelector(({ sectionA }) => sectionA.methodologies)
  const A5 = useAppSelector(({ sectionA }) => sectionA.A5)
  const A6 = useAppSelector(({ sectionA }) => sectionA.A6)
  const A7 = useAppSelector(({ sectionA }) => sectionA.A7)
  const B1 = useAppSelector(({ sectionB }) => sectionB.B1)
  const B2 = useAppSelector(({ sectionB }) => sectionB.B2)
  const B3 = useAppSelector(({ sectionB }) => sectionB.B3)
  const C1 = useAppSelector(({ sectionC }) => sectionC.C1, shallowEqual)
  const C2 = useAppSelector(({ sectionC }) => sectionC.C2, shallowEqual)
  const D1 = useAppSelector(({ sectionD }) => sectionD.D1, shallowEqual)
  const D2 = useAppSelector(({ sectionD }) => sectionD.D2, shallowEqual)
  const D3 = useAppSelector(({ sectionD }) => sectionD.D3, shallowEqual)
  const E1 = useAppSelector(({ sectionE }) => sectionE.E1, shallowEqual)
  const E2 = useAppSelector(({ sectionE }) => sectionE.E2, shallowEqual)
  const E3 = useAppSelector(({ sectionE }) => sectionE.E3, shallowEqual)
  const E4 = useAppSelector(({ sectionE }) => sectionE.E4, shallowEqual)
  const E5 = useAppSelector(({ sectionE }) => sectionE.E5, shallowEqual)
  const E6 = useAppSelector(({ sectionE }) => sectionE.E6, shallowEqual)
  const E7 = useAppSelector(({ sectionE }) => sectionE.E7, shallowEqual)
  const E8 = useAppSelector(({ sectionE }) => sectionE.E8, shallowEqual)

  const [nextBtn, setNextBtn] = useState<boolean>(true)
  const [modal, setModal] = useState<boolean>(false)
  const [subSectionIndexState, setSubSectionIndexState] = useState<number>()
  const [sectionIndexState, setSectionIndexState] = useState<number>()
  const [changeInSection, setChangeInSection] = useState<boolean>(false)
  const [blockRouting, setBlockRouting] = useState<boolean>(false)
  const [onHoverText, setOnHoverText] = useState('Copy To Clipboard')
  const [show, setShow] = useState<boolean>(false)
  const [storeSectionIndex, setStoreSectionIndex] = useState<any>({
    sectionIndex: 1,
    subSectionIndex: 0,
  })

  useEffect(() => {
    return () => {
      dispatch(resetSectionA())
      dispatch(resetSectionB())
      dispatch(resetSectionC())
      dispatch(resetSectionD())
      dispatch(resetSectionE())
      dispatch(setSubSectionIndex(0))
      dispatch(resetSectionNewProjectDetails())
    }
  }, [])

  useEffect(() => {
    if (
      currentProjectDetails &&
      currentProjectDetails?.projectCompleted &&
      sectionIndex === 5
    ) {
      setNextBtn(false)
    } else {
      setNextBtn(true)
    }
  }, [currentProjectDetails, sectionIndex])

  useEffect(() => {
    if (isApiCallSuccess && !loading) {
      handleSectionIndexFromModal()
    }
  }, [isApiCallSuccess, loading])

  useEffect(() => {
    setStoreSectionIndex({
      subSectionIndex,
      sectionIndex,
    })
  }, [sectionIndex, subSectionIndex])

  const getSectionName = () => {
    return sections[sectionIndex]?.name
  }

  const changeOnHoverText = () => {
    setTimeout(() => {
      setOnHoverText('Copy To Clipboard')
    }, 3000)
  }

  const { moveToNextSection, resubmitPDF } = useProject()

  const handleSave = () => {
    if (
      !currentProjectDetails ||
      currentProjectDetails?.project_status <
        PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY
    ) {
      //Saving as Retry function to call again in case api fails
      if (sectionIndex === 0) {
        dispatch(
          setRetryFunction(() =>
            moveToNextSection(sectionIndex, subSectionIndex)
          )
        )
      }
      moveToNextSection(sectionIndex, subSectionIndex)
    } else {
      alert("Project already Verified. Can't be updated now!")
    }
  }

  const handlePrevious = () => {
    // restrict user to navigate when APi call is happening
    if (loading) {
      return
    }
    const isDataEdited = handleDataCheck()
    if (isDataEdited) {
      setStoreSectionIndex({
        subSectionIndex: 0,
        sectionIndex: sectionIndex - 1,
      })
      setModal(true)
      return
    }
    dispatch(setSectionIndex(sectionIndex - 1))
    dispatch(setSubSectionIndex(0))
  }

  const handleNext = () => {
    // loading - restrict user to navigate when APi call is happening

    if (!currentProjectDetails || loading) {
      return
    }
    const isDataEdited = handleDataCheck()
    if (isDataEdited) {
      setStoreSectionIndex({
        sectionIndex: sectionIndex + 1,
        subSectionIndex: 0,
      })
      setModal(true)
      return
    }
    if (sectionIndex === 5) {
      handleNextBtnFromSectionE()
      return
    }
    dispatch(setSectionIndex(sectionIndex + 1))
    dispatch(setSubSectionIndex(0))
  }

  const handleNextBtnFromSectionE = () => {
    if (
      currentProjectDetails?.project_status ===
      PROJECT_ALL_STATUS.CREATED_PROJECT
    ) {
      if (nextBtn) {
        navigate(pathNames.DASHBOARD)
      } else if (!nextBtn) {
        if (
          currentProjectDetails?.project_status ===
          PROJECT_ALL_STATUS.CREATED_PROJECT
        ) {
          navigate(pathNames.SELECT_VERIFIER)
        } else {
          navigate({
            pathname: pathNames.PROFILE_DETAILS_ISSUANCE_INFO,
            search: `?${createSearchParams({
              projectId: currentProjectDetails?.uuid,
            })}`,
          })
        }
      }
    } else if (
      currentProjectDetails?.project_status <
      PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY
    ) {
      if (currentProjectDetails?._id) {
        dispatch(
          setRetryFunction(() => resubmitPDF(currentProjectDetails?._id))
        )

        resubmitPDF(currentProjectDetails?._id)
      }
    }
  }

  const handleDataCheck = () => {
    if (!currentProjectDetails) {
      return
    }
    const { section_a, section_b, section_c, section_d, section_e } =
      currentProjectDetails
    const paramsData = [
      section_a,
      section_b,
      section_c,
      section_d,
      section_e,
    ].reduce((acc: any, cur: any, index: any) => {
      const tempArr = Object.keys(cur)
        .filter(
          (key) => typeof cur[key] === 'object' && !Array.isArray(cur[key])
        )
        .map((item, stepIndex) => {
          return {
            sectionName:
              index === 0 && item === 'step3'
                ? { A3, party_and_project_participants }
                : index === 0 && item === 'step4'
                ? methodologies
                : String.fromCharCode(65 + index) + (stepIndex + 1),
            subSectionRow:
              index === 0 && item === 'step4'
                ? cur[item]?.methodologies
                : cur[item],
            section: index + 1,
            subSection: parseInt(item.charAt(item.length - 1)) - 1,
          }
        })
      acc[acc.length] = tempArr
      return acc
    }, [])

    let dataModified = false
    //finding the obj from paramsData to pass params
    const params = paramsData?.flat()?.find((i: any) => {
      return i?.section === sectionIndex && i?.subSection === subSectionIndex
    })
    if (params) {
      dataModified = isDataModifiedCheckFunc(
        eval(params.sectionName),
        eval(params.subSectionRow),
        sectionIndex,
        subSectionIndex
      )
    }
    return dataModified
  }

  useEffect(() => {
    //kept no dependency to check the data is modified and make blockRouting state to true or false
    !loading && handleDataCheck()
      ? setBlockRouting(true)
      : setBlockRouting(false)
  })
  //calling custom hook to block route if necessary and passing message and when param
  usePrompt('This page have unsaved data', blockRouting)

  const handleSubSectionClick = (selectedSubSectionIndex?: any) => {
    // restrict user to navigate when APi call is happening
    if (loading) {
      return
    }
    if (selectedSubSectionIndex !== subSectionIndex) {
      if (handleDataCheck()) {
        setStoreSectionIndex({
          sectionIndex: sectionIndex,
          subSectionIndex: parseInt(selectedSubSectionIndex),
        })
        setModal(true)
      } else {
        dispatch(setSubSectionIndex(selectedSubSectionIndex))
      }
    }
  }

  const handleQuitWithoutSave = () => {
    setModal(false)
    if (storeSectionIndex?.sectionIndex === 6) {
      handleNextBtnFromSectionE()
      return
    }
    dispatch(setSubSectionIndex(storeSectionIndex?.subSectionIndex))
    dispatch(setSectionIndex(storeSectionIndex?.sectionIndex))
  }

  const handleModalSave = () => {
    setModal(false)
    dispatch(setToMoveSectionIndex(true))
    handleSave()
  }

  const handleSectionIndexFromModal = () => {
    //as there is no section 6 (last section is 5) so taking user to navigate to other pages
    if (storeSectionIndex?.sectionIndex === 6) {
      handleNextBtnFromSectionE()
      return
    }
    dispatch(setSubSectionIndex(storeSectionIndex?.subSectionIndex))
    dispatch(setSectionIndex(storeSectionIndex?.sectionIndex))
    dispatch(setIsApiCallSuccess(false))
  }
  const renderTab = () => {
    const SelectedSubSectionComp =
      sectionATabs[sectionIndex][subSectionIndex]?.component
    return <SelectedSubSectionComp />
  }

  const disableSave = () => {
    if (
      (sectionIndex === 0 && currentProjectDetails) ||
      loading ||
      fileUploadInProgress
    ) {
      return true
    }
    return false
  }

  return (
    <>
      <Grid
        container
        maxWidth={'xl'}
        // sx={{ height:'50vh' }}
      >
        <Grid item xs={9} sm={12} md={8} lg={9} xl={9}>
          <Paper
            sx={{
              p: 3,
              borderRadius: '15px',
            }}
            elevation={5}
          >
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
                  List New Project
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                <CCButton
                  variant="contained"
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
                  disabled={disableSave()}
                >
                  Save
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
                    opacity: nextBtn
                      ? 1
                      : currentProjectDetails &&
                        currentProjectDetails?.project_status <
                          PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY
                      ? 1
                      : 0.5,
                    pointerEvents: nextBtn
                      ? 'all'
                      : currentProjectDetails &&
                        currentProjectDetails?.project_status <
                          PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY
                      ? 'all'
                      : 'none',
                  }}
                  onClick={handleNext}
                >
                  <Typography
                    sx={{
                      color: '#006B5E',
                      fontWeight: 500,
                    }}
                  >
                    {nextBtn
                      ? 'Next'
                      : currentProjectDetails &&
                        currentProjectDetails?.project_status <
                          PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY &&
                        currentProjectDetails?.project_status >
                          PROJECT_ALL_STATUS.CREATED_PROJECT
                      ? 'Resubmit'
                      : 'Complete'}
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
              <Box
                sx={{
                  paddingLeft: 1,
                  width: '100%',
                }}
              >
                {renderTab()}
              </Box>
            </Grid>
          </Paper>
        </Grid>
        <Grid item container xs={3} md={4} lg={3} xl={3}>
          <ProjectCompletionProgress sectionIndex={sectionIndex} />
        </Grid>
      </Grid>
      {/*//modal*/}
      <Modal
        open={modal}
        //onClose={() => setModal(false)}
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
          <>
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
          </>
        </Paper>
      </Modal>
      {/*Modal 2*/}
      <Modal
        open={showMandatoryFieldModal}
        onClose={() => {
          setStoreSectionIndex({
            subSectionIndex,
            sectionIndex,
          })
          dispatch(setShowMandatoryFieldModal(false))
        }}
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
          {/*<Box
            sx={{ position: 'absolute', top: 50, right: 50 }}
            //onClick={() => 
            //onClick = {handleClose}
          >
            <CloseIcon
              sx={{ color: '#FFFFFF', fontSize: 30, cursor: 'pointer' }}
            />
          </Box>*/}
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
                  setStoreSectionIndex({
                    subSectionIndex,
                    sectionIndex,
                  })
                  dispatch(setShowMandatoryFieldModal(false))
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
      <MessageModal
        message={'Successfully updated the PDF!!!'}
        btn1Text="Ok"
        btn1OnClick={() => {
          dispatch(setShowResubmitPDFModal(false))
        }}
        showModal={showResubmitPDFModal}
        setShowModal={dispatch(setShowResubmitPDFModal)}
      />
      <Box
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 20,
        }}
      >
        <Paper
          sx={{
            px: 2,
            py: 1,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: Colors.darkPrimary2,
            borderRadius: '16px',
            cursor: 'pointer',
          }}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          onClick={() => {
            navigate(pathNames.ISSUANCE_DATA_COLLECTION_HELP)
            changeOnHoverText()
          }}
        >
          <Box sx={{ display: 'flex', height: '100%' }}>
            <img src={Images.HelpIcon} width="24px" height={'24px'} />
          </Box>
          {show && (
            <Typography
              sx={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                marginBottom: '50px',

                color: Colors.black,
                backgroundColor: 'white',
                fontSize: 14,
                fontWeight: 400,
                width: '150px',
                borderRadius: '3px',
                textAlign: 'center',
                p: 3,
                mr: -2,
              }}
            >
              View Sample Report
            </Typography>
          )}
          <Typography
            sx={{
              ml: 1,
              color: Colors.lightPrimary1,
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Help
          </Typography>
        </Paper>
      </Box>
    </>
  )
}

export default IssuanceDataCollection
