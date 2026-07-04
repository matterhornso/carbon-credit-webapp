import React from 'react'
import CreateNewProject from '../CreateNewProject'
import { Box, Paper } from '@mui/material'
import RegistryActionModal from './RegistryActionModal'

const RegistryReviewPdfReport = () => {
  return (
    <>
      <Box>
        <CreateNewProject />
      </Box>
      <RegistryActionModal />
    </>
  )
}

export default RegistryReviewPdfReport
