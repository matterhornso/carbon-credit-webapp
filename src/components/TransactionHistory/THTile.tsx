// React Imports
import React, { FC, useEffect } from 'react'

// MUI Imports
import { Box, Typography } from '@mui/material'

// Local Imports
import ShortenedIDComp from '../../atoms/ShortenedIDComp.tsx/ShortenedIDComp'

interface THTileProps {
  title?: any
  value?: any
}

const THTile: FC<THTileProps> = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 2,
        maxWidth: '250px',
        pr: 2,
      }}
    >
      <Typography sx={{ fontWeight: 400, fontSize: 14 }}>
        {props.title}
      </Typography>

      {props.value?.length > 20 && (
        <ShortenedIDComp referenceId={props.value} width="fit-content" />
      )}

      {(props.value === undefined || props.value === '') && '-'}

      {props.value?.length < 20 && (
        <Typography sx={{ fontWeight: 400, fontSize: 14, textAlign: 'right' }}>
          {props.value}
        </Typography>
      )}
    </Box>
  )
}

export default THTile
