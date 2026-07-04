import { Box, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CCButton from '../../../../atoms/CCButton'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { ProjectDraftCalls } from '../../../../api/projectDraftCalls.api'
import { BLOCKCHAIN_STATUS, ROLES } from '../../../../config/constants.config'
import {
  setBlockchainCallStatus,
  setOpenBlockchainStatusModal,
  setPrimaryText,
  setRetryFunction,
  setSecondaryText,
} from '../../../../redux/Slices/blockchainStatusModalSlice'
import { useSaveProjectDraft } from '../../../../hooks/useSaveProjectDraft'
import { getLocalItem } from '../../../../utils/Storage'
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'
import LoderOverlay from '../../../LoderOverlay'
import { setOpenRegistryActionModal } from '../../../../redux/Slices/registrySlice'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'

const PdfActions = () => {
  const dispatch = useAppDispatch()
  const role = getLocalItem('userDetails')?.type

  const { updateProjectDraftStatus } = useSaveProjectDraft()

  const pdfActions = useAppSelector(
    ({ pdfComments }) => pdfComments.exportPdfFn
  )
  const currentProjectDraftDetails = useAppSelector(
    ({ projectDraftDetails }) => projectDraftDetails.currentProjectDraftDetails
  )

  const [loading, setLoading] = useState<boolean>(false)
  const [pdfBlobUrl, setPdfBlobUrl] = useState<any>()

  useEffect(() => {
    if (pdfActions?.pdfReady) {
      setPdfBlobUrl(pdfActions?.pdfUrl || '')
      currentProjectDraftDetails?.project_status === 1100 &&
        updatePdfGeneratedStatus()
    }
  }, [pdfActions])

  useEffect(() => {
    if (
      currentProjectDraftDetails?.project_status === 1400 &&
      ROLES.REGISTRY === role
    ) {
      startRegistryReview()
    }
  }, [currentProjectDraftDetails])

  const startRegistryReview = async () => {
    try {
      setLoading(true)
      const res = await updateProjectDraftStatus()
      if (res?.success) {
        setLoading(false)
      } else {
        alert('Something went wrong in reviewing the project.')
      }
    } catch (e) {
      console.log(e)
    }
  }

  const updatePdfGeneratedStatus = async () => {
    try {
      dispatch(setOpenBlockchainStatusModal(true))
      dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.PENDING))
      dispatch(setPrimaryText('In Progress'))
      dispatch(setSecondaryText('Generating Pdf inProgress'))
      const res = await updateProjectDraftStatus()
      if (res?.success) {
        dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.COMPLETED))
        dispatch(setPrimaryText('Generated'))
        dispatch(setSecondaryText(`PDF generated Successfully`))
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handlePdfExport = () => {
    if (!pdfActions?.pdfGenerator) {
      return
    }
    pdfActions?.pdfGenerator.download('download.pdf')
  }

  const submitProject = async () => {
    try {
      const userRole: any =
        role === 'ADMIN' ? 'REGISTRY' : role === 'ISSUER' && 'ADMIN'

      dispatch(setOpenBlockchainStatusModal(true))
      dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.PENDING))
      dispatch(setPrimaryText('In Progress'))
      dispatch(
        setSecondaryText(`Submitting the project to ${userRole.toLowerCase()}`)
      )
      const res: any = await updateProjectDraftStatus()
      if (res.success) {
        dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.COMPLETED))
        dispatch(setPrimaryText('Submitted'))
        dispatch(
          setSecondaryText(`Submitted project to ${userRole.toLowerCase()}`)
        )
      } else {
        dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
        dispatch(setPrimaryText('Failed'))
        dispatch(setSecondaryText('Something went wrong. Please try again.'))
      }
    } catch (e) {
      dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
      dispatch(setPrimaryText('Failed'))
      dispatch(setSecondaryText('Something went wrong. Please try again.'))
      console.log('Error in updating the status:', e)
    }
  }

  const openApiModal = () => {
    dispatch(setRetryFunction(submitProject))
    submitProject()
  }

  const registryProjectAction = async (registryAction: boolean) => {
    if (
      typeof registryAction !== 'boolean' ||
      currentProjectDraftDetails?.project_status !== 1450
    ) {
      return
    }
    try {
      setLoading(true)
      const res = await updateProjectDraftStatus(registryAction)
      if (res?.success) {
        alert('Action successfully completed.')
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <LoderOverlay show={loading} />
      <Paper sx={{ py: 2, pr: '10px', ml: '30px', width: '96%', mb: '3px' }}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {role === ROLES.REGISTRY &&
          currentProjectDraftDetails &&
          currentProjectDraftDetails.project_status === 1450 ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                columnGap: '10px',
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <CCButton
                  onClick={() => registryProjectAction(true)}
                  sx={{
                    background: '#31A77C',
                    borderRadius: '24px',
                    p: '9px 16px 9px 12px',
                    fontWeight: 600,
                    fontSize: 14,
                    color: 'white',
                  }}
                >
                  Accept
                </CCButton>
                <Box sx={{ position: 'absolute', top: '11px', right: '19px' }}>
                  <DoneIcon
                    sx={{ color: 'white', width: '30px', height: '20px' }}
                  />
                </Box>
              </Box>
              <Box sx={{ position: 'relative' }}>
                <CCButton
                  onClick={() => dispatch(setOpenRegistryActionModal(true))}
                  sx={{
                    background: '#D76262',
                    borderRadius: '24px',
                    p: '9px 16px 9px 12px',
                    fontWeight: 500,
                    fontSize: 14,
                    color: 'white',
                  }}
                >
                  Reject
                </CCButton>
                <Box sx={{ position: 'absolute', top: '11px', right: '19px' }}>
                  <CloseIcon
                    sx={{ color: 'white', width: '30px', height: '20px' }}
                  />
                </Box>
              </Box>
            </Box>
          ) : (
            ((role === 'ISSUER' &&
              currentProjectDraftDetails?.project_status === 1150) ||
              (role === 'ADMIN' &&
                currentProjectDraftDetails?.project_status === 1300)) && (
              <CCButton
                variant="outlined"
                sx={{
                  background: '#fff',
                  fontWeight: 500,
                  cursor: 'pointer',
                  '&:hover': { background: '#006B5E14' },
                }}
                onClick={openApiModal}
              >
                {role === 'ISSUER' ? 'Submit to Admin' : 'Submit to Registry'}
              </CCButton>
            )
          )}
          <Box
            sx={{
              background: '#fff',
              fontWeight: 500,
              cursor: 'pointer',
              mr: 2,
              mt: '4px',
            }}
            onClick={handlePdfExport}
          >
            <FileDownloadOutlinedIcon
              sx={{ color: '#029FB3', width: '38px', height: '38px' }}
            />
          </Box>
          <Box>
            {pdfBlobUrl && (
              <a
                href={pdfBlobUrl}
                target="_blank"
                rel="noreferrer"
                style={{ whiteSpace: 'nowrap', paddingRight: '18px' }}
              >
                <OpenInNewIcon
                  sx={{ color: '#029FB3', width: '34px', height: '34px' }}
                />
              </a>
            )}
          </Box>
        </Box>
      </Paper>
    </>
  )
}

export default PdfActions
