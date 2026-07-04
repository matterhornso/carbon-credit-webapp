import React from 'react'
import { Box, Grid, Paper, Typography } from '@mui/material'
import { DashboardPageProps } from './DashboardPage.interface'

import IssuerProjectWelcomePage from '../IssuerProjectWelcomePage'
import LoadWallet from '../../components/LoadWallet'
const DashboardPage = (props: DashboardPageProps) => {
  return (
    <Grid container padding={4}>
      <Typography variant="h5" sx={{ paddingY: 3 }}>
        Projects
      </Typography>
      {/* <LoadWallet /> */}
      <IssuerProjectWelcomePage />
    </Grid>
  )
}

export default DashboardPage
