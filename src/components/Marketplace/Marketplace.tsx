import { Alert, Button, Snackbar } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import BackHeader from '../../atoms/BackHeader/BackHeader'
import MessageModal from '../../atoms/MessageModal/MessageModal'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { useMarket } from '../../hooks/useMarket'
import {
  setMessageModalText,
  setShowMessageModal,
} from '../../redux/Slices/appSlice'
import {
  resetNewMarketplaceReducer,
  setCarbonTokenBalances,
  setCurrentProjectUUID,
  setINRTokenBalances,
  setOpenSnackbar,
  setOpenWithdrawModal,
} from '../../redux/Slices/newMarketplaceSlice'
import { Colors } from '../../theme'
// import {
//   getProjectsTokenDetails,
//   getSellOrdersListData,
//   getTokenBalances,
// } from '../../utils/newMarketplace.utils'
import { getLocalItem } from '../../utils/Storage'
import Trading from './Trading'
import WithdrawModal from './WithdrawModal'

const Marketplace = () => {
  const location: any = useLocation()
  const navigate = useNavigate()
  const dispatch: any = useAppDispatch()
  const { getProjectsTokenDetails, getSellOrdersListData, getTokenBalances } =
    useMarket()

  const userID = getLocalItem('userDetails')?.user_id

  const showMessageModal = useAppSelector(
    ({ app }) => app.showMessageModal,
    shallowEqual
  )
  const messageModalText = useAppSelector(
    ({ app }) => app.messageModalText,
    shallowEqual
  )

  const openSnackbar = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.openSnackbar,
    shallowEqual
  )
  const snackbarErrorMsg = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.snackbarErrorMsg,
    shallowEqual
  )
  const carbonTokenAddress = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.carbonTokenAddress,
    shallowEqual
  )
  const inrTokenAddress = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.inrTokenAddress,
    shallowEqual
  )

  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    if (location?.state?.projectUUID) {
      dispatch(setCurrentProjectUUID(location?.state?.projectUUID))
      getProjectsTokenDetails(location?.state?.projectUUID)
    }

    return () => {
      dispatch(resetNewMarketplaceReducer())
    }
  }, [])

  useEffect(() => {
    if (carbonTokenAddress) {
      getSellOrdersListData(carbonTokenAddress)

      getCarbonTokenBalances()
    }
  }, [carbonTokenAddress])

  const getCarbonTokenBalances = async () => {
    const tokenBalances = await getTokenBalances(userID, carbonTokenAddress)
    if (tokenBalances.success) {
      dispatch(setCarbonTokenBalances(tokenBalances?.data))
    }
  }

  useEffect(() => {
    if (inrTokenAddress) {
      getINRTokenBalances()
    }
  }, [inrTokenAddress])

  const getINRTokenBalances = async () => {
    const tokenBalances = await getTokenBalances(userID, inrTokenAddress)
    if (tokenBalances.success) {
      dispatch(setINRTokenBalances(tokenBalances?.data))
    }
  }

  const handleClick = () => {
    dispatch(setOpenSnackbar(true))
  }

  const handleClose = () => {
    dispatch(setOpenSnackbar(false))
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <BackHeader
          title="Buy & Sell Credits"
          onClick={() => {
            navigate(-1)
          }}
        />
        <Box
          sx={{
            px: 3,
            py: 1,
            background: '#CCE8E1',
            color: '#061F1C',
            fontSize: 14,
            fontWeight: 500,
            borderRadius: 10,
            cursor: 'pointer',
          }}
          onClick={() => {
            dispatch(setOpenWithdrawModal(true))
          }}
        >
          Withdraw
        </Box>
      </Box>

      <Trading projectName={location?.state?.projectName} />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{
            width: '100%',
            // border: `1px solid ${Colors.darkPrimary1}`
          }}
        >
          {snackbarErrorMsg}
        </Alert>
      </Snackbar>

      <MessageModal
        message={messageModalText}
        btn1Text="Ok"
        btn1OnClick={() => {
          dispatch(setShowMessageModal(false))
          dispatch(setMessageModalText(''))
        }}
        showModal={showMessageModal}
        setShowModal={(closeModal: boolean) =>
          dispatch(setShowMessageModal(closeModal))
        }
      />
      <WithdrawModal />
    </>
  )
}

export default Marketplace
