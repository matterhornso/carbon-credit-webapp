import { Grid, Typography } from '@mui/material'
import React from 'react'
import ProjectsStats from '../ProjectStats/ProjectsStats'
import TokenRetirementProjectList from './TokenRetirementProjectList'

const TokenRetirement = () => {
  return (
    <Grid container px={1}>
      <Grid item>
        <Typography sx={{ fontSize: 28, fontWeight: 400, color: '#F15D5F' }}>
          Token Retirement
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ProjectsStats />
      </Grid>
      <Grid item xs={12}>
        <TokenRetirementProjectList />
      </Grid>
    </Grid>
  )
}

export default TokenRetirement
