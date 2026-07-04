import { Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC } from 'react'

interface LimitedTextProps {
  text: string
  widthLimit?: string
  alignText?: string
  ellispsisAtStart?: boolean
  tooltipText?: string
  customStyle?:any
}
const LimitedText: FC<LimitedTextProps> = ({
  text,
  widthLimit = '150px',
  ellispsisAtStart = false,
  alignText = 'left',
  tooltipText,
  customStyle = {}
}) => {
  return (
    <Tooltip
      title={tooltipText ? tooltipText : text}
      placement={alignText === 'right' ? 'bottom-end' : 'bottom-start'}
    >
      <Box
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: widthLimit,
          direction: ellispsisAtStart ? 'rtl' : '',
          textAlign: alignText ? alignText : 'left',
          ...customStyle
        }}
      >
        {text}
      </Box>
    </Tooltip>
  )
}

export default LimitedText
