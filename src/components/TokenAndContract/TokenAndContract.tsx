import { Grid, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
//MUI imports
//Local imports
import ProjectsStats from '../ProjectStats/ProjectsStats'
import CCButton from '../../atoms/CCButton'
import TokenAndContractProjectList from './TokenAndContractProjectList'
import { pathNames } from '../../routes/pathNames'
import { useNavigate } from 'react-router-dom'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { getLocalItem } from '../../utils/Storage'
import moment from 'moment'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'

const TokenAndContract = () => {
  const navigate = useNavigate()

  const { email } = getLocalItem('userDetails')

  const [loading, setLoading] = useState(true)

  const [projects, setProjects] = useState<any>()

  useEffect(() => {
    getAllProjects()
  }, [])

  const getAllProjects = () => {
    dataCollectionCalls
      .getVerifiedProjects(email)
      .then((res: any) => {
        if (res?.success) {
          setProjects(res.data)
        } else if (res?.error) {
          alert(res?.error[0])
        }
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Grid container>
      <Grid item>
        <Typography sx={{ fontSize: 28, fontWeight: 400, color: '#F15D5F' }}>
          Tokens & Reports
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ marginRight: 100 }}>
        <ProjectsStats />
      </Grid>
      <Grid item xs={12} sx={{ mt: 4 }}>
        <Paper elevation={2} sx={{ py: 2, px: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography sx={{ fontSize: 22, fontWeight: 400 }}>
              Reports & Contracts
            </Typography>
            <CCButton
              rounded
              onClick={() => navigate(pathNames.MARKETPLACE)}
              sx={{
                minWidth: 0,
                backgroundColor: '#F3BA4D',
                color: '#005046',
                padding: '8px 18px',
                borderRadius: 10,
                fontSize: 14,
              }}
            >
              Sell Tokens
            </CCButton>
          </Stack>
          {!projects ? (
            <CCTableSkeleton sx={{ mt: 2 }} />
          ) : (
            <>
              <Grid
                container
                columns={14}
                alignItems="center"
                sx={{ mt: 3, py: 2, background: '#CCE8E1' }}
              >
                <Grid item xs={2} sx={{ pl: 2 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                    Date
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                    Project Name
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                    Project Type
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                    Location
                  </Typography>
                </Grid>
              </Grid>
              {projects.map((i: any, index: number) => (
                <TokenAndContractProjectList
                  data={i}
                  key={index}
                  background={index % 2 ? '#edf5f2' : '#fff'}
                />
              ))}
            </>
          )}
        </Paper>
      </Grid>

      {/* <Grid item xs={12} sx={{ mt: 4 }}>
        <EmptyComponent
          photoType={1}
          title="No Reports & Contracts to show yet !"
          listNewProject
        />
      </Grid> */}
    </Grid>
  )
}

export default TokenAndContract
