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
const ThreePointOnePointTwo = () => {
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
        ?.data?.consultation_parties_and_communication_2,
    shallowEqual
  )

  const dataChanges = useAppSelector(
    ({ unattendedAdminChanges }) => unattendedAdminChanges?.adminDataChangesObj,
    shallowEqual
  )

  const [localVal, setLocalVal] = useState<any>({})
  const role = getLocalItem('userDetails')?.type

  const subSectionName = 'consultation_parties_and_communication_2'

  const adminChangesForThisSubsection =
    dataChanges[subSectionName]?.[0]?.diffValue ?? undefined

  const { markUpdateAsRead } = useCountChanges()

  useEffect(() => {
    if (!Object.keys(localVal).length) {
      return
    }
    if (localVal) {
      const updateObj = handleNestedObjOnChange(
        safeguards,
        'consultation_parties_and_communication',
        'consultation_parties_and_communication_2',
        localVal
      )
      console.log('3.2.2', updateObj)
      dispatch(setSafeGuards(updateObj))
      if (role == ROLES.ISSUER) {
        dispatch(
          setTrackingChangesOfDraftPDDCompilationData({
            sectionIndex: 2,
            sectionPayload: updateObj,
          })
        )
      }
    }
  }, [localVal])
  useEffect(() => {
    if (role == ROLES.ADMIN) {
      const objectToAdd = {
        projectId: projectUUID,
        key: 'safeguards.consultation_parties_and_communication.consultation_parties_and_communication_2',
        originalValue:
          savedDetails?.safeguards?.consultation_parties_and_communication?.data
            ?.consultation_parties_and_communication_2 || {},
        updatedValue:
          safeguards?.consultation_parties_and_communication?.data
            ?.consultation_parties_and_communication_2,
      }
      const updatedAdminDraftEditPayload = {
        ...adminDraftEditPayload,
        'safeguards.consultation_parties_and_communication.consultation_parties_and_communication_2':
          objectToAdd,
      }

      if (
        !_.isEqual(
          savedDetails?.safeguards?.consultation_parties_and_communication?.data
            ?.consultation_parties_and_communication_2,
          safeguards?.consultation_parties_and_communication?.data
            ?.consultation_parties_and_communication_2
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
        editorID="consultationAndCommunicationsTable"
        defaultBlock={'table'}
        //tableRows={2}
        value={
          // safeguards?.consultation_parties_and_communication?.data?.consultation_parties_and_communication_2

          role === ROLES.ISSUER
            ? adminChangesForThisSubsection !== undefined
              ? adminChangesForThisSubsection
              : safeguards?.consultation_parties_and_communication?.data
                  ?.consultation_parties_and_communication_2
            : safeguards?.consultation_parties_and_communication?.data
                ?.consultation_parties_and_communication_2
        }
        setValue={(value: any) => {
          setLocalVal(value)
        }}
      />
    </Box>
  )
}

export default ThreePointOnePointTwo
