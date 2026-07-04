import React, { useEffect, useState } from 'react'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Typography,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { transactionCalls } from '../../api/transactionCalls.api'
import CCInputField from '../../atoms/CCInputField'
import CCTable from '../../atoms/CCTable'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import EmptyComponent from '../../atoms/EmptyComponent/EmptyComponent'
import ShortenedIDComp from '../../atoms/ShortenedIDComp.tsx/ShortenedIDComp'
import Spinner from '../../atoms/Spinner'
import TextButton from '../../atoms/TextButton/TextButton'
import { pathNames } from '../../routes/pathNames'
import { Colors } from '../../theme'
import NoData from '../../atoms/NoData/NoData'
import BlockchainCalls from '../../blockchain/Blockchain'

const headings = [
  'Transaction ID',
  // 'Buy/Sell',
  'Transaction Type',
  'Date',
  'Time',
  'Quantity(VCOT)',
  'Unit Price',
  'Total Amount',
  'Details',
]

interface TransactionHistoryProps {}

const TransactionHistory = (props: TransactionHistoryProps) => {
  const navigate = useNavigate()

  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [dropdown, setDropdown] = useState('All')
  const [transactionLoading, setTransactionLoading] = useState(false)
  const [transactions, setTransactions] = useState<any>(null)
  const [tableHeading, setTableHeading] = useState<any>(headings)
  const [tableRow, setTableRow] = useState<any>(null)

  useEffect(() => {
    getTransactions()
  }, [])

  const getTransactionName = (type: string) => {
    switch (type) {
      case 'Make': {
        return 'Sell'
      }
      case 'Fill': {
        return 'Buy'
      }
      case 'Cancel': {
        return 'Cancel'
      }
      case 'BurnCarbonToken': {
        return 'Token Retired'
      }
    }
  }
  const loadTableData = (transactionsData: any) => {
    const tableData: any = []

    // MintCarbonToken ProjectCreated
    transactionsData
      .reverse()
      .filter(
        (item: any) =>
          !['MintCarbonToken', 'ProjectCreated'].includes(
            item.transaction_data?.name
          )
      )
      .map((item: any, index: number) => {
        const amountKeyName =
          item.transaction_data?.name === 'BurnCarbonToken'
            ? 'amount'
            : 'amountTaken'
        const amountTaken =
          item.transaction_data?.values[amountKeyName] !== undefined
            ? item.transaction_data?.values[amountKeyName]
            : '-'

        const amountFilled =
          item.transaction_data?.values?.amountFilled !== undefined
            ? item.transaction_data?.values?.amountFilled
            : '-'

        const unitPrice =
          Number(item.transaction_data?.values?.amountFilled) /
          Number(item.transaction_data?.values?.amountTaken)

        tableData.push([
          <ShortenedIDComp
            key={index}
            referenceId={item.transaction_id}
            width="fit-content"
          />,
          getTransactionName(item.transaction_data?.name),
          moment.unix(item.transaction_data?.timestamp).format('DD/MM/YYYY'),
          moment.unix(item.transaction_data?.timestamp).format('HH:mm:ss'),
          amountTaken,
          isNaN(unitPrice) ? '-' : unitPrice,
          amountFilled,
          <Typography
            key={1}
            sx={{
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'underline',
              color: Colors.textColorLightGreen,
              cursor: 'pointer',
            }}
            onClick={() =>
              navigate(pathNames.TRANSACTION_HISTORY, {
                state: {
                  transactionDetails: item,
                },
              })
            }
          >
            View
          </Typography>,
        ])
      })

    if (tableData.length > 0) {
      setTableRow(tableData)
    } else {
      setTableRow([{}])
    }
  }

  const filterTable = () => {
    const filteredData: any = []

    transactions.map((item: any, index: number) => {
      const dateFilter = moment(
        moment.unix(item.transaction_data.timestamp).toISOString()
      ).isBetween(startDate, endDate)

      let dropDownFilter

      if (dropdown === 'Sell') {
        dropDownFilter = item.transaction_data.name === 'Make'
      } else if (dropdown === 'Buy') {
        dropDownFilter = item.transaction_data.name === 'Fill'
      } else if (dropdown === 'All') {
        dropDownFilter = true
      }

      if (dropDownFilter && dateFilter) {
        filteredData.push(item)
      }
    })

    loadTableData(filteredData)
  }

  const getFilterResults = async () => {
    const userAddress =
      await BlockchainCalls.getConnectionStatusAndAddress().then(
        (response) => response.address
      )
    // const userAddress = '0x5885A90Aa805548FcF1B1C2B164DB68fFf3db6Fd'

    let payload =
      'user_address=' +
      userAddress +
      '&start_date=' +
      moment(startDate).toISOString() +
      '&end_date=' +
      moment(endDate).toISOString()

    if (dropdown !== 'All') {
      if (dropdown === 'Sell') {
        payload = payload + '&type=Make'
      } else {
        payload = payload + '&type=Fill'
      }
    }

    transactionCalls.getTransactionByUser(payload).then((response) => {
      loadTableData(response.data)
    })
  }

  const getTransactions = async () => {
    setTransactionLoading(true)

    BlockchainCalls.getConnectionStatusAndAddress().then((response) => {
      transactionCalls
        .getTransactionByUser('user_address=' + response.address)
        // .getTransactionByUser('user_address=' + '0x5885A90Aa805548FcF1B1C2B164DB68fFf3db6Fd')
        .then((response) => {
          loadTableData(response.data)
          setTransactions(response.data)
          setTransactionLoading(false)
        })
        .catch((e) => setTransactionLoading(false))
    })
  }

  return (
    <Paper
      sx={{
        width: '100%',
        borderRadius: '8px',
        mt: 5,
        p: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 400,
          color: Colors.textColorDarkGreen,
        }}
      >
        Transaction History
      </Typography>

      {!transactionLoading && transactions?.length > 0 && (
        <Box sx={{ display: 'flex', alignItems: 'center', pt: 2, pb: 2 }}>
          <FormControl>
            <InputLabel
              sx={{
                color: '#006B5E',
              }}
            >
              Project Type
            </InputLabel>
            <Select
              sx={{
                width: '180px',
                mr: 4,
                color: '#006B5E',
              }}
              value={dropdown}
              onChange={(e) => setDropdown(e.target.value)}
              input={
                <OutlinedInput
                  sx={{
                    color: '#006B5E',
                  }}
                  label="Project Type"
                />
              }
            >
              <MenuItem value={'All'}>All</MenuItem>
              <MenuItem value={'Buy'}>Buy</MenuItem>
              <MenuItem value={'Sell'}>Sell</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ width: '180px', mr: 4 }}>
            <DatePicker
              label="Start Date"
              value={startDate}
              maxDate={endDate ? endDate : undefined}
              components={{
                OpenPickerIcon: CalendarMonthOutlinedIcon,
              }}
              renderInput={(params: any) => {
                return (
                  <CCInputField
                    {...params}
                    style={{ backgroundColor: 'white' }}
                    required={false}
                  />
                )
              }}
              onChange={(e) => {
                if (e !== null) {
                  setStartDate(e)
                }
              }}
            />
          </Box>

          <Box sx={{ width: '180px', mr: 4 }}>
            <DatePicker
              label="End Date"
              value={endDate}
              minDate={startDate ? startDate : undefined}
              components={{
                OpenPickerIcon: CalendarMonthOutlinedIcon,
              }}
              renderInput={(params: any) => {
                return (
                  <CCInputField
                    {...params}
                    style={{ backgroundColor: 'white' }}
                    required={false}
                  />
                )
              }}
              onChange={(e) => {
                if (e !== null) {
                  setEndDate(e)
                }
              }}
            />
          </Box>

          <TextButton
            title="Search"
            sx={{
              backgroundColor: Colors.darkPrimary1,
              boxShadow: 3,
            }}
            textStyle={{ color: Colors.white }}
            onClick={getFilterResults}
          />
        </Box>
      )}

      {transactionLoading && <CCTableSkeleton sx={{ mt: 2 }} height={16} />}

      {!transactionLoading &&
        transactions?.length > 0 &&
        Object.keys(tableRow[0]).length > 0 && (
          <CCTable headings={tableHeading} rows={tableRow} maxWidth={'100%'} />
        )}

      {!transactionLoading &&
        transactions?.length > 0 &&
        Object.keys(tableRow[0]).length === 0 && (
          <NoData title="Try using different filters" />
        )}

      {!transactionLoading && transactions?.length === 0 && (
        <EmptyComponent
          photoType={3}
          title="No transaction history!"
          exploreMarketplace
        />
      )}
    </Paper>
  )
}

export default TransactionHistory
