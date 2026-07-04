import { Paper } from '@mui/material'
import React, { FC } from 'react'
import { Colors } from '../theme'

const CCPaper = (props: any) => {
  return (
    <Paper
      sx={{
        background: Colors.white,
        p: 2,
        boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.12)',
        borderRadius: '8px',
        ...props?.customSX,
      }}
    >
      {props?.children}
    </Paper>
  )
}

export default CCPaper
