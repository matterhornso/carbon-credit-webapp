import { Box } from '@mui/system'
import React, { FC } from 'react'

interface TransactionHashProps {
  txID: string
}

const TransactionHash: FC<TransactionHashProps> = ({ txID }) => {
  return (
    <Box sx={{ px: 3, fontSize: 14, fontWeight: 500 }}>
      <Box sx={{ color: '#00201B' }}>Transaction hash</Box>
      <Box
        sx={{
          // color: '#1A8EF5',
          fontSize: 14,
          fontWeight: 500,
          wordBreak: 'break-all',
        }}
      >
        <a
          href={`${process.env.REACT_APP_BLOCKCHAIN_EXPLORER}tx/${txID}`}
          target="_blank"
          rel="noreferrer"
          style={{ color: '#1A8EF5' }}
        >
          {txID}
        </a>
      </Box>
    </Box>
  )
}

export default TransactionHash
