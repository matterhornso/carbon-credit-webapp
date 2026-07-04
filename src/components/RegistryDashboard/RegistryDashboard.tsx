import { Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import { USER } from '../../api/user.api'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setProfileComplete,
  setProfilePercentage,
  setUserDetails,
} from '../../redux/Slices/profileCompletionSlice'
import { Colors } from '../../theme'
import { getLocalItem } from '../../utils/Storage'
import OnBoardingIssuer from '../OnBoardingIssuer/OnBoardingIssuer'
import ProfileCompletion from '../Projects/ProfileCompletion'
import ProjectsStats from '../ProjectStats/ProjectsStats'
import Projects from './Projects'

const RegistryDashboard = () => {
  const dispatch = useAppDispatch()

  const userDetails = useAppSelector(
    ({ profileCompletion }) => profileCompletion.userDetails,
    shallowEqual
  )
  const profileComplete = useAppSelector(
    ({ profileCompletion }) => profileCompletion.profileComplete,
    shallowEqual
  )

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
      {!profileComplete ? (
        <Typography
          sx={{
            color: Colors.tertiary,
            fontSize: 28,
            fontWeight: 400,
            mt:2,
            mb:3
          }}
        >
          Dashboard
        </Typography>
      ) : null}
      <Grid container columnSpacing={2}>
        <Grid item md={profileComplete ? 12 : 9}>
          {!profileComplete ? <OnBoardingIssuer /> : null}
          <Typography
            sx={{
              mt: 2,
              color: Colors.tertiary,
              fontSize: 28,
              fontWeight: 400,
              mb:3
            }}
          >
            Overview
          </Typography>
          <ProjectsStats />
          <Projects />
        </Grid>
        {!profileComplete ? (
          <Grid item md={3}>
            <ProfileCompletion />
          </Grid>
        ) : null}
      </Grid>
    </>
  )
}

export default RegistryDashboard
