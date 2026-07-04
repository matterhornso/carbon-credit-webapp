import { Box, Grid } from '@mui/material'
import { isDisabled } from '@testing-library/user-event/dist/utils'
import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { USER } from '../../api/user.api'
import BackHeader from '../../atoms/BackHeader/BackHeader'
import CCButton from '../../atoms/CCButton'
import { ROLES } from '../../config/constants.config'
import { useAppSelector } from '../../hooks/reduxHooks'
import {
  setProfileComplete,
  setProfilePercentage,
  setUpdateUserPayload,
  setUserDetails,
} from '../../redux/Slices/profileCompletionSlice'
import { pathNames } from '../../routes/pathNames'
import { Images } from '../../theme'
import ProfileCompletion from '../Projects/ProfileCompletion'
import IsssuerCompleteProfile from './IsssuerCompleteProfile'
import LoaderOverlay from '../LoderOverlay'
import { getLocalItem, setLocalItem } from '../../utils/Storage'

const CompleteProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const localStorageUserDetails = getLocalItem('userDetails')
  const userDetails = useAppSelector(
    ({ profileCompletion }) => profileCompletion.userDetails,
    shallowEqual
  )
  const updateUserPayload = useAppSelector(
    ({ profileCompletion }) => profileCompletion.updateUserPayload,
    shallowEqual
  )
  const profileCompletionLoading = useAppSelector(
    ({ profileCompletion }) => profileCompletion.profileCompletionLoading,
    shallowEqual
  )

  useEffect(() => {
    setPayloadAccordingToUser()
  }, [])

  const setPayloadAccordingToUser = () => {
    let temp = {}
    if (
      localStorageUserDetails?.type === ROLES.ISSUER ||
      localStorageUserDetails?.type === ROLES.REGISTRY ||
      localStorageUserDetails?.type === ROLES.BUYER
    ) {
      temp = {
        uuid: userDetails?.uuid,
        fullName: userDetails?.fullName,
        email: userDetails?.email,
        phone: userDetails?.phone.toString(),
        organisationName: userDetails?.organisationName,
        address: userDetails?.address,
      }
    }
    dispatch(setUpdateUserPayload(temp))
  }

  const updateUser = async () => {
    try {
      const userUpdateRes = await USER.updateUserInfo(updateUserPayload)
      if (userUpdateRes?.data.success) {
        setUserDetailsInLocal()
        alert('User details updated successfully')
        // navigate(pathNames.DASHBOARD)
        dispatch(setProfileComplete(true))
        dispatch(setProfilePercentage(100))
      }
    } catch (err) {
      console.log('Error in USER.updateUserInfo api ~ ', err)
    }
  }

  const setUserDetailsInLocal = async () => {
    const uuid = getLocalItem('userDetails')?.uuid

    dispatch(setProfileComplete(true))
    dispatch(setProfilePercentage(0))

    try {
      const userRes: any = await USER.getUserInfo(uuid)
      if (userRes?.data?.success) {
        dispatch(setUserDetails(userRes?.data?.data))
        setLocalItem('userDetails2', userRes?.data?.data)
        navigate(pathNames.DASHBOARD)
      }
    } catch (err) {
      console.log('Error in USER.getUserInfo api ~ ', err)
    }
  }

  const isDisabled = () => {
    if (updateUserPayload && Object.values(updateUserPayload).length) {
      let shouldDisable = false
      const arr = Object.values(updateUserPayload)
      arr.forEach((item) => {
        if (!item) {
          shouldDisable = true
        }
      })
      return shouldDisable
    }
  }

  console.log('updateUserPayload', updateUserPayload)
  return (
    <>
      {profileCompletionLoading ? (
        <LoaderOverlay show />
      ) : (
        <Grid container columnSpacing={1}>
          <Grid item md={9}>
            <Box
              sx={{
                backgroundColor: '#FFF',
                borderRadius: '8px',
                boxShadow: '1px 1px 2px 2px #CCC',
                backgroundImage: `url(${Images.CompleteProfileBg})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center bottom',
                minHeight: 'calc(100vh - 120px)',
                backgroundSize: 'contain',
                p: 1.5,
              }}
            >
              <Box
                sx={{
                  mt: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <BackHeader title="Profile" onClick={() => navigate(-1)} />
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                  <CCButton
                    sx={{
                      minWidth: 0,
                      padding: '8px 24px',
                      borderRadius: '20px',
                      background: '#F6F9F7',
                      color: '#006B5E',
                      fontSize: 14,
                      mr: 2,
                    }}
                    onClick={() => navigate(pathNames.DASHBOARD)}
                  >
                    Skip
                  </CCButton>
                  <CCButton
                    sx={{
                      minWidth: 0,
                      padding: '8px 24px',
                      borderRadius: '20px',
                      fontSize: 14,
                      background: '#006B5E',
                      color: '#fff',
                    }}
                    onClick={updateUser}
                    disabled={isDisabled()}
                  >
                    Save
                  </CCButton>
                </Box>
              </Box>
              {localStorageUserDetails?.type === ROLES.ISSUER && (
                <IsssuerCompleteProfile />
              )}
              {localStorageUserDetails?.type === ROLES.REGISTRY && (
                <IsssuerCompleteProfile />
              )}
              {localStorageUserDetails?.type === ROLES.BUYER && (
                <IsssuerCompleteProfile />
              )}
            </Box>
          </Grid>
          <Grid item md={3}>
            <ProfileCompletion />
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default CompleteProfile
