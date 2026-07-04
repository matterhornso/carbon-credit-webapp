// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Typography, Chip, Stack, Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

// Local Imports
import { Colors } from '../../theme'

import PDFViewer from '../../atoms/PDFViewer/PDFViewer'

interface PDFModalProps {
  fileUrl?: any
  modalVisibility?: any
  setModalVisibility?: any
}

const PDFModal: FC<PDFModalProps> = (props) => {
  return (
    <Modal
      //   open={true}
      open={props.modalVisibility}
      //   onClose={() => props.setModalVisibility(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      // sx={{ width:  '1000px' }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          zIndex: 0,
        }}
        // onClick={() => props.setModalVisibility(false)}
      >
        <Box
          sx={{
            backgroundColor: '#FFF',
            borderRadius: '5px',
            zIndex: 100,
            padding: '10px',
            paddingRight: '5px',
            paddingLeft: '5px',
            height: '80%',
            width: '80%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingRight: '5px',
            }}
          >
            <Typography>{''}</Typography>
            <CloseIcon
              onClick={() => props.setModalVisibility(false)}
              style={{ color: '#388E81', cursor: 'pointer' }}
            />
          </Box>

          <Box
            sx={{
              height: '90%',
            }}
          >
            <PDFViewer pdfUrl={props.fileUrl} />
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default PDFModal
