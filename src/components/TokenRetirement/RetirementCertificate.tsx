import { Grid, Paper, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { buyerCalls } from '../../api/buyerCalls.api'
import CCTable from '../../atoms/CCTable'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import EmptyComponent from '../../atoms/EmptyComponent/EmptyComponent'
import LimitedText from '../../atoms/LimitedText/LimitedText'
import { useAppSelector } from '../../hooks/reduxHooks'
import { Colors } from '../../theme'
import { getLocalItem } from '../../utils/Storage'
import { handleApiError } from '../../utils/errorHandler'

let index = 0
const headings = [
  <LimitedText key={index++} text={'Transaction ID'} />,
  <LimitedText key={index++} text={'Project Name'} />,
  <LimitedText key={index++} text={'Time'} />,
  // <LimitedText key={index++} text={'Total Tokens'} />,
  <LimitedText key={index++} text={'Retired'} />,
  // <LimitedText key={index++} text={'After Retirement'} />,
  <LimitedText key={index++} text={'Footprint Offset'} />,
  <LimitedText key={index++} text={'Beneficial owner'} />,
  <LimitedText key={index++} text={'Retirement Reason'} />,
]

const RetirementCertificate = () => {
  const userID = getLocalItem('userDetails')?.user_id

  // const accountAddress = useAppSelector(
  //   ({ wallet }: { wallet: any }) => wallet?.accountAddress,
  //   shallowEqual
  // )
  const [retireTokenList, setRetireTokenList] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)

  // useEffect(() => {
  //   if (accountAddress) getAllRetireTokens()
  // }, [accountAddress])

  // const getAllRetireTokens = () => {
  //   setLoading(true)
  //   const payload = {
  //     user: accountAddress,
  //   }
  //   buyerCalls
  //     .getAllRetireToken(payload)
  //     .then((res: any) => {
  //       if (res?.success && res?.data.length) {
  //         const modifiedRows = res?.data
  //         const rows =
  //           modifiedRows &&
  //           modifiedRows.map((i: any) => {
  //             return [
  //               moment(i?.createdAt).format(`DD/MM/YY`),
  //               moment(i?.createdAt).format(`HH:mm:SS`),
  //               i?.token_quantity,
  //               i?.token_quantity,
  //               '-',
  //               '-',
  //               '-',
  //               i?.beneficialOwner,
  //               i?.reason,
  //             ]
  //           })
  //         setRetireTokenList(rows)
  //       }
  //     })
  //     .catch((err) => handleApiError(err, { action: 'RetirementCertificate:71' }))
  //     .finally(() => {
  //       setLoading(false)
  //     })
  // }

  useEffect(() => {
    getTokenRetireTxs()
  }, [])

  const getTokenRetireTxs = async () => {
    setLoading(true)
    try {
      const res = await buyerCalls.getRetirements({ user: userID })
      if (res?.success && res?.data.length) {
        const modifiedRows = res?.data
        const rows =
          modifiedRows &&
          modifiedRows.map((i: any) => {
            return [
              // <LimitedText key={i?._id} text={i?._id} ellispsisAtStart />,
              <Box
                key={i?._id}
                sx={{
                  wordBreak: 'break-all',
                }}
              >
                <a
                  href={`${process.env.REACT_APP_BLOCKCHAIN_EXPLORER}tx/${i?.transaction}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#1A8EF5' }}
                >
                  <LimitedText text={i?.transaction} />
                </a>
              </Box>,
              <LimitedText key={i?._id} text={i?.projectId?.company_name} />,
              <LimitedText
                key={i?._id}
                text={moment(i?.createdAt).format(`HH:mm:SS`)}
              />,
              // <LimitedText key={i?._id} text={i?.token_quantity} />,
              <LimitedText key={i?._id} text={i?.retiring} />,
              // <LimitedText key={i?._id} text={'-'} />,
              <LimitedText key={i?._id} text={i?.retiring} />,
              <LimitedText key={i?._id} text={i?.beneficialOwner} />,
              <LimitedText key={i?._id} text={i?.reason} />,
            ]
          })
        setRetireTokenList(rows)
      }
    } catch (e) {
      handleApiError(e, { action: 'buyerCalls.getRetirements' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Grid item xs={12} sx={{ mt: 4 }}>
      <Paper
        elevation={0}
        sx={{
          py: 2,
          px: 2,
          borderRadius: '8px',
          boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.12)',
        }}
      >
        <Typography sx={{ fontSize: 22, fontWeight: 400 }}>
          Token Retirement History
        </Typography>
        {loading ? (
          <CCTableSkeleton />
        ) : retireTokenList && retireTokenList.length ? (
          <CCTable
            headings={headings}
            rows={retireTokenList}
            maxWidth={'100%'}
            pagination={retireTokenList.length > 4}
          />
        ) : (
          <EmptyComponent
            title={'No Records to show'}
            elevation={0}
            photoType={1}
          />
        )}
      </Paper>
    </Grid>
  )
}

export default RetirementCertificate
