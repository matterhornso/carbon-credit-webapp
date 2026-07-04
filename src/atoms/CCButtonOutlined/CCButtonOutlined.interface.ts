import { ButtonBaseProps, ButtonProps } from '@mui/material'
import React from 'react'

export interface CCButtonOutlinedProps extends ButtonProps {
  text?: string
  rounded?: boolean
  children: React.ReactNode
  onHoverBgColor?: string
  onHoverTextColor?: string
}
