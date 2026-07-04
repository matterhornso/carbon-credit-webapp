import React, { useEffect, useState } from 'react'
import CCEditor from '../../../../../CCEditor/CCEditor'
import InStepTitle from '../../InStepTitle'
import { Box } from '@mui/material'
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
import { useCountChanges } from '../../../../../../hooks/useCountChanges'
import _ from 'lodash'
import {
  setAdminChangesUnattended,
  setAdminDataChanges,
} from '../../../../../../redux/Slices/adminEditChangesSlice'
const OnePointEightPointFour = () => {
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
      draftPDDCompilationV2.project_description
        ?.chronological_planOrImplementation?.data
        ?.chronological_planOrImplementation_4,
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

  const subSectionName = 'chronological_planOrImplementation_4'

  const [localVal, setLocalVal] = useState<any>({})
  const role = getLocalItem('userDetails')?.type

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
        'chronological_planOrImplementation',
        'chronological_planOrImplementation_4',
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
        key: 'project_description.chronological_planOrImplementation.chronological_planOrImplementation_4',
        originalValue:
          savedDetails?.project_description?.chronological_planOrImplementation
            ?.data?.chronological_planOrImplementation_4 || {},
        updatedValue:
          project_description?.chronological_planOrImplementation?.data
            ?.chronological_planOrImplementation_4,
      }
      const updatedAminDraftEditPayload = {
        ...adminDraftEditPayload,
        'project_description.chronological_planOrImplementation.chronological_planOrImplementation_4':
          objectToAdd,
      }
      if (
        !_.isEqual(
          savedDetails?.project_description?.chronological_planOrImplementation
            ?.data?.chronological_planOrImplementation_4?.data,
          project_description?.chronological_planOrImplementation?.data
            ?.chronological_planOrImplementation_4?.data
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
    <Box>
      <InStepTitle
        subTitle="4. Frequency of monitoring,reporting,crediting period"
        infoText={' '}
        color={'#000000'}
      />
      <CCEditor
        editorID="onePointEightFrequency"
        placeholder="Type your answer here"
        showAiTune={false}
        defaultBlock={'paragraph'}
        value={
          // project_description?.chronological_planOrImplementation?.data?.chronological_planOrImplementation_4
          role === ROLES.ISSUER
            ? adminChangesForThisSubsection !== undefined
              ? adminChangesForThisSubsection?.data
              : project_description?.chronological_planOrImplementation?.data
                  ?.chronological_planOrImplementation_4
            : project_description?.chronological_planOrImplementation?.data
                ?.chronological_planOrImplementation_4
        }
        setValue={(value: any) => {
          if (!Object.keys(value).length) {
            return
          }
          setLocalVal(value)
        }}
      />
    </Box>
  )
}

export default OnePointEightPointFour
