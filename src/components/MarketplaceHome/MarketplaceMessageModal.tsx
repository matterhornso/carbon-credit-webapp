import { Modal, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import {
  setMarketplaceModalMessage,
  setShowMarketplaceMsgModal,
} from '../../redux/Slices/Marketplace/marketplaceSlice'
import CCButton from '../../atoms/CCButton'

interface MarketplaceMessageModalProps {}

const MarketplaceMessageModal: FC<MarketplaceMessageModalProps> = () => {
  const dispatch = useAppDispatch()
  const marketplaceModalMessage = useAppSelector(
    ({ marketplace }) => marketplace.marketplaceModalMessage,
    shallowEqual
  )
  const showMarketplaceMsgModal = useAppSelector(
    ({ marketplace }) => marketplace.showMarketplaceMsgModal,
    shallowEqual
  )

  return (
    <Modal
      open={showMarketplaceMsgModal}
      onClose={() => setShowMarketplaceMsgModal(false)}
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
          borderRadius: 3,
          maxWidth: '50vw',
          wordBreak: 'break-word',
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 20, fontWeight: 500, pb: 2 }}>
            {marketplaceModalMessage}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CCButton
            variant="contained"
            sx={{
              mt: 1,
              ml: 3,
              padding: '6px 20px',
              borderRadius: 10,
            }}
            onClick={() => {
              dispatch(setMarketplaceModalMessage(''))
              dispatch(setShowMarketplaceMsgModal(false))
            }}
          >
            Ok
          </CCButton>
        </Box>
      </Paper>
    </Modal>
  )
}

export default MarketplaceMessageModal
