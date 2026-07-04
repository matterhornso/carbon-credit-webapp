import React from 'react'
import CCButton from '../../atoms/CCButton'
import { BackButtonProps } from './BackButton.interface'
const BackButton = (props: BackButtonProps) => {
  return (
    <CCButton
      sx={{
        borderRadius: '6px',
        backgroundColor: 'white',
        color: 'darkPrimary1.main',
        border: '2px solid',
        borderColor: 'darkPrimary1.main',
        fontSize: 16,
      }}
      variant="outlined"
      {...props}
    >
      Back
    </CCButton>
  )
}
export default BackButton
