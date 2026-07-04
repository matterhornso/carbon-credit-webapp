// React Imports
import React, { FC, useEffect } from 'react'

// MUI Imports
import { Box, Typography } from '@mui/material'

// Local Imports
import ShortenedIDComp from '../../atoms/ShortenedIDComp.tsx/ShortenedIDComp'

interface KeyValueProps {
  title?: any
  value?: any
}

const KeyValue: FC<KeyValueProps> = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 2,
        maxWidth: '100%',
      }}
    >
      <Typography
        sx={{ fontWeight: 400, fontSize: 14, textAlign: 'left', width: '50%' }}
      >
        {props.title}
      </Typography>

      <Typography
        sx={{ fontWeight: 400, fontSize: 14, textAlign: 'left', width: '50%' }}
      >
        {props.value}
      </Typography>
    </Box>
  )
}

export default KeyValue
