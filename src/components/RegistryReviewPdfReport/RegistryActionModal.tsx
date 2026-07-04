import { Box, Modal, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import CCButton from '../../atoms/CCButton'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setOpenRegistryActionModal } from '../../redux/Slices/registrySlice'
import {
  setBlockchainCallStatus,
  setOpenBlockchainStatusModal,
  setPrimaryText,
  setRetryFunction,
  setSecondaryText,
} from '../../redux/Slices/blockchainStatusModalSlice'
import { BLOCKCHAIN_STATUS } from '../../config/constants.config'
import { useSaveProjectDraft } from '../../hooks/useSaveProjectDraft'

const RegistryActionModal = () => {
  const dispatch = useAppDispatch()

  const { updateProjectDraftStatus } = useSaveProjectDraft()

  const openRegistryActionModal = useAppSelector(
    ({ registry }) => registry.openRegistryActionModal
  )
  const currentProjectDraftDetails = useAppSelector(
    ({ projectDraftDetails }) => projectDraftDetails.currentProjectDraftDetails
  )

  const [showModal, setShowModal] = useState<boolean>(true)
  const [rejectReason, setRejectReason] = useState<string>('')

  const rejectProjectApiCall = async () => {
    if (currentProjectDraftDetails?.project_status !== 1450) {
      return
    }
    try {
      dispatch(setOpenRegistryActionModal(false))
      dispatch(setOpenBlockchainStatusModal(true))
      dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.PENDING))
      dispatch(setPrimaryText('In Progress'))
      dispatch(setSecondaryText('Rejecting the project'))
      const res: any = await updateProjectDraftStatus(false, rejectReason)
      if (res?.success) {
        dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.COMPLETED))
        dispatch(setPrimaryText('Project Rejected'))
        dispatch(setSecondaryText(`Project rejected Successfully`))
      } else {
        dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
        dispatch(setPrimaryText('Error in rejecting the project.'))
        dispatch(
          setSecondaryText(`Something went wrong in rejecting the project`)
        )
      }
    } catch (e) {
      console.log(e)
      dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
      dispatch(setPrimaryText('Error in rejecting the project.'))
      dispatch(
        setSecondaryText(`Something went wrong in rejecting the project`)
      )
    }
  }

  const rejectProject = () => {
    dispatch(setRetryFunction(rejectProjectApiCall))
    rejectProjectApiCall()
  }

  return (
    <Modal
      open={openRegistryActionModal}
      //To Disable unwanted blue border
      disableAutoFocus={true}
      onClose={() => dispatch(setOpenRegistryActionModal(false))}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(56, 142, 129, 0.4)',
      }}
    >
      <Box
        sx={{
          height: '48%',
          width: '55%',
          maxHeight: '48%',
          background: 'white',
          borderRadius: 3,
          py: 3,
          px: 3,
        }}
      >
        <Typography
          sx={{ color: '#01434B', fontSize: 32, fontWeight: 400, pb: 1 }}
        >
          Reject project?
        </Typography>
        <Typography sx={{ fontSize: 14, fontWeight: 400, pb: 4 }}>
          Are you sure you want to reject ‘Panama Reforestation Services ARR’
          project? If yes, add your reason for rejection.
        </Typography>
        <Box sx={{ maxHeight: '160px', pb: 2 }}>
          <CCMultilineTextArea
            label={'Add reason for rejection'}
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            // sx={{ maxHeight: '40px' }}
          />
        </Box>
        <Stack
          flexDirection={'row'}
          justifyContent={'flex-end'}
          columnGap={2}
          sx={{ pt: 4 }}
        >
          <CCButton
            onClick={() => dispatch(setOpenRegistryActionModal(false))}
            variant="outlined"
            sx={{ background: 'white' }}
          >
            Cancel
          </CCButton>
          <CCButton
            onClick={() => {
              if (!rejectReason) {
                return
              }
              rejectProject()
            }}
            disabled={rejectReason.length === 0 ? true : false}
            sx={{ background: '#D76262', color: '#FFFFFF' }}
          >
            Reject
          </CCButton>
        </Stack>
      </Box>
    </Modal>
  )
}

export default RegistryActionModal
