import { Box, Typography } from '@mui/material'
import React from 'react'
import icr_logo from '../../assets/Images/logo/ICR_LOGO_1.svg'

const Layout = ({ children }: any) => {
  return (
    <Box
      sx={{ width: '800px', boxShadow: '0px 4px 12px rgba(1, 67, 75, 0.16)' }}
    >
      <Box
        sx={{
          px: 3,
          pt: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: 1,
          }}
        >
          <img src={icr_logo} alt="icr" width={42} />
          <Typography sx={{ fontWeight: 400, fontSize: 11 }}>
            ICR project design description v.1.0
          </Typography>
        </Box>
        <Box
          sx={{
            borderTop: '1px solid #8BD3DC',
            borderBottom: '1px solid #8BD3DC',
            height: '762px',
            pt: 2,
          }}
        >
          {children}
        </Box>
        <Box sx={{ textAlign: 'center', py: 2 }}>1</Box>
      </Box>
    </Box>
  )
}

export default Layout
