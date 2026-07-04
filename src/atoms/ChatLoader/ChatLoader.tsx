import { Box, Skeleton } from '@mui/material'
import React from 'react'

function ChatLoader({ rowCount = 3 }: { rowCount?: number }) {
  return (
    <Box sx={{ mb: 1 }}>
      {new Array(rowCount).fill({}).map((item, index) => (
        <Skeleton
          key={index}
          variant="text"
          height={24}
          sx={{
            background: '#E6F5F7',
            borderRadius: '6px',
          }}
          animation="wave"
        />
      ))}
    </Box>
  )
}
export default ChatLoader
