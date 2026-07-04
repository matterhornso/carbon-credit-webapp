import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CCEditor from '../../../../../CCEditor/CCEditor'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { handleNestedObjOnChange } from '../../../../../../utils/draftPDDCompilation.util'
import {
  setSafeGuards,
  setTrackingChangesOfDraftPDDCompilationData,
} from '../../../../../../redux/Slices/CreateNewProject/draftPDDCompilationV2Slice'
import { getLocalItem } from '../../../../../../utils/Storage'
import { ROLES } from '../../../../../../config/constants.config'
import { setAdminDraftEditPayload } from '../../../../../../redux/Slices/adminDraftEditSlice'
import { useCountChanges } from '../../../../../../hooks/useCountChanges'
import _ from 'lodash'
import { setAdminDataChanges } from '../../../../../../redux/Slices/adminEditChangesSlice'

const ThreePointOnePointOne = () => {
  const dispatch = useAppDispatch()

  const safeguards = useAppSelector(
    ({ draftPDDCompilationV2 }) => draftPDDCompilationV2.safeguards,
    shallowEqual
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
      draftPDDCompilationV2.safeguards?.consultation_parties_and_communication
        ?.data?.consultation_parties_and_communication_1,
    shallowEqual
  )
  const dataChanges = useAppSelector(
    ({ unattendedAdminChanges }) => unattendedAdminChanges?.adminDataChangesObj,
    shallowEqual
  )

  const [localVal, setLocalVal] = useState<any>({})
  const role = getLocalItem('userDetails')?.type

  const subSectionName = 'consultation_parties_and_communication_1'

  const adminChangesForThisSubsection =
    dataChanges[subSectionName]?.[0]?.diffValue ?? undefined

  const { markUpdateAsRead } = useCountChanges()

  useEffect(() => {
    if (!Object.keys(localVal).length) {
      return
    }
    if (localVal) {
      const updatedObj = handleNestedObjOnChange(
        safeguards,
        'consultation_parties_and_communication',
        'consultation_parties_and_communication_1',
        localVal
      )
      console.log('3.2.1', updatedObj)
      dispatch(setSafeGuards(updatedObj))
      if (role == ROLES.ISSUER) {
        dispatch(
          setTrackingChangesOfDraftPDDCompilationData({
            sectionIndex: 2,
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
        key: 'safeguards.consultation_parties_and_communication.consultation_parties_and_communication_1',
        originalValue:
          savedDetails?.safeguards?.consultation_parties_and_communication?.data
            ?.consultation_parties_and_communication_1 || {},
        updatedValue:
          safeguards?.consultation_parties_and_communication?.data
            ?.consultation_parties_and_communication_1,
      }
      const updatedAdminDraftEditPayload = {
        ...adminDraftEditPayload,
        'safeguards.consultation_parties_and_communication.consultation_parties_and_communication_1':
          objectToAdd,
      }
      if (
        !_.isEqual(
          savedDetails?.safeguards?.consultation_parties_and_communication?.data
            ?.consultation_parties_and_communication_1,
          safeguards?.consultation_parties_and_communication?.data
            ?.consultation_parties_and_communication_1
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
      <CCEditor
        editorID="consultationAndCommunications"
        placeholder="Type your answer here..."
        value={
          // safeguards?.consultation_parties_and_communication?.data ?.consultation_parties_and_communication_1?.data
          role === ROLES.ISSUER
            ? adminChangesForThisSubsection !== undefined
              ? adminChangesForThisSubsection?.data
              : safeguards?.consultation_parties_and_communication?.data
                  ?.consultation_parties_and_communication_1
            : safeguards?.consultation_parties_and_communication?.data
                ?.consultation_parties_and_communication_1
        }
        setValue={(value: any) => {
          setLocalVal(value)
        }}
      />
    </Box>
  )
}

export default ThreePointOnePointOne
