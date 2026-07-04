import React, { useEffect, useState } from 'react'
import ProjectTable from './ProjectTable'
import { useNavigate, useLocation } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setCachedAdminDashboardProjects } from '../../redux/Slices/cachingSlice'
import { shallowEqual } from 'react-redux'
import { ProjectDraftCalls } from '../../api/projectDraftCalls.api'
import lodash from 'lodash'
import { Paper, Box, Typography } from '@mui/material'
import { pathNames } from '../../routes/pathNames'
import AdminDashboardTable from './AdminDashboardTable'

const Projects = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  const [loading, setLoading] = useState<boolean>(false)

  // const cachedAdminNewTabAllProjects=useAppSelector(({caching})=>caching)
  const cachedAdminProjects = useAppSelector(
    ({ caching }) => caching.cachedAdminDashboardProjects,
    shallowEqual
  )

  useEffect(() => {
    loadAdminTableData()
  }, [])

  const loadAdminTableData = async () => {
    try {
      if (cachedAdminProjects.length === 0) {
        setLoading(true)
      }
      const adminTable = await ProjectDraftCalls.getProjects()
      if (adminTable) {
        if (!lodash.isEqual(cachedAdminProjects, adminTable.data)) {
          dispatch(setCachedAdminDashboardProjects(adminTable.data))
        }
      }
    } catch (error) {
      console.log(
        'error coming from projects.tsx of admin dashboard project component',
        error
      )
    } finally {
      setLoading(false)
    }
  }

  // if(loading || (!loading && cachedAdminProjects.length>=0)){
  //     return <ProjectTable loading={loading}/>
  // }else{
  //   return null;
  // }

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
        <Typography sx={{ fontSize: 24, fontWeight: 400, color: '#2B2B2B' }}>
          Projects
        </Typography>
      </Box>
      <AdminDashboardTable loading={loading} />
      {/* <ProjectTable loading={loading} /> */}
    </Paper>
  )
}

export default Projects
