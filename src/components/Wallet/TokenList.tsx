import React, { useEffect, useState } from 'react'
import { Grid, Box, Typography, Paper } from '@mui/material'
import { Colors } from '../../theme'
import moment from 'moment'
import { getLocalItem } from '../../utils/Storage'
import { convertToInternationalCurrencySystem } from '../../utils/commonFunctions'
import CCTable from '../../atoms/CCTable'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import RefreshIcon from '@mui/icons-material/Refresh'
import LimitedText from '../../atoms/LimitedText/LimitedText'
import {
  setCurrentProjectUUID,
  setOpenWithdrawModal,
} from '../../redux/Slices/newMarketplaceSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { eventsCalls } from '../../api/eventsCalls.api'
import {
  setbalance,
  setbalanceINR,
  setBalanceLoader,
  setWalletUpdated,
} from '../../redux/Slices/walletSlice'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import EmptyComponent from '../../atoms/EmptyComponent/EmptyComponent'
import { shallowEqual } from 'react-redux'
import { useWallet } from '../../hooks/useWallet'

let index = 0
const headings = [
  <LimitedText key={index++} text="Project Name" />,
  <LimitedText key={index++} text="Symbol" />,
  <LimitedText key={index++} text="Retirable" />,
  <LimitedText key={index++} text="In exchange" />,
  <LimitedText key={index++} text="In order" />,
  <LimitedText key={index++} text="Address" />,
]

const TokenList = () => {
  const { updateWalletBalance } = useWallet()

  const dispatch: any = useAppDispatch()
  const navigate = useNavigate()

  const walletUpdated = useAppSelector(
    ({ wallet }) => wallet.walletUpdated,
    shallowEqual
  )
  const updateWalletLoading = useAppSelector(
    ({ wallet }) => wallet.updateWalletLoading,
    shallowEqual
  )

  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState([])
  const [lastUpdatedAt, setLastUpdatedAt] = useState('')

  useEffect(() => {
    getProjectTokens()
  }, [])

  useEffect(() => {
    if (walletUpdated) {
      getProjectTokens()
      dispatch(setWalletUpdated(false))
    }
  }, [walletUpdated])

  const openInNewTab = (url: any) => {
    window.open(url, '_blank', 'noreferrer')
  }

  const getProjectTokens = () => {
    const publicKey = getLocalItem('userDetails2')?.eth_active_pub_key

    setLoading(true)
    dispatch(setBalanceLoader(true))
    eventsCalls.getWalletBalance(publicKey).then((res: any) => {
      if (res?.success) {
        let modifiedRows = res?.data?.token_balance
        modifiedRows = modifiedRows.filter(
          (item: any, index: number) =>
            item?.balance ||
            item?.deposited_balance ||
            (item?.on_sell_balance && item)
        )
        const lasupdated = modifiedRows[0]?.updatedAt
        setLastUpdatedAt(lasupdated)

        dispatch(setbalance(res?.data?.walletBalance?.balance))
        dispatch(setbalanceINR(res?.data?.walletBalance?.inr_token_balance))
        dispatch(setBalanceLoader(false))
        const rows =
          modifiedRows &&
          modifiedRows.map((i: any, index: number) => {
            return [
              <Box
                key={index}
                className="td-as-link"
                onClick={() => onClickHandler(i?.project_details?.uuid)}
              >
                <LimitedText
                  key={index}
                  customStyle={{
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                  text={i?.company_name}
                />
              </Box>,
              <LimitedText
                key={index}
                customStyle={{
                  fontSize: 15,
                  fontWeight: 500,
                }}
                text={i?.symbol}
              />,
              <LimitedText
                key={index}
                customStyle={{
                  fontSize: 15,
                  fontWeight: 500,
                }}
                text={convertToInternationalCurrencySystem(
                  i?.balance
                ).toString()}
              />,
              <Box
                key={index}
                className={`${i?.deposited_balance > 0 ? 'td-as-link' : ''}`}
                onClick={() => {
                  if (i?.deposited_balance > 0) {
                    dispatch(setOpenWithdrawModal(true))
                    dispatch(setCurrentProjectUUID(i?.project_details?.uuid))
                  }
                }}
              >
                <LimitedText
                  key={index}
                  customStyle={{
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                  text={convertToInternationalCurrencySystem(
                    i?.deposited_balance
                  ).toString()}
                />
              </Box>,
              <LimitedText
                key={index}
                customStyle={{
                  fontSize: 15,
                  fontWeight: 500,
                }}
                text={convertToInternationalCurrencySystem(
                  i?.on_sell_balance
                ).toString()}
              />,
              <Typography
                key={index}
                textAlign="center"
                sx={{
                  fontSize: 15,
                  fontWeight: 500,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
                onClick={() =>
                  openInNewTab(
                    `${process.env.REACT_APP_BLOCKCHAIN_EXPLORER}
                      token/
                      ${i?.token_address}
                    `
                  )
                }
              >
                <LimitedText key={index} text={i?.token_address} />
              </Typography>,
            ]
          })

        setTableData(rows)
      }
      setLoading(false)
    })
  }

  const onClickHandler = (projectUUID: string) => {
    if (projectUUID) {
      window.scrollTo(0, 0)
      navigate({
        pathname: pathNames.PROJECT_DETAILS,
        search: `?${createSearchParams({ projectId: projectUUID })}`,
      })
    }
  }

  return (
    <Grid container xs={12}>
      {updateWalletLoading || loading ? (
        <Box sx={{ width: '100%' }}>
          <CCTableSkeleton sx={{ mt: 2, width: '100%' }} items={3} />
        </Box>
      ) : tableData && tableData?.length > 0 ? (
        <Paper
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: '8px',
            minWidth: '520px',
            mt: 2,
            boxShadow: ' 0px 5px 25px rgba(0, 0, 0, 0.12)',
          }}
        >
          <Box
            sx={{
              width: '100%',
              p: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 400,
                  color: Colors.textColorDarkGreen,
                  mt: 1,
                  ml: 3,
                }}
              >
                Project Token Details
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexWrap: 'no-wrap',
                  gap: '4px',
                }}
              >
                <Box sx={{ color: Colors.darkPrimary1, display: 'flex' }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
                    {`Last updated at: ${moment(lastUpdatedAt).format(
                      'LTS, D MMM'
                    )}`}
                  </Typography>
                </Box>
                <RefreshIcon
                  sx={{
                    fontSize: 20,
                    color: Colors.darkPrimary1,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    console.log('on click clicked')
                    updateWalletBalance()
                  }}
                />
              </Box>
            </Box>
            <Grid
              sx={{
                mt: 2,
              }}
            >
              <CCTable
                headings={headings}
                rows={tableData}
                pagination={tableData?.length > 3}
                rowsPerPageProp={3}
                hideScrollbar
              />
            </Grid>
          </Box>
        </Paper>
      ) : (
        <Box sx={{ width: '100%' }}>
          <EmptyComponent
            photoType={1}
            title=" No Project Token Details is available !!!"
            elevation={0}
          />
        </Box>
      )}
    </Grid>
  )
}

export default TokenList
