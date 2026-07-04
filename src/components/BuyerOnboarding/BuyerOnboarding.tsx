import { Box, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OnBoardingIllustration from '../../assets/Images/illustrations/OnBoardingIllustration.svg'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setLoadWallet } from '../../redux/Slices/walletSlice'
import { pathNames } from '../../routes/pathNames'
import { Colors } from '../../theme'
import LoadWallet from '../LoadWallet'
import ProfileCompletion from './ProfileCompletion'
import ProfileCard from '../../atoms/ProfileCard/ProfileCard'
import BlockchainCalls from '../../blockchain/Blockchain'
import { USER } from '../../api/user.api'
import { getLocalItem } from '../../utils/Storage'

const BuyerOnboarding = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isConnected = useAppSelector(({ wallet }) => wallet.isConnected)
  const [profileCompletion, setProfileCompletion] = useState(0)
  const [linearProgressValue, setLinearProgressValue] = useState(0)

  useEffect(() => {
    USER.getUserInfo(getLocalItem('userDetails')?.uuid).then((response) => {
      let count = 0

      if (
        response?.data?.data?.address !== '' &&
        response?.data?.data?.address !== undefined
      ) {
        count++
      }

      if (
        response?.data?.data?.organisationName !== '' &&
        response?.data?.data?.organisationName !== undefined
      ) {
        count++
      }
      if (
        response?.data?.data?.website !== '' &&
        response?.data?.data?.website !== undefined
      ) {
        count++
      }
      if (
        response?.data?.data?.sector !== '' &&
        response?.data?.data?.sector !== undefined
      ) {
        count++
      }

      setProfileCompletion(Math.round((count / 4) * 100))

      // Linear Progress
      let lpValue = (count / 4) * 50

      BlockchainCalls.getConnectionStatusAndAddress().then((response) => {
        if (response.connected) {
          lpValue = lpValue + 50
          setLinearProgressValue(lpValue)
        }

        if (response.connected && count === 4) {
          console.log('response.connected && count', response.connected, count)
          // navigate(pathNames.DASHBOARD)
        }
      })
    })
  }, [isConnected])

  return (
    <>
      <Typography sx={{ color: Colors.error, mb: 1 }}>
        {!isConnected &&
          'Metamask not connected. Please Connect Metamask before proceeding!!!'}
      </Typography>
      {isConnected && (
        <Typography
          sx={{ color: Colors.tertiary, fontSize: 28, fontWeight: 400 ,  mt:2,
            mb:3}}
        >
          Dashboard
        </Typography>
      )}
      <Grid container>
        <Grid item xs={9} sx={{ pr: 1 }}>
          <Paper elevation={2} sx={{ mt: 2 }}>
            <Box sx={{ color: Colors.darkPrimary1, px: 2, pt: 2 }}>
              <Box sx={{ pb: 3 }}>
                <Typography
                  sx={{
                    fontSize: 22,

                    pb: 2,
                  }}
                >
                  Welcome!
                </Typography>
                <Typography sx={{ fontSize: 16 }}>
                  Ready to go? Start filling the following forms to complete the
                  onboarding process
                </Typography>
              </Box>
              <Grid container columnSpacing={2}>
                <Grid item xs={6}>
                  <ProfileCard
                    title="Create/Link Wallet"
                    content="Create a new wallet or link your already existing wallet to our platform for a smooth transaction process"
                    onClickFn={() => dispatch(setLoadWallet(true))}
                  />
                </Grid>
                <Grid item xs={6}>
                  <ProfileCard
                    title="Organisational Details"
                    content="Complete filling your organisational details to complete the onboarding process"
                    buttonText={profileCompletion > 0 ? 'Resume' : 'Start'}
                    onClickFn={() => navigate(pathNames.ORGANISATIONAL_DETAILS)}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ background: Colors.white, pt: 2 }}>
              <img src={OnBoardingIllustration} width="100%" height="100%" />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={3} sx={{ paddingLeft: 1, mt: 2 }}>
          <ProfileCompletion />
        </Grid>
      </Grid>
      {/* <LoadWallet /> */}
    </>
  )
}

export default BuyerOnboarding
