// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Box, Grid, Paper, Typography } from '@mui/material'

// Local Imports
import { Colors } from '../../theme'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import ProfileCard from '../../atoms/ProfileCard/ProfileCard'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setLoadWallet } from '../../redux/Slices/walletSlice'
import LoadWallet from '../LoadWallet'
import OnBoardingIllustration from '../../assets/Images/illustrations/OnBoardingIllustration.svg'

interface WelcomeIllustrationProps {}

const WelcomeIllustration: FC<WelcomeIllustrationProps> = (props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  return (
    <>
      <Grid item xs={9} sx={{ pr: 1 }}>
        <Paper
          sx={{
            // height: '600px',
            width: '100%',
            borderRadius: '8px',
            backgroundColor: Colors.white,
            p: 2,
            position: 'relative',
          }}
        >
          <Grid container columnSpacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 400,
                  color: Colors.darkPrimary1,
                }}
              >
                Welcome!
              </Typography>

              <Typography sx={{ fontSize: 16, fontWeight: 400, mt: 1 }}>
                Ready to go? Start filling the following forms to complete the
                onboarding process
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <ProfileCard
                title="Profile Setup"
                content="Complete your profile info to get started"
                buttonText="Start"
                onClickFn={() => navigate(pathNames.VERIFIER_PROFILE_SETUP)}
              />
            </Grid>
            {/* <Grid item xs={6}>
              <ProfileCard
                title="Create/Link Wallet"
                content="Create a new wallet or link your already existing wallet to our platform for a smooth transaction process"
                onClickFn={() => {
                  dispatch(setLoadWallet(true))
                }}
              />
            </Grid> */}
          </Grid>
          <Box sx={{ background: Colors.white, pt: 2 }}>
            <img src={OnBoardingIllustration} width="100%" height="100%" />
          </Box>
        </Paper>
      </Grid>
      {/* <LoadWallet /> */}
    </>
  )
}

export default WelcomeIllustration
