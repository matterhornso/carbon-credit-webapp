import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CCEditor from '../../../../../CCEditor/CCEditor'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../hooks/reduxHooks'
import {
  setProjectBoundary,
  setTrackingChangesOfDraftPDDCompilationData,
} from '../../../../../../redux/Slices/CreateNewProject/draftPDDCompilationV2Slice'
import { handleNestedObjOnChange } from '../../../../../../utils/draftPDDCompilation.util'
import { getLocalItem } from '../../../../../../utils/Storage'
import { shallowEqual } from 'react-redux'
import { ROLES } from '../../../../../../config/constants.config'
import { setAdminDraftEditPayload } from '../../../../../../redux/Slices/adminDraftEditSlice'
import { useCountChanges } from '../../../../../../hooks/useCountChanges'
import _ from 'lodash'
import { setAdminDataChanges } from '../../../../../../redux/Slices/adminEditChangesSlice'
import { log } from 'console'

const SevenPointOnePointOne = () => {
  const dispatch = useAppDispatch()

  const project_boundary = useAppSelector(
    ({ draftPDDCompilationV2 }) => draftPDDCompilationV2.project_boundary
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
      draftPDDCompilationV2.project_boundary?.data?.project_boundary_1,
    shallowEqual
  )
  const dataChanges = useAppSelector(
    ({ unattendedAdminChanges }) => unattendedAdminChanges?.adminDataChangesObj,
    shallowEqual
  )

  const [localVal, setLocalVal] = useState<any>({})
  const role = getLocalItem('userDetails')?.type

  const subSectionName = 'project_boundary_1'
  const adminChangesForThisSubsection =
    dataChanges[subSectionName]?.[0]?.diffValue ?? undefined
  // getting function from hook.
  console.log('data changes', dataChanges)
  const { markUpdateAsRead } = useCountChanges()

  useEffect(() => {
    if (!Object.keys(localVal).length) {
      return
    }
    if (localVal) {
      const updatedObj = {
        data: { ...project_boundary.data, ['project_boundary_1']: localVal },
      }
      dispatch(setProjectBoundary(updatedObj))
      if (role == ROLES.ISSUER) {
        dispatch(
          setTrackingChangesOfDraftPDDCompilationData({
            sectionIndex: 6,
            sectionPayload: updatedObj,
          })
        )
      }
    }
  }, [localVal])

  console.log('saved detials 7.1', savedDetails)

  useEffect(() => {
    if (role == ROLES.ADMIN) {
      const objectToAdd = {
        projectId: projectUUID,
        key: 'project_boundary.project_boundary_1',
        originalValue:
          savedDetails?.project_boundary?.data?.project_boundary_1 || {},
        updatedValue: project_boundary?.data?.project_boundary_1,
      }
      const updatedAdminDraftEditPayload = {
        ...adminDraftEditPayload,
        'project_boundary.project_boundary_1': objectToAdd,
      }
      if (
        !_.isEqual(
          savedDetails?.project_boundary?.data?.project_boundary_1,
          project_boundary?.data?.project_boundary_1
        )
      ) {
        dispatch(setAdminDraftEditPayload(updatedAdminDraftEditPayload))
      }
    }
  }, [payloadValue])

  useEffect(() => {
    if (adminChangesForThisSubsection && role === ROLES.ISSUER) {
      const { [subSectionName]: _, ...newData } = dataChanges
      console.log('7.1', adminChangesForThisSubsection)
      dispatch(setAdminDataChanges(newData))
      markUpdateAsRead(projectUUID, dataChanges, subSectionName)
    }
  }, [])

  return (
    <Box>
      <CCEditor
        editorID="projectBoundary"
        placeholder="Type your answer here..."
        showAiTune={false}
        value={
          // project_boundary?.data?.project_boundary_1
          role === ROLES.ISSUER
            ? adminChangesForThisSubsection !== undefined
              ? adminChangesForThisSubsection
              : project_boundary?.data?.project_boundary_1
            : project_boundary?.data?.project_boundary_1
        }
        setValue={(value: any) => {
          setLocalVal(value)
        }}
      />
    </Box>
  )
}

export default SevenPointOnePointOne
