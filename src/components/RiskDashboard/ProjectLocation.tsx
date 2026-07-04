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

interface ProjectLocationProps {
  privateKey?: any
}

const projectLocation = 'https://goo.gl/maps/7yX3tMfMcH2TBDhs7'

const ProjectLocation: FC<ProjectLocationProps> = (props) => {
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
        p: 2,
        boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.12)',

        px: 2,
        height: 'fit-content',
        mt: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: 22,
          fontWeight: 400,

          color: '#1D4B44',
        }}
      >
        Project Location
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'start',
          alignItems: 'start',
          mt: 2,
        }}
      >
        <img
          src={Images.Shaogong}
          alt="bg iamges"
          style={{ height: '20px', width: '20px', marginTop: 2 }}
        />
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 500,
            color: '#1A8EF5',

            ml: 2,
          }}
        >
          {/* {'https://www.google.com/maps'} */}
          <a
            href={projectLocation}
            target={'_blank'}
            rel="noopener noreferrer"
            style={{ color: '#1A8EF5' }}
          >
            {projectLocation}
          </a>
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'start',
          alignItems: 'start',
          mt: 2,
          height: '280px',
        }}
      >
        <img
          src={Images.Shaogong}
          alt="bg iamges"
          style={{
            height: '280px',
            width: '100%',
            paddingLeft: 2,
            borderRadius: '14px',
          }}
        />
      </Box>
    </Grid>
  )
}

export default ProjectLocation
