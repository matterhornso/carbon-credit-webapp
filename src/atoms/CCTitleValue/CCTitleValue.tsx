// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Box } from '@mui/system'
import { Typography } from '@mui/material'

// Local Imports

interface CCTitleValueProps {
  title?: string | number
  value?: string | number
  fontSize?: string | number
  fontWeight?: string | number
  titleFontColor?: string | number
  valueFontColor?: string | number
  sx?: any
}

const CCTitleValue: FC<CCTitleValueProps> = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: props.titleFontColor,
        ...props.sx,
      }}
    >
      <Typography
        style={{
          fontSize: props.fontSize,
          fontWeight: props.fontWeight,
        }}
      >
        {props.title}
      </Typography>

      <Typography
        style={{
          fontSize: props.fontSize,
          fontWeight: props.fontWeight,
        }}
      >
        {props.value}
      </Typography>
    </Box>
  )
}

export default CCTitleValue

CCTitleValue.defaultProps = {
  fontSize: 14,
  fontWeight: 500,
  titleFontColor: 'black',
  valueFontColor: 'black',
}
