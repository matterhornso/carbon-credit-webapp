// React Imports
import React, { FC, useEffect } from 'react'

// MUI Imports
import { Grid, Box, Typography, Paper, Divider } from '@mui/material'

// Local Imports

import { Colors } from '../../theme'

import CCTable from '../../atoms/CCTable'

import { ROLES } from '../../config/roles.config'
import NoProjectsListed from '../../assets/Images/illustrations/NoProjectsListed.png'

interface ProjectListProps {
  tableData?: any
  loading?: boolean
  userType?: any
}

const headings = ['Reference ID', 'Creation Dt', 'Project Name', 'Location']
const headingsVerifer = [
  'Reference ID',
  'Recieved On',
  'Issuer',
  'Project Name',
  'Location',
]

const ProjectList: FC<ProjectListProps> = (props) => {
  const { tableData, loading, userType } = props

  return (
    <Paper
      sx={{
        minHeight: 330,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: '8px',

        mt: 2,
        padding: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 400,
          color: Colors.textColorDarkGreen,
          mt: 1,
        }}
      >
        Projects
      </Typography>
      <Grid xs={12} style={{ width: '100%' }}>
        {tableData.length > 0 ? (
          userType === ROLES.ISSUER ? (
            <CCTable
              headings={headings}
              rows={tableData}
              pagination
              sx={{ height: '75%' }}
            />
          ) : (
            <CCTable headings={headingsVerifer} rows={tableData} />
          )
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              component="img"
              src={NoProjectsListed}
              sx={{ width: { xl: '40%', lg: '60%', md: '80%', xs: '70%' } }}
            />
          </Box>
        )}
      </Grid>
    </Paper>
  )
}

export default ProjectList
