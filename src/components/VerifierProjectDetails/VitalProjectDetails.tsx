// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Grid, Box, Typography, Paper, Chip } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { Colors } from '../../theme'
import moment from 'moment'

// Local Imports

interface VitalProjectDetailsProps {
  data?: any
}

const VitalProjectDetails: FC<VitalProjectDetailsProps> = (props) => {
  return (
    <Paper
      sx={{
        borderRadius: '8px',
        mb: 2,
        ml: 1,
        width: '100%',
        mt: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          p: 2,
          pt: 3,
          pb: 3,
        }}
      >
        <Typography sx={{ fontSize: 24, fontWeight: 400 }}>
          {props.data?.company_name}
        </Typography>

        {props.data?.type.map((item: any, index: number) => (
          <Chip
            key={index}
            sx={{
              borderRadius: '8px',
              mr: 2,
              mt: 1,
              mb: 1,
              backgroundColor: Colors.lightGreenBackground,
            }}
            label={item}
          />
        ))}

        <Box sx={{ alignItems: 'center', display: 'flex', mb: 1, mt: 2 }}>
          <CalendarMonthIcon
            style={{
              color: Colors.textColorLightGreen,
              height: '18px',
              marginRight: '5px',
            }}
          />
          <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
            Started on {moment(props.data?.createdAt).format(`DD/MM/YY`)}
          </Typography>
        </Box>

        <Box sx={{ alignItems: 'center', display: 'flex' }}>
          <LocationOnIcon
            style={{
              color: Colors.textColorLightGreen,
              height: '18px',
              marginRight: '5px',
            }}
          />
          <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
            {props.data?.location}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: '220px',
          height: '220px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#FFF',
            width: 'auto',
            zIndex: 10,
            p: 0.5,
            m: 0.5,
          }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
            {props.data?.area} SqKm
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: '#FFF',
            width: 'auto',
            zIndex: 10,
            p: 0.5,
            m: 0.5,
          }}
        >
          <Typography
            sx={{ fontSize: 14, fontWeight: 400, backgroundColor: '#FFF' }}
          >
            Area
          </Typography>
        </Box>

        <Box
          component={'img'}
          sx={{
            width: '220px',
            height: '220px',
            position: 'absolute',
            top: 0,
            right: 0,
          }}
          src={require('../../assets/Images/AreaBackground.png')}
        />
      </Box>
    </Paper>
  )
}

export default VitalProjectDetails
