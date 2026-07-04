// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Box, Grid, Typography, Paper } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

// Local Imports
import NoProjectsListed from '../../assets/Images/illustrations/NoProjectsListed.png'
import { Colors } from '../../theme'
import CCButton from '../../atoms/CCButton'

interface EmptyProjectsListProps {}

const EmptyProjectsList: FC<EmptyProjectsListProps> = (props) => {
  return (
    <Paper
      sx={{
        height: '540px',
        borderRadius: '8px',
        width: '100%',
        mt: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ height: '50%' }} component={'img'} src={NoProjectsListed} />
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 500,
          color: Colors.textColorDarkGreen,
          mt: 3,
        }}
      >
        No projects listed yet !
      </Typography>

      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: Colors.textColorDarkGreen,
          mt: 2,
        }}
      >
        List a new project to get started
      </Typography>

      <CCButton
        variant="contained"
        sx={{
          backgroundColor: '#F3BA4D',
          textTransform: 'none',
          width: '260px',
          borderRadius: '100px',
          marginBottom: 4,
          marginTop: 3,
          padding: '10px 24px 10px 16px',
        }}
        startIcon={<AddIcon style={{ color: '#005046' }} />}
        onClick={() => undefined}
      >
        <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#005046' }}>
          List New Project
        </Typography>
      </CCButton>
    </Paper>
  )
}

export default EmptyProjectsList
