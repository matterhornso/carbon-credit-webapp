import { Box, CircularProgress } from '@mui/material'
import React from 'react'
import { SpinnerProps } from './Spinner.interface'
const Spinner = ({ size = 50 }: SpinnerProps) => {
  return (
    <Box sx={{ display: 'flex' }} data-testid="spinner">
      <CircularProgress disableShrink size={size} />
    </Box>
  )
}
export default Spinner
