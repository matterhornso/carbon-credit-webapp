import { Box } from '@mui/material'
import React from 'react'
import CCTable from '../../atoms/CCTable'

const headings = [
  'Created At',
  'Project Name',
  'Project Type',
  'Location',
  'Verification Status',
]
const rows = [
  ['07.07.2022', 'Project Name', 'Project Type', 'Mumbai, India', 'Pending'],
  ['07.07.2022', 'Project Name', 'Project Type', 'Mumbai, India', 'Pending'],
  ['07.07.2022', 'Project Name', 'Project Type', 'Mumbai, India', 'Pending'],
  ['07.07.2022', 'Project Name', 'Project Type', 'Mumbai, India', 'Pending'],
  ['07.07.2022', 'Project Name', 'Project Type', 'Mumbai, India', 'Pending'],
  ['07.07.2022', 'Project Name', 'Project Type', 'Mumbai, India', 'Pending'],
]

const ProjectsTable = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <CCTable headings={headings} rows={rows} />
    </Box>
  )
}

export default ProjectsTable
