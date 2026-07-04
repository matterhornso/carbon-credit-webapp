import React from 'react'
import { Paper, Box, Typography, Grid } from '@mui/material'
import { Colors2 } from '../../theme'
import ProjectsStats from '../ProjectStats/ProjectsStats'
import ProjectsTab from '../Projects/ProjectsTab'
import Projects from './Projects'
const AdminDashboardComp = () => {
  return (
    <Paper sx={{ padding: 2.5, borderRadius: 5 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 2,
          mb: 3,
          ml: 2,
        }}
      >
        <Typography
          sx={{ color: Colors2.OnSurface, fontSize: 32, fontWeight: 500 }}
        >
          Overview
        </Typography>
      </Box>
      <Grid container>
        <Grid item md={12}>
          <Grid container>
            <Grid item md={12} sm={12} sx={{ pr: 2 }}>
              <ProjectsStats />
              <Projects />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default AdminDashboardComp
