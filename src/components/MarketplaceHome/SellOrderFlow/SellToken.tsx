import { Paper } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import TabSelector from '../../../atoms/TabSelector/TabSelector'
import { LOCAL_STORAGE_VARS } from '../../../config/constants.config'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { setSellQuantityForApprove } from '../../../redux/Slices/Marketplace/marketplaceSellFlowSlice'
import { Colors } from '../../../theme'
// import {
//   getApprovedTokensBalance,
//   getBalanceOnExchange,
//   getWalletBalance,
// } from '../../../utils/Marketplace/marketplaceSellFlow.util'
import { getLocalItem } from '../../../utils/Storage'
import CardRow from '../../../atoms/CardRow/CardRow'
import TabSellApprove from './TabSellApprove'
import TabSellCreateSellOrder from './TabSellCreateSellOrder'
import TabSellDeposit from './TabSellDeposit'
import { useMarketPlaceSell } from '../../../hooks/useMarketPlaceSell'

interface SellTokenProps {}

const SellToken: FC<SellTokenProps> = () => {
  const dispatch = useAppDispatch()

  const [tabIndex, setTabIndex] = useState(1)
  const {
    getApprovedTokensBalance,
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
  const approvedTokensBal = useAppSelector(
    ({ marketplaceSellFlow }) => marketplaceSellFlow.approvedTokensBal,
    shallowEqual
  )

  const onGoingApproveLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.ON_GOING_APPROVE_DATA_SELL_FLOW
  )

  useEffect(() => {
    const sellQuantityForApproveInLocalStorage = getLocalItem(
      LOCAL_STORAGE_VARS.SELL_QUANTITY_FOR_APPROVE
    )
    dispatch(setSellQuantityForApprove(sellQuantityForApproveInLocalStorage))
  }, [])

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
          title="Approved Token(Carbon) Balance :"
          titleStyle={{
            color: Colors.lightPrimary1,
            fontSize: 16,
            fontWeight: 500,
          }}
          valueStyle={{
            fontSize: 16,
            fontWeight: 500,
          }}
          value={`${approvedTokensBal || 0} VCOT`}
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
        <TabSelector
          tabArray={['Approve Tokens', 'Deposit Tokens', 'Sell Order']}
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          tabStyle={{ width: 'auto' }}
          sx={{ mt: 0 }}
        />
        {tabIndex === 1 && <TabSellApprove />}
        {tabIndex === 2 && <TabSellDeposit />}
        {tabIndex === 3 && <TabSellCreateSellOrder />}
      </Paper>
    </>
  )
}

export default SellToken
