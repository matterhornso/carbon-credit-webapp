import { Paper, Typography, Box, Grid } from '@mui/material'
import React from 'react'
import CCButton from '../../atoms/CCButton'
// import ProfileCompletion from '../Projects/ProfileCompletion'
// import { useAppDispatch } from '../../hooks/reduxHooks'
// import { setLoadWallet } from '../../redux/Slices/walletSlice'
import { Images } from '../../theme'
import { pathNames } from '../../routes/pathNames'
import { useNavigate } from 'react-router-dom'

const OnBoardingIssuer = () => {
  // const dispatch = useAppDispatch()
  const navigate = useNavigate()
  return (
    <>
      <Paper
        elevation={2}
        sx={{
          backgroundImage: `url(${Images.IssuerOnboardingBg})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left bottom',
        }}
      >
        <Grid container sx={{ p: 2 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ pb: 3 }}>
              <Typography
                sx={{ color: '#1D4B44', fontSize: 22, fontWeight: 400, pb: 2 }}
              >
                Welcome!
              </Typography>
              <Typography sx={{ fontSize: 16, fontWeight: 400 }}>
                Ready to go? Start filling the following forms to complete the
                onboarding process
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                // minHeight: 210,
                my: 3,
                background: 'rgba(0, 107, 94, 0.05)',
                borderRadius: 3,
                p: 2,
                // p: 3,
              }}
            >
              <Typography
                sx={{ color: '#1D4B44', fontSize: 22, fontWeight: 400 }}
              >
                Profile Setup
              </Typography>
              <Typography
                sx={{
                  color: '#1D4B44',
                  fontSize: 14,
                  fontWeight: 400,
                  py: 1,
                }}
              >
                Complete your onboarding process by filling your profile details
              </Typography>
              <CCButton
                rounded
                onClick={() => navigate(pathNames.COMPLETE_PROFILE)}
                sx={{
                  minWidth: 0,
                  padding: '7px 34px',
                  background: '#006B5E',
                  color: '#FFFFFF',
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                Start
              </CCButton>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default OnBoardingIssuer
//<Grid container direction="row" justifyContent={'space-between'}>
//  <Grid item xs={9}>

//</Grid>
{
  /*<Grid item xs={3} sx={{ pl: 4 }}>
        <ProfileCompletion />
      </Grid>*/
}
//</Grid>
