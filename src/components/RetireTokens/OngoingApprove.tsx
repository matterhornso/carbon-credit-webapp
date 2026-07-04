import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import CCTable from '../../atoms/CCTable'

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setOngoingApproveTokenRetirement } from '../../redux/Slices/tokenRetireSlice'

import { Colors } from '../../theme'
import { limitTitleFromMiddle } from '../../utils/commonFunctions'

import { getLocalItem, setLocalItem } from '../../utils/Storage'
import { ethers } from 'ethers'
import CCButton from '../../atoms/CCButton'
declare let window: any

const provider =
  window.ethereum != null
    ? new ethers.providers.Web3Provider(window.ethereum)
    : ethers.getDefaultProvider()
const headings = ['Transaction ID', 'Quantity', 'Status', 'Action']

const OngoingApprove = (props: any) => {
  const dispatch = useAppDispatch()

  const onGoingApproveTokenRetirementLocalStorage = getLocalItem(
    'OngoingApproveTokenRetirement'
  )

  const ongoingApproveTokenRetirement = useAppSelector(
    ({ tokenRetire }) => tokenRetire.ongoingApproveTokenRetirement,
    shallowEqual
  )

  const [rows, setRows] = useState<any>()
  useEffect(() => {
    if (onGoingApproveTokenRetirementLocalStorage) {
      dispatch(
        setOngoingApproveTokenRetirement(
          onGoingApproveTokenRetirementLocalStorage
        )
      )
    }
  }, [])

  useEffect(() => {
    if (ongoingApproveTokenRetirement) {
      makeRows(ongoingApproveTokenRetirement)
      checkForPendingTransactions()
    } else {
      setRows(null)
    }
  }, [ongoingApproveTokenRetirement])

  const makeRows = (receipt: any) => {
    const rows = [
      [
        limitTitleFromMiddle(ongoingApproveTokenRetirement?.hash),
        '-',
        receipt?.blockHash ? 'Completed' : 'In-progress',
        receipt?.blockHash ? (
          <CCButton
            sx={{
              backgroundColor: Colors.darkPrimary1,
              padding: '8px 24px',
              minWidth: '50px',
              color: '#fff',
              borderRadius: 10,
              fontSize: 14,
              mr: 1,
            }}
            onClick={() => props.onSaveAfterApprove()}
          >
            Save
          </CCButton>
        ) : (
          '-'
        ),
      ],
    ]
    setRows(rows)
  }

  const getTransaction = async (txId: string) => {
    try {
      const res: any = await provider.getTransaction(txId)
      if (res) {
        let success = false
        if (res?.blockHash) {
          success = true
        }
        return { res, success }
      }
    } catch (error) {
      console.log(
        'Error in transactionCalls.getTransactionByUser api : ',
        error
      )
    }
  }

  const checkForPendingTransactions = async () => {
    try {
      const receipt: any = await getTransaction(
        ongoingApproveTokenRetirement?.hash
      )

      if (!receipt?.success) {
        //This means approve call is done and put in blockchain
        const newReceipt: any = await receipt?.res.wait()
        if (newReceipt?.blockHash) {
          makeRows(newReceipt)
        }
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
