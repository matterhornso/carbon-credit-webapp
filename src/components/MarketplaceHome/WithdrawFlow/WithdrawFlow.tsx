import { Grid, Paper } from '@mui/material'
import React, { useState } from 'react'
import TabSelector from '../../../atoms/TabSelector/TabSelector'
import OngoingWithdrawOrder from './OngoingWithdrawOrder'
import WithdrawToken from './WithdrawToken'

const WithdrawFlow = () => {
  const [tabIndex, setTabIndex] = useState(1)

  return (
    <Grid container>
      <Grid item xs={12} md={7}>
        <WithdrawToken />
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
            tabArray={['Ongoing Withdraw']}
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
            tabStyle={{ width: 'auto' }}
            sx={{ mt: 0 }}
          />
          {tabIndex === 1 && <OngoingWithdrawOrder />}
        </Paper>
      </Grid>
    </Grid>
  )
}

export default WithdrawFlow
