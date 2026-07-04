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

interface ClimatedisastersProps {
  privateKey?: any
}

const Climatedisasters: FC<ClimatedisastersProps> = (props) => {
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

        boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.12)',
        mt: -3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',

          width: '100%',
          backgroundColor: '#006B5E',
          borderRadius: '8px',
          py: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: 64,
            fontWeight: 400,
            color: 'white',
          }}
        >
          {'3.5'}
        </Typography>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 500,
            color: 'white',

            ml: 2,
          }}
        >
          {'Impact scores for climate disasters on carbon project'}
        </Typography>
      </Box>
      <Box my={4}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            ml: 4,
            my: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color: '#003730',

              ml: 2,
            }}
          >
            {'Historical climate disaster'}
          </Typography>
          <img
            src={Images.trending}
            alt="bg iamges"
            style={{
              height: '30px',
              width: '30px',
              marginLeft: 1,
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',

            ml: 4,
            my: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color: '#003730',

              ml: 2,
            }}
          >
            {'Predicted climate temperature model'}
          </Typography>
          <img
            src={Images.trending}
            alt="bg iamges"
            style={{
              marginLeft: 1,
              height: '30px',
              width: '30px',
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',

            ml: 4,
            my: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color: '#003730',

              ml: 2,
            }}
          >
            {'Likelihood of climate disasters'}
          </Typography>
          <img
            src={Images.trending}
            alt="bg iamges"
            style={{
              height: '30px',
              width: '30px',
              marginLeft: 1,
            }}
          />
        </Box>
      </Box>
    </Grid>
  )
}

export default Climatedisasters
