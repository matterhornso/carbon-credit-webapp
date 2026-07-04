import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SubTitle from '../SubTitle'
import CCEditor from '../../../../CCEditor/CCEditor'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks'
import {
  setProjectDescription,
  setTrackingChangesOfDraftPDDCompilationData,
} from '../../../../../redux/Slices/CreateNewProject/draftPDDCompilationV2Slice'
import { handleOnChange } from '../../../../../utils/draftPDDCompilation.util'
import { shallowEqual } from 'react-redux'
import { getLocalItem } from '../../../../../utils/Storage'
import { ROLES } from '../../../../../config/constants.config'
import { setAdminDraftEditPayload } from '../../../../../redux/Slices/adminDraftEditSlice'
import {
  setAdminChangesUnattended,
  setAdminDataChanges,
} from '../../../../../redux/Slices/adminEditChangesSlice'
import _ from 'lodash'
import { useCountChanges } from '../../../../../hooks/useCountChanges'
const OnePointTwo = () => {
  const dispatch = useAppDispatch()

  const project_description = useAppSelector(
    ({ draftPDDCompilationV2 }) => draftPDDCompilationV2.project_description
  )

  const savedDetails = useAppSelector(
    ({ createNewProject }) => createNewProject.savedProjectDetails,
    shallowEqual
  )

  const payloadValue = useAppSelector(
    ({ draftPDDCompilationV2 }) =>
      draftPDDCompilationV2.project_description?.type_sectoral_scope,
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

  const adminChangesUnattendedArr = useAppSelector(
    ({ unattendedAdminChanges }) =>
      unattendedAdminChanges.adminChangesUnattendedArr,
    shallowEqual
  )

  const dataChanges = useAppSelector(
    ({ unattendedAdminChanges }) => unattendedAdminChanges?.adminDataChangesObj,
    shallowEqual
  )

  const [localVal, setLocalVal] = useState<any>('')

  const role = getLocalItem('userDetails')?.type

  const subSectionName = 'type_sectoral_scope'

  const adminChangesForThisSubsection =
    dataChanges[subSectionName]?.[0]?.diffValue ?? undefined

  const { markUpdateAsRead } = useCountChanges()

  // console.log('data', project_description?.type_sectoral_scope)
  useEffect(() => {
    if (!Object.keys(localVal).length) {
      return
    }
    if (localVal) {
      const updatedObj = handleOnChange(
        project_description,
        'type_sectoral_scope',
        localVal
      )
      dispatch(setProjectDescription(updatedObj))
      if (role == ROLES.ISSUER) {
        dispatch(
          setTrackingChangesOfDraftPDDCompilationData({
            sectionIndex: 0,
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
        key: 'project_description.type_sectoral_scope',
        originalValue:
          savedDetails?.project_description?.type_sectoral_scope || {},
        updatedValue: project_description?.type_sectoral_scope,
      }
      const updatedAdminDraftEditPayload = {
        ...adminDraftEditPayload,
        'project_description.type_sectoral_scope': objectToAdd,
      }
      if (
        !_.isEqual(
          savedDetails?.project_description?.type_sectoral_scope?.data,
          project_description?.type_sectoral_scope?.data
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
      <SubTitle subTitle="1.2 Project Type and Sectoral Scope" infoText={''} />
      {project_description?.type_sectoral_scope && (
        <CCEditor
          editorID="projectTypeAndSectoralScope"
          placeholder="Type your answer here..."
          value={
            // project_description?.type_sectoral_scope
            role === ROLES.ISSUER
              ? adminChangesForThisSubsection !== undefined
                ? adminChangesForThisSubsection?.data
                : project_description?.type_sectoral_scope?.data
              : project_description?.type_sectoral_scope?.data
          }
          setValue={(value: any) => {
            setLocalVal(value)
          }}
        />
      )}
    </Box>
  )
}

export default OnePointTwo
