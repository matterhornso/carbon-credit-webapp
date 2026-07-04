import { Grid, Paper } from '@mui/material'
import React from 'react'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '../../hooks/reduxHooks'
import ApproveToken from './ApproveToken'
import AprrovedTokenDetails from './ApprovedTokenDetails'
import OngoingApproval from './OngoingApproval'

const ApproveTokenCard = () => {
  const ongoingApproveTokenRetirement = useAppSelector(
    ({ tokenRetire }) => tokenRetire.ongoingApproveTokenRetirement,
    shallowEqual
  )

  return (
    <Paper sx={{ p: 2, borderRadius: 1 }}>
      <Grid container>
        <Grid item xs={5}>
          <ApproveToken />
        </Grid>
        <Grid item xs={7} sx={{ borderLeft: '1px solid #E1EEE8' }}>
          {ongoingApproveTokenRetirement ? (
            <OngoingApproval />
          ) : (
            <AprrovedTokenDetails />
          )}
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ApproveTokenCard
