import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { Images } from '../../../theme'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import { useAppSelector } from '../../../hooks/reduxHooks'

const ProjectIntroduction = () => {
  const projectTitle = 'Panama Reforestation Services ARR'
  const projectSubTitle =
    'Estimation of carbon stocks and change in carbon stocks of trees and shrubs; V2.1'

  const projectData: any = useAppSelector(
    ({ finalPDFSlice }) => finalPDFSlice.projectData
  )

  return (
    <Box
      sx={{
        // maxWidth: '595px',
        maxWidth: '800px',
        px: 6,
        textAlign: 'center',
        marginX: 'auto',
        bgcolor: '#FFF',
        height: '842px',
      }}
    >
      <Box
        sx={
          {
            // display: 'flex',
            // flexDirection: 'column',
            // justifyContent: 'center',
          }
        }
      >
        <Box sx={{ p: 4 }}>
          <img src={Images.ClimatIconRevised} />
        </Box>
        <Box sx={{ p: 4, mt: 8 }}>
          <img src={Images.ICRLogo} width={'80%'} />
        </Box>
        <Typography
          sx={{
            fontSize: '28px',
            fontWeight: 400,
            textAlign: 'center',
            color: '#0D0E0E',
            mt: 4,
          }}
        >
          {projectData?.projectIntroduction?.name?.data || projectTitle}
        </Typography>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: 500,
            textAlign: 'right',
            color: '#6E7976',
            mt: 2,
          }}
        >
          {projectSubTitle}
        </Typography>
      </Box>
    </Box>
  )
}

export default ProjectIntroduction
