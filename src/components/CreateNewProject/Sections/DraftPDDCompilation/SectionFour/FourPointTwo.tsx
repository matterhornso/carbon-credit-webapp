import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import SubTitle from '../SubTitle'
import InStepTitle from '../InStepTitle'
import { shallowEqual } from 'react-redux'
import './fourPointtwo.css'
import FourPointTwoPointOne from './InStepTwo/FourPointTwoPointOne'
import FourPointTwoPointTwo from './InStepTwo/FourPointTwoPointTwo'
import FourPointTwoPointThree from './InStepTwo/FourPointTwoPointThree'
import FourPointTwoPointFour from './InStepTwo/FourPointTwoPointFour'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks'
import { getLocalItem } from '../../../../../utils/Storage'
import { setAdminChangesUnattended } from '../../../../../redux/Slices/adminEditChangesSlice'
import { ROLES } from '../../../../../config/constants.config'

const FourPointTwo = () => {
  const dispatch = useAppDispatch()
  const role = getLocalItem('userDetails')?.type
  const subSectionName = 'applicability_methodology'
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
      <SubTitle
        subTitle="4.2 Applicability of Methodology"
        infoText={''}
        showGenerateAIBtn={false}
      />
      <FourPointTwoPointOne />
      <Box sx={{ marginTop: 2 }}>
        <InStepTitle
          subTitle="Table 4.2.1: Applicability conditions for CDM AR-ACM0003 methodology"
          color={'#01717F'}
          fontSz={'12px'}
        />
        <Box sx={{ maxWidth: '1200px', marginTop: 1, marginLeft: 5.5 }}>
          <FourPointTwoPointTwo />
        </Box>
      </Box>
      <Box sx={{ marginTop: 1 }}>
        <FourPointTwoPointThree />
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <InStepTitle
          subTitle="Table 4.2.2: Conditions for using the CDM 'Tool for estimation of change in soil organic carbon stocks due to the implementation of A/R CDM project activities.' "
          color={'#01717F'}
          fontSz={'12px'}
        />
        <Box sx={{ maxWidth: '1200px', marginTop: 1, marginLeft: 5.5 }}>
          <FourPointTwoPointFour />
        </Box>
      </Box>
    </Box>
  )
}

export default FourPointTwo
