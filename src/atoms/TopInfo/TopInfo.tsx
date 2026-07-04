// React Imports
import { Box, Typography } from '@mui/material'
import React, { FC } from 'react'

// MUI Imports

// Local Imports

interface TopInfoProps {
    title?: string,
    subtitle?: string,
}
const TopInfo: FC<TopInfoProps> = (props) => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100px',
        marginTop: '15px',
        backgroundColor: '#DDD',
        borderRadius: '5px',
        paddingLeft: 5,
        paddingRight: 2,
        paddingTop: 1,
        paddingBottom: 2,
      }}
    >
      <Typography sx={{ fontSize: 24, fontWeight: 500 }}>
        {props.title}
      </Typography>

      <Typography sx={{ fontSize: 14, fontWeight: 400, marginTop: 1 }}>
        {props.subtitle}
      </Typography>
    </Box>
  )
}

export default TopInfo
