import { Box } from '@mui/material'
import React, { FC, useEffect, useRef, useState } from 'react'

interface MainHeadingProps {
  value: string
}

const MainHeading: FC<MainHeadingProps> = ({ value }) => {
  const [height, setHeight] = useState<any>(0)

  const ref = useRef<any>(null)

  useEffect(() => {
    setHeight(ref?.current?.clientHeight)
  })

  return (
    <>
      <Box
        ref={ref}
        sx={{
          background: '#2ECBB2',
          color: 'white',
          borderRadius: '50px 0px 0px 50px',
          px: 2,
          py: 1,
          position: 'absolute',
          right: -32,
          width: '100%',
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        {value}
      </Box>
      <Box height={height} sx={{ mb: 3.35 }}></Box>
    </>
  )
}

export default MainHeading
