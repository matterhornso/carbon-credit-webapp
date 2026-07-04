import React, { useEffect, useState } from 'react'
import CCEditor from '../../../../../CCEditor/CCEditor'
import InStepTitle from '../../InStepTitle'
import { Box } from '@mui/material'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../hooks/reduxHooks'
import {
  setProjectDescription,
  setTrackingChangesOfDraftPDDCompilationData,
} from '../../../../../../redux/Slices/CreateNewProject/draftPDDCompilationV2Slice'
import { handleNestedObjOnChange } from '../../../../../../utils/draftPDDCompilation.util'
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

const OnePointEightPointFive = () => {
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
        ?.chronological_planOrImplementation_5,
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

  const subSectionName = 'chronological_planOrImplementation_5'

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
        'chronological_planOrImplementation_5',
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
        key: 'project_description.chronological_planOrImplementation.chronological_planOrImplementation_5',
        originalValue:
          savedDetails?.project_description?.chronological_planOrImplementation
            ?.data?.chronological_planOrImplementation_5 || {},
        updatedValue:
          project_description?.chronological_planOrImplementation?.data
            ?.chronological_planOrImplementation_5,
      }
      const updatedAminDraftEditPayload = {
        ...adminDraftEditPayload,
        'project_description.chronological_planOrImplementation.chronological_planOrImplementation_5':
          objectToAdd,
      }
      if (
        !_.isEqual(
          savedDetails?.project_description?.chronological_planOrImplementation
            ?.data?.chronological_planOrImplementation_5,
          project_description?.chronological_planOrImplementation?.data
            ?.chronological_planOrImplementation_5
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
        subTitle="5. Validation of verification activities"
        infoText={' '}
        color={'#000000'}
      />
      <CCEditor
        editorID="onePointEightPointFiveValidation"
        placeholder="Type your answer here"
        showAiTune={false}
        defaultBlock={'paragraph'}
        value={
          // project_description?.chronological_planOrImplementation?.data
          //   ?.chronological_planOrImplementation_5
          role === ROLES.ISSUER
            ? adminChangesForThisSubsection !== undefined
              ? adminChangesForThisSubsection?.data
              : project_description?.chronological_planOrImplementation?.data
                  ?.chronological_planOrImplementation_5
            : project_description?.chronological_planOrImplementation?.data
                ?.chronological_planOrImplementation_5
        }
        setValue={(value: any) => {
          if (!value) {
            return
          }
          setLocalVal(value)
        }}
      />
    </Box>
  )
}

export default OnePointEightPointFive
