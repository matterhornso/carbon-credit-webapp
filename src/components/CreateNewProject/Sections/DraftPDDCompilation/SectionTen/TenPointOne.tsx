import { Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import SubTitle from '../SubTitle'
import CCEditor from '../../../../CCEditor/CCEditor'
import { setMonitoringPlan } from '../../../../../redux/Slices/CreateNewProject/draftPDDCompilationSlice'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks'
import {
  setMonitoring,
  setTrackingChangesOfDraftPDDCompilationData,
} from '../../../../../redux/Slices/CreateNewProject/draftPDDCompilationV2Slice'
import { handleOnChange } from '../../../../../utils/draftPDDCompilation.util'
import { getLocalItem } from '../../../../../utils/Storage'
import { ROLES } from '../../../../../config/constants.config'
import { setAdminDraftEditPayload } from '../../../../../redux/Slices/adminDraftEditSlice'
import { shallowEqual } from 'react-redux'
import {
  setAdminChangesUnattended,
  setAdminDataChanges,
} from '../../../../../redux/Slices/adminEditChangesSlice'
import { useCountChanges } from '../../../../../hooks/useCountChanges'
import _ from 'lodash'

const TenPointOne = () => {
  const dispatch = useAppDispatch()

  const monitoring = useAppSelector(
    ({ draftPDDCompilationV2 }) => draftPDDCompilationV2.monitoring
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
      draftPDDCompilationV2.monitoring?.monitoring_plan,
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
  const subSectionName = 'monitoring_plan'

  const adminChangesForThisSubsection =
    dataChanges[subSectionName]?.[0]?.diffValue ?? undefined
  // getting function from hook.
  const { markUpdateAsRead } = useCountChanges()

  useEffect(() => {
    if (!Object.keys(localVal).length) {
      return
    }
    if (localVal) {
      const updatedObj = handleOnChange(monitoring, 'monitoring_plan', localVal)
      dispatch(setMonitoring(updatedObj))
      if (role == ROLES.ISSUER) {
        dispatch(
          setTrackingChangesOfDraftPDDCompilationData({
            sectionIndex: 9,
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
        key: 'monitoring.monitoring_plan',
        originalValue: savedDetails?.monitoring?.monitoring_plan || {},
        updatedValue: monitoring?.monitoring_plan,
      }
      const updatedAdminDraftEditPayload = {
        ...adminDraftEditPayload,
        'monitoring.monitoring_plan': objectToAdd,
      }
      if (
        !_.isEqual(
          savedDetails?.monitoring?.monitoring_plan?.data,
          monitoring?.monitoring_plan?.data
        )
      ) {
        dispatch(setAdminDraftEditPayload(updatedAdminDraftEditPayload))
      }
    }
  }, [payloadValue])

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

  useEffect(() => {
    if (adminChangesForThisSubsection && role === ROLES.ISSUER) {
      const { [subSectionName]: _, ...newData } = dataChanges
      dispatch(setAdminDataChanges(newData))
      markUpdateAsRead(projectUUID, dataChanges, subSectionName)
    }
  }, [])

  return (
    <Box sx={{ mt: 2 }}>
      <SubTitle subTitle="10.1 Monitoring Plan" infoText={''} />
      <Box sx={{ mt: 2 }}>
        <CCEditor
          editorID="monitoringPlan"
          placeholder="Type your answer here..."
          value={
            // monitoring?.monitoring_plan?.data
            role === ROLES.ISSUER
              ? adminChangesForThisSubsection !== undefined
                ? adminChangesForThisSubsection?.data
                : monitoring?.monitoring_plan?.data
              : monitoring?.monitoring_plan?.data
          }
          setValue={(value: any) => {
            setLocalVal(value)
          }}
        />
      </Box>
    </Box>
  )
}

export default TenPointOne
