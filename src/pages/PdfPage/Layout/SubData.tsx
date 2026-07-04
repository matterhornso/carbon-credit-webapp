import { Box, Typography } from '@mui/material'
import React, { FC, useEffect, useRef, useState } from 'react'

interface SubDataProps {
  title: string
  ignoreTitle?: any
  children: any
}

const SubData: FC<SubDataProps> = ({ title, children, ignoreTitle }) => {
  const [height, setHeight] = useState<any>(0)

  const ref = useRef<any>(null)

  useEffect(() => {
    setHeight(ref?.current?.clientHeight)
  })

  return (
    <Box sx={{ mb: 2 }}>
     {!ignoreTitle && <Box
        sx={{
          display: 'flex',
          gap: '10px',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
       {title ?  <Box>
          <Box
            sx={{
              background: '#75F8E4',
              height: '14px',
              width: '14px',
              borderRadius: '50%',
            }}
          ></Box>
        </Box>: null}
       {title ? <Box>
          <Typography
            sx={{
              color: '#2B2B2B',
              fontSize: 12,
              fontWeight: 600,
              lineHeight: '20.5px',
            }}
          >
            {title}
          </Typography>
        </Box> : null}
      </Box>}
      <Box sx={{ fontSize: 12, fontWeight: 400, lineHeight: '23px', mt: 1 }}>
        {children || '-'}
      </Box>
    </Box>
  )
}

export default SubData
