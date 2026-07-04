import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC } from 'react'
import { Colors } from '../../theme'

interface CardRowProps {
  title: string
  value: string | number
  textAlign?: string
}
const CardRow: FC<CardRowProps> = ({ title, value, textAlign }) => {
  return (
    <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
      <Grid container>
        <Grid item xs={8}>
          <Typography sx={{ fontSize: 16, color: Colors.darkPrimary1 }}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography
            sx={{
              fontSize: 16,
              color: '#141D1B',
              fontWeight: 500,
              wordBreak: 'break-all',
              textAlign: textAlign ? textAlign : 'right',
            }}
          >
            {value}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CardRow
