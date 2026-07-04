import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import SubTitle from '../SubTitle'
import EightPointTwoPointOne from './InStepTwo/EightPointTwoPointOne'
import EightPointTwoPointTwo from './InStepTwo/EightPointTwoPointTwo'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks'
import { getLocalItem } from '../../../../../utils/Storage'
import { ROLES } from '../../../../../config/constants.config'
import { shallowEqual } from 'react-redux'
import { setAdminChangesUnattended } from '../../../../../redux/Slices/adminEditChangesSlice'

const EightPointTwo = () => {
  const dispatch = useAppDispatch()
  const role = getLocalItem('userDetails')?.type
  const subSectionName = 'quantification_net_GHG_emissions'
  const adminChangesUnattendedArr = useAppSelector(
    ({ unattendedAdminChanges }) =>
      unattendedAdminChanges.adminChangesUnattendedArr,
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
      <Box sx={{ mt: 2 }}>
        <SubTitle
          subTitle="8.2 Quantification of Net-GHG Emissions and/or Removals"
          infoText={''}
          showGenerateAIBtn={false}
        />
        <EightPointTwoPointOne />
      </Box>
      <EightPointTwoPointTwo />
    </Box>
  )
}

export default EightPointTwo
