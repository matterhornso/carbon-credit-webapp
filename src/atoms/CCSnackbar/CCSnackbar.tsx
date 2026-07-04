import React from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { Snackbar, SnackbarContent } from '@mui/material'
import { setSnackbarData } from '../../redux/Slices/CCSnackbarSlice'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

export default function CCSnackbar() {
  const dispatch = useAppDispatch()

  const snackbarData = useAppSelector(
    ({ CCSnackbar }) => CCSnackbar.snackbarData
  )
  const snackbarPosition = useAppSelector(
    ({ CCSnackbar }) => CCSnackbar.snackbarPosition
  )

  const { showSnackbar, success, message } = snackbarData

  const handleClose = () => {
    dispatch(
      setSnackbarData({
        showSnackbar: false,
        success,
        message: '',
      })
    )
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          ...snackbarPosition,
        }}
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <SnackbarContent
          style={{
            backgroundColor: success ? '#1D4B44' : '#d50000',
            color: 'white',
          }}
          message={message}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </Snackbar>
    </div>
  )
}
