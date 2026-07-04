import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC } from 'react'
import WebAppTraceHistory from '../ProjectDetails/TraceHistory/WebappTraceHistory'

interface TraceabilityTabProps {
  projectID: string
}
const TraceabilityTab: FC<TraceabilityTabProps> = ({ projectID }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography sx={{ fontSize: 18, color: '#1D4B44', mb: 2 }}>
        Trace History
      </Typography>
      <WebAppTraceHistory projectId={projectID} />
    </Box>
  )
}

export default TraceabilityTab
