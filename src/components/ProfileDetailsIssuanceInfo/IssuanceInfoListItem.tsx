import React, { FC } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CircleIcon from '@mui/icons-material/Circle'

interface IssuanceInfoListItemProps {
  data: any
  index: number
  projectStatus: any
}

const IssuanceInfoListItem: FC<IssuanceInfoListItemProps> = (props) => {


  return (
    <Grid
      container
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#E8F3EF',
        mt: 1,
        p: 2,
      }}
    >
      <Grid item xs={7} sx={{ px: 2, display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 16, fontWeight: 500, cursor: 'pointer' }}>
          <CircleIcon sx={{ fontSize: 8, mr: 1 }} />
          {props?.data?.title}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography
          sx={{
            fontSize: 14,
            color:
              props?.data?.completionPercent === 100 ? '#006B5E' : '#BA1B1B',
          }}
        >
          {props?.data?.completionPercent} % Complete
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          {props?.data?.completionPercent === 100 ? (
            <CheckCircleIcon sx={{ color: '#7ACB9F', mr: 1 }} />
          ) : (
            <CircleIcon sx={{ color: '#F7CA56', mr: 1 }} />
          )}
          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
            {props?.data?.status}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default IssuanceInfoListItem
