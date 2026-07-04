import { Grid, Paper } from '@mui/material'
import React, { useState } from 'react'
import TabSelector from '../../../atoms/TabSelector/TabSelector'
import OngoingApprove from './OngoingApprove'
import OngoingDeposit from './OngoingDeposit'
import OngoingSellOrder from './OngoingSellOrder'
import SellOrdersList from './SellOrdersList'
import SellToken from './SellToken'

const SellOrderFlow = () => {
  const [tabIndex, setTabIndex] = useState(1)

  return (
    <Grid container>
      <Grid item xs={12} md={7}>
        <SellToken />
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
              'Ongoing Sell Order',
            ]}
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
            tabStyle={{ width: 'auto' }}
            sx={{ mt: 0 }}
          />
          {tabIndex === 1 && <OngoingApprove />}
          {tabIndex === 2 && <OngoingDeposit />}
          {tabIndex === 3 && <OngoingSellOrder />}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <SellOrdersList />
      </Grid>
    </Grid>
  )
}

export default SellOrderFlow
