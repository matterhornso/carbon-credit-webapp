// React Imports
import React, { useEffect, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

// Functional Imports
import { useNavigate } from 'react-router-dom'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import ListOfProjects from './ListOfProjects'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { getLocalItem } from '../../utils/Storage'
import CCButton from '../../atoms/CCButton'
import { pathNames } from '../../routes/pathNames'
import { useDispatch } from 'react-redux'
import {
  setSectionIndex,
  setSubSectionIndex,
} from '../../redux/Slices/issuanceDataCollection'

const SeeAllProjects = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    loadTableData()
  }, [])

  const loadTableData = () => {
    setLoading(true)

    dataCollectionCalls
      .getAllProjects(getLocalItem('userDetails')?.email)
      .then((response) => {
        setTableData(response.data.data)
        setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
      })
  }

  const listNewProject = () => {
    navigate(pathNames.ISSUANCE_DATA_COLLECTION)
    dispatch(setSectionIndex(0))
    dispatch(setSubSectionIndex(0))
  }

  return (
    <Box sx={{ p: 0 }}>
      <Grid
        container
        xs={12}
        sx={{ p: 0, border: '0px solid' }}
        justifyContent={'space-between'}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt:2,
          }}
        >
          <BackHeader
            title="Projects"
            onClick={() => {
              navigate(-1)
            }}
          />

          <CCButton
            variant="contained"
            sx={{
              backgroundColor: '#F3BA4D',
              textTransform: 'none',
              width: '260px',
              borderRadius: '100px',
              padding: '10px 24px 10px 16px',
            }}
            startIcon={<AddIcon style={{ color: '#005046' }} />}
            onClick={() => listNewProject()}
          >
            <Typography
              sx={{ fontSize: 14, fontWeight: 500, color: '#005046' }}
            >
              List New Project
            </Typography>
          </CCButton>
        </Grid>

        <Grid item xs={12}>
          <ListOfProjects data={tableData} loading={loading} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default SeeAllProjects
