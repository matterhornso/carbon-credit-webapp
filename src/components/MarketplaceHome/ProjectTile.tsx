// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Box, Divider, Grid, Paper, Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Colors } from '../../theme'

// Local Imports

interface ProjectTileProps {
  projectDetail: any
}

const ProjectTile: FC<ProjectTileProps> = ({ projectDetail }) => {
  return (
    <Grid item sm={12} md={6} lg={4}>
      <Paper
        sx={{
          height: '280px',
          width: '360px',
          margin: 2,
          borderRadius: '12px',
        }}
      >
        <Box
          component="img"
          src={projectDetail?.imgSrc}
          sx={{
            width: '100%',
            height: '140px',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
          }}
        ></Box>
        <Box
          sx={{
            width: '100%',
            // height: '65px',
            display: 'grid',
            alignItems: 'center',
            paddingLeft: 1,
          }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 500, margin: 1 }}>
            {projectDetail?.projectName}
          </Typography>
        </Box>
        {/* <Divider /> */}
        <Box
          sx={{
            width: '100%',
            // height: '35px',
            display: 'flex',
            alignItems: 'center',
            px: 1,
          }}
        >
          <LocationOnIcon style={{ color: Colors.textColorLightGreen }} />
          <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
            {projectDetail?.location}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  )
}

export default ProjectTile
