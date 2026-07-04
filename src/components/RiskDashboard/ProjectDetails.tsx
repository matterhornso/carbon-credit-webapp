// React Imports
import React, { FC, useEffect } from 'react'

// MUI Imports
import { Grid, Box, Typography, Paper, Divider } from '@mui/material'

// Local Imports
// import CreditCardImg from '../../assets/Images/illustrations/credit-card.png'
import { Colors, Images } from '../../theme'
import moment from 'moment'
import THTile from '../TransactionHistory/THTile'
import CCButton from '../../atoms/CCButton'

interface ProjectDetailsProps {
  privateKey?: any
}
const imageData = [
  { name: 'Project Image', size: '1.2 MB' },
  { name: 'Aerial view', size: '1.6 MB' },
]
const reports = [
  { name: 'Screening Report', size: '1 MB' },
  { name: 'GHG emissons', size: '4.6 MB' },
]
const ProjectDetails: FC<ProjectDetailsProps> = (props) => {
  return (
    <Grid
      item
      xs={12}
      md={12}
      lg={12}
      xl={12}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: '8px',
        py: 3,
        boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.12)',
        my: 3,
      }}
    >
      <Typography
        sx={{
          fontSize: 22,
          fontWeight: 400,

          mt: 1,
          ml: 2,
          color: '#1D4B44',
        }}
      >
        Details
      </Typography>
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 500,

          mt: 1,
          ml: 2,
          color: '#1D4B44',
        }}
      >
        Images
      </Typography>
      <Grid
        container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          mx: 1,
        }}
      >
        {imageData &&
          imageData.map((item: any, index: any) => (
            <Grid
              item
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'start',

                m: 1,
                borderRadius: '8px',
                backgroundColor: '#DAF7F0',
                p: 1,
                width: '15%',
              }}
            >
              <img
                src={Images.file}
                alt="bg iamges"
                style={{
                  height: '30px',
                  width: '30px',

                  borderRadius: '14px',
                }}
              />

              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                {item.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                {item?.size}
              </Typography>
            </Grid>
          ))}
      </Grid>
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 500,

          mt: 1,
          ml: 2,
          color: '#1D4B44',
        }}
      >
        Reports
      </Typography>
      <Grid
        container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          mx: 1,
        }}
      >
        {reports &&
          reports.map((item: any, index: any) => (
            <Grid
              item
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'start',
                m: 1,
                borderRadius: '8px',
                backgroundColor: '#DAF7F0',
                p: 1,
                width: '30%',
              }}
            >
              <img
                src={Images.file}
                alt="bg iamges"
                style={{
                  height: '30px',
                  width: '30px',

                  borderRadius: '14px',
                }}
              />

              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                {item?.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                {item?.size}
              </Typography>
            </Grid>
          ))}
      </Grid>
    </Grid>
  )
}

export default ProjectDetails
