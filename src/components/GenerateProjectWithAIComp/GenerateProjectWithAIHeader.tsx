import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import BackHeader from '../../atoms/BackHeader/BackHeader'
import CCButton from '../../atoms/CCButton'

const GenerateProjectWithAIHeader = () => {
  return (
    <Stack
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      {/* <BackHeader
        title={'Back'}
        titleSx={{ color: '#5897C1', fontSize: 14, fontWeight: 500 }}
      /> */}
      <Typography
        sx={{
          color: '#0D0E0E',
          fontSize: 28,
          fontWeight: 400,
        }}
      >
        Create New Project
      </Typography>
      <CCButton
        sx={{
          background:
            'linear-gradient(270deg, #01623D -55.94%, #8BD3DC 177.5%)',
          textTransform: 'none',
          borderRadius: '6px',
          padding: '13px 24px',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          fontSize: 16,
          fontWeight: 600,
          color: '#FFFFFF',
        }}
      >
        {'Save'}
      </CCButton>
    </Stack>
  )
}

export default GenerateProjectWithAIHeader
