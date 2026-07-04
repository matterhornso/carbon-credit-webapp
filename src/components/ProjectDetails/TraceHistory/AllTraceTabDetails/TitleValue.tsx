import { Box, Grid, Typography } from '@mui/material'
import React, { FC } from 'react'

interface TitleValueProps {
  title: string
  value: string | number
  bolder?: boolean
  fullWidth?: boolean
}

const TitleValue: FC<TitleValueProps> = ({
  title,
  value,
  bolder = false,
  fullWidth = false,
}) => {
  return (
    <Grid item xs={fullWidth ? 12 : 6} sx={{ mt: 2 }}>
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: 14,
          color: '#006B5E',
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontWeight: bolder ? 600 : 500,
          fontSize: 14,
          color: '#3F4946',
        }}
      >
        {value === undefined || value === '' ? '-' : value}
      </Typography>
    </Grid>
  )
}

export default TitleValue
