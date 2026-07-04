// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Box, Typography, Modal } from '@mui/material'

// Local Imports
import TextButton from '../../atoms/TextButton/TextButton'
import styles from './styles'
import { Colors } from '../../theme'

interface CancelModalProps {}

const CancelModal: FC<CancelModalProps> = () => {
  return (
    <Modal
      open={true}
      sx={{
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={styles.CancelModal}>
        <Typography sx={{ fontSize: 20, fontWeight: 500, marginTop: 2 }}>
          Are you sure you want to cancel the order ?
        </Typography>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextButton
            sx={{
              width: '170px',
              margin: 1,
              border: `2px solid ${Colors.accent}`,
              backgroundColor: Colors.surface,
            }}
            textStyle={{ color: Colors.textColorDarkGreen }}
            title="No, Don’t Cancel"
          />
          <TextButton
            sx={{ width: '170px', margin: 1, backgroundColor: Colors.accent }}
            textStyle={{ color: Colors.textColorDarkGreen }}
            title="Yes, Cancel"
          />
        </Box>
      </Box>
    </Modal>
  )
}

export default CancelModal
