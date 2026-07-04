import { Box, Skeleton } from '@mui/material'
import React from 'react'

function ChatSectionLoader({
  chatCount = 3,
  chatRowCount = 3,
}: {
  chatCount?: number
  chatRowCount?: number
}) {
  const Loader = ({
    variant,
    height,
  }: {
    variant?: 'text' | 'rectangular' | 'rounded' | 'circular'
    height: number
  }) => {
    return (
      <Skeleton
        variant={variant}
        height={height}
        sx={{
          background: '#E6F5F7',
          borderRadius: '6px',
        }}
        animation="wave"
      />
    )
  }

  return (
    <>
      {new Array(chatCount).fill({}).map((item, chatIndex) => (
        <Box key={chatIndex}>
          <Box sx={{ mt: 3, width: '50%' }}>
            <Loader height={32} variant="rectangular" />
          </Box>
          <Box sx={{ mt: 1 }}>
            {new Array(chatRowCount).fill({}).map((item, chatRowIndex) => (
              <Loader key={chatRowIndex} variant="text" height={24} />
            ))}
          </Box>
        </Box>
      ))}
    </>
  )
}
export default ChatSectionLoader
