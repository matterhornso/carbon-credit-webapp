import { Box, Grid } from '@mui/material'
import React, { FC } from 'react'
import { Colors } from '../../theme'

interface CardRowProps {
  title: string
  value: string
  titleStyle?: any
  valueStyle?: any
  partitionBasis?: number
}

const CardRow: FC<CardRowProps> = ({
  title,
  value,
  titleStyle,
  valueStyle,
  partitionBasis = 9,
}) => {
  return (
    <Grid container justifyContent={'space-between'} mt={1}>
      <Grid item xs={partitionBasis}>
        <Box
          sx={{
            color: Colors.darkPrimary1,
            fontWeight: 500,
            fontSize: 16,
            ...titleStyle,
          }}
        >
          {title}
        </Box>
      </Grid>
      <Grid item xs={12 - partitionBasis}>
        <Box
          sx={{
            fontWeight: 500,
            fontSize: 16,
            textAlign: 'right',
            ...valueStyle,
          }}
        >
          {value}
        </Box>
      </Grid>
    </Grid>
  )
}

export default CardRow
