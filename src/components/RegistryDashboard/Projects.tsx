import { Box, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import lodash from 'lodash'
import { REGISTRYDASHBOARDTABLIST } from '../../config/constants.config'
import { useAppSelector } from '../../hooks/reduxHooks'
import { pathNames } from '../../routes/pathNames'
import ProjectTable from './ProjectTable'
import {
  setCachedRegistryDraftTabProjects,
  setCachedRegistryNewTabAllProjects,
  setCachedRegistryReviewedTabAllProjects,
} from '../../redux/Slices/cachingSlice'
import { ProjectDraftCalls } from '../../api/projectDraftCalls.api'
import RegistryDashboardTable from './RegistryDashboardTable'

const Projects = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState<boolean>(false)

  const cachedRegistryDraftTabProjects = useAppSelector(
    ({ caching }) => caching.cachedRegistryDraftTabProjects,
    shallowEqual
  )
  const cachedRegistryNewTabAllProjects = useAppSelector(
    ({ caching }) => caching.cachedRegistryNewTabAllProjects,
    shallowEqual
  )
  const cachedRegistryReviewedTabAllProjects = useAppSelector(
    ({ caching }) => caching.cachedRegistryReviewedTabAllProjects,
    shallowEqual
  )

  useEffect(() => {
    getDraftProjects()
    // loadTableData()
  }, [])

  const getDraftProjects = async () => {
    try {
      if (cachedRegistryDraftTabProjects.length === 0) {
        setLoading(true)
      }
      const draftTableData = await ProjectDraftCalls.getProjects()
      if (
        draftTableData &&
        //!lodash.isEqual(cachedRegistryDraftTabProjects, TEMP_API_DATA)
        !lodash.isEqual(cachedRegistryDraftTabProjects, draftTableData.data)
      ) {
        //dispatch(setCachedRegistryDraftTabProjects(TEMP_API_DATA))
        dispatch(setCachedRegistryDraftTabProjects(draftTableData.data))
      }
      console.log('got data from draftAPICall', draftTableData.data)
      //dispatch(setCachedRegistryDraftTabProjects(TEMP_API_DATA))
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const loadTableData = async () => {
    try {
      if (
        cachedRegistryNewTabAllProjects.length === 0 &&
        cachedRegistryNewTabAllProjects.length === 0
      ) {
        setLoading(true)
      }
      const projectListRes = await Promise.all(
        REGISTRYDASHBOARDTABLIST.map(async (item: any) => {
          if (item?.status)
            return await dataCollectionCalls.getAllProjectsOfTab({
              status: item?.status,
            })
        })
      )

      if (projectListRes) {
        if (
          !lodash.isEqual(
            cachedRegistryNewTabAllProjects,
            projectListRes[0]?.data
          )
        ) {
          dispatch(setCachedRegistryNewTabAllProjects(projectListRes[0]?.data))
        }

        if (
          !lodash.isEqual(
            cachedRegistryReviewedTabAllProjects,
            projectListRes[1]?.data
          )
        ) {
          dispatch(
            setCachedRegistryReviewedTabAllProjects(projectListRes[1]?.data)
          )
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  if (
    loading ||
    (!loading &&
      cachedRegistryNewTabAllProjects.length >= 0 &&
      cachedRegistryReviewedTabAllProjects.length >= 0)
  ) {
    return (
      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: '8px',
          boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.12)',
          marginTop: 3,
          minHeight: location.pathname.includes(pathNames.PROJECTS)
            ? '80vh'
            : '55vh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontSize: 22, fontWeight: 400 }}>
            Projects
          </Typography>
          {/* { location.pathname.includes(pathNames.PROJECTS) ? null : <Typography
              sx={{
                color: 'darkPrimary1',
                fontSize: 14,
                fontWeight: 400,
                cursor: 'pointer',
              }}
              onClick={() => navigate(pathNames.PROJECTS)}
            >
              See All
            </Typography>} */}
        </Box>

        {/* <ProjectTable loading={loading} /> */}
        <RegistryDashboardTable loading={loading} />
      </Paper>
    )
  } else return null
}

export default Projects
