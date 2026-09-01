// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Grid, Box, Typography, IconButton, Chip, Paper } from '@mui/material'

// Local Imports
import { useLocation, useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import { getLocalItem } from '../../utils/Storage'
import ListOfProjectsDashboard from './ListOfProjectsDashboard'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import EmptyComponent from '../../atoms/EmptyComponent/EmptyComponent'
import {
  setSectionIndex,
  setSubSectionIndex,
} from '../../redux/Slices/issuanceDataCollection'
import { shallowEqual, useDispatch } from 'react-redux'
import {
  setCachedNewTabAllProjects,
  setCachedRegisterTabAllProjects,
  setCachedVerificationTabAllProjects,
} from '../../redux/Slices/cachingSlice'
import { useAppSelector } from '../../hooks/reduxHooks'
import lodash from 'lodash'
import { DASHBOARDTABLIST } from '../../config/constants.config'
// draft tab projects for project developers
import { ProjectDraftCalls } from '../../api/projectDraftCalls.api'

import { setCachedDraftProjects } from '../../redux/Slices/cachingSlice'
import PddDashboardTable from './PddDashboardTable'
import { handleApiError } from '../../utils/errorHandler'
interface ProjectsTabProps {}

const ProjectsTab: FC<ProjectsTabProps> = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location: any = useLocation()
  console.log('🚀 ~ file: ProjectsTab.tsx ~ line 26 ~ location', location)

  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)

  const cachedNewTabAllProjects = useAppSelector(
    ({ caching }) => caching.cachedNewTabAllProjects,
    shallowEqual
  )

  const cachedVerificationTabAllProjects = useAppSelector(
    ({ caching }) => caching.cachedVerificationTabAllProjects,
    shallowEqual
  )

  const cachedRegisterTabAllProjects = useAppSelector(
    ({ caching }) => caching.cachedRegisterTabAllProjects,
    shallowEqual
  )

  const cachedDraftTabAllProjects = useAppSelector(
    ({ caching }) => caching.cachedDraftProjects,
    shallowEqual
  )

  useEffect(() => {
    // loadTableData()
    // getDraftProjects()
  }, [])

  const loadTableData = async () => {
    try {
      if (
        cachedNewTabAllProjects.length === 0 &&
        cachedRegisterTabAllProjects.length === 0 &&
        cachedVerificationTabAllProjects.length === 0
      ) {
        setLoading(true)
      }
      const commentsRes = await Promise.all(
        DASHBOARDTABLIST.map(async (item: any) => {
          if (item?.status)
            return await dataCollectionCalls.getAllProjectsOfTab({
              status: item?.status,
            })
        })
      )
      // console.log('commentsRes', commentsRes)

      if (commentsRes) {
        if (!lodash.isEqual(cachedNewTabAllProjects, commentsRes[0]?.data)) {
          dispatch(setCachedNewTabAllProjects(commentsRes[0]?.data))
        }

        if (
          !lodash.isEqual(
            cachedVerificationTabAllProjects,
            commentsRes[1]?.data
          )
        ) {
          dispatch(setCachedVerificationTabAllProjects(commentsRes[1]?.data))
        }
        if (
          !lodash.isEqual(cachedRegisterTabAllProjects, commentsRes[2]?.data)
        ) {
          dispatch(setCachedRegisterTabAllProjects(commentsRes[2]?.data))
        }
      }
    } catch (error) {
      handleApiError(error, { action: 'ProjectsTab.loadTableData' })
    } finally {
      setLoading(false)
    }
  }

  const listNewProject = () => {
    navigate(pathNames.ISSUANCE_DATA_COLLECTION)
    dispatch(setSectionIndex(0))
    dispatch(setSubSectionIndex(0))
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
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
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 400,
            color: '#0D0E0E',
          }}
        >
          Projects
        </Typography>
      </Box>
      <PddDashboardTable />
      {/* <ListOfProjectsDashboard data={tableData} loading={loading} /> */}
    </Paper>
  )

  // <EmptyComponent
  //   photoType={1}
  //   title="Let’s kick things off by creating your first project. Click the 'Create New Project' button to get started"
  //   listNewProject
  //   action={() => listNewProject()}
  // />
}

export default ProjectsTab
