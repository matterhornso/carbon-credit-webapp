import React from 'react'
import Button from '@mui/material/Button'
import { CCButtonProps } from './CCButton.interface'

const CCButton: React.FC<CCButtonProps> = (props) => {
  return (
    <>
      <Button
        {...props}
        sx={{
          display: 'flex',
          // height: '48px',
          borderRadius: props.rounded ? 10 : 2,
          textTransform: 'none',
          backgroundColor: props?.buttonBackgroundColor
            ? props.buttonBackgroundColor
            : 'accent.main',
          color: props?.buttonColor ? props.buttonColor : 'darkPrimary1.main',
          fontSize: 18,
          fontWeight: '500',
          py: 2,
          px: 3,
          minWidth: '168px',
          boxShadow: `0px 4px 6px rgba(29, 74, 67, 0.15)`,
          '&:hover': {
            // backgroundColor: 'accent.main',
            background: '#006B5E14',
            boxShadow: `0px 4px 6px rgba(29, 74, 67, 0.5)`,
          },
          ...props.sx,
        }}
      >
        {props.children}
      </Button>
    </>
  )
}
export default CCButton
