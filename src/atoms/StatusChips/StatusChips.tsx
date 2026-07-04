import { Chip } from '@mui/material'
import React, { FC } from 'react'
import CircleIcon from '@mui/icons-material/Circle'

interface StatusChipsProps {
  text: string
  textColor: string
  backgroundColor: string
  cirlceColor: string
}
const StatusChips: FC<StatusChipsProps> = ({
  text,
  textColor = '#000',
  backgroundColor,
  cirlceColor,
}) => {
  return (
    <Chip
      sx={{
        backgroundColor: backgroundColor,
        m: 1,
        color: textColor,
        fontWeight: 400,
        fontSize: 14,
      }}
      icon={<CircleIcon style={{ color: cirlceColor, fontSize: 8 }} />}
      label={text}
    />
  )
}

export default StatusChips
