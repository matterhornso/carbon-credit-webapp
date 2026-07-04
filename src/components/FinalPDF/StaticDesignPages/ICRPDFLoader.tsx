import React from 'react'
import { Box, Skeleton } from '@mui/material'

function ICRPDFLoader() {
  return (
    <Box
      sx={{
        maxWidth: '800px',
        px: 6,
        textAlign: 'center',
        marginX: 'auto',
        bgcolor: '#FFF',
        height: '842px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          mt: 3,
        }}
      >
        <Skeleton
          variant="rectangular"
          height={60}
          sx={{
            width: '240px',
            background: '#E6F5F7',
            borderRadius: '6px',
          }}
          animation="wave"
        />
      </Box>
      <Box
        sx={{
          mt: 15,
        }}
      >
        <Skeleton
          variant="rectangular"
          height={140}
          sx={{
            mt: 3,
            width: '480px',
            background: '#E6F5F7',
            borderRadius: '6px',
          }}
          animation="wave"
        />
      </Box>
      <Box
        sx={{
          mt: 6,
        }}
      >
        <Skeleton
          variant="text"
          height={48}
          sx={{
            mt: 3,
            width: '560px',
            background: '#E6F5F7',
            borderRadius: '6px',
          }}
          animation="wave"
        />
      </Box>
      <Box sx={{ alignSelf: 'end' }}>
        <Skeleton
          variant="text"
          height={32}
          sx={{
            width: '360px',
            background: '#E6F5F7',
            borderRadius: '6px',
          }}
          animation="wave"
        />
      </Box>
      <Box sx={{ alignSelf: 'end' }}>
        <Skeleton
          variant="text"
          height={32}
          sx={{
            width: '360px',
            background: '#E6F5F7',
            borderRadius: '6px',
          }}
          animation="wave"
        />
      </Box>
    </Box>
  )
}

export default ICRPDFLoader
