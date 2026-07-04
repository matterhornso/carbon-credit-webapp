import React, { useEffect } from 'react'
import CCEditor2 from '../../../../CCEditor2/CCEditor2'
import { Box } from '@mui/material'
import { useAppSelector, useAppDispatch } from '../../../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import SubTitle from '../SubTitle'
import InStepTitle from '../InStepTitle'
import './onePointSeven.css'
import OnePointSevenPointOne from './InStepSeven/OnePointSevenPointOne'
import OnePointSevenPointTwo from './InStepSeven/OnePointSevenPointTwo'
import { getLocalItem } from '../../../../../utils/Storage'
import { ROLES } from '../../../../../config/constants.config'
import { setAdminChangesUnattended } from '../../../../../redux/Slices/adminEditChangesSlice'

const OnePointSeven = () => {
  const dispatch = useAppDispatch()
  const project_description = useAppSelector(
    ({ draftPDDCompilationV2 }) => draftPDDCompilationV2.project_description
  )
  const role = getLocalItem('userDetails')?.type

  const subSectionName = 'roles_responsibility'

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
    }
  }, [])
  console.log('project_description: ', project_description)
  return (
    <Box>
      <Box sx={{ mt: 2 }}>
        <SubTitle
          subTitle="1.7 Roles & Responsibilities"
          infoText={''}
          showGenerateAIBtn={false}
        />
        <Box sx={{ marginTop: 1 }}>
          Roles and responsibilities, including contact information of the
          project proponent and other project participants, amend as needed.
        </Box>
      </Box>
      <OnePointSevenPointOne />
      <OnePointSevenPointTwo />
    </Box>
  )
}

export default OnePointSeven
