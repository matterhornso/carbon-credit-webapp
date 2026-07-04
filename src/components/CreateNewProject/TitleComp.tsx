import { Box, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CCButton from '../../atoms/CCButton'
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { useCreateNewProject } from '../../hooks/useCreateNewProject'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setSectionIndex,
  setSelectedSection,
} from '../../redux/Slices/CreateNewProject/createNewProjectSectionSlice'
import {
  setBlockchainCallStatus,
  setOpenBlockchainStatusModal,
  setPrimaryText,
  setRetryFunction,
  setSecondaryText,
  setSuccessFunction,
} from '../../redux/Slices/blockchainStatusModalSlice'
import { getLocalItem } from '../../utils/Storage'
import { BLOCKCHAIN_STATUS, ROLES } from '../../config/constants.config'
import { shallowEqual } from 'react-redux'
import { useSaveProjectDraft } from '../../hooks/useSaveProjectDraft'
import { pathNames } from '../../routes/pathNames'
import LoderOverlay from '../LoderOverlay'
import { CheckProjectIntroBtnValidations } from '../../utils/projectDraft.util'
import { ProjectDraftCalls } from '../../api/projectDraftCalls.api'

const TitleComp = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userRole = getLocalItem('userDetails')?.type

  const { saveDetails } = useCreateNewProject()
  const { savePddDraftDetails, updateProjectDraftStatus } =
    useSaveProjectDraft()

  const projectIntroduction = useAppSelector(
    ({ projectIntroductionV2 }) => projectIntroductionV2.projectIntroduction
  )
  const methodology = useAppSelector(
    ({ methodologyDetermination }) => methodologyDetermination?.methodology
  )
  const savedProjectDetailsLoader = useAppSelector(
    ({ createNewProject }) => createNewProject.savedProjectDetailsLoader
  )
  const currentProjectDraftDetails = useAppSelector(
    ({ projectDraftDetails }) => projectDraftDetails.currentProjectDraftDetails
  )
  console.log('currentProjectDraftDetails: ', currentProjectDraftDetails)
  const sectionIndex = useAppSelector(
    ({ createNewProjectSection }) => createNewProjectSection?.sectionIndex,
    shallowEqual
  )

  const [projectName, setprojectName] = useState<string>('')
  const [notifyAdminChangestoPDLoader, setNotifyAdminChangesToPDLoader] =
    useState<any>(false)

  useEffect(() => {
    if (
      projectIntroduction?.name?.data?.blocks ||
      projectIntroduction?.name?.data
    ) {
      setprojectName(
        projectIntroduction?.name?.data?.blocks?.[0]?.data?.text ||
          projectIntroduction?.name?.data
      )
    }
  }, [projectIntroduction])

  const handleClick = () => {
    // dispatch(setRetryFunction(savePddDraftDetails))
    // savePddDraftDetails()
    handleSave()
  }

  const handleSave = async () => {
    try {
      modalWhileAPIIsCalled(
        BLOCKCHAIN_STATUS.PENDING,
        'In Progress',
        'Creating New Project Draft'
      )
      const payload = { projectIntroduction }

      const res = await ProjectDraftCalls.createProjectDraft(payload)
      if (res?.success) {
        modalWhileAPIIsCalled(
          BLOCKCHAIN_STATUS.COMPLETED,
          'Completed',
          'Project Draft created Successfully',
          () =>
            navigate(pathNames.GENERATE_PROJECT_WITH_AI, {
              state: { uuid: res?.data?.uuid },
            })
        )
      }
    } catch (e) {
      console.log('Error in saving project', e)
    }
  }

  const modalWhileAPIIsCalled = (
    status: any,
    primaryTxt: string,
    secondaryTxt: string,
    successFn?: any
  ) => {
    if (!status || !primaryTxt || !secondaryTxt) {
      return
    }
    dispatch(setOpenBlockchainStatusModal(true))
    dispatch(setBlockchainCallStatus(status))
    dispatch(setPrimaryText(primaryTxt))
    dispatch(setSecondaryText(secondaryTxt))
    if (successFn) {
      dispatch(setSuccessFunction(successFn))
    }
  }

  const saveBtnValidations: any = () => {
    let isDisabled
    if (userRole === ROLES.ISSUER)
      if (sectionIndex === 0) {
        if (!currentProjectDraftDetails?.project_status) {
          isDisabled = !CheckProjectIntroBtnValidations(projectIntroduction)
        } else {
          isDisabled = currentProjectDraftDetails?.project_status ? true : false
        }
      } else if (sectionIndex === 1) {
        if (currentProjectDraftDetails?.project_status >= 1050) {
          return (isDisabled = true)
        }
        if (methodology.activities.length) {
          const findUnansweredQuestions = methodology.activities.filter(
            (i: any) => {
              return i?.answer === null
            }
          )
          if (findUnansweredQuestions.length) return (isDisabled = true)
        }
        isDisabled =
          methodology.goal === '' || methodology.activities.length === 0
            ? true
            : false
      }
    return isDisabled
  }

  const sumbitAdminChangestoPD = async () => {
    if (currentProjectDraftDetails?.project_status != 1250) {
      return
    }
    try {
      setNotifyAdminChangesToPDLoader(true)
      const res = await updateProjectDraftStatus()
      if (res?.success) {
        setNotifyAdminChangesToPDLoader(false)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setNotifyAdminChangesToPDLoader(false)
    }
  }

  return (
    <>
      <LoderOverlay show={notifyAdminChangestoPDLoader} />
      <Box
        sx={{
          p: 3,
        }}
      >
        <Paper
          sx={{
            p: 2,
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: 'none',
          }}
        >
          <Box>
            <BackHeader
              title="Back"
              iconColor="#5897C1"
              titleSx={{
                color: '#5897C1',
                fontSize: '14px',
                fontWeight: '500',
              }}
              onClick={() => {
                dispatch(setSelectedSection(null))
                dispatch(setSectionIndex(0))
                navigate(pathNames.DASHBOARD)
              }}
            />
          </Box>
          <Box
            sx={{
              color: '#0D0E0E',
              fontSize: 36,
              fontWeight: 400,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              mx: 4,
            }}
          >
            {userRole === ROLES.ISSUER && !projectName
              ? 'Create New Project'
              : projectName}
          </Box>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <CCButton
              // disabled={saveBtnValidations()}
              // disabled={true}
              sx={{
                background:
                  userRole === ROLES.ISSUER
                    ? 'linear-gradient(270deg, #01623D -55.94%, #8BD3DC 177.5%)'
                    : '#FFFFFF',
                padding: '13px 24px 13px 24px',
                color: userRole === ROLES.ISSUER ? '#fff' : '#0D0E0E',
                fontWeight: userRole === ROLES.ISSUER ? 600 : 500,
                minWidth: 0,
                width: '139px',
                fontSize: '16px',
                boxShadow:
                  userRole === ROLES.ADMIN
                    ? ' 0px 1px 1px 0px #00000040'
                    : ' 0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                border: userRole === ROLES.ADMIN ? '1px solid #01623D' : null,
              }}
              onClick={handleClick}
            >
              {ROLES.REGISTRY === userRole ? 'Notify PD' : 'Save'}
            </CCButton>
            {userRole === ROLES.ADMIN &&
            currentProjectDraftDetails?.project_status === 1250 ? (
              <CCButton
                sx={{
                  background:
                    'linear-gradient(270deg, #01623D -55.94%, #8BD3DC 177.5%)',
                  padding: '13px 24px 13px 24px',
                  color: '#fff',
                  fontWeight: 600,
                  minWidth: 0,
                  width: '139px',
                }}
                onClick={() => {
                  sumbitAdminChangestoPD()
                }}
              >
                Notify PD
              </CCButton>
            ) : null}
          </Box>
        </Paper>
      </Box>
    </>
  )
}

export default TitleComp
