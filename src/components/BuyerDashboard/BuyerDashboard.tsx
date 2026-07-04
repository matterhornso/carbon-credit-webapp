import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { USER } from '../../api/user.api'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setProfileComplete,
  setProfilePercentage,
  setUserDetails,
} from '../../redux/Slices/profileCompletionSlice'
import { Colors } from '../../theme'
import { getLocalItem } from '../../utils/Storage'
import LoaderOverlay from '../LoderOverlay'
import OnBoardingIssuer from '../OnBoardingIssuer/OnBoardingIssuer'
import ProfileCompletion from '../Projects/ProfileCompletion'
import ProjectsStats from '../ProjectStats/ProjectsStats'
import MarketplaceCard from './MarketplaceCard'
import Projects from './Projects'

const BuyerDashboard = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const userDetails = useAppSelector(
    ({ profileCompletion }) => profileCompletion.userDetails,
    shallowEqual
  )
  const profileComplete = useAppSelector(
    ({ profileCompletion }) => profileCompletion.profileComplete,
    shallowEqual
  )

  const [loader, setloader] = useState<boolean>(false)

  useEffect(() => {
    getUserDetails()
  }, [])

  useEffect(() => {
    if (userDetails) checkProfileComplete()
  }, [userDetails])

  const getUserDetails = async () => {
    const uuid = getLocalItem('userDetails')?.uuid

    dispatch(setProfileComplete(true))
    dispatch(setProfilePercentage(0))

    try {
      const userRes = await USER.getUserInfo(uuid)
      if (userRes?.data?.success) {
        dispatch(setUserDetails(userRes?.data?.data))
      }
    } catch (err) {
      console.log('Error in USER.getUserInfo api ~ ', err)
    }
  }

  const checkProfileComplete = () => {
    let count = 0
    const values = [
      userDetails?.fullName,
      userDetails?.email,
      userDetails?.phone,
      userDetails?.organisationName,
      userDetails?.address,
    ]
    values.forEach((value) => {
      if (value) {
        count += 1
      }
    })
    const percent = Math.round((count / values.length) * 100)
    dispatch(setProfilePercentage(percent))
    if (percent === 100) {
      dispatch(setProfileComplete(true))
    } else {
      dispatch(setProfileComplete(false))
    }
  }
  return (
    <>
      {loader ? (
        <LoaderOverlay show />
      ) : (
        <>
          <Typography
            sx={{ color: Colors.tertiary, fontSize: 28, fontWeight: 400, mt:2,
              mb:3 }}
          >
            Dashboard
          </Typography>
          {/* )} */}
          <Grid container>
            <Grid item md={profileComplete ? 12 : 9}>
              <Grid container>
                <Grid item md={12} sm={12} sx={{ pr: 2 }}>
                  {!profileComplete ? <OnBoardingIssuer /> : null}
                  <Grid container columnSpacing={1}>
                    {/* <Grid item xs={profileComplete ? 9 : 12}> */}
                    <Grid item xs={  12}>
                      <ProjectsStats />
                    </Grid>
                    {/* {profileComplete ? (
                      <Grid item xs={3}>
                        <MarketplaceCard />
                      </Grid>
                    ) : null} */}
                  </Grid>
                  <Projects />
                </Grid>
              </Grid>
            </Grid>
            {!profileComplete ? (
              <Grid item md={3}>
                <ProfileCompletion short />
                <Box sx={{ mt: 2 }}>
                  <MarketplaceCard elongated />
                </Box>
              </Grid>
            ) : null}
          </Grid>
        </>
      )}
    </>
  )
}

export default BuyerDashboard
