import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { Box } from '@mui/material'
import SubTitle from '../SubTitle'
import CCEditor from '../../../../CCEditor/CCEditor'
import InStepTitle from '../InStepTitle'
import { setProjectDescription } from '../../../../../redux/Slices/CreateNewProject/draftPDDCompilationV2Slice'
import _ from 'lodash'
import OnePointEightPointOne from './InStepEight/OnePointEightPointOne'
import OnePointEightPointTwo from './InStepEight/OnePointEightPointTwo'
import OnePointEightPointThree from './InStepEight/OnePointEightPointThree'
import OnePointEightPointFour from './InStepEight/OnePointEightPointFour'
import OnePointEightPointFive from './InStepEight/OnePointEightPointFive'
import { setAdminChangesUnattended } from '../../../../../redux/Slices/adminEditChangesSlice'
import { getLocalItem } from '../../../../../utils/Storage'
import { ROLES } from '../../../../../config/constants.config'

const OnePointEight = () => {
  const dispatch = useAppDispatch()

  const project_description = useAppSelector(
    ({ draftPDDCompilationV2 }) => draftPDDCompilationV2.project_description
  )

  const subSectionName = 'chronological_planOrImplementation'
  const role = getLocalItem('userDetails')?.type

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

  console.log('project_description: ', project_description)
  return (
    <Box sx={{ mt: 2 }}>
      <SubTitle
        subTitle="1.8 Chronological Plan Or Implementation"
        infoText={''}
        showGenerateAIBtn={false}
      />
      <OnePointEightPointOne />
      <OnePointEightPointTwo />
      <OnePointEightPointThree />
      <OnePointEightPointFour />
      <OnePointEightPointFive />

      {/* <Box>
        <InStepTitle
          subTitle="3. Termination of the project"
          infoText={' '}
          color={'#000000'}
        />
        <CCEditor
          editorID="onePointEightTermination"
          placeholder="Type your answer here"
          value={chronological_planOrImplementation_3}
          defaultBlock={'paragraph'}
          setValue={(value: any) => {
            nestedObjectsOnChange('chronological_planOrImplementation_3', value)
          }}
        />
      </Box>
      <Box>
        <InStepTitle
          subTitle="4. Frequency of monitoring,reporting,crediting period"
          infoText={' '}
          color={'#000000'}
        />
        <CCEditor
          editorID="onePointEightFrequency"
          placeholder="Type your answer here"
          defaultBlock={'paragraph'}
          value={chronological_planOrImplementation_4}
          setValue={(value: any) => {
            nestedObjectsOnChange('chronological_planOrImplementation_4', value)
          }}
        />
      </Box>
      <Box>
        <InStepTitle
          subTitle="5. Validation of verification activities"
          infoText={' '}
          color={'#000000'}
        />
        <CCEditor
          editorID="onePointEightValidation"
          placeholder="Type your answer here"
          value={chronological_planOrImplementation_5}
          setValue={(value: any) => {
            nestedObjectsOnChange('chronological_planOrImplementation_5', value)
          }}
        />
      </Box> */}
    </Box>
  )
}

export default OnePointEight
