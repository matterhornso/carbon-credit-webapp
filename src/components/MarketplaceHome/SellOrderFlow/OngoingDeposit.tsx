import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import CCTable from '../../../atoms/CCTable'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { Colors } from '../../../theme'
import { limitTitleFromMiddle } from '../../../utils/commonFunctions'

const headings = ['Transaction ID', 'Quantity', 'Status']

const OngoingDeposit = () => {
  const ongoingDepositTransactionSellFlow = useAppSelector(
    ({ marketplaceSellFlow }) =>
      marketplaceSellFlow.ongoingDepositTransactionSellFlow,
    shallowEqual
  )

  const [rows, setRows] = useState<any>()

  useEffect(() => {
    if (ongoingDepositTransactionSellFlow) {
      makeRows(ongoingDepositTransactionSellFlow)
    } else {
      setRows(null)
    }
  }, [ongoingDepositTransactionSellFlow])

  const makeRows = (data: any) => {
    const rows = [
      [
        limitTitleFromMiddle(data?.txId),
        '-',
        data?.complete ? 'Completed' : 'In-progress',
      ],
    ]
    setRows(rows)
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
          <Typography>No Ongoing Transactions Pending for Deposit</Typography>
        </Box>
      )}
    </>
  )
}

export default OngoingDeposit
