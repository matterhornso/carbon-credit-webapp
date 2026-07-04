// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Grid } from '@mui/material'

// Local Imports
import MarketDepth from './MarketDepth'
import TabSelector from '../../atoms/TabSelector/TabSelector'
import BuyOrderFlow from './BuyOrderFlow/BuyOrderFlow'
import SellOrderFlow from './SellOrderFlow/SellOrderFlow'
import { getLocalItem } from '../../utils/Storage'
import {
  LOCAL_STORAGE_VARS,
  MARKETPLACE_CALL_TYPES,
} from '../../config/constants.config'
import WithdrawFlow from './WithdrawFlow/WithdrawFlow'
import {
  setOngoingDepositTransactionSellFlow,
  setOngoingSellOrderTransaction,
} from '../../redux/Slices/Marketplace/marketplaceSellFlowSlice'
import {
  setOngoingBuyOrderTransaction,
  setOngoingDepositTransactionBuyFlow,
} from '../../redux/Slices/Marketplace/marketplaceBuyFlowSlice'
// import { checkBlockchainTransactionComplete } from '../../utils/Marketplace/marketplace.util'
import {useMarketPlace} from '../../hooks/useMarketPlace'
interface BuySellComponentProps {}

const BuySellComponent: FC<BuySellComponentProps> = (props) => {
  const [tabIndex, setTabIndex] = useState(1)

  const onGoingDepositTxIdSellFlowLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.ON_GOING_DEPOSIT_TX_ID_SELL_FLOW
  )
  const onGoingDepositTxIdBuyFlowLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.ON_GOING_DEPOSIT_TX_ID_BUY_FLOW
  )
  const onGoingSellOrderTxIdLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.ON_GOING_SELL_ORDER_TX_ID
  )
  const onGoingBuyOrderTxIdLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.ON_GOING_BUY_ORDER_TX_ID
  )

  const { checkBlockchainTransactionComplete } = useMarketPlace()

  useEffect(() => {
    checkForTransactionToComplete()
  }, [])

  function checkForTransactionToComplete() {
    let txId
    let setOngoingTransaction
    let callType = ''

    if (onGoingDepositTxIdSellFlowLocalStorage) {
      txId = onGoingDepositTxIdSellFlowLocalStorage
      setOngoingTransaction = setOngoingDepositTransactionSellFlow
      callType = MARKETPLACE_CALL_TYPES.DEPOSIT_SELL_FLOW
    } else if (onGoingDepositTxIdBuyFlowLocalStorage) {
      txId = onGoingDepositTxIdBuyFlowLocalStorage
      setOngoingTransaction = setOngoingDepositTransactionBuyFlow
      callType = MARKETPLACE_CALL_TYPES.DEPOSIT_BUY_FLOW
    } else if (onGoingSellOrderTxIdLocalStorage) {
      txId = onGoingSellOrderTxIdLocalStorage
      setOngoingTransaction = setOngoingSellOrderTransaction
      callType = MARKETPLACE_CALL_TYPES.CREATE_SELL_ORDER
    } else if (onGoingBuyOrderTxIdLocalStorage) {
      txId = onGoingBuyOrderTxIdLocalStorage
      setOngoingTransaction = setOngoingBuyOrderTransaction
      callType = MARKETPLACE_CALL_TYPES.CREATE_BUY_ORDER
    }
    checkBlockchainTransactionComplete(txId, callType, setOngoingTransaction)
  }

  return (
    <Grid container>
      <Grid item md={12} sm={12} lg={9} sx={{ paddingRight: 2 }}>
        <TabSelector
          tabArray={['Buy', 'Sell', 'Withdraw']}
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          tabStyle={{ width: 'auto' }}
          sx={{ mt: 0 }}
        />
        {tabIndex === 1 && <BuyOrderFlow />}
        {tabIndex === 2 && <SellOrderFlow />}
        {tabIndex === 3 && <WithdrawFlow />}
      </Grid>
      <Grid
        item
        lg={3}
        sx={{
          padding: 1,
          display: {
            xs: 'none',
            lg: 'block',
          },
        }}
      >
        <MarketDepth />
      </Grid>
    </Grid>
  )
}

export default BuySellComponent
