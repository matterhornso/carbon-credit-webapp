import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SubTitle from '../SubTitle'
import CCEditor from '../../../../CCEditor/CCEditor'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks'
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

const SectionFiveExplain = () => {
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
      draftPDDCompilationV2.additionally?.additionally,
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

  const subSectionName = 'additionally'

  const adminChangesForThisSubsection =
    dataChanges[subSectionName]?.[0]?.diffValue ?? undefined
  // getting function from hook.
  const { markUpdateAsRead } = useCountChanges()

  useEffect(() => {
    if (!Object.keys(localVal).length) {
      return
    }
    if (localVal) {
      const updatedObj = handleOnChange(additionally, 'additionally', localVal)
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
        key: 'additionally.additionally',
        originalValue: savedDetails?.additionally?.additionally || {},
        updatedValue: additionally?.additionally,
      }
      const updatedAdminDraftEditPayload = {
        ...adminDraftEditPayload,
        'additionally.additionally': objectToAdd,
      }

      if (
        !_.isEqual(
          savedDetails?.additionally?.additionally?.data,
          additionally?.additionally?.data
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
      <SubTitle subTitle="Explain" infoText={''} />
      <CCEditor
        editorID="level0"
        placeholder="Type your answer here..."
        value={
          // additionally?.additionally?.data
          role === ROLES.ISSUER
            ? adminChangesForThisSubsection !== undefined
              ? adminChangesForThisSubsection?.data
              : additionally?.additionally?.data
            : additionally?.additionally?.data
        }
        setValue={(value: any) => {
          setLocalVal(value)
        }}
      />
    </Box>
  )
}

export default SectionFiveExplain
