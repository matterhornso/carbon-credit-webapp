import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CCEditor from '../../../../../CCEditor/CCEditor'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../hooks/reduxHooks'
import { handleNestedObjOnChange } from '../../../../../../utils/draftPDDCompilation.util'
import {
  setProjectBoundary,
  setTrackingChangesOfDraftPDDCompilationData,
} from '../../../../../../redux/Slices/CreateNewProject/draftPDDCompilationV2Slice'
import Spinner from '../../../../../../atoms/Spinner'
import { getLocalItem } from '../../../../../../utils/Storage'
import { shallowEqual } from 'react-redux'
import { ROLES } from '../../../../../../config/constants.config'
import { setAdminDraftEditPayload } from '../../../../../../redux/Slices/adminDraftEditSlice'
import { useCountChanges } from '../../../../../../hooks/useCountChanges'
import { setAdminDataChanges } from '../../../../../../redux/Slices/adminEditChangesSlice'
import _ from 'lodash'

const SevenPointOnePointTwo = () => {
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
      draftPDDCompilationV2.project_boundary?.data?.project_boundary_2,
    shallowEqual
  )
  const dataChanges = useAppSelector(
    ({ unattendedAdminChanges }) => unattendedAdminChanges?.adminDataChangesObj,
    shallowEqual
  )

  const [localVal, setLocalVal] = useState<any>({})
  const role = getLocalItem('userDetails')?.type

  const subSectionName = 'project_boundary_2'
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
        data: { ...project_boundary.data, ['project_boundary_2']: localVal },
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

  useEffect(() => {
    if (role == ROLES.ADMIN) {
      const objectToAdd = {
        projectId: projectUUID,
        key: 'project_boundary.project_boundary_2',
        originalValue:
          savedDetails?.project_boundary?.data?.project_boundary_2 || {},
        updatedValue: project_boundary?.data?.project_boundary_2,
      }
      const updatedAdminDraftEditPayload = {
        ...adminDraftEditPayload,
        'project_boundary.project_boundary_2': objectToAdd,
      }
      if (
        !_.isEqual(
          savedDetails?.project_boundary?.data?.project_boundary_2,
          project_boundary?.data?.project_boundary_2
        )
      ) {
        dispatch(setAdminDraftEditPayload(updatedAdminDraftEditPayload))
      }
    }
  }, [payloadValue])

  useEffect(() => {
    if (adminChangesForThisSubsection && role === ROLES.ISSUER) {
      const { [subSectionName]: _, ...newData } = dataChanges
      dispatch(setAdminDataChanges(newData))
      markUpdateAsRead(projectUUID, dataChanges, subSectionName)
    }
  }, [])

  return (
    <Box>
      {!project_boundary?.data?.project_boundary_2 ? (
        <Spinner />
      ) : (
        <CCEditor
          editorID="identificationOfGHG-7"
          showAiTune={false}
          // defaultBlock={'table'}
          tableRows={8}
          tableCols={6}
          value={
            // project_boundary?.data?.project_boundary_2
            role === ROLES.ISSUER
              ? adminChangesForThisSubsection !== undefined
                ? adminChangesForThisSubsection
                : project_boundary?.data?.project_boundary_2
              : project_boundary?.data?.project_boundary_2
          }
          setValue={(value: any) => {
            setLocalVal(value)
          }}
        />
      )}
    </Box>
  )
}

export default SevenPointOnePointTwo
