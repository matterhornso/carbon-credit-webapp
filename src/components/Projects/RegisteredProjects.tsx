import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import CCButton from '../../atoms/CCButton'
import CCTable from '../../atoms/CCTable'
import { getLocalItem } from '../../utils/Storage'

const rows = [
  [
    '07.07.2022',
    'Project Name',
    'Project Type',
    'Mumbai, India',
    'Pending',
    '12/05/21',
    <CCButton
      key={'1'}
      sx={{
        fontSize: '14px',
        color: '#fff',
        padding: '4px 6px',
        borderRadius: '20px',
        background: '#006B5E',
      }}
      variant="contained"
    >
      Add Monthly Data
    </CCButton>,
  ],
  [
    '07.07.2022',
    'Project Name',
    'Project Type',
    'Mumbai, India',
    'Pending',
    '12/05/21',
    <CCButton
      key={'2'}
      sx={{
        fontSize: '14px',
        color: '#fff',
        padding: '4px 6px',
        borderRadius: '20px',
        background: '#006B5E',
      }}
      variant="contained"
    >
      Add Monthly Data
    </CCButton>,
  ],
  [
    '07.07.2022',
    'Project Name',
    'Project Type',
    'Mumbai, India',
    'Pending',
    '12/05/21',
    <CCButton
      key={'3'}
      sx={{
        fontSize: '14px',
        color: '#fff',
        padding: '4px 6px',
        borderRadius: '20px',
        background: '#006B5E',
      }}
      variant="contained"
    >
      Add Monthly Data
    </CCButton>,
  ],
  [
    '07.07.2022',
    'Project Name',
    'Project Type',
    'Mumbai, India',
    'Pending',
    '12/05/21',
    <CCButton
      key={'4'}
      sx={{
        fontSize: '14px',
        color: '#fff',
        padding: '4px 6px',
        borderRadius: '20px',
        background: '#006B5E',
      }}
      variant="contained"
    >
      Add Monthly Data
    </CCButton>,
  ],
]
const headings = [
  'Created At',
  'Project Name',
  'Project Type',
  'Location',
  'Verification Status',
  'Monthly Report Submission Dt',
  'Action',
]

const RegisteredProjects = () => {
  const userDetails = getLocalItem('userDetails')
  
  return (
    <Box sx={{ mt: 4 }}>
      <CCTable headings={headings} rows={rows} maxWidth={'100%'} />
    </Box>
  )
}

export default RegisteredProjects
