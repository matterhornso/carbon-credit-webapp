import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CCButton from '../../atoms/CCButton'
import { useAppSelector } from '../../hooks/reduxHooks'
import { useTokenRetire } from '../../hooks/useTokenRetire'
import { pathNames } from '../../routes/pathNames'
import { Colors } from '../../theme'
// import { getApprovedTokensBalance } from '../../utils/tokenRetire.utils'
import CardRow from './CardRow'

const ApprovedTokenDetails = () => {
  const navigate = useNavigate()

  const accountAddress = useAppSelector(
    ({ wallet }) => wallet.accountAddress,
    shallowEqual
  )
  const ongoingApproveTokenRetirement = useAppSelector(
    ({ tokenRetire }) => tokenRetire.ongoingApproveTokenRetirement,
    shallowEqual
  )
  const tokensApprovedForRetiring = useAppSelector(
    ({ tokenRetire }) => tokenRetire.tokensApprovedForRetiring,
    shallowEqual
  )

  const {getApprovedTokensBalance} =  useTokenRetire()
  useEffect(() => {
    if (accountAddress) {
      getApprovedTokensBalance()
    }
  }, [accountAddress, ongoingApproveTokenRetirement])

  const isDisabled = () => {
    return !tokensApprovedForRetiring ? true : false
  }

  return (
    <Grid container sx={{ pl: 3, pr: 1 }}>
      <Grid item xs={10}>
        <Box sx={{ pl: 1 }}>
          <Typography sx={{ fontSize: 22 }}>Approved Tokens</Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 500, mt: 1 }}>
            Information about the token that has been submitted for approval.
          </Typography>
          <Box sx={{ width: '70%', mt: 3 }}>
            <CardRow title="Token Name :" value={'VCOT'} />
            <CardRow
              title="Quantity(VCOT) :"
              value={
                tokensApprovedForRetiring
                  ? tokensApprovedForRetiring
                  : tokensApprovedForRetiring === 0
                  ? 0
                  : '-'
              }
            />
            <CardRow title="Approval of Tokens for :" value={''} />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'end' }}>
          <CCButton
            sx={{
              padding: '8px 16px',
              fontSize: 14,
              fontWeight: 500,
              borderRadius: '20px',
              bgcolor: '#006B5E',
              color: Colors.white,
              minWidth: 0,
            }}
            onClick={() => navigate(pathNames.RETIRE_TOKENS)}
            disabled={isDisabled()}
            variant="contained"
          >
            Retire
          </CCButton>
        </Box>
      </Grid>
    </Grid>
  )
}

export default ApprovedTokenDetails
