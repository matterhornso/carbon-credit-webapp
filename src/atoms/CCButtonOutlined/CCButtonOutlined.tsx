import React from 'react'
import Button from '@mui/material/Button'
import { CCButtonOutlinedProps } from './CCButtonOutlined.interface'

const CCButtonOutlined: React.FC<CCButtonOutlinedProps> = (props) => {
  return (
    <>
      <Button
        {...props}
        sx={{
          // height: '48px',
          borderRadius: props.rounded ? 10 : 2,
          textTransform: 'none',
          // backgroundColor: 'accent.main',
          color: 'darkPrimary1.main',
          border: '2px solid #F3BA4D',
          fontSize: 18,
          fontWeight: '500',
          py: 2,
          px: 3,
          minWidth: '168px',
          boxShadow: `0px 4px 6px rgba(29, 74, 67, 0.15)`,
          '&:hover': {
            backgroundColor: props?.onHoverBgColor
              ? props?.onHoverBgColor
              : 'darkPrimary1.main',
            boxShadow: `0px 4px 6px rgba(29, 74, 67, 0.5)`,
            color: props?.onHoverTextColor
              ? props?.onHoverTextColor
              : '#ffffff',
          },
          ...props.sx,
        }}
      >
        {props.children}
      </Button>
    </>
  )
}
export default CCButtonOutlined
