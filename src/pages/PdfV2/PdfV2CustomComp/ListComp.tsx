import { Box, Typography } from '@mui/material'
import React from 'react'

const ListComp = ({ listData }: any) => {
  return (
    <Box sx={{ py: 1 }}>
      {listData?.listItems?.map((item: string, idx: number) => (
        <Box key={idx} sx={{ pb: 1, display: 'flex', alignItems: 'center' }}>
          {listData?.unordered ? (
            <Box
              sx={{
                height: '7px',
                width: '7px',
                mr: 1,
                borderRadius: '50%',
                background: '#000',
              }}
            ></Box>
          ) : (
            <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>{`${
              idx + 1
            }.`}</Typography>
          )}
          <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>
            {item}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export default ListComp
