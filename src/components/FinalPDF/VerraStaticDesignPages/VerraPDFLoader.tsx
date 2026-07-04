import { Box, Skeleton } from '@mui/material'
import React from 'react'

function VerraPDFLoader() {
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
          mt: 8,
        }}
      >
        <Skeleton
          variant="rectangular"
          height={140}
          sx={{
            width: '440px',
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
          height={56}
          sx={{
            mt: 3,
            width: '560px',
            background: '#E6F5F7',
            borderRadius: '6px',
          }}
          animation="wave"
        />
      </Box>
      <Box
        sx={{
          mt: 5,
        }}
      >
        <Skeleton
          variant="rectangular"
          height={34}
          sx={{
            width: '140px',
            background: '#E6F5F7',
            borderRadius: '6px',
          }}
          animation="wave"
        />
      </Box>
      <Box
        sx={{
          mt: 7,
          width: '80%',
        }}
      >
        {Array.from(new Array(7)).map((elem: any, index: number) => (
          <Box key={index} sx={{ mt: '2px', display: 'flex', gap: '2px' }}>
            <Box sx={{ flex: 4 }}>
              <Skeleton
                variant="rectangular"
                height={28}
                sx={{
                  width: '100%',
                  background: '#E6F5F7',
                  borderRadius: '6px',
                }}
                animation="wave"
              />
            </Box>
            <Box sx={{ flex: 8 }}>
              <Skeleton
                variant="rectangular"
                height={28}
                sx={{
                  // width: '360px',
                  background: '#E6F5F7',
                  borderRadius: '6px',
                }}
                animation="wave"
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default VerraPDFLoader
