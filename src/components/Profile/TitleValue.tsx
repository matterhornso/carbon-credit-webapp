// React Imports
import React, { FC, useEffect } from 'react'

// MUI Imports
import { Box, Typography } from '@mui/material'

// Local Imports
import ShortenedIDComp from '../../atoms/ShortenedIDComp.tsx/ShortenedIDComp'

interface TitleValueProps {
  title?: any
  value?: any
  titleStyle?: any
  valueStyle?: any
}

const TitleValue: FC<TitleValueProps> = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 2,
      }}
    >
      <Typography sx={[{ fontWeight: 400, fontSize: 14 }, props?.titleStyle]}>
        {props.title}
      </Typography>

      <Typography
        sx={[{ fontWeight: 400, fontSize: 14, ml: 1 }, props?.valueStyle]}
      >
        {props.value === undefined || props.value === '' ? '-' : props.value}
      </Typography>
    </Box>
  )
}

export default TitleValue
