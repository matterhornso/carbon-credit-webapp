import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CCEditor from '../../../../CCEditor/CCEditor'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks'
import SubTitle from '../SubTitle'
import {
  setCrediting,
  setTrackingChangesOfDraftPDDCompilationData,
} from '../../../../../redux/Slices/CreateNewProject/draftPDDCompilationV2Slice'
import { handleOnChange } from '../../../../../utils/draftPDDCompilation.util'
import { getLocalItem } from '../../../../../utils/Storage'
import { shallowEqual } from 'react-redux'
import { ROLES } from '../../../../../config/constants.config'
import { setAdminDraftEditPayload } from '../../../../../redux/Slices/adminDraftEditSlice'
import {
  setAdminChangesUnattended,
  setAdminDataChanges,
} from '../../../../../redux/Slices/adminEditChangesSlice'
import { ProjectDraftCalls } from '../../../../../api/projectDraftCalls.api'
import { useCountChanges } from '../../../../../hooks/useCountChanges'
import _ from 'lodash'

const TwoPointOne = () => {
  const dispatch = useAppDispatch()

  const crediting: any = useAppSelector(
    ({ draftPDDCompilationV2 }) => draftPDDCompilationV2.crediting
  )
  const svedDetails = useAppSelector(
    ({ createNewProject }) => createNewProject.savedProjectDetails,
    shallowEqual
  )
  console.log('svedDetails: ', svedDetails)
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
      draftPDDCompilationV2.crediting?.project_start_date,
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

  const subSectionName = 'project_start_date'
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
        crediting,
        'project_start_date',
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
        key: 'crediting.project_start_date',
        originalValue: svedDetails?.crediting?.project_start_date || {},
        updatedValue: crediting?.project_start_date,
      }
      const updatedAdminDraftEditPayload = {
        ...adminDraftEditPayload,
        'crediting.project_start_date': objectToAdd,
      }
      if (
        !_.isEqual(
          svedDetails?.crediting?.project_start_date?.data,
          crediting?.project_start_date?.data
        )
      ) {
        dispatch(setAdminDraftEditPayload(updatedAdminDraftEditPayload))
      }
    }
  }, [payloadValue])

  useEffect(() => {
    // console.log('2.1', adminChangesUnattendedArr)
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
      <SubTitle subTitle="2.1 Project Start Date" infoText={''} />
      <CCEditor
        editorID="draftPDDCompilation-startDate"
        placeholder="Type your answer here..."
        // value={crediting?.project_start_date?.data}
        value={
          // changeForThisSubsection !== undefined
          //   ? changeForThisSubsection?.data
          //   : crediting?.project_start_date?.data
          role === ROLES.ISSUER
            ? adminChangesForThisSubsection !== undefined
              ? adminChangesForThisSubsection?.data
              : crediting?.project_start_date?.data
            : crediting?.project_start_date?.data
        }
        setValue={(value: any) => {
          setLocalVal(value)
        }}
      />
    </Box>
  )
}

export default TwoPointOne
