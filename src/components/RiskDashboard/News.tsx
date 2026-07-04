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

interface NewsProps {
  privateKey?: any
}
const news = [
  {
    image: Images.BioFuel,
    name: 'Shaoguan City Shaoneng Biomass Power Generation Project',
    hashTag: '#BioFuelConservation',
  },
]
const News: FC<NewsProps> = (props) => {
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
        px: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: 22,
          fontWeight: 400,

          mt: 1,

          color: '#1D4B44',
        }}
      >
        In News
      </Typography>
      {news &&
        news.map((item: any, index: any) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'start',
              alignItems: 'start',

              my: 1,
            }}
          >
            <img
              src={item?.image}
              alt="bg iamges"
              style={{
                height: '100px',
                width: '150px',
                paddingLeft: 2,
                borderRadius: '14px',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'start',

                my: 2,
                ml: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#1A8EF5',

                  textDecoration: 'underline',
                }}
              >
                {item?.hashTag}
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#003730',
                }}
              >
                {item?.name}
              </Typography>
            </Box>
          </Box>
        ))}
    </Grid>
  )
}

export default News
