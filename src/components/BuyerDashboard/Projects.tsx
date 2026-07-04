import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { marketplaceCalls } from '../../api/marketplaceCalls.api'
import CCTable from '../../atoms/CCTable'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import { Colors, Images } from '../../theme'
import ApprovalChip from '../../atoms/ApprovalChip/ApprovalChip'
import LimitedText from '../../atoms/LimitedText/LimitedText'
import EmptyComponent from '../../atoms/EmptyComponent/EmptyComponent'
import { buyerCalls } from '../../api/buyerCalls.api'
let headerIndex = 0
const heading = [
  <LimitedText key={headerIndex++} text={'Reference ID'} />,
  <LimitedText key={headerIndex++} text={'Received On'} />,
  <LimitedText key={headerIndex++} text={'Issuer'} />,
  <LimitedText key={headerIndex++} text={'Project Name'} />,
  <LimitedText key={headerIndex++} text={'Project Type'} />,
  <LimitedText key={headerIndex++} text={'C02e Sequestered'} />,
  <LimitedText key={headerIndex++} text={'Unit Price'} />,
  <LimitedText key={headerIndex++} text={'Final Price'} />,
  <LimitedText key={headerIndex++} text={'Status'} />,
]
const Projects = () => {
  const [tableRows, setTableRows] = useState([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getPurchasedProject()
  }, [])

  const getPurchasedProject = async () => {
    try {
      setLoading(true)
      const res = await buyerCalls.getPurchasedProject()
      if (res?.success) {
        const tableBodyData = res?.data.map((item: any, index: number) => {
          return [
            <LimitedText key={index} text={item?.uuid} ellispsisAtStart />,
            <LimitedText
              key={index}
              text={moment(item?.receive_on).format('DD/MM/YYYY')}
            />,
            <LimitedText key={index} text={item?.issuer} />,
            // <Box
            //   key={index}
            //   sx={{
            //     display: 'flex',
            //     justifyContent: 'center',
            //     alignItems: 'center',
            //     columnGap: '5px',
            //   }}
            // >
            //   <Box
            //     sx={{
            //       bgcolor: '#F0FFFB',
            //       width: 40,
            //       height: 40,
            //       borderRadius: '100%',
            //       display: 'flex',
            //       justifyContent: 'center',
            //       alignItems: 'center',
            //     }}
            //   >
            //     <img height={24} width={24} src={Images.BriefcaseIcon} />
            //   </Box>
            <LimitedText text={item?.name} key={index} />,
            // </Box>
            // <Box
            //   key={index}
            //   sx={{
            //     display: 'flex',
            //     flexDirection: 'row',
            //     alignItems: 'center',
            //   }}
            // >
            <LimitedText key={index} text={item?.type.toString()} />,
            // </Box>
            <LimitedText key={index} text={item?.Co2_Sequestered} />,
            <LimitedText key={index} text={item?.unitPrice} />,
            <LimitedText key={index} text={item?.finalPrice} />,
            // <Typography key={index} textAlign={'end'}>
            //   {}
            // </Typography>,
            // <Typography key={index} textAlign={'end'}>
            //   {item?.unitPrice}
            // </Typography>,
            // <Typography key={index} textAlign={'end'}>
            //   {item?.finalPrice}
            // </Typography>,
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {item?.status === 'success' && (
                <ApprovalChip variant={'Approved'} />
              )}
              {item?.status !== 'success' && (
                <ApprovalChip variant={'Rejected'} />
              )}
            </Box>,
          ]
        })
        setTableRows(tableBodyData)
      } else if (!res?.success) {
        alert('Something went wrong!')
      }
    } catch (err) {
      console.log('Error in marketplaceCalls.getPurchasedProject api ~ ', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Paper sx={{ p: 2, minHeight: '55vh', mt: 2 }}>
      <Typography sx={{ fontSize: 22, color: Colors.darkPrimary1, mb: 2 }}>
        Purchased Projects
      </Typography>
      {loading ? (
        <CCTableSkeleton />
      ) : tableRows && tableRows.length > 0 ? (
        <CCTable
          headings={heading}
          rows={tableRows}
          pagination={tableRows.length > 4}
        />
      ) : (
        <EmptyComponent
          title={'No Carbon Token(s) purchased from any project yet!!!'}
          elevation={0}
          photoType={1}
        />
      )}
    </Paper>
  )
}

export default Projects
