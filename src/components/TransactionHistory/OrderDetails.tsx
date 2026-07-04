// React Imports
import React, { FC, useEffect } from 'react'

// MUI Imports
import { Grid, Box, Typography, Paper, Divider } from '@mui/material'

// Local Imports
import TransactionHistoryImg from '../../assets/Images/illustrations/TransactionHistory.png'
import { Colors } from '../../theme'
import moment from 'moment'
import THTile from './THTile'

interface OrderDetailsProps {
  data?: any
}

const OrderDetails: FC<OrderDetailsProps> = (props) => {
  const unitPrice =
    Number(props.data?.transaction_data?.values?.amountFilled) /
    Number(props.data?.transaction_data?.values?.amountTaken)

  return (
    <Paper
      sx={{
        width: '100%',
        height: '450px',
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
          ><Box>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 400,
              color: Colors.textColorDarkGreen,
              mt: 1,
            }}
          >
            Order Details
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              // alignItems: 'center',
            }}
          >

            <Box sx={{ width: '50%' }}>
              <THTile
                title="Transaction ID:"
                value={props.data?.transaction_id}
              />
              <THTile
                title="Sell Order  ID:"
                value={props.data?.transaction_data?.contract}
              />
              <THTile
                title="Order Match Date:"
                value={moment
                  .unix(props.data?.transaction_data?.timestamp)
                  .format('DD/MM/YYYY')}
              />
              <THTile
                title="Order Match Time:"
                value={moment
                  .unix(props.data?.transaction_data?.timestamp)
                  .format('HH:mm:ss')}
              />
            </Box>

            <Box sx={{ width: '50%' }}>
              <THTile
                title="Unit Price:"
                value={isNaN(unitPrice) ? '-' : unitPrice.toString()}
              />
              <THTile
                title="Quantity:"
                value={props.data?.transaction_data?.values?.amountTaken}
              />
              <THTile
                title="Total Amount:"
                value={props.data?.transaction_data?.values?.amountFilled}
              />
            </Box>
          </Box>
        </Box> 

        <Divider sx={{ mt: 3, mb: 2 }} />

        {/* <Box
        sx={{
          width: {
            xs: '100%',
            lg: '50%',
          },
          height: '100%',
          p: 3,
        }}
      > */}

        <Box>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 400,
              color: Colors.textColorDarkGreen,
              mt: 1,
            }}
          >
            Purchase Details
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              // alignItems: 'center',
            }}
          >
            <Box sx={{ width: '50%' }}>
              <THTile
                title="Sold to:"
                value={props.data?.transaction_data?.to}
              />
              <THTile
                title="Sold by:"
                value={props.data?.transaction_data?.from}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        component="img"
        sx={{
          width: '50%',
          display: {
            xs: 'none',
            lg: 'block',
          },
        }}
        src={TransactionHistoryImg}
      />
    </Paper>
  )
}

export default OrderDetails
