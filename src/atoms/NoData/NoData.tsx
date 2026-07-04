// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Grid, Box, Typography } from '@mui/material'

// Local Imports
import EmptyReport from '../../assets/Images/illustrations/EmptyReport.png'
import { Colors } from '../../theme'

interface NoDataProps {
  title?: any
}

const NoData: FC<NoDataProps> = (props) => {
  return (
    <Box
      sx={{
        width: '100%',
        mt: 2,
        mb: 2,
        // height: '120px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        sx={{ fontSize: 16, fontWeight: 400, color: Colors.textColorDarkGreen }}
      >
        {props.title}
      </Typography>
      <Box sx={{ height: '200px', mt: 3 }} component={'img'} src={EmptyReport} />
    </Box>
  )
}

export default NoData
