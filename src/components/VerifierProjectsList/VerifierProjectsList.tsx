// React Imports
import React, { FC, useState, useEffect } from 'react'

// MUI Imports
import { Box, Grid, Paper, Typography } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { Colors } from '../../theme'
import ListOfProjects from './ListOfProjects'

import { VerifierProjectsListProps } from './VerifierProjectsList.interface'
import { verifierCalls } from '../../api/verifierCalls.api'
import { Navigate, useNavigate } from 'react-router-dom'
import { getLocalItem } from '../../utils/Storage'
import { shallowEqual, useDispatch } from 'react-redux'

import { useAppSelector } from '../../hooks/reduxHooks'
import { setCachedVerifierDashboardProject } from '../../redux/Slices/cachingSlice'
import lodash from 'lodash'

const VerifierProjectsList = (props: VerifierProjectsListProps) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cachedVerifierDashboardProjects = useAppSelector(
    ({ caching }) => caching.cachedVerifierDashboardProjects,
    shallowEqual
  )

  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    loadTableData()
  }, [])

  const loadTableData = () => {
    if (cachedVerifierDashboardProjects.length === 0) {
      setLoading(true)
    }

    verifierCalls
      .getAllVerifiers(getLocalItem('userDetails')?.user_id)
      .then((response) => {
        if (!lodash.isEqual(cachedVerifierDashboardProjects, response?.data)) {
          dispatch(setCachedVerifierDashboardProject(response?.data))
        }
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const updateVerifierStatus = (status: any, data: any) => {
    setLoading(true)

    const payload = {
      _id: data._id,
      project_id: data.project_id._id,
      project_status: status,
      verifier_id: data.verifier_id,
      verifier_name: data.verifier_name,
      verifier_number: data.verifier_number,
      verifier_address: data.verifier_address,
    }

    verifierCalls.updateVerifier(payload).then((response) => {
      loadTableData()
    })
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
          <BackHeader
            title="Projects"
            onClick={() => {
              navigate(-1)
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <ListOfProjects
            data={tableData}
            loading={loading}
            updateStatus={updateVerifierStatus}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default VerifierProjectsList
