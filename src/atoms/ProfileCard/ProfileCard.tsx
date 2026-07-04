import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import CCButton from '../CCButton'
import { Colors } from '../../theme'

interface ProfileCardProps {
  title: string
  content: string
  onClickFn?: any
  buttonText?: string
}

const ProfileCard = ({
  title,
  content,
  buttonText,
  onClickFn,
}: ProfileCardProps) => {
  const handleClick = () => {
    if (onClickFn) onClickFn()
  }
  return (
    <Box
      sx={{
        minHeight: 210,
        height: '100%',
        background: 'rgba(0, 107, 94, 0.05)',
        borderRadius: 3,
        px: 2,
        pt: 2,
        pb: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography sx={{ fontSize: 22, color: Colors.darkPrimary1 }}>
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: 14,
            py: 2,
          }}
        >
          {content}
        </Typography>
      </Box>
      <Box>
        <CCButton
          rounded
          onClick={handleClick}
          sx={{
            minWidth: 0,
            padding: '7px 34px',
            background: Colors.textColorLightGreen,
            color: '#FFFFFF',
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {buttonText ? buttonText : 'Start'}
        </CCButton>
      </Box>
    </Box>
  )
}

export default ProfileCard
