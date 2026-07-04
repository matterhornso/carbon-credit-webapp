import { Box, Typography } from '@mui/material'
import React from 'react'
import { ROLES } from '../../../../config/constants.config'
import { getLocalItem } from '../../../../utils/Storage'
import { setSubSectionIndex } from '../../../../redux/Slices/CreateNewProject/createNewProjectSubSectionSlice'
import { useAppDispatch } from '../../../../hooks/reduxHooks'
import CCButton from '../../../../atoms/CCButton'

const StepOne = () => {
  const dispatch = useAppDispatch()
  const role = getLocalItem('userDetails')?.type

  return (
    <>
      <Box sx={{ mt: 3, color: '#0D0E0E' }}>
        {role == ROLES.ISSUER
          ? 'Select the goals of your project and we will determine the methodology for you. You can then review and make changes if required.'
          : 'Review the goals of the project and determine the methodology. '}
      </Box>
      <Typography
        sx={{
          color: '#01434B',
          fontSize: 16,
          fontWeight: 500,
          pt: '20px',
          pb: '17px',
        }}
      >
        Begin the methodology determination process by clicking the ‘Proceed’
        button.
      </Typography>
      <CCButton
        onClick={() => {
          dispatch(setSubSectionIndex(1))
        }}
        sx={{
          background: '#BED7FE',
          color: '#0D0E0E',
          fontWeight: 500,
          fontSize: 14,
          borderRadius: '20px',
          p: '7px 24px',
        }}
      >
        Proceed
      </CCButton>
    </>
  )
}

export default StepOne
