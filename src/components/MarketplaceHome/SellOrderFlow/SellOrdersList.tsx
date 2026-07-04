import { Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import CCButtonOutlined from '../../../atoms/CCButtonOutlined'
import CCTable from '../../../atoms/CCTable'
import CCTableSkeleton from '../../../atoms/CCTableSkeleton'
import EmptyComponent from '../../../atoms/EmptyComponent/EmptyComponent'
import { TOKEN_CONTRACT_ADDRESS } from '../../../config/token.config'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { useMarketPlace } from '../../../hooks/useMarketPlace'
import { useMarketPlaceSell } from '../../../hooks/useMarketPlaceSell'
import { Colors } from '../../../theme'
import { roundUp } from '../../../utils/commonFunctions'
// import { cancelOrder } from '../../../utils/Marketplace/marketplace.util'
// import { getSellOrdersListData } from '../../../utils/Marketplace/marketplaceSellFlow.util'

const headings = [
  'Order ID',
  'Date',
  'Time',
  'Quantity',
  'Unit Price',
  'Total Amount',
  'Quantity Left',
  'Action',
]

const SellOrdersList = () => {
  const sellOrdersList = useAppSelector(
    ({ marketplaceSellFlow }) => marketplaceSellFlow.sellOrdersList,
    shallowEqual
  )
  const sellOrdersLoading = useAppSelector(
    ({ marketplaceSellFlow }) => marketplaceSellFlow.sellOrdersLoading,
    shallowEqual
  )
  const { getSellOrdersListData } = useMarketPlaceSell()

  const { cancelOrder } = useMarketPlace()
  const [rows, setRows] = useState<any>(null)

  useEffect(() => {
    getSellOrdersListData()
  }, [])

  useEffect(() => {
    if (sellOrdersList) {
      const rowValues = sellOrdersList.map((row: any, index: number) => {
        const orderId = row?.uuid
        const quantity = row?._offerAmount
        const totalAmount = row?._wantAmount
        const unitPrice = roundUp(totalAmount / quantity, 3)
        return [
          orderId,
          '-',
          '-',
          quantity,
          unitPrice,
          totalAmount,
          '-',
          row?.cancelOrder && row?.cancelOrder.length ? (
            <Typography sx={{ color: Colors.tertiary, fontSize: 14 }}>
              Cancelled
            </Typography>
          ) : (
            <CCButtonOutlined
              key={index}
              sx={{
                fontSize: 14,
                minWidth: 0,
                padding: '8px 16px',
                borderRadius: 10,
                mr: 3,
                border: 'none',
                backgroundColor: '#F6F9F7',
              }}
              onClick={() => {
                console.log('row', row)

                const payload = {
                  uuid: row?.uuid,
                  _offerHash: row?.hash,
                  _expectedAvailableAmount: row?._offerAmount,
                  _feeAsset: TOKEN_CONTRACT_ADDRESS,
                  _feeAmount: 1,
                }
                cancelOrder(payload)
              }}
            >
              Cancel
            </CCButtonOutlined>
          ),
        ]
      })
      setRows(rowValues)
    }
  }, [sellOrdersList])

  return (
    <>
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography sx={{ color: Colors.darkPrimary1, fontWeight: 500 }}>
          Sell Orders
        </Typography>
        {sellOrdersLoading ? (
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

export default SellOrdersList
