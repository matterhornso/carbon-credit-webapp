import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC, useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import TabSelector from '../../../atoms/TabSelector/TabSelector'
import { TOKEN_TYPES } from '../../../config/constants.config'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { Colors } from '../../../theme'
// import {
//   getBalanceOnExchange,
//   getWalletBalance,
// } from '../../../utils/Marketplace/marketplaceSellFlow.util'
// import { getApprovedTokensBalance } from '../../../utils/tokenRetire.utils'
import CardRow from '../../../atoms/CardRow/CardRow'
import TabWithdraw from './TabWithdraw'
import { useTokenRetire } from '../../../hooks/useTokenRetire'
import { useMarketPlaceSell } from '../../../hooks/useMarketPlaceSell'

interface WithdrawTokenProps {}

const WithdrawToken: FC<WithdrawTokenProps> = () => {
  const [tabIndex, setTabIndex] = useState(1)
  const {
    getBalanceOnExchange,
    getWalletBalance,
  } = useMarketPlaceSell()
  const accountAddress = useAppSelector(
    ({ wallet }) => wallet.accountAddress,
    shallowEqual
  )

  const walletBal = useAppSelector(
    ({ marketplaceSellFlow }) => marketplaceSellFlow.walletBal,
    shallowEqual
  )
  const exchangeBal = useAppSelector(
    ({ marketplaceSellFlow }) => marketplaceSellFlow.exchangeBal,
    shallowEqual
  )
  const walletBalBuyFlow = useAppSelector(
    ({ marketplaceBuyFlow }) => marketplaceBuyFlow.walletBalBuyFlow,
    shallowEqual
  )
  const exchangeBalBuyFlow = useAppSelector(
    ({ marketplaceBuyFlow }) => marketplaceBuyFlow.exchangeBalBuyFlow,
    shallowEqual
  )
  const withdrawTokenType = useAppSelector(
    ({ marketplaceWithdrawFlow }) => marketplaceWithdrawFlow.withdrawTokenType,
    shallowEqual
  )

  // const onGoingApproveLocalStorage = getLocalItem(
  //   LOCAL_STORAGE_VARS.ON_GOING_APPROVE_DATA_SELL_FLOW
  // )

  // useEffect(() => {
  //   const sellQuantityForApproveInLocalStorage = getLocalItem(
  //     LOCAL_STORAGE_VARS.SELL_QUANTITY_FOR_APPROVE
  //   )
  //   dispatch(setSellQuantityForApprove(sellQuantityForApproveInLocalStorage))
  // }, [])
  const {getApprovedTokensBalance} =  useTokenRetire()

  useEffect(() => {
    if (accountAddress) {
      getWalletBalance()
      getApprovedTokensBalance()
      getBalanceOnExchange()
    }
  }, [accountAddress])

  return (
    <>
      <Paper
        sx={{
          mt: 1,
          height: '100%',
          borderRadius: '4px',
          p: 2,
          // pointerEvents: onGoingApproveLocalStorage ? 'none' : 'all',
          // opacity: onGoingApproveLocalStorage ? 0.5 : 1,
        }}
      >
        {withdrawTokenType === TOKEN_TYPES.VCOT ? (
          <Box>
            <CardRow
              title="Wallet Balance for Sale :"
              titleStyle={{
                color: Colors.lightPrimary1,
                fontSize: 16,
                fontWeight: 500,
              }}
              valueStyle={{
                fontSize: 16,
                fontWeight: 500,
              }}
              value={`${walletBal || 0} VCOT`}
            />
            <CardRow
              title="Balance on Exchange :"
              titleStyle={{
                color: Colors.lightPrimary1,
                fontSize: 16,
                fontWeight: 500,
              }}
              valueStyle={{
                fontSize: 16,
                fontWeight: 500,
              }}
              value={`${exchangeBal || 0} VCOT`}
            />
          </Box>
        ) : (
          <Box>
            <CardRow
              title="Wallet Balance for Purchase :"
              titleStyle={{
                color: Colors.lightPrimary1,
                fontSize: 16,
                fontWeight: 500,
              }}
              valueStyle={{
                fontSize: 16,
                fontWeight: 500,
              }}
              value={`${walletBalBuyFlow || 0} INR`}
            />
            <CardRow
              title="Balance on Exchange :"
              titleStyle={{
                color: Colors.lightPrimary1,
                fontSize: 16,
                fontWeight: 500,
              }}
              valueStyle={{
                fontSize: 16,
                fontWeight: 500,
              }}
              value={`${exchangeBalBuyFlow || 0} INR`}
            />
          </Box>
        )}
        <TabSelector
          tabArray={['Withdraw Tokens']}
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          tabStyle={{ width: 'auto' }}
          sx={{ mt: 0 }}
        />
        {tabIndex === 1 && <TabWithdraw />}
      </Paper>
    </>
  )
}

export default WithdrawToken
