import React from 'react'
import { Box, Typography } from '@mui/material'
import { useAppDispatch } from '../../hooks/reduxHooks'
import CloseIcon from '@mui/icons-material/Close'

const CCModalHeaderWithCloseIcon = ({ title, closeModal, noOfYears }: any) => {
  const dispatch = useAppDispatch()
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'end',
          pr: 3,
        }}
      >
        <CloseIcon onClick={closeModal} sx={{ cursor: 'pointer' }} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 3,
          py: +noOfYears > 4 ? '4px' : 4,
        }}
      >
        <Typography
          sx={{ fontSize: 16, fontWeight: 500, color: '#000', mx: 'auto' }}
        >
          {`Total CO2 Sequested for a period of `}
          <span style={{ color: '#388e81' }}>{noOfYears}</span>
          {` year`}
          <span style={{ fontSize: 12 }}>{`(`}</span>
          {`s`}
          <span style={{ fontSize: 12 }}>{`) `}</span>
          {`is `}
          <span style={{ color: '#388e81' }}>{title}</span>
        </Typography>
      </Box>
    </Box>
  )
}

export default CCModalHeaderWithCloseIcon
