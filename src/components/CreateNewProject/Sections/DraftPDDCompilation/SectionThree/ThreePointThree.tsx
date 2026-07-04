import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import SubTitle from '../SubTitle'
import ThreePointOnePointOne from './InStepThree/ThreePointOnePointOne'
import ThreePointOnePointTwo from './InStepThree/ThreePointOnePointTwo'
import { setAdminChangesUnattended } from '../../../../../redux/Slices/adminEditChangesSlice'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { ROLES } from '../../../../../config/constants.config'
import { getLocalItem } from '../../../../../utils/Storage'

const ThreePointOne = () => {
  const dispatch = useAppDispatch()
  const adminChangesUnattendedArr = useAppSelector(
    ({ unattendedAdminChanges }) =>
      unattendedAdminChanges.adminChangesUnattendedArr,
    shallowEqual
  )
  const subSectionName = 'consultation_parties_and_communication'
  const role = getLocalItem('userDetails')?.type

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
      <SubTitle
        subTitle="3.3 Consultation with Interested Parties and Communications"
        infoText={''}
      />
      <ThreePointOnePointOne />
      <ThreePointOnePointTwo />
    </Box>
  )
}

export default ThreePointOne
