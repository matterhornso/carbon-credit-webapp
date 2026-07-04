import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import InStepTitle from '../../InStepTitle'
import CCEditor2 from '../../../../../CCEditor2/CCEditor2'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../hooks/reduxHooks'
import { handleNestedObjOnChange } from '../../../../../../utils/draftPDDCompilation.util'
import {
  setProjectDescription,
  setTrackingChangesOfDraftPDDCompilationData,
} from '../../../../../../redux/Slices/CreateNewProject/draftPDDCompilationV2Slice'
import { shallowEqual } from 'react-redux'
import { getLocalItem } from '../../../../../../utils/Storage'
import { ROLES } from '../../../../../../config/constants.config'
import { setAdminDraftEditPayload } from '../../../../../../redux/Slices/adminDraftEditSlice'
import { ProjectDraftCalls } from '../../../../../../api/projectDraftCalls.api'
import { useCountChanges } from '../../../../../../hooks/useCountChanges'
import _ from 'lodash'
import {
  setAdminChangesUnattended,
  setAdminDataChanges,
} from '../../../../../../redux/Slices/adminEditChangesSlice'

const OnePointSevenPointTwo = () => {
  const dispatch = useAppDispatch()

  const project_description: any = useAppSelector(
    ({ draftPDDCompilationV2 }) => draftPDDCompilationV2.project_description
  )

  const savedDetails = useAppSelector(
    ({ createNewProject }) => createNewProject.savedProjectDetails,
    shallowEqual
  )

  const payloadValue = useAppSelector(
    ({ draftPDDCompilationV2 }) =>
      draftPDDCompilationV2.project_description?.roles_responsibility?.data
        ?.roles_responsibility_2,
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

  const dataChanges = useAppSelector(
    ({ unattendedAdminChanges }) => unattendedAdminChanges?.adminDataChangesObj,
    shallowEqual
  )

  const [localVal, setLocalVal] = useState<any>({})

  const role = getLocalItem('userDetails')?.type

  const subSectionName = 'roles_responsibility_2'

  const adminChangesForThisSubsection =
    dataChanges[subSectionName]?.[0]?.diffValue ?? undefined

  const { markUpdateAsRead } = useCountChanges()

  useEffect(() => {
    if (!Object.keys(localVal).length) {
      return
    }
    if (localVal) {
      const updatedObj = handleNestedObjOnChange(
        project_description,
        'roles_responsibility',
        'roles_responsibility_2',
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
        key: 'project_description.roles_responsibility.roles_responsibility_2',
        originalValue:
          savedDetails?.project_description?.roles_responsibility?.data
            ?.roles_responsibility_2 || {},
        updatedValue:
          project_description?.roles_responsibility?.data
            ?.roles_responsibility_2,
      }
      const updatedAminDraftEditPayload = {
        ...adminDraftEditPayload,
        'project_description.roles_responsibility.roles_responsibility_2':
          objectToAdd,
      }
      if (
        !_.isEqual(
          savedDetails?.project_description?.roles_responsibility?.data
            ?.roles_responsibility_2,
          project_description?.roles_responsibility?.data
            ?.roles_responsibility_2
        )
      ) {
        dispatch(setAdminDraftEditPayload(updatedAminDraftEditPayload))
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
    <Box sx={{ mt: 2 }}>
      <InStepTitle
        subTitle="1.7.2 Others Involved in the Project"
        infoText={''}
        color={'#000000'}
      />
      <Box sx={{ maxWidth: '800px', marginTop: 1, marginLeft: 5.5 }}>
        <CCEditor2
          editorID="draftPDDCompilation-onePointsevenPointtwo"
          defaultBlock={'table'}
          value={
            role === ROLES.ISSUER
              ? adminChangesForThisSubsection !== undefined
                ? adminChangesForThisSubsection
                : project_description?.roles_responsibility?.data
                    ?.roles_responsibility_2
              : project_description?.roles_responsibility?.data
                  ?.roles_responsibility_2
          }
          tableCols={2}
          tableRows={7}
          setValue={(value: any) => {
            setLocalVal(value)
          }}
        />
      </Box>
    </Box>
  )
}

export default OnePointSevenPointTwo
