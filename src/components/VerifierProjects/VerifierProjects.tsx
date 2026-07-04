// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Box, Button, Grid, Paper, Skeleton, Typography } from '@mui/material'

// Functional Imports
import { useNavigate } from 'react-router-dom'
import { shallowEqual } from 'react-redux'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import ListOfProjects from './ListOfProjects'
import { getLocalItem } from '../../utils/Storage'
import { USER } from '../../api/user.api'
import { pathNames } from '../../routes/pathNames'
import EmptyComponent from '../../atoms/EmptyComponent/EmptyComponent'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setProfileCompletionPercent,
  setProfileUpdated,
} from '../../redux/Slices/verifierSlice'
import ProjectsStats from '../ProjectStats/ProjectsStats'
import { useVerifierDashboardTable } from '../../hooks/useVerifierDashboardTable'

const VerifierProjects = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { loadTableData } = useVerifierDashboardTable()

  const [tableData, setTableData] = useState([])
  const [loadingTable, setLoadingTable] = useState(false)

  const isConnected = useAppSelector(
    ({ wallet }) => wallet.isConnected,
    shallowEqual
  )

  const verifierDashboardTableLoading = useAppSelector(
    ({ verifier }) => verifier.verifierDashboardTableLoading,
    shallowEqual
  )
  const cachedVerifierDashboardProjects = useAppSelector(
    ({ caching }) => caching.cachedVerifierDashboardProjects,
    shallowEqual
  )

  useEffect(() => {
    loadTableData()
    // checkForUserDetails()
    checkForUserDetailsAndWalletAdded()
  }, [])

  const checkForUserDetailsAndWalletAdded = async () => {
    const { wallet_added = false, uuid = '' } = getLocalItem('userDetails2')

    // Wallet added and Profile completed considered as 2 step
    // const totalSteps = 2
    //Not considering wallet
    const totalSteps = 1
    let stepsCompleted = 0

    let allFieldsUpdatedInUserProfile = true

    if (uuid) {
      try {
        const userRes = await USER.getUserInfo(uuid)
        if (userRes) {
          const fieldsToCheck = [
            'fullName',
            'email',
            'designation',
            'phone',
            'address',
            'organisationName',
          ]
          const userObject = userRes?.data?.data
          for (let i = 0; i < fieldsToCheck.length; i++) {
            if (!userObject[fieldsToCheck[i]]) {
              allFieldsUpdatedInUserProfile = false
              break
            }
          }
          if (allFieldsUpdatedInUserProfile) stepsCompleted += 1
          dispatch(setProfileUpdated(allFieldsUpdatedInUserProfile))
          if (wallet_added) stepsCompleted += 1
          const completionPercent = (stepsCompleted / totalSteps) * 100
          dispatch(setProfileCompletionPercent(completionPercent))
        }
      } catch (err) {
        console.log('Error in USER.getUserInfo api :', err)
        alert('Error in USER.getUserInfo api')
      }
    }
    // if (stepsCompleted < 2) {
    if (stepsCompleted < 1) {
      navigate(pathNames.VERIFIER_DASHBOARD, { replace: true })
    }
  }

  return (
    <Box sx={{ p: 0 }}>
      <Grid
        container
        xs={12}
        sx={{ p: 0, border: '0px solid' }}
        justifyContent={'space-between'}
      >
        <Grid item xs={12}>
          <BackHeader title="Dashboard" iconDisable sx={{ mb: 3 }} />
        </Grid>

        <Grid item sm={12} sx={{ pr: 2 }}>
          <ProjectsStats />
        </Grid>

        <Grid item xs={12}>
          {cachedVerifierDashboardProjects.length === 0 &&
            verifierDashboardTableLoading === false && (
              <EmptyComponent
                title="No project verification request yet!"
                photoType={1}
              />
            )}

          {((cachedVerifierDashboardProjects.length > 0 &&
            !verifierDashboardTableLoading) ||
            verifierDashboardTableLoading) && (
            <ListOfProjects data={cachedVerifierDashboardProjects} />
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default VerifierProjects
