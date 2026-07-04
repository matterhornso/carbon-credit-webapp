import React, { FC, useEffect } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { Box } from '@mui/material'
import { useDetectArrowKeys } from '../../hooks/useDetectArrowKeys'

interface ArrowNavigationProps {
  step: number
  stepMaxValue: number
  setStep: any
}

const ArrowNavigation: FC<ArrowNavigationProps> = ({
  step,
  stepMaxValue,
  setStep,
}) => {
  // const { count } = useDetectArrowKeys()
  // useEffect(() => {
  //   if (count.slice(0,2) === 'up') {
  //     if (step > 0) setStep(step - 1)
  //   }
  //   if (count.slice(0,4) === 'down') {
  //     if (step < stepMaxValue - 1) setStep(step + 1)
  //   }
  // }, [count])

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
      }}
    >
      <ArrowUpwardIcon
        sx={{
          fontSize: '32px',
          color: '#029FB3',
          cursor: step > 0 ? 'pointer' : 'not-allowed',
          display: step === 0 ? 'none' : 'block',
        }}
        onClick={() => {
          if (step > 0) setStep(step - 1)
        }}
      />
      <ArrowDownwardIcon
        sx={{
          fontSize: '32px',
          color: '#029FB3',
          cursor: step < stepMaxValue - 1 ? 'pointer' : 'not-allowed',
          display: step === stepMaxValue - 1 ? 'none' : 'block',
        }}
        onClick={() => {
          if (step < stepMaxValue - 1) setStep(step + 1)
        }}
      />
    </Box>
  )
}

export default ArrowNavigation
