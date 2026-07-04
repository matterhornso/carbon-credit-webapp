import { Box, Grid, Typography } from '@mui/material'
import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setOngoingApproveTokenRetirement } from '../../redux/Slices/tokenRetireSlice'
import { Colors } from '../../theme'
import { getLocalItem } from '../../utils/Storage'
import CardRow from './CardRow'

declare let window: any

const provider =
  window.ethereum != null
    ? new ethers.providers.Web3Provider(window.ethereum)
    : ethers.getDefaultProvider()

const OngoingApproval = () => {
  const dispatch = useAppDispatch()

  const onGoingApproveTokenRetirementLocalStorage = getLocalItem(
    'OngoingApproveTokenRetirement'
  )
  const ongoingApproveTokenRetirement = useAppSelector(
    ({ tokenRetire }) => tokenRetire.ongoingApproveTokenRetirement,
    shallowEqual
  )

  const [ongoingTxData, setOngoingTxData] = useState<any>(null)

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
      makeData(ongoingApproveTokenRetirement)
      checkForPendingTransactions()
    } else {
      setOngoingTxData(null)
    }
  }, [ongoingApproveTokenRetirement])

  const makeData = (receipt: any) => {
    const data = {
      txId: ongoingApproveTokenRetirement?.hash,
      tokensToApprove: '-',
      status: receipt?.blockHash ? 'Completed' : 'In-progress',
    }
    setOngoingTxData(data)
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
          localStorage.removeItem('OngoingApproveTokenRetirement')
          dispatch(setOngoingApproveTokenRetirement(null))
        }
      }
    } catch (err) {
      console.log('Error ', err)
    }
  }

  return (
    <Box sx={{ pl: 3 }}>
      <Typography sx={{ fontSize: 22 }}>Ongoing Approval</Typography>
      <Typography sx={{ fontSize: 14, fontWeight: 500, mt: 1 }}>
        Approval call going on in blockchain.
      </Typography>
      <Box
        sx={{
          mt: 1,
          display: 'flex',
          justifyContent: 'space-between',
          width: '70%',
        }}
      >
        <Grid container>
          <Grid item xs={4}>
            <Typography
              sx={{
                fontSize: 16,
                color: Colors.darkPrimary1,
                whiteSpace: 'nowrap',
              }}
            >
              {'Transaction ID : '}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              sx={{
                fontSize: 16,
                color: '#141D1B',
                fontWeight: 500,
                wordBreak: 'break-all',
                textAlign: 'left',
              }}
            >
              {ongoingTxData?.txId || ''}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          width: '70%',
        }}
      >
        <CardRow
          title="Quantity(VCOT) :"
          value={ongoingTxData?.tokensToApprove || ''}
        />
        <CardRow title="Status :" value={ongoingTxData?.status || ''} />
      </Box>
    </Box>
  )
}

export default OngoingApproval
