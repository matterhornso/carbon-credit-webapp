import { Box } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { Colors } from '../../theme'

const HeadingStrip = () => {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        mt: 4,
        background: Colors.white,
        py: 2,
        px: 3,
        borderBottom: '1px solid #DAE5E1',
      }}
    >
      <BackHeader title="Buy & Sell Credits" onClick={() => navigate(-1)} />
    </Box>
  )
}

export default HeadingStrip
