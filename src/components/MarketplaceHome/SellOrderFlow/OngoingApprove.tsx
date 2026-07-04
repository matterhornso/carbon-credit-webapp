import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import CCTable from '../../../atoms/CCTable'
import { LOCAL_STORAGE_VARS } from '../../../config/constants.config'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { useMarketPlace } from '../../../hooks/useMarketPlace'
import {
  setOnGoingApproveRedux,
  setSellQuantityForApprove,
} from '../../../redux/Slices/Marketplace/marketplaceSellFlowSlice'
import { Colors } from '../../../theme'
import { limitTitleFromMiddle } from '../../../utils/commonFunctions'
import { getTransaction } from '../../../utils/Marketplace/marketplace.util'
// import { getApprovedTokensBalance } from '../../../utils/Marketplace/marketplaceSellFlow.util'
import { getLocalItem, removeItem, setLocalItem } from '../../../utils/Storage'
import { useMarketPlaceSell } from '../../../hooks/useMarketPlaceSell'

const headings = ['Transaction ID', 'Quantity', 'Status']

const OngoingApprove = () => {
  const dispatch = useAppDispatch()
  const  { getApprovedTokensBalance } = useMarketPlaceSell()
  const { getTransaction } = useMarketPlace()

  const onGoingApproveLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.ON_GOING_APPROVE_DATA_SELL_FLOW
  )
  const sellQuantityForApproveLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.SELL_QUANTITY_FOR_APPROVE
  )

  const onGoingApproveRedux = useAppSelector(
    ({ marketplaceSellFlow }) => marketplaceSellFlow.onGoingApproveRedux,
    shallowEqual
  )

  const [rows, setRows] = useState<any>()
  useEffect(() => {
    if (onGoingApproveLocalStorage) {
      dispatch(setOnGoingApproveRedux(onGoingApproveLocalStorage))
    }
  }, [])

  useEffect(() => {
    if (onGoingApproveRedux) {
      makeRows(onGoingApproveRedux)
      checkForPendingTransactions()
    } else {
      setRows(null)
    }
  }, [onGoingApproveRedux])

  const makeRows = (receipt: any) => {
    const rows = [
      [
        limitTitleFromMiddle(onGoingApproveRedux?.hash),
        sellQuantityForApproveLocalStorage,
        receipt?.blockHash ? 'Completed' : 'In-progress',
      ],
    ]
    setRows(rows)
  }

  const checkForPendingTransactions = async () => {
    console.log('checkForPendingTransactions called')
    try {
      const receipt: any = await getTransaction(onGoingApproveRedux?.hash)
      if (!receipt?.success) {
        //This means approve call is done and put in blockchain
        const newReceipt: any = await receipt?.res.wait()
        if (newReceipt?.blockHash) {
          getApprovedTokensBalance()
          // dispatch(setDataToMakeDepositCall(newReceipt))
          dispatch(setOnGoingApproveRedux(null))
          dispatch(setSellQuantityForApprove(0))

          removeItem(LOCAL_STORAGE_VARS.ON_GOING_APPROVE_DATA_SELL_FLOW)
          removeItem(LOCAL_STORAGE_VARS.SELL_QUANTITY_FOR_APPROVE)
        }
        makeRows(receipt)
        getApprovedTokensBalance()
      }
    } catch (err) {
      console.log('Error ', err)
    }
  }
  return (
    <>
      {rows && rows.length ? (
        <CCTable headings={headings} rows={rows} />
      ) : (
        <Box
          sx={{
            mt: 2,
            bgcolor: Colors?.darkPrimary2,
            p: 1,
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography>No Ongoing Transactions Pending for Approval</Typography>
        </Box>
      )}
    </>
  )
}

export default OngoingApprove
