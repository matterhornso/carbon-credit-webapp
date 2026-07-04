import { Box, Divider } from '@mui/material'
import React from 'react'

const LeftSection = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '75vh',
        overflowY: 'auto',
        p: 2,
        background: '#E6F5F7',
        height: '100%',
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
        borderRadius: '16px 0 0 16px',
      }}
    >
      <Box
        sx={{
          py: 1,
          px: 2,
          background: '#BEF7FE',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 500,
        }}
      >
        Select & Review
      </Box>
      <Divider sx={{ mt: 2 }} />
    </Box>
  )
}

export default LeftSection
