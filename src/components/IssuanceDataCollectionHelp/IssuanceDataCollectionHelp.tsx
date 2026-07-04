import { KeyboardArrowLeft } from '@mui/icons-material'
import { Grid, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { resetIssuanceDataCollectionHelpReducer } from '../../redux/Slices/issuanceDataCollectionHelpSlice'
import { Colors } from '../../theme'
import ProjectsSearch from './ProjectsSearch'
import ProjectsTable from './ProjectsTable'

const IssuanceDataCollectionHelp = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      dispatch(resetIssuanceDataCollectionHelpReducer())
    }
  }, [])

  return (
    <>
      <Box sx={{ px: 3, py: 2, bgcolor: '#fbfdfa', display: 'flex' }}>
        <KeyboardArrowLeft
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            navigate(-1)
          }}
        />
        <Typography
          sx={{ fontSize: 14, color: Colors.tertiary, fontWeight: 500 }}
        >
          Back
        </Typography>
      </Box>
      <Box sx={{ bgcolor: '#DAE5E1' }}>
        <Box sx={{ p: 3 }}>
          <Paper sx={{ borderRadius: 0 }}>
            <Box
              sx={{
                color: Colors.darkPrimary1,
                fontSize: 22,
                px: 4,
                py: 2,
                borderBottom: '1px solid #BFC9C6',
              }}
            >
              Project Search
            </Box>
            <Grid container>
              <Grid item xs={3} sx={{ borderRight: '1px solid #BFC9C6' }}>
                <ProjectsSearch />
              </Grid>
              <Grid item xs={9}>
                <ProjectsTable />
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </>
  )
}

export default IssuanceDataCollectionHelp
