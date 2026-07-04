// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Grid, Typography, Paper } from '@mui/material'

// Local Imports
import NoSellOrders from '../../assets/Images/illustrations/NoSellOrder.png'
import { Colors } from '../../theme'

interface EmptySellOrdersProps {}

const EmptySellOrders: FC<EmptySellOrdersProps> = (props) => {
  return (
    <Paper
      sx={{
        height: '300px',
        width: '100%',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ height: '50%' }} component={'img'} src={NoSellOrders} />
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 500,
          color: Colors.textColorDarkGreen,
          mt: 2,
        }}
      >
        No sell order made yet
      </Typography>

      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: Colors.textColorDarkGreen,
          mt: 1,
        }}
      >
        Sell some tokens to view the sell orders here
      </Typography>
    </Paper>
  )
}

export default EmptySellOrders
