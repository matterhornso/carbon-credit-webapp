import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { dataCollectionCalls } from '../../../api/dataCollectionCalls'
import { pathNames } from '../../../routes/pathNames'
import ProjectDetailsCard from './ProjectDetailsCard'
import ProjectDetailsCardSkeleton from './ProjectDetailsCardSkeleton'

const projects = ['', '', '', '']

const OtherProjects = () => {
  const navigate = useNavigate()
  const [projects, setProjects] = useState<any>(null)
  const [filteredProjects, setFilteredProjects] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    getAllProjects()
  }, [])

  const getAllProjects = async () => {
    try {
      setLoading(true)
      const projectRes = await dataCollectionCalls.getVerifiedProjects()
      if (projectRes.success) {
        const filterProject = projectRes.data.filter(
          (item: any, index: number) => index <= 3 && item
        )

        setProjects(filterProject)
      }
    } catch (e) {
      console.log('Error in dataCollectionCalls.getAllProjects api ~ ', e)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Box
      sx={{
        // background:
        //   'linear-gradient(180deg, rgba(7, 19, 13, 0.79) 0%, #222926 66.32%)',
        // padding: '56px 6vw',
        // color: '#fff',
        pt: 10,
      }}
    >
      <Typography
        sx={{ fontSize: 18, fontWeight: '400', color: 'headingColor.main' }}
      >
        Other Projects
      </Typography>
      <Box
        sx={{
          fontSize: '14px',
          fontWeight: '500',
          color: 'headingColor.main',
          textAlign: 'right',
          cursor: 'pointer',
          marginTop: '-15px',
          marginBottom:"32px"
        }}
        onClick={() => navigate(pathNames.PROJECT_LISTS_WITH_FILTER)}
      >
        View All
      </Box>
      <Grid
        container
        spacing={{ sm: 1.5, md: 1.5, lg: 1.5, xl: 1.5 }}
        columns={{ sm: 12, md: 12, lg: 12, xl: 10 }}
        sx={{
          
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'nowrap',
          flexDirection: 'row',
          overflowX: 'auto',
          pb:2,
          px:0.5
        }}
      >
        {loading ? (
          <ProjectDetailsCardSkeleton items={4} />
        ) : (
          projects &&
          projects.length &&
          projects.map((project: any, index: number) => (
            <ProjectDetailsCard
              xl={2}
              lg={3}
              md={3}
              sm={3}
              justifyContent="flex-start"
              key={index}
              project={project}
              navigationAction={(item: any) => null}
            />
          ))
        )}
      </Grid>
    </Box>
  )
}

export default OtherProjects
