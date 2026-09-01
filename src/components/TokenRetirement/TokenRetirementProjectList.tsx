import { Grid, Skeleton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { buyerCalls } from '../../api/buyerCalls.api'
import { getLocalItem } from '../../utils/Storage'
import ProjectCards from './ProjectCards'
import RetirementCertificate from './RetirementCertificate'
import EmptyComponent from '../../atoms/EmptyComponent/EmptyComponent'
import { handleApiError } from '../../utils/errorHandler'

const TokenRetirementProjectList = () => {
  const userID = getLocalItem('userDetails')?.user_id || ''

  const [projects, setProjects] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const navigate = useNavigate()
  useEffect(() => {
    getAllProjects()
  }, [])

  const getAllProjects = async () => {
    try {
      setLoading(true)
      const projectRes = await buyerCalls.getPurchasedProjectToRetireV2()
      if (projectRes.success) {
        setProjects(projectRes.data)
        // setFilteredProjects(projectRes.data.data)
      }
    } catch (e) {
      handleApiError(e, { action: 'buyerCalls.getPurchasedProjectToRetire' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Grid item xs={12} sx={{ mt: 4 }}>
        <Typography sx={{ color: '#2B2B2B', fontSize: '22px', mb: 3 }}>
          Token Retirement Projects
        </Typography>

        <Grid
          container
          spacing={{ sm: 2, md: 2, lg: 2, xl: 2 }}
          columns={{ sm: 12, md: 12, lg: 12, xl: 12 }}
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            // maxHeight:'75vh',
            // overflowY: 'scroll',
            // overflowX: 'hidden',
            pb: 1,
          }}
        >
          {loading ? (
            ['', '', ''].map((item, index: number) => (
              <ProjectCardLoading key={index} />
            ))
          ) : projects && projects.length === 0 ? (
            <EmptyComponent
              photoType={1}
              title="No Projects to retire Tokens."
              sx={{ width: '100%', mt: 0, ml: 2 }}
            />
          ) : (
            projects?.map((project: any, index: number) => (
              <ProjectCards
                key={index}
                project={project}
                navigationAction={(item: any) => navigate(item)}
              />
            ))
          )}
        </Grid>
        {/* <ApproveTokenCard />*/}
        <RetirementCertificate />
      </Grid>
    </>
  )
}

export default TokenRetirementProjectList

const ProjectCardLoading = () => {
  return (
    <Grid
      item
      sm={12}
      md={6}
      lg={4}
      xl={3}
      display="flex"
      alignItems="flex-start"
      sx={{ mt: 2, width: '100%' }}
    >
      <Box
        sx={{
          width: '100%',
        }}
      >
        <Skeleton
          sx={{ bgcolor: '#CCE8E1' }}
          variant="rectangular"
          height={147}
        />
        <Skeleton
          variant="text"
          sx={{ mt: 1, fontSize: '2rem', bgcolor: '#CCE8E1' }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '20%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Skeleton
              sx={{ bgcolor: '#CCE8E1' }}
              variant="rectangular"
              height={20}
              width={'20px'}
            />
          </Box>
          <Box sx={{ width: '80%' }}>
            <Skeleton
              variant="text"
              sx={{ fontSize: '1rem', bgcolor: '#CCE8E1' }}
            />
          </Box>
        </Box>
        <Skeleton
          variant="text"
          sx={{ mt: 1, fontSize: '1rem', bgcolor: '#CCE8E1' }}
        />
        <Skeleton
          variant="text"
          sx={{ fontSize: '1rem', bgcolor: '#CCE8E1' }}
        />
        <Skeleton
          variant="text"
          sx={{ fontSize: '1rem', bgcolor: '#CCE8E1' }}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            mt: 2,
            bgcolor: '#CCE8E1',
            width: '100%',
            height: '30px',
            borderRadius: '30px',
          }}
        />
      </Box>
    </Grid>
  )
}
