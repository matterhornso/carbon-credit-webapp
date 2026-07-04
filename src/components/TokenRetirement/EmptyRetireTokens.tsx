// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Box, Grid, Typography, Paper } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

// Local Imports
import noTokenRetire from '../../assets/Images/illustrations/noTokenRetire.png'
import { Colors } from '../../theme'
import CCButton from '../../atoms/CCButton'

interface EmptyRetireTokensProps {}

const EmptyRetireTokens: FC<EmptyRetireTokensProps> = (props) => {
  return (
    <Paper
      sx={{
        height: '150px',
        borderRadius: '8px',
        width: '100%',
        mt: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        pl: 3,
      }}
    >
      <Box sx={{ height: '50%' }} component={'img'} src={noTokenRetire} />
    </Paper>
  )
}

export default EmptyRetireTokens
