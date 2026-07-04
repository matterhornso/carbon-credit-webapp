import { Box, Typography } from '@mui/material'
import React from 'react'
import Layout from './Layout'

const ProjectDesignDescription = () => {
  return (
    <Box
      sx={{
        width: '600px',
        boxShadow: '2px 4px 20px rgba(1, 67, 75, 0.16)',
        mt: 4,
      }}
    >
      <Layout>
        <Box>
          <Typography sx={{ fontWeight: 400, fontSize: 24 }}>
            Project Design Description
          </Typography>
        </Box>
      </Layout>
    </Box>
  )
}

export default ProjectDesignDescription
