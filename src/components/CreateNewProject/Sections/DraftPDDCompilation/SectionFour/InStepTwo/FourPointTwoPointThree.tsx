import React, { useEffect, useState } from 'react'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../hooks/reduxHooks'
import { Box } from '@mui/material'
import CCEditor from '../../../../../CCEditor/CCEditor'
import { handleNestedObjOnChange } from '../../../../../../utils/draftPDDCompilation.util'
import {
  setMethodology,
  setTrackingChangesOfDraftPDDCompilationData,
} from '../../../../../../redux/Slices/CreateNewProject/draftPDDCompilationV2Slice'
import { getLocalItem } from '../../../../../../utils/Storage'
import { ROLES } from '../../../../../../config/constants.config'
import { setAdminDraftEditPayload } from '../../../../../../redux/Slices/adminDraftEditSlice'
import { shallowEqual } from 'react-redux'
import { useCountChanges } from '../../../../../../hooks/useCountChanges'
import _ from 'lodash'

const FourPointTwoPointThree = () => {
  const dispatch = useAppDispatch()

  const methodology = useAppSelector(
    ({ draftPDDCompilationV2 }) => draftPDDCompilationV2.methodology
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
      draftPDDCompilationV2.methodology?.applicability_methodology?.data
        ?.applicability_methodology_3,
    shallowEqual
  )
  const dataChanges = useAppSelector(
    ({ unattendedAdminChanges }) => unattendedAdminChanges?.adminDataChangesObj,
    shallowEqual
  )

  const [localVal, setLocalVal] = useState<any>({})
  const role = getLocalItem('userDetails')?.type

  const subSectionName = 'applicability_methodology_3'

  const adminChangesForThisSubsection =
    dataChanges[subSectionName]?.[0]?.diffValue ?? undefined
  // getting function from hook.
  const { markUpdateAsRead } = useCountChanges()

  useEffect(() => {
    if (!Object.keys(localVal).length) {
      return
    }
    if (localVal) {
      const updatedObj = handleNestedObjOnChange(
        methodology,
        'applicability_methodology',
        'applicability_methodology_3',
        localVal
      )
      dispatch(setMethodology(updatedObj))
      if (role == ROLES.ISSUER) {
        dispatch(
          setTrackingChangesOfDraftPDDCompilationData({
            sectionIndex: 3,
            sectionPayload: updatedObj,
          })
        )
      }
    }
  }, [localVal])

  useEffect(() => {
    if (role == ROLES.ADMIN) {
      return
      const objectToAdd = {
        projectId: projectUUID,
        key: 'methodology.applicability_methodology.applicability_methodology_3',
        originalValue:
          savedDetails?.methodologies?.applicability_methodology?.data
            ?.applicability_methodology_3 || {},
        updatedValue:
          methodology?.applicability_methodology?.data
            ?.applicability_methodology_3,
      }
      const updatedAdminDraftEditPayload = {
        ...adminDraftEditPayload,
        'methodology.applicability_methodology.applicability_methodology_3':
          objectToAdd,
      }
      if (
        !_.isEqual(
          savedDetails?.methodologies?.applicability_methodology?.data
            ?.applicability_methodology_3?.data,
          savedDetails?.methodology?.applicability_methodology?.data
            ?.applicability_methodology_3?.data
        )
      ) {
        dispatch(setAdminDraftEditPayload(updatedAdminDraftEditPayload))
      }
    }
  }, [payloadValue])

  return (
    <Box>
      <CCEditor
        editorID="CDM-AR-methodology"
        // defaultBlock={'paragraph'}
        placeholder={'Type your answer here'}
        showAiTune={false}
        value={
          // methodology?.applicability_methodology?.data?.applicability_methodology_3
          role === ROLES.ISSUER
            ? adminChangesForThisSubsection !== undefined
              ? adminChangesForThisSubsection?.data
              : methodology?.applicability_methodology?.data
                  ?.applicability_methodology_3
            : methodology?.applicability_methodology?.data
                ?.applicability_methodology_3
        }
        setValue={(value: any) => {
          setLocalVal(value)
        }}
      />
    </Box>
  )
}

export default FourPointTwoPointThree
