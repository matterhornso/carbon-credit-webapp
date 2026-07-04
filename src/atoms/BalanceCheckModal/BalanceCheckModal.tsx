import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC } from 'react'
import { Colors } from '../../theme'
import MessageModal from '../MessageModal/MessageModal'
import ErrorIcon from '@mui/icons-material/Error'

interface BalanceCheckModalProps {
  msg1: string
  msg2: string
  showModal: any
  setShowModal: any
  btn1OnClick: any
  tokenBal: number
}

const BalanceCheckModal: FC<BalanceCheckModalProps> = ({
  msg1,
  msg2,
  showModal,
  setShowModal,
  btn1OnClick,
  tokenBal,
}) => {
  return (
    <MessageModal
      message={
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <ErrorIcon sx={{ color: Colors.secondary, fontSize: 48 }} />
          </Box>
          <Typography
            sx={{ fontSize: 20, fontWeight: 500, color: Colors.secondary }}
          >
            {msg1}
          </Typography>
          <Typography sx={{ mt: 2, fontSize: 18, fontWeight: 500, pb: 2 }}>
            {msg2} :{' '}
            <span style={{ color: Colors.lightPrimary1, fontSize: 18 }}>
              {tokenBal}
            </span>{' '}
          </Typography>
        </>
      }
      btn1Text="Okay"
      btn1OnClick={btn1OnClick}
      showModal={showModal}
      setShowModal={setShowModal}
    />
  )
}

export default BalanceCheckModal
