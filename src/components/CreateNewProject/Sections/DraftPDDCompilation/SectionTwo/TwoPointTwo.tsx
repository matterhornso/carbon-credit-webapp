import { Box, Button, Menu } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CCEditor from '../../../../CCEditor/CCEditor'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import SubTitle from '../SubTitle'
import {
  setCrediting,
  setTrackingChangesOfDraftPDDCompilationData,
} from '../../../../../redux/Slices/CreateNewProject/draftPDDCompilationV2Slice'
import { handleOnChange } from '../../../../../utils/draftPDDCompilation.util'
import { ROLES } from '../../../../../config/constants.config'
import { setAdminDraftEditPayload } from '../../../../../redux/Slices/adminDraftEditSlice'
import { getLocalItem } from '../../../../../utils/Storage'
import {
  setAdminChangesUnattended,
  setAdminDataChanges,
} from '../../../../../redux/Slices/adminEditChangesSlice'
import { ProjectDraftCalls } from '../../../../../api/projectDraftCalls.api'
import { useCountChanges } from '../../../../../hooks/useCountChanges'
import _ from 'lodash'

const TwoPointTwo = () => {
  const dispatch = useAppDispatch()

  const crediting: any = useAppSelector(
    ({ draftPDDCompilationV2 }) => draftPDDCompilationV2.crediting
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
      draftPDDCompilationV2.crediting
        ?.expected_operational_lifetimeOrTermination_date,
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
  const subSectionName = 'expected_operational_lifetimeOrTermination_date'

  const adminChangesForThisSubsection =
    dataChanges[subSectionName]?.[0]?.diffValue ?? undefined
  const { markUpdateAsRead } = useCountChanges()

  useEffect(() => {
    if (!Object.keys(localVal).length) {
      return
    }
    if (localVal) {
      const updatedObj = handleOnChange(
        crediting,
        'expected_operational_lifetimeOrTermination_date',
        localVal
      )
      dispatch(setCrediting(updatedObj))
      if (role == ROLES.ISSUER) {
        dispatch(
          setTrackingChangesOfDraftPDDCompilationData({
            sectionIndex: 1,
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
        key: 'crediting.expected_operational_lifetimeOrTermination_date',
        originalValue:
          savedDetails?.crediting
            ?.expected_operational_lifetimeOrTermination_date || {},
        updatedValue:
          crediting?.expected_operational_lifetimeOrTermination_date,
      }
      const updatedAdminDraftEditPayload = {
        ...adminDraftEditPayload,
        'crediting.expected_operational_lifetimeOrTermination_date':
          objectToAdd,
      }
      if (
        !_.isEqual(
          savedDetails?.crediting
            ?.expected_operational_lifetimeOrTermination_date?.data,
          crediting?.expected_operational_lifetimeOrTermination_date?.data
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
        subTitle="2.2 Expected Operational Lifetime or Termination Date"
        infoText={''}
      />
      <CCEditor
        editorID="operationalLifetimeTerminationDate"
        placeholder="Type your answer here..."
        value={
          // crediting.expected_operational_lifetimeOrTermination_date?.data
          role === ROLES.ISSUER
            ? adminChangesForThisSubsection !== undefined
              ? adminChangesForThisSubsection?.data
              : crediting?.expected_operational_lifetimeOrTermination_date?.data
            : crediting?.expected_operational_lifetimeOrTermination_date?.data
        }
        setValue={(value: any) => {
          setLocalVal(value)
        }}
      />
    </Box>
  )
}

export default TwoPointTwo
