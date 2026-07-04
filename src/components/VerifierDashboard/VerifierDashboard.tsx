// React Imports
import React from 'react'

// MUI Imports
import { Box, Grid, Paper, Typography } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import WelcomeIllustration from './WelcomeIllustration'
import ProfileCompletion from './ProfileCompletion'

const VerifierDashboard = () => {
  return (
    <Box sx={{ p: 0 }}>
      <Grid
        container
        xs={12}
        sx={{ p: 0, border: '0px solid' }}
        justifyContent={'space-between'}
      >
        <Grid item xs={12}>
          <BackHeader sx={{ mb: 3 }} title="Dashboard" iconDisable />
        </Grid>

        <WelcomeIllustration />

        <Grid item xs={3} sx={{ pl: 1 }}>
          <ProfileCompletion />
        </Grid>
      </Grid>
    </Box>
  )
}

export default VerifierDashboard
