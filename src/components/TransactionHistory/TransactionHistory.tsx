// React Imports
import React, { useEffect } from 'react'

// MUI Imports
import { Grid, Box, Typography, Paper, Divider } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { TransactionHistoryProps } from './TransactionHistory.interface'
import TransactionHistoryImg from '../../assets/Images/illustrations/TransactionHistory.png'
import { Colors } from '../../theme'
import CCTitleValue from '../../atoms/CCTitleValue/CCTitleValue'
import OrderDetails from './OrderDetails'
import { useLocation, useNavigate } from 'react-router-dom'

const TransactionHistory = (props: TransactionHistoryProps) => {
  const navigate = useNavigate()
  const location: any = useLocation()

  useEffect(() => {
    console.log('location')
    console.log(JSON.stringify(location, null, 4))
  }, [])

  return (
    <Box sx={{ p: 0 }}>
      <Grid
        container
        xs={12}
        sx={{ p: 0, border: '0px solid' }}
        justifyContent={'space-between'}
      >
        <Grid item xs={12}>
          <BackHeader title="Transaction History" onClick={() => navigate(-1)} />
        </Grid>

        <Grid item xs={12}>
          <OrderDetails data={location.state?.transactionDetails} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default TransactionHistory
