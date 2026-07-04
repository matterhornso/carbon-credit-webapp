import { IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Colors } from '../../theme'

interface ProfileCompletionProps {
  stepTitle: string
  stepCompleted: any
  onClickWhenIncomplete?: any
}

const ProfileCompletionStep = (props: ProfileCompletionProps) => {
  return (
    <Box
      sx={{
        mt: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '60px',
        width: '240px',
        backgroundColor: '#DAF7F0',
        padding: 1,
        borderRadius: '12px',
      }}
    >
      <Box>
        <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
          {props?.stepTitle}
        </Typography>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 400,
            color: props?.stepCompleted === 100
              ? Colors.textColorDarkGreen
              : Colors.secondary,
          }}
        >
          {props?.stepCompleted}% Complete
        </Typography>
      </Box>
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="label"
        sx={{
          height: '40px',
          width: '40px',
          borderRadius: '20px',
          backgroundColor: props?.stepCompleted === 100
            ? Colors.white
            : Colors.lightPrimary1,
        }}
      >
        {props?.stepCompleted === 100 ? (
          <CheckIcon style={{ color: Colors.lightPrimary1 }} />
        ) : (
          <ArrowRightAltIcon
            onClick={props?.onClickWhenIncomplete}
            style={{ color: '#FFF' }}
          />
        )}
      </IconButton>
    </Box>
  )
}

export default ProfileCompletionStep
