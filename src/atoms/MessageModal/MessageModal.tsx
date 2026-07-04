import { Modal, Paper, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import CCButton from '../CCButton'
import CCButtonOutlined from '../CCButtonOutlined'

interface MessageModalProps {
  message: any
  btn1Text: string
  btn1OnClick: any
  disableBtn1?: boolean
  btn2Text?: string
  btn2OnClick?: any
  showModal: boolean
  setShowModal: any
}

const MessageModal = ({
  message,
  btn1Text,
  btn1OnClick,
  btn2OnClick,
  btn2Text,
  showModal,
  setShowModal,
  disableBtn1,
}: MessageModalProps) => {
  return (
    <Modal
      open={showModal}
      onClose={() => setShowModal(false)}
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
          // px: 20,
          // py: 6,
          padding: '40px 70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 3,
          maxWidth: '50vw',
          wordBreak: 'break-word',
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 20, fontWeight: 500, pb: 2 }}>
            {message}
          </Typography>
          <Box>
            <Stack sx={{ mt: 3 }} direction="row" justifyContent={'center'}>
              {btn2Text && btn2OnClick && (
                <CCButtonOutlined
                  sx={{
                    padding: '6px 30px',
                    borderRadius: 10,
                  }}
                  onClick={btn2OnClick}
                >
                  {btn2Text}
                </CCButtonOutlined>
              )}
              <CCButton
                variant="contained"
                sx={{
                  ml: 3,
                  padding: '6px 20px',
                  borderRadius: 10,
                }}
                onClick={btn1OnClick}
                disabled={disableBtn1}
              >
                {btn1Text}
              </CCButton>
            </Stack>
          </Box>
        </Box>
      </Paper>
    </Modal>
  )
}

export default MessageModal
