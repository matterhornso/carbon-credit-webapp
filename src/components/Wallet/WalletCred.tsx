// React Imports
import React, { FC, useEffect } from 'react'

// MUI Imports
import { Grid, Box, Typography, Paper, Divider } from '@mui/material'

// Local Imports
// import CreditCardImg from '../../assets/Images/illustrations/credit-card.png'
import { Colors } from '../../theme'
import moment from 'moment'
import THTile from '../TransactionHistory/THTile'
import CCButton from '../../atoms/CCButton'
import { USER } from '../../api/user.api'
import { getLocalItem } from '../../utils/Storage'
import { downloadText } from '../../utils/commonFunctions'

interface WalletCredProps {
  privateKey?: any
}

const WalletCred: FC<WalletCredProps> = (props) => {
  const getPrivateKey = () => {
    USER.getPrivateKey(getLocalItem('userDetails')?.user_id)
      .then((res: any) => {
        if (res?.success) {
          downloadText(res?.data?.private_key, 'private-key.txt')
        } else if (res?.error) {
          alert(res?.error[0])
        }
      })
      .catch((e) => {
        console.log('Error in USER.getPrivateKey api ~ ', e)
      })
  }

  return (
    <Paper
      sx={{
        width: '100%',

        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '8px',

        mt: 2,
        boxShadow: ' 0px 5px 25px rgba(0, 0, 0, 0.12)',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '200px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'start',
          borderRadius: '8px',
          minWidth: '520px',
          m: 3,
          background:
            'linear-gradient(0deg, rgba(0, 107, 94, 0.05), rgba(0, 107, 94, 0.05)), #FAFDFA',
        }}
      >
        <Box
          sx={{
            p: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: 22,
              fontWeight: 400,
              color: Colors.textColorDarkGreen,
              mt: 1,
            }}
          >
            Wallet Account Credentials
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 400,
              color: Colors.textColorDarkGreen,
              mt: 1,
            }}
          >
            Your wallet credential, which we created- xxxxxxxxxxxxxxxxxx
          </Typography>

          <Box
            sx={{
              mt: 4,
              display: 'flex',
              alignItems: 'start',
              justifyContent: 'start',
            }}
          >
            <CCButton
              sx={{
                backgroundColor: '#006B5E',
                // padding: '8px 15px',
                borderRadius: '100px',
                color: '#FFFFFF',
                fontSize: 14,
                padding: '10px 24px',
                // width:199
              }}
              variant="contained"
              // onClick={addMethodology}
              onClick={getPrivateKey}
            >
              Download Wallet Key
            </CCButton>
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}

export default WalletCred
