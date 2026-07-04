import { Grid, Paper } from '@mui/material'
import React, { useState } from 'react'
import TabSelector from '../../../atoms/TabSelector/TabSelector'
import BuyOrdersList from './BuyOrdersList'
import BuyToken from './BuyToken'
import OngoingApprove from './OngoingApprove'
import OngoingBuyOrder from './OngoingBuyOrder'
import OngoingDeposit from './OngoingDeposit'

const BuyOrderFlow = () => {
  const [tabIndex, setTabIndex] = useState(1)

  return (
    <Grid container>
      <Grid item xs={12} md={7}>
        <BuyToken />
      </Grid>
      <Grid item xs={12}>
        <Paper
          sx={{
            borderRadius: '4px',
            p: 2,
            mt: 2,
          }}
        >
          <TabSelector
            tabArray={[
              'Ongoing Approve',
              'Ongoing Deposit',
              'Ongoing Buy Order',
            ]}
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
            tabStyle={{ width: 'auto' }}
            sx={{ mt: 0 }}
          />
          {tabIndex === 1 && <OngoingApprove />}
          {tabIndex === 2 && <OngoingDeposit />}
          {tabIndex === 3 && <OngoingBuyOrder />}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <BuyOrdersList />
      </Grid>
    </Grid>
  )
}

export default BuyOrderFlow
