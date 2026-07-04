import { Box, Typography } from '@mui/material'
import React from 'react'
import icr_logo from '../../assets/Images/logo/ICR-Logo.svg'

const IntroPage = () => {
  return (
    <Box
      sx={{
        width: '800px',
        boxShadow: '0px 4px 12px rgba(1, 67, 75, 0.16)',
      }}
    >
      <Box
        sx={{
          px: 5,
          pt: 5,
          pb: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ color: '#009B72', fontWeight: 700, fontSize: 22 }}>
          Climat
        </Typography>
        <Box sx={{ width: '100%', pt: 18, pb: 9 }}>
          <img src={icr_logo} alt="icr" width={'100%'} />
        </Box>
        <Box sx={{ alignSelf: 'flex-end', textAlign: 'end', px: 2 }}>
          <Box>
            <Typography sx={{ fontWeight: 400, fontSize: 28 }}>
              Project Name
            </Typography>
            <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
              Methodology reference
            </Typography>
          </Box>
          <Box sx={{ py: 10 }}>
            <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
              Abstract
            </Typography>
            <Typography sx={{ fontWeight: 400, fontSize: 12 }}>
              Provide a brief description of the project no longer than 500
              letters.
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 400, fontSize: 28 }}>Logo</Typography>
            <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
              Project Proponent
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default IntroPage
