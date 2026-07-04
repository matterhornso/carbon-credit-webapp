import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { pathNames } from '../../routes/pathNames'
import { useNavigate } from 'react-router-dom'
import { setViewCommentsData } from '../../redux/Slices/reportsViewCommentsSlice'
import { useDispatch } from 'react-redux'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'

interface TokenAndContractReportTableProps {
  uuid: 'string'
}

const TokenAndContractReportTable = (
  props: TokenAndContractReportTableProps
) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [tableRowsData, setTableRowsData] = useState<any | 'string'>()

  const headings = [
    'Date of Report Submission',
    'No of VCOT Authorised',
    'Date of Verification',
    'Comments',
  ]

  useEffect(() => {
    getProjectByReportId()
  }, [])

  const handleComments = (i: any) => {
    dispatch(setViewCommentsData(i))
    navigate(pathNames.REPORT_VIEW_COMMENTS)
  }

  const getProjectByReportId = () => {
    dataCollectionCalls.getAllMonthlyData(props?.uuid).then((res) => {
      if (res?.success) {
        if (res?.data && res?.error.length === 0) {
          if (res?.data?.main_project?.report) {
            const tempData = [res?.data?.main_project]
            const settingTableRowData = tempData.map(
              (i: any, index: number) => {
                return [
                  <Typography key={index}>
                    {' '}
                    {`${moment(i?.report?.createdAt).format('DD/MM/YYYY')} -
								${moment(i?.report?.next_date).format('DD/MM/YYYY')}`}
                  </Typography>,
                  <Typography textAlign={'center'} key={index}>
                    {i?.report?.quantity}
                  </Typography>,
                  <Typography key={index}>
                    {moment(i?.report?.createdAt).format('DD/MM/YYYY')}
                  </Typography>,
                  <Typography
                    key={index}
                    onClick={() => handleComments(i)}
                    sx={{
                      fontSize: 16,
                      fontWeight: 600,
                      textDecoration: 'underline',
                      textDecorationColor: '#006B5E',
                      color: '#006B5E',
                      cursor: 'pointer',
                    }}
                  >
                    View
                  </Typography>,
                ]
              }
            )
            setTableRowsData(settingTableRowData)
          } else if (!res?.data?.main_project?.report) {
            setTableRowsData('No Reports found')
          }
        } else if (res?.error) {
          alert(res?.error[0])
        }
      }
    })
  }

  return (
    <Box sx={{ pt: 1 }}>
      <Typography sx={{ pl: 2, fontWeight: 500, fontSize: 14 }}>
        Reports
      </Typography>
      {!tableRowsData ? (
        <CCTableSkeleton sx={{ mt: 2 }} />
      ) : typeof tableRowsData === 'string' ? (
        <Typography
          textAlign="center"
          sx={{
            py: 1,
            mb: 2,
            mt: 1,
            background: '#CCE8E1',
            fontSize: 15,
            borderRadius: 30,
          }}
        >
          {'No Reports Found'}
        </Typography>
      ) : (
        <TableContainer sx={{ pl: 2, pb: 2, pt: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: '#CCE8E1' }}>
                {headings &&
                  headings.length &&
                  headings.map((tdCell: any, index: number) => (
                    <TableCell
                      key={index}
                      sx={{ fontSize: 14, fontWeight: 500 }}
                    >
                      {tdCell}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableRowsData &&
                tableRowsData.length &&
                tableRowsData.map((row: any, index: number) => (
                  <TableRow key={index} sx={{ background: '#FAFDFA' }}>
                    {row.map((tdValue: any, index: number) => (
                      <TableCell
                        key={index}
                        sx={{ border: 'none', fontSize: 14, fontWeight: 400 }}
                      >
                        {tdValue}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
export default TokenAndContractReportTable
