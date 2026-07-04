import React, { useEffect, useState } from 'react'
import { BlockchainAlertProps } from './BlockchainAlert.interface'
import { Alert, Button, Grid, Typography } from '@mui/material'
import Modal from '@mui/material/Modal'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setAccountAddress,
  setAccountBalance,
  setConnected,
  setLoadWallet,
  setMetamask,
  setGuide,
  setWalletNetwork,
  setLoadWalletAlert,
} from '../../redux/Slices/walletSlice'
import BlockchainCalls from '../../blockchain/Blockchain'

import WalletAdd from '../WalletAdd'
import { Box } from '@mui/system'
import { Colors, Images } from '../../theme'
import CCButton from '../../atoms/CCButton'
import Spinner from '../../atoms/Spinner'
import InfoIcon from '@mui/icons-material/Info'
import CCButtonOutlined from '../../atoms/CCButtonOutlined'
import { USER } from '../../api/user.api'
import { getLocalItem, setLocalItem } from '../../utils/Storage'
// import { onManualConnectClick } from '../../utils/blockchain.util'
import CloseIcon from '@mui/icons-material/Close'
import { pathNames } from '../../routes/pathNames'
import { useNavigate } from 'react-router-dom'

declare let window: any

// const provider = new ethers.providers.Web3Provider(window.ethereum)

const BlockchainAlert = (props: BlockchainAlertProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const loadWalletAlert = useAppSelector(
    (state) => state.wallet.loadWalletAlert
  )

  // const { user_id } = getLocalItem('userDetails')

  const closeModal = () => dispatch(setLoadWallet(false))

  const [open, setOpen] = useState(false)
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [walletAdded, setWalletAdded] = useState(false)

  // const handleOpen = () => setOpen(loadWallet)
  const handleClose = () => closeModal()

  useEffect(() => {
    // console.log(loadWallet)
    setOpen(loadWalletAlert)
  }, [loadWalletAlert])

  const { ethereum } = window

  const walletReducer = useAppSelector((state) => state.wallet)
  // console.log(
  //   '🚀 ~ file: LoadWallet.tsx ~ line 59 ~ LoadWal ~ walletReducer',
  //   walletReducer
  // )

  const {
    haveMetamask,
    isConnected,
    accountAddress,
    accountBalance,
    guideOpen,
    walletNetwork,
    alertMessage,
  } = walletReducer

  return (
    <div>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            p: 3,
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          {/* <Box sx={{ alignSelf: 'end' }}>
            <CloseIcon
              sx={{
                fontSize: 28,
                color: Colors.darkPrimary1,
                cursor: 'pointer',
              }}
              onClick={() => {
                dispatch(setLoadWalletAlert(false))
              }}
            />
          </Box> */}
          <Grid
            container
            justifyContent={'center'}
            alignItems="flex-start"
            sx={{
              mt: 2,
              background: '#fff',
              minHeight: '80%',
              maxheight: '80%',
              minWidth: '80%',
              maxWidth: '80%',
              pb: 3,
            }}
          >
            <Grid
              item
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'stretch',
                width: '100%',
                py: 5,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',

                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 32,
                  }}
                >
                  Alert
                </Typography>
                <Grid sx={{ pt: 1 }}>
                  <img src={Images.check1} />
                </Grid>
                <Typography
                  sx={{
                    mt: 2,
                    fontWeight: 400,
                    fontSize: 16,
                    color: Colors.lightPrimary1,
                  }}
                >
                  {alertMessage}
                </Typography>

                <CCButton
                  sx={{ mt: 2 }}
                  onClick={() => navigate(pathNames.LOGOUT, { replace: true })}
                >
                  Logout
                </CCButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  )
}

export default BlockchainAlert
