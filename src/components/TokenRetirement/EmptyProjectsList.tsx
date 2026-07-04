// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Box, Grid, Typography, Paper } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

// Local Imports
import noTokenRetire from '../../assets/Images/illustrations/noTokenRetire.png'
import { Colors } from '../../theme'
import CCButton from '../../atoms/CCButton'

interface EmptyProjectsListProps {}

const EmptyProjectsList: FC<EmptyProjectsListProps> = (props) => {
  return (
    <Paper
      sx={{
        height: '540px',
        borderRadius: '8px',
        width: '100%',
        mt: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ height: '50%' }} component={'img'} src={noTokenRetire} />
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 500,
          color: Colors.textColorDarkGreen,
          mt: 3,
        }}
      >
        No tokens to retire yet!
      </Typography>

      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: Colors.textColorDarkGreen,
          mt: 2,
        }}
      >
        Go carbon neutral by retiring carbon tokens and claiming the underlying
        environmental benefit of the carbon offset.
      </Typography>

      <CCButton
        variant="contained"
        sx={{
          backgroundColor: '#006B5E',
          textTransform: 'none',
          width: '180px',
          borderRadius: '100px',
          marginBottom: 4,
          marginTop: 3,
          padding: '10px',
        }}
        onClick={() => undefined}
      >
        <Typography sx={{ fontSize: 14, fontWeight: 500, color: 'white' }}>
          Explore Marketplace
        </Typography>
      </CCButton>
    </Paper>
  )
}

export default EmptyProjectsList
