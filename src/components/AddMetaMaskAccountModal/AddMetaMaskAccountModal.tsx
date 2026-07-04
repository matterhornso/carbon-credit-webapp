import { Box, Modal, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import CCButton from '../../atoms/CCButton'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { useBlockchain } from '../../hooks/useBlockchain'
import { setShowAddMetaMaskAccountModal } from '../../redux/Slices/walletSlice'
import { Colors } from '../../theme'
// import { updateUserWithShineKey } from '../../utils/blockchain.util'

const AddMetaMaskAccountModal = () => {
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)

  const closeModal = () => dispatch(setShowAddMetaMaskAccountModal(false))
  const {updateUserWithShineKey} = useBlockchain()
  const accountAddressToConnectWith = useAppSelector(
    ({ wallet }) => wallet.accountAddressToConnectWith,
    shallowEqual
  )
  const showAddMetaMaskAccountModal = useAppSelector(
    ({ wallet }) => wallet.showAddMetaMaskAccountModal,
    shallowEqual
  )

  useEffect(() => {
    setOpen(showAddMetaMaskAccountModal)
  }, [showAddMetaMaskAccountModal])

  const handleNo = () => {
    closeModal()
  }
  const handleYes = () => {
    updateUserWithShineKey(accountAddressToConnectWith)
    closeModal()
  }

  return (
    <Modal
      disableAutoFocus
      open={open}
      onClose={closeModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(56, 142, 129, 0.4)',
      }}
    >
      <Paper
        sx={{
          padding: '40px 70px',
          // alignItems: 'center',
          // justifyContent: 'center',
          borderRadius: 3,
          maxWidth: '50vw',
          wordBreak: 'break-word',
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 20, fontWeight: 500, pb: 2 }}>
            Received the following address{' '}
            <span style={{ color: Colors.lightPrimary1, fontSize: 18 }}>
              {accountAddressToConnectWith}
            </span>
            . Do you wish to proceed with this as your wallet address?
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <CCButton
            variant="contained"
            sx={{
              backgroundColor: '#fff',
              textTransform: 'none',
              minWidth: 0,
              borderRadius: '100px',
              marginBottom: 4,
              marginTop: 3,
              padding: '10px 48px 10px 48px',
              border: '1px solid #f3ba4d',
            }}
            onClick={handleNo}
          >
            <Typography
              sx={{ fontSize: 16, fontWeight: 500, color: '#005046' }}
            >
              No
            </Typography>
          </CCButton>
          <CCButton
            variant="contained"
            sx={{
              backgroundColor: '#F3BA4D',
              textTransform: 'none',
              minWidth: 0,
              borderRadius: '100px',
              marginBottom: 4,
              marginTop: 3,
              padding: '10px 48px 10px 48px',
              ml: 2,
            }}
            onClick={handleYes}
          >
            <Typography
              sx={{ fontSize: 16, fontWeight: 500, color: '#005046' }}
            >
              Yes
            </Typography>
          </CCButton>
        </Box>
      </Paper>
    </Modal>
  )
}

export default AddMetaMaskAccountModal
