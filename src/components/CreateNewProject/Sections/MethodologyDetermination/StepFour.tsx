import { Box } from '@mui/material'
import React from 'react'
import ArrowNavigation from '../../../ArrowNavigation/ArrowNavigation'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { setSubSectionIndex } from '../../../../redux/Slices/CreateNewProject/createNewProjectSubSectionSlice'

const StepOne = () => {
  const dispatch = useAppDispatch()

  const subSectionIndex = useAppSelector(
    ({ createNewProjectSubSection }) =>
      createNewProjectSubSection?.subSectionIndex,
    shallowEqual
  )

  return (
    <>
      <Box sx={{ mt: 3, color: '#0D0E0E' }}>
        {
          'Depending on project activities captured in the previous step, Climat Ai has determined the methodology & tools applicable for your project.'
        }
      </Box>
      <Box sx={{ color: '#0D0E0E' }}>
        {'Please wait while we generate the details.'}
      </Box>
    </>
  )
}

export default StepOne
