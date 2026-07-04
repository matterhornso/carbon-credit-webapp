import { Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import SubTitle from '../SubTitle'
import CCEditor from '../../../../CCEditor/CCEditor'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks'
import { setDataAndParametersMonitored } from '../../../../../redux/Slices/CreateNewProject/draftPDDCompilationSlice'
import './tenPointthree.css'
import CCEditor2 from '../../../../CCEditor2/CCEditor2'
import {
  setMonitoring,
  setTrackingChangesOfDraftPDDCompilationData,
} from '../../../../../redux/Slices/CreateNewProject/draftPDDCompilationV2Slice'
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

const TenPointThree = () => {
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
      draftPDDCompilationV2.monitoring?.data_and_parameters_monitored,
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
  const subSectionName = 'data_and_parameters_monitored'

  const adminChangesForThisSubsection =
    dataChanges[subSectionName]?.[0]?.diffValue ?? undefined
  // getting function from hook.
  const { markUpdateAsRead } = useCountChanges()

  useEffect(() => {
    if (!Object.keys(localVal).length) {
      return
    }
    if (localVal) {
      const updatedObj = {
        ...monitoring,
        ['data_and_parameters_monitored']: { data: localVal },
      }
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
        key: 'monitoring.data_and_parameters_monitored',
        originalValue:
          savedDetails?.monitoring?.data_and_parameters_monitored || {},
        updatedValue: monitoring?.data_and_parameters_monitored,
      }
      const updatedAdminDraftEditPayload = {
        ...adminDraftEditPayload,
        'monitoring.data_and_parameters_monitored': objectToAdd,
      }
      if (
        !_.isEqual(
          savedDetails?.monitoring?.data_and_parameters_monitored?.data,
          monitoring?.data_and_parameters_monitored?.data
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
      <SubTitle subTitle="10.3 Data and Parameters Monitored" infoText={''} />
      <Box sx={{ maxWidth: '800px', marginTop: 1, marginLeft: 5.5 }}>
        <CCEditor2
          editorID="draftPDDCompilation-tenPointthree"
          defaultBlock={'table'}
          value={
            // monitoring?.data_and_parameters_monitored?.data

            role === ROLES.ISSUER
              ? adminChangesForThisSubsection !== undefined
                ? adminChangesForThisSubsection?.data
                : monitoring?.data_and_parameters_monitored?.data
              : monitoring?.data_and_parameters_monitored?.data
          }
          tableCols={2}
          tableRows={8}
          setValue={(value: any) => {
            setLocalVal(value)
          }}
        />
      </Box>
    </Box>
  )
}

export default TenPointThree
