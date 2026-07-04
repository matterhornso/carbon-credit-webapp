import { Box } from '@mui/material'
import React from 'react'
import PdfComp from '../../../../pages/PdfV2/PdfComp'

const RightSection = () => {
  return (
    <Box
      sx={{
        background: '#fff',
        borderRadius: '0 16px 16px 0',
        width: '100%',
        height: '100%',
        //ml: 13,
        //mt: 5,
      }}
    >
      <Box sx={{ py: 5 }}>
        <PdfComp />
      </Box>
    </Box>
  )
}

export default RightSection
