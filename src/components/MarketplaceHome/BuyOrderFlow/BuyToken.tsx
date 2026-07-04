import { Paper } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import TabSelector from '../../../atoms/TabSelector/TabSelector'
import { LOCAL_STORAGE_VARS } from '../../../config/constants.config'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { Colors } from '../../../theme'
// import {
//   getApprovedTokensBalanceBuyFlow,
//   getBalanceOnExchangeBuyFlow,
//   getWalletBalanceBuyFlow,
// } from '../../../utils/Marketplace/marketplaceBuyFlow.util'
import { getLocalItem } from '../../../utils/Storage'
import CardRow from '../../../atoms/CardRow/CardRow'
import TabBuyApprove from './TabBuyApprove'
import TabBuyCreateBuyOrder from './TabBuyCreateBuyOrder'
import TabBuyDeposit from './TabBuyDeposit'
import { useMarketplaceBuy } from '../../../hooks/useMarketPlaceBuy'

interface BuyTokenProps {}

const BuyToken: FC<BuyTokenProps> = () => {
  const dispatch = useAppDispatch()
  const [tabIndex, setTabIndex] = useState(1)
  const {
    getApprovedTokensBalanceBuyFlow,
    getBalanceOnExchangeBuyFlow,
    getWalletBalanceBuyFlow,
  }  = useMarketplaceBuy()
  const accountAddress = useAppSelector(
    ({ wallet }) => wallet.accountAddress,
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
  const approvedTokensBalBuyFlow = useAppSelector(
    ({ marketplaceBuyFlow }) => marketplaceBuyFlow.approvedTokensBalBuyFlow,
    shallowEqual
  )

  const onGoingApproveLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.ON_GOING_APPROVE_DATA_BUY_FLOW
  )

  useEffect(() => {
    if (accountAddress) {
      getWalletBalanceBuyFlow()
      getApprovedTokensBalanceBuyFlow()
      getBalanceOnExchangeBuyFlow()
    }
  }, [accountAddress])

  return (
    <Paper
      sx={{
        mt: 1,
        borderRadius: '4px',
        p: 2,
        // pointerEvents: onGoingApproveLocalStorage ? 'none' : 'all',
        // opacity: onGoingApproveLocalStorage ? 0.5 : 1,
      }}
    >
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
        title="Approved Token(INR/USD) Balance :"
        titleStyle={{
          color: Colors.lightPrimary1,
          fontSize: 16,
          fontWeight: 500,
        }}
        valueStyle={{
          fontSize: 16,
          fontWeight: 500,
        }}
        value={`${approvedTokensBalBuyFlow || 0} INR`}
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
      <TabSelector
        tabArray={['Approve Tokens', 'Deposit Tokens', 'Buy Order']}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        tabStyle={{ width: 'auto' }}
        sx={{ mt: 0 }}
      />
      {tabIndex === 1 && <TabBuyApprove />}
      {tabIndex === 2 && <TabBuyDeposit />}
      {tabIndex === 3 && <TabBuyCreateBuyOrder />}
    </Paper>
  )
}

export default BuyToken
