// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Button, Typography } from '@mui/material'
import { Colors } from '../../theme'

// Local Imports

interface TextButtonProps {
  sx?: any
  title?: string | number
  textStyle?: any
  onClick?: any
  disabled?: boolean
}

const TextButton: FC<TextButtonProps> = (props) => {
  return (
    <Button
      sx={{
        height: 40,
        width: 170,
        borderRadius: '100px',
        textTransform: 'none',
        backgroundColor: Colors.darkPrimary1,
        ...props.sx,
      }}
      onClick={props.onClick}
      disabled={props?.disabled}
    >
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: 'white',
          ...props.textStyle,
        }}
      >
        {props.title}
      </Typography>
    </Button>
  )
}

export default TextButton

TextButton.defaultProps = {
  title: 'Button',
}
