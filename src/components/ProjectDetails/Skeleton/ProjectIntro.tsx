import { Grid, Skeleton } from '@mui/material'

import React from 'react'

const ProjectIntro = () => {
  return (
    <Grid
      container
      sx={{
        height: '372px',

        width: '1184px',
        // backgroundColor: '#FAFAFA',
        borderRadius: '8px',
        p: 2,
        // boxShadow: '0px -2px 20px rgba(0, 0, 0, 0.02)',
      }}
      xs={12}
    >
      <Skeleton
        variant="rectangular"
        sx={{
          width: '614px',
          height: '10px',
          background: 'linear-gradient(270deg, #EBF0F0 0%, #E5F2ED 100%)',
          borderRadius: '14px',
        }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          width: '939px',
          height: '50px',
          background: 'linear-gradient(270deg, #EBF0F0 0%, #E5F2ED 100%)',
          borderRadius: '71px',
          mt: 3,
        }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          width: '939px',
          height: '50px',
          background: 'linear-gradient(270deg, #EBF0F0 0%, #E5F2ED 100%)',
          borderRadius: '71px',
          mt: 1,
        }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          width: '939px',
          height: '50px',
          background: 'linear-gradient(270deg, #EBF0F0 0%, #E5F2ED 100%)',
          borderRadius: '71px',
          mt: 1,
        }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          width: '614px',
          height: '10px',
          background: 'linear-gradient(270deg, #EBF0F0 0%, #E5F2ED 100%)',
          borderRadius: '14px',
          mt: 3,
        }}
      />
    </Grid>
  )
}

export default ProjectIntro
