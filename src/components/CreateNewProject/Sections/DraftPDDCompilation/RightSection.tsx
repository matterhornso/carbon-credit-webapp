import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import ArrowNavigation from '../../../ArrowNavigation/ArrowNavigation'
import { DraftPDDCompilationMenu } from './data'
import { setSubMenuIndex } from '../../../../redux/Slices/CreateNewProject/draftPDDCompilationSlice'
import { getLocalItem } from '../../../../utils/Storage'
import { useSaveProjectDraft } from '../../../../hooks/useSaveProjectDraft'
import {
  setBlockchainCallStatus,
  setOpenBlockchainStatusModal,
  setPrimaryText,
  setSecondaryText,
} from '../../../../redux/Slices/blockchainStatusModalSlice'
import { BLOCKCHAIN_STATUS } from '../../../../config/constants.config'
import LoderOverlay from '../../../LoderOverlay'
import { checkDraftPDDCompleted } from '../../../../utils/projectDraft.util'

const RightSection = () => {
  const dispatch = useAppDispatch()
  const role = getLocalItem('userDetails')?.type

  const { updateProjectDraftStatus } = useSaveProjectDraft()

  const menuIndex: any = useAppSelector(
    ({ draftPDDCompilation }) => draftPDDCompilation?.menuIndex,
    shallowEqual
  )

  const subMenuIndex: any = useAppSelector(
    ({ draftPDDCompilation }) => draftPDDCompilation?.subMenuIndex,
    shallowEqual
  )

  const currentProjectDraftDetails = useAppSelector(
    ({ projectDraftDetails }) => projectDraftDetails.currentProjectDraftDetails
  )
  const draftPDDCompilationV2ReduxValues = useAppSelector(
    ({ draftPDDCompilationV2 }) => draftPDDCompilationV2
  )

  const [loading, setLoading] = useState<any>(false)

  // useEffect(() => {
  //   if (
  //     role === 'ISSUER' &&
  //     currentProjectDraftDetails &&
  //     currentProjectDraftDetails?.project_status === 1060 &&
  //     draftPDDCompilationV2ReduxValues &&
  //     checkDraftPDDCompleted(draftPDDCompilationV2ReduxValues)
  //   ) {
  //     // return
  //     // dispatch(setRetryFunction(handleSubmitToAdmin))
  //     checkIsDraftPDDCompleted()
  //   }
  // }, [currentProjectDraftDetails])

  const checkIsDraftPDDCompleted = async () => {
    try {
      setLoading(true)
      // dispatch(setOpenBlockchainStatusModal(true))
      // dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.PENDING))
      // dispatch(setPrimaryText('In Progress'))
      // dispatch(setSecondaryText('Please wait while we update the status'))
      const res: any = await updateProjectDraftStatus()
      // if (res.success) {
      setLoading(false)
      // dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.COMPLETED))
      // dispatch(setPrimaryText('Successfully updated'))
      // dispatch(setSecondaryText('Project status updated'))
      // } else {
      // dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
      // dispatch(setPrimaryText('Failed'))
      // dispatch(setSecondaryText('Something went wrong. Please try again.'))
      // }
    } catch (e) {
      setLoading(false)
      // dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
      // dispatch(setPrimaryText('Failed'))
      // dispatch(setSecondaryText('Something went wrong. Please try again.'))
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    renderSection()
    renderTitle()
    getMaxSteps()
  }, [menuIndex, subMenuIndex])

  const renderSection = () => {
    if (menuIndex >= 0 && subMenuIndex >= 0) {
      const selectedSection: any = DraftPDDCompilationMenu[menuIndex]
      if (selectedSection?.component) {
        const SubSection: any = selectedSection?.component
        return <SubSection />
      } else {
        const SubSection: any =
          selectedSection?.subMenu[subMenuIndex]?.component
        if (SubSection) return <SubSection />
        else return null
      }
    }
  }

  const renderTitle = () => {
    if (menuIndex >= 0 && subMenuIndex >= 0) {
      const title: any = DraftPDDCompilationMenu[menuIndex]?.menuName
      return title || ''
    }
  }

  const getMaxSteps = () => {
    if (menuIndex >= 0 && subMenuIndex >= 0) {
      const noOfSteps: any = DraftPDDCompilationMenu[menuIndex]?.subMenu.length
      return noOfSteps || 0
    }
  }

  return (
    <>
      <LoderOverlay show={loading} />
      <Box
        sx={{
          p: 5,
          background: '#fff',
          height: '100%',
          boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
          borderRadius: '0 16px 16px 0',
          overflowY: 'scroll',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              fontSize: '24px',
              fontWeight: 400,
              // color: subMenuIndex === 0 ? '#029FB3' : ''
            }}
          >
            {renderTitle()}
          </Box>
          <Box>
            <ArrowNavigation
              step={subMenuIndex}
              stepMaxValue={getMaxSteps()}
              setStep={(step: number) => {
                dispatch(setSubMenuIndex(step))
              }}
            />
          </Box>
        </Box>
        {renderSection()}
      </Box>
    </>
  )
}

export default RightSection
