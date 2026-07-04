import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CCButton from '../../atoms/CCButton'
import { pathNames } from '../../routes/pathNames'

interface Props {}

const NotFoundPage = (props: Props) => {
  const navigate = useNavigate()
  return (
    <Grid container component="main">
      <Grid item xs={12} sx={{ background: 'primary.background' }}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'darkPrimary1.main',
          }}
        >
          <Typography component="div" variant="h1">
            404
          </Typography>
          <Typography component="div" variant="h6">
            Seems like you are not in right place... 🙁
          </Typography>
          <CCButton
            variant="text"
            sx={{ fontSize: 20, mt: 3 }}
            onClick={() => navigate(pathNames.LOGIN)}
          >
            Go Home
          </CCButton>
        </Box>
      </Grid>
    </Grid>
  )
}

export default NotFoundPage
