// React Imports
import React, { FC, useEffect } from 'react'

// MUI Imports
import { Grid, Box, Typography, Paper, Divider } from '@mui/material'

// Local Imports
// import CreditCardImg from '../../assets/Images/illustrations/credit-card.png'
import { Colors } from '../../theme'
import moment from 'moment'
import THTile from '../TransactionHistory/THTile'
import KeyValue from './KeyValue'

interface WalletTabProps {}

const WalletTab: FC<WalletTabProps> = (props) => {
  return (
    <Paper
      sx={{
        width: '100%',

        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '8px',

        // mt: 2,
        background:
          'linear-gradient(0deg, rgba(0, 107, 94, 0.05), rgba(0, 107, 94, 0.05)), #FAFDFA',
        // ml: 2,
        // height: '700px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          p: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 400,
            color: Colors.textColorDarkGreen,
            // mt: 1,
          }}
        >
          Climat Admin Account Details
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 3,
          }}
        >
          <Box
            sx={{
              width: '100%',
              backgroundColor: '#CCE8E1',
              p: 3,
              borderRadius: '8px',
            }}
          >
            <KeyValue title="Bank Number:" value="212200008" />
            <KeyValue title="Account Owner Name:" value="Chainflux" />
            <KeyValue title="Branch:" value={'Indira nagar'} />
            <KeyValue title="IFSC Code:" value={'PUNB0112000'} />
          </Box>
        </Box>
      </Box>
      <Box
        component="img"
        sx={{
          width: '90%',
          height: '250px',
          display: {
            xs: 'none',
            lg: 'block',
          },
          pb: 2,
          mt: 4,
        }}
        src={require('../../assets/Images/illustrations/credit-card.png')}
      />
    </Paper>
  )
}

export default WalletTab
