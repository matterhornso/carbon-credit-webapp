// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Grid, Box, Typography, Paper, Chip } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { Colors } from '../../theme'

// Local Imports

interface VitalProjectDetailsProps {}

const VitalProjectDetails: FC<VitalProjectDetailsProps> = (props) => {
  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: '8px',
        mb: 2,
        ml: 1,
        width: '100%',
        pt: 3,
        pb: 3,
        display: 'flex',
      }}
    >
      <Box>
        <Typography sx={{ fontSize: 24, fontWeight: 400 }}>
          3.66 MW poultry litter based power generation project by Raus Power in
          India
        </Typography>

        <Chip
          sx={{
            borderRadius: '8px',
            backgroundColor: Colors.lightGreenBackground,
          }}
          label="Agricultural Land Management (ALM)"
        />

        <Box sx={{ alignItems: 'center', display: 'flex', mb: 1, mt: 2 }}>
          <CalendarMonthIcon
            style={{
              color: Colors.textColorLightGreen,
              height: '18px',
              marginRight: '5px',
            }}
          />
          <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
            Started on DD/MM/YYYY
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
            6430 Hixson Pike, Hixson, TN 37343, USA
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: '220px',
          border: '2px solid',
          // display: ;',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
          206.54 SqKm
        </Typography>
        <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Area</Typography>
      </Box>
    </Paper>
  )
}

export default VitalProjectDetails
