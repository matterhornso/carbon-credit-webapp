import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { projectDetailsCalls } from '../../../api/projectDetailsCalls.api'
import { USER } from '../../../api/user.api'
import CCTable from '../../../atoms/CCTable/CCTable'
import BlockchainCalls from '../../../blockchain/Blockchain'
import {
  limitTitle,
  limitTitleFromMiddle,
  convertToInternationalCurrencySystem,
} from '../../../utils/commonFunctions'
import { getLocalItem } from '../../../utils/Storage'
import LoderOverlay from '../../LoderOverlay'
import LimitedText from '../../../atoms/LimitedText/LimitedText'
import { handleApiError } from '../../../utils/errorHandler'

let index = 0
const headings = [
  <LimitedText key={index++} text="TX HASH" />,
  <LimitedText key={index++} text="PROJECT NAME" />,
  <LimitedText key={index++} text="PROJECT DEVELOPER" />,
  <LimitedText key={index++} text="DATE" />,
  <LimitedText key={index++} text="TIME" />,
  <LimitedText key={index++} text="MINTED" />,
  <LimitedText key={index++} text="RETIRED" />,
]

const TokensTxHistory = (props: any) => {
  const [loading, setLoading] = useState(false)
  const [transactionHistoryData, setTransactionHistoryData] = useState<any>([])

  useEffect(() => {
    getAllTransactionHistory()
  }, [])

  const getAllTransactionHistory = async () => {
    setLoading(true)

    const rows = props?.projectData?.tx_history?.map(
      (i: any, index: number) => {
        return [
          <a
            key={index}
            href={`${process.env.REACT_APP_BLOCKCHAIN_EXPLORER}tx/${i?.txHash}`}
            target={'_blank'}
            rel="noopener noreferrer"
            style={{ color: '#1A8EF5' }}
          >
            <LimitedText
              key={index}
              customStyle={{
                fontSize: 15,
                fontWeight: 500,
              }}
              text={i?.txHash}
            />
          </a>,
          <LimitedText
            key={index}
            customStyle={{
              fontSize: 15,
              fontWeight: 500,
            }}
            text={i?.project_name}
          />,

          <LimitedText
            key={index}
            customStyle={{
              fontSize: 15,
              fontWeight: 500,
            }}
            text={i?.project_developer}
          />,

          <Typography
            key={index}
            textAlign="start"
            sx={{
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            {moment(i?.createdAt).format(`DD/MM/YY`)}
          </Typography>,
          <Typography
            key={index}
            textAlign="start"
            sx={{
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            {moment(i?.next_date).format(`HH:MM:SS`)}
          </Typography>,

          <Typography
            key={index}
            sx={{
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            {convertToInternationalCurrencySystem(i?.minted) || '-'}
          </Typography>,
          <LimitedText
            key={index}
            customStyle={{
              fontSize: 15,
              fontWeight: 500,
            }}
            text={i?.burner}
          />,
        ]
      }
    )

    setTransactionHistoryData(rows)

    setLoading(false)
  }

  // const getAllTransactionHistory = async () => {
  //   setLoading(true)
  //   setLoading(true)

  //   const userAddress =
  //     await BlockchainCalls.getConnectionStatusAndAddress().then((response) => {
  //       setLoading(true)

  //       projectDetailsCalls
  //         .getAllTransactionHistory(response && response.address)
  //         .then((res: any) => {
  //           if (res?.data?.success) {
  //             const rows =
  //               res?.data?.data &&
  //               res?.data?.data.map((i: any, index: number) => {
  //                 return [
  //                   <Typography
  //                     key={index}
  //                     textAlign="start"
  //                     sx={{
  //                       fontSize: 15,
  //                       fontWeight: 500,
  //                       textAlign: 'center',
  //                       width: '50px',
  //                     }}
  //                   >
  //                     {limitTitle(i?.transaction_data?.transactionHash, 7)}
  //                   </Typography>,
  //                   <Typography
  //                     key={index}
  //                     textAlign="start"
  //                     sx={{
  //                       fontSize: 15,
  //                       fontWeight: 500,
  //                       textAlign: 'center',
  //                     }}
  //                   >
  //                     {limitTitle(i?.transaction_id, 7)}
  //                   </Typography>,

  //                   <Typography
  //                     key={index}
  //                     textAlign="start"
  //                     sx={{
  //                       fontSize: 15,
  //                       fontWeight: 500,
  //                       textAlign: 'center',
  //                     }}
  //                   >
  //                     {'-'}
  //                   </Typography>,
  //                   <Typography
  //                     key={index}
  //                     textAlign="start"
  //                     sx={{
  //                       fontSize: 15,
  //                       fontWeight: 500,
  //                       textAlign: 'center',
  //                     }}
  //                   >
  //                     {moment(i?.createdAt).format(`DD/MM/YY`)}
  //                   </Typography>,
  //                   <Typography
  //                     key={index}
  //                     textAlign="start"
  //                     sx={{
  //                       fontSize: 15,
  //                       fontWeight: 500,
  //                       textAlign: 'center',
  //                     }}
  //                   >
  //                     {moment(i?.next_date).format(`HH:MM:SS`)}
  //                   </Typography>,

  //                   <Typography
  //                     key={index}
  //                     textAlign="start"
  //                     sx={{
  //                       fontSize: 15,
  //                       fontWeight: 500,
  //                       textAlign: 'center',
  //                     }}
  //                   >
  //                     {'-'}
  //                   </Typography>,
  //                   <Typography
  //                     key={index}
  //                     textAlign="start"
  //                     sx={{
  //                       fontSize: 15,
  //                       fontWeight: 500,
  //                       textAlign: 'center',
  //                     }}
  //                   >
  //                     {'-'}
  //                   </Typography>,
  //                   <Typography
  //                     key={index}
  //                     textAlign="start"
  //                     sx={{
  //                       fontSize: 15,
  //                       fontWeight: 500,
  //                       textAlign: 'center',
  //                     }}
  //                   >
  //                     {'-'}
  //                   </Typography>,
  //                   <Typography
  //                     key={index}
  //                     textAlign="start"
  //                     sx={{
  //                       fontSize: 15,
  //                       fontWeight: 500,
  //                       textAlign: 'center',
  //                     }}
  //                   >
  //                     {'-'}
  //                   </Typography>,
  //                   <Typography
  //                     key={index}
  //                     textAlign="start"
  //                     sx={{
  //                       fontSize: 15,
  //                       fontWeight: 500,
  //                       textAlign: 'center',
  //                     }}
  //                   >
  //                     {'-'}
  //                   </Typography>,
  //                   <Typography
  //                     key={index}
  //                     textAlign="start"
  //                     sx={{
  //                       fontSize: 15,
  //                       fontWeight: 500,
  //                       textAlign: 'center',
  //                     }}
  //                   >
  //                     {'-'}
  //                   </Typography>,
  //                 ]
  //               })

  //             setTransactionHistoryData(rows)
  //             // if (res?.data?.main_project) {
  //             //   setMonthlyReportsList(rows)
  //             // }
  //           }
  //         })
  //         .catch((err) => handleApiError(err, { action: 'TokensTxHistory:273' }))
  //         .finally(() => {
  //           setLoading(false)
  //         })
  //     })
  // }

  if (loading) {
    return null
  } else {
    return (
      <Box
        sx={{
          // background: '#111E17',
          // padding: '56px 6vw',
          pt: 5,
        }}
      >
        <Typography
          sx={{ fontSize: 18, fontWeight: '400', color: 'headingColor.main' }}
        >
          Tokens Transaction History
        </Typography>
        <Box sx={{ mt: 3 }}>
          <CCTable
            headings={headings}
            rows={transactionHistoryData}
            pagination={true}
            loading={loading}
            hideScrollbar
          />
        </Box>
      </Box>
    )
  }
}

export default TokensTxHistory
