import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { marketplaceCalls } from '../../../api/marketplaceCalls.api'
import CCTable from '../../../atoms/CCTable'
import CCTableSkeleton from '../../../atoms/CCTableSkeleton'
import EmptyComponent from '../../../atoms/EmptyComponent/EmptyComponent'
import ShortenedIDComp from '../../../atoms/ShortenedIDComp.tsx/ShortenedIDComp'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { useMarketplaceBuy } from '../../../hooks/useMarketPlaceBuy'
import { Colors } from '../../../theme'
import { limitTitleFromMiddle, roundUp } from '../../../utils/commonFunctions'
// import { getBuyOrdersListData } from '../../../utils/Marketplace/marketplaceBuyFlow.util'
import { getLocalItem } from '../../../utils/Storage'

const headings = [
  'Order ID',
  // 'Date',
  // 'Time',
  'Quantity',
  'Unit Price',
  'Total Amount',
  // 'Quantity Left',
  // 'Action',
]

const BuyOrdersList = () => {
  const [rows, setRows] = useState<any>(null)
  const { getBuyOrdersListData } = useMarketplaceBuy()
  const accountAddress = useAppSelector(
    ({ wallet }) => wallet.accountAddress,
    shallowEqual
  )
  const buyOrdersListData = useAppSelector(
    ({ marketplaceBuyFlow }) => marketplaceBuyFlow.buyOrdersListData,
    shallowEqual
  )
  const buyOrdersListDataLoading = useAppSelector(
    ({ marketplaceBuyFlow }) => marketplaceBuyFlow.buyOrdersListDataLoading,
    shallowEqual
  )

  useEffect(() => {
    if (accountAddress) {
      getBuyOrdersListData()
    }
  }, [accountAddress])
  useEffect(() => {
    if (buyOrdersListData) {
      const temp: any[] = []
      buyOrdersListData.data.forEach((row: any) => {
        if (row?.fillOrder.length) {
          row?.fillOrder.forEach((order: any, index: number) => {
            const transactionElement = row?.transactions?.fill[index]
            const orderId = transactionElement?.transactionHash
            const quantity = order?._amountsToTake.reduce(
              (acc: any, cur: any) => {
                return acc + cur
              },
              0
            )
            const unitPrice = roundUp(order?._feeAmount / quantity, 3)
            const totalAmount = order?._feeAmount
            temp.push([
              <ShortenedIDComp
                key={index}
                referenceId={orderId}
                width={'565'}
              />,
              quantity,
              unitPrice,
              totalAmount,
            ])
          })
          setRows(temp)
        }
      })
    }
  }, [buyOrdersListData])

  return (
    <>
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography sx={{ color: Colors.darkPrimary1, fontWeight: 500 }}>
          Buy Orders
        </Typography>
        {buyOrdersListDataLoading ? (
          <CCTableSkeleton sx={{ mt: 2 }} />
        ) : rows && rows.length ? (
          <CCTable headings={headings} rows={rows} />
        ) : (
          <EmptyComponent
            photoType={2}
            title="No orders made yet"
            exploreMarketplace
            elevation={0}
          />
        )}
      </Paper>
    </>
  )
}

export default BuyOrdersList
