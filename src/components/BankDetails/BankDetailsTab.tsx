// React Imports
import React, { FC, useEffect } from 'react'

// MUI Imports
import { Grid, Box, Typography, Paper, Divider } from '@mui/material'

// Local Imports
// import CreditCardImg from '../../assets/Images/illustrations/credit-card.png'
import { Colors } from '../../theme'
import moment from 'moment'
import THTile from '../TransactionHistory/THTile'

interface BankDetailsTabProps {}

const BankDetailsTab: FC<BankDetailsTabProps> = (props) => {
  return (
    <Paper
      sx={{
        width: '100%',
        height: '350px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '8px',
        minWidth: '520px',
        mt: 2,
      }}
    >
      <Box
        sx={{
          width: {
            xs: '100%',
            lg: '50%',
          },
          height: '100%',
          p: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 400,
            color: Colors.textColorDarkGreen,
            mt: 1,
          }}
        >
          Chainflux Bank Details
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ width: '70%' }}>
            <THTile title="Bank Name:" value={'ICCI Bank'} />
            <THTile title="Bank Number:" value="212200008" />
            <THTile title="Account Owner Name:" value="Chainflux" />
            <THTile title="Branch:" value={'Indira nagar'} />
            <THTile title="IFSC Code:" value={'PUNB0112000'} />
          </Box>
        </Box>
      </Box>
      <Box
        component="img"
        sx={{
          mr: 4,
          width: '40%',
          display: {
            xs: 'none',
            lg: 'block',
          },
        }}
        src={require('../../assets/Images/illustrations/credit-card.png')}
      />
    </Paper>
  )
}

export default BankDetailsTab
