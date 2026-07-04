import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import InStepEightPointOne from './InStepOne/InStepEightPointOne'
import EightPointOnePointOne from './InStepOne/EightPointOnePointOne'
import EightPointOnePointTwo from './InStepOne/EightPointOnePointTwo'
import EightPointOnePointThree from './InStepOne/EightPointOnePointThree'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks'
import { setAdminChangesUnattended } from '../../../../../redux/Slices/adminEditChangesSlice'
import { getLocalItem } from '../../../../../utils/Storage'
import { shallowEqual } from 'react-redux'
import { ROLES } from '../../../../../config/constants.config'

const EightPointOne = () => {
  const dispatch = useAppDispatch()
  const role = getLocalItem('userDetails')?.type
  const subSectionName = 'criteria_and_procedures_quantification'

  const adminChangesUnattendedArr = useAppSelector(
    ({ unattendedAdminChanges }) =>
      unattendedAdminChanges?.adminChangesUnattendedArr,
    shallowEqual
  )
  useEffect(() => {
    if (role === ROLES.ISSUER) {
      const updatedArray = adminChangesUnattendedArr.filter(
        (item: any) => item.subSection !== subSectionName
      )
      setTimeout(() => {
        dispatch(setAdminChangesUnattended(updatedArray))
      }, 700)
      // console.log('updated', updatedArray)
    }
  }, [])
  return (
    <Box sx={{ mt: 2 }}>
      <InStepEightPointOne />
      <EightPointOnePointOne />
      <EightPointOnePointTwo />
      <EightPointOnePointThree />
    </Box>
  )
}

export default EightPointOne
