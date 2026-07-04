import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import CCEditor from '../../../../CCEditor/CCEditor'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import SubTitle from '../SubTitle'
import {
  setAdditionally,
  setTrackingChangesOfDraftPDDCompilationData,
} from '../../../../../redux/Slices/CreateNewProject/draftPDDCompilationV2Slice'
import { handleOnChange } from '../../../../../utils/draftPDDCompilation.util'
import { getLocalItem } from '../../../../../utils/Storage'
import { ROLES } from '../../../../../config/constants.config'
import { setAdminDraftEditPayload } from '../../../../../redux/Slices/adminDraftEditSlice'
import {
  setAdminChangesUnattended,
  setAdminDataChanges,
} from '../../../../../redux/Slices/adminEditChangesSlice'
import { useCountChanges } from '../../../../../hooks/useCountChanges'
import _ from 'lodash'

const SectionFiveLevel3 = () => {
  const dispatch = useAppDispatch()

  const additionally = useAppSelector(
    ({ draftPDDCompilationV2 }) => draftPDDCompilationV2?.additionally,
    shallowEqual
  )
  const savedDetails = useAppSelector(
    ({ createNewProject }) => createNewProject.savedProjectDetails,
    shallowEqual
  )
  const projectUUID = useAppSelector(
    ({ createNewProject }) => createNewProject.projectUUID,
    shallowEqual
  )
  const adminDraftEditPayload = useAppSelector(
    ({ adminDraftEdit }) => adminDraftEdit.adminDraftUpdates,
    shallowEqual
  )
  const payloadValue = useAppSelector(
    ({ draftPDDCompilationV2 }) =>
      draftPDDCompilationV2.additionally
        ?.level3_technology_institutional_common_practice,
    shallowEqual
  )

  const adminChangesUnattendedArr = useAppSelector(
    ({ unattendedAdminChanges }) =>
      unattendedAdminChanges.adminChangesUnattendedArr,
    shallowEqual
  )

  const dataChanges = useAppSelector(
    ({ unattendedAdminChanges }) => unattendedAdminChanges?.adminDataChangesObj,
    shallowEqual
  )

  const [localVal, setLocalVal] = useState<any>({})
  const role = getLocalItem('userDetails')?.type

  const subSectionName = 'level3_technology_institutional_common_practice'

  const adminChangesForThisSubsection =
    dataChanges[subSectionName]?.[0]?.diffValue ?? undefined
  // getting function from hook.
  const { markUpdateAsRead } = useCountChanges()

  useEffect(() => {
    if (!Object.keys(localVal).length) {
      return
    }
    if (localVal) {
      const updatedObj = handleOnChange(
        additionally,
        'level3_technology_institutional_common_practice',
        localVal
      )
      dispatch(setAdditionally(updatedObj))
      if (role == ROLES.ISSUER) {
        dispatch(
          setTrackingChangesOfDraftPDDCompilationData({
            sectionIndex: 4,
            sectionPayload: updatedObj,
          })
        )
      }
    }
  }, [localVal])

  useEffect(() => {
    if (role == ROLES.ADMIN) {
      const objectToAdd = {
        projectId: projectUUID,
        key: 'additionally.level3_technology_institutional_common_practice',
        originalValue:
          savedDetails?.additionally
            ?.level3_technology_institutional_common_practice || {},
        updatedValue:
          additionally?.level3_technology_institutional_common_practice,
      }
      const updatedAdminDraftEditPayload = {
        ...adminDraftEditPayload,
        'additionally.level3_technology_institutional_common_practice':
          objectToAdd,
      }
      if (
        !_.isEqual(
          savedDetails?.additionally
            ?.level3_technology_institutional_common_practice?.data,
          additionally?.level3_technology_institutional_common_practice?.data
        )
      ) {
        dispatch(setAdminDraftEditPayload(updatedAdminDraftEditPayload))
      }
    }
  }, [payloadValue])

  useEffect(() => {
    if (role === ROLES.ISSUER && adminChangesForThisSubsection) {
      const updatedArray = adminChangesUnattendedArr.filter(
        (item: any) => item.subSection !== subSectionName
      )
      setTimeout(() => {
        dispatch(setAdminChangesUnattended(updatedArray))
      }, 700)
      // console.log('updated', updatedArray)
    }
  }, [])

  useEffect(() => {
    if (adminChangesForThisSubsection && role === ROLES.ISSUER) {
      const { [subSectionName]: _, ...newData } = dataChanges
      dispatch(setAdminDataChanges(newData))
      markUpdateAsRead(projectUUID, dataChanges, subSectionName)
    }
  }, [])

  return (
    <Box sx={{ mt: 2 }}>
      <SubTitle
        subTitle="5.5 Level 3 – Technology, Institutional, Common Practice Additionality"
        infoText={''}
      />
      <CCEditor
        editorID="level3"
        placeholder="Type your answer here..."
        value={
          // additionally?.level3_technology_institutional_common_practice?.data

          role === ROLES.ISSUER
            ? adminChangesForThisSubsection !== undefined
              ? adminChangesForThisSubsection?.data
              : additionally?.level3_technology_institutional_common_practice
                  ?.data
            : additionally?.level3_technology_institutional_common_practice
                ?.data
        }
        setValue={(value: any) => {
          setLocalVal(value)
        }}
      />
    </Box>
  )
}

export default SectionFiveLevel3
