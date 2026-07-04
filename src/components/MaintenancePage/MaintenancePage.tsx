import { Grid, Typography } from '@mui/material'
import React from 'react'
import EngineeringIcon from '@mui/icons-material/Engineering'
import { Colors } from '../../theme'

const MaintenancePage = () => {
  return (
    <Grid
      container
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'100vh'}
      sx={{ background: Colors.darkPrimary1 }}
    >
      <Grid container justifyContent={'center'} alignItems={'center'}>
        <EngineeringIcon
          sx={{
            fontSize: '64px',
            color: Colors.darkPrimary2,
          }}
        />
      </Grid>
      <Grid
        container
        sx={{ mt: 2 }}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Grid item xs={10}>
          <Typography
            sx={{ textAlign: 'center', color: Colors.secondary }}
            variant="h2"
            component="div"
          >
            We’ll be back soon!
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ mt: 1 }}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Grid item xs={10}>
          <Typography
            sx={{
              textAlign: 'center',
              color: Colors.darkPrimary2,
            }}
            variant="h6"
            component="div"
          >
            Sorry for the inconvenience but we’re performing some maintenance at
            the moment. we’ll be back online shortly!
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default MaintenancePage
