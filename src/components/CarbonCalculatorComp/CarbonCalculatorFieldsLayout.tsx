import { Box, MenuItem, Select, Typography } from '@mui/material'
import React from 'react'
import { CARBON_CALCULATOR_PROJECT_TYPES } from '../../config/carbonCalculator.config'
import { setSelectedProjectType } from '../../redux/Slices/carbonCreditCalculatorSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import CCButton from '../../atoms/CCButton'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

const CarbonCalculatorFieldsLayout = ({
  heading,
  headingExplanationTitle,
  children,
  onClickAction,
  showNextbtn = true,
}: any) => {
  const dispatch = useAppDispatch()
  const selectedProjectType = useAppSelector(
    ({ carbonCreditCalculator }) => carbonCreditCalculator.selectedProjectType
  )
  return (
    <Box
      sx={{
        mt: 2,
        px: 2,
        py: 3,
        borderRadius: 2,
        background: '#E6F5F7',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignitems: 'center',
          pb: 2,
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 500 }}>
          {heading}
        </Typography>
        <HelpOutlineIcon sx={{ color: '#029FB3' }} />
      </Box>
      <Typography
        sx={{ color: '#01717F', fontSize: 18, fontWeight: 500, pb: 2 }}
      >
        {headingExplanationTitle}
      </Typography>
      <Box>{children}</Box>
      {showNextbtn && (
        <CCButton
          fullWidth
          onClick={onClickAction}
          sx={{
            mt: 3,
            background: '#AFE3EA',
            color: '#0D0E0E',
            height: '40px',
            borderRadius: '100px',
            fontWeight: 500,
            fontSize: 16,
          }}
        >
          Next
        </CCButton>
      )}
    </Box>
  )
}

export default CarbonCalculatorFieldsLayout
