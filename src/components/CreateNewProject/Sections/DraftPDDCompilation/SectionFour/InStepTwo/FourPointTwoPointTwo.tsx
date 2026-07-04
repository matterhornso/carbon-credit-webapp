import React, { useEffect, useState } from 'react'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../hooks/reduxHooks'
import CCEditor2 from '../../../../../CCEditor2/CCEditor2'
import { Box } from '@mui/material'
import { handleNestedObjOnChange } from '../../../../../../utils/draftPDDCompilation.util'
import {
  setMethodology,
  setTrackingChangesOfDraftPDDCompilationData,
} from '../../../../../../redux/Slices/CreateNewProject/draftPDDCompilationV2Slice'
import Spinner from '../../../../../../atoms/Spinner'
import { getLocalItem } from '../../../../../../utils/Storage'
import { ROLES } from '../../../../../../config/constants.config'
import { setAdminDraftEditPayload } from '../../../../../../redux/Slices/adminDraftEditSlice'
import { shallowEqual } from 'react-redux'
import { useCountChanges } from '../../../../../../hooks/useCountChanges'
import { setAdminDataChanges } from '../../../../../../redux/Slices/adminEditChangesSlice'
import _ from 'lodash'

const FourPointTwoPointTwo = () => {
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
        ?.applicability_methodology_2,
    shallowEqual
  )

  const dataChanges = useAppSelector(
    ({ unattendedAdminChanges }) => unattendedAdminChanges?.adminDataChangesObj,
    shallowEqual
  )

  const [localVal, setLocalVal] = useState<any>({})
  const role = getLocalItem('userDetails')?.type

  const subSectionName = 'applicability_methodology_2'

  const adminChangesForThisSubsection =
    dataChanges[subSectionName]?.[0]?.diffValue ?? undefined
  // getting function from hook.
  const { markUpdateAsRead } = useCountChanges()

  console.log('methodology outside of useEffect: ', methodology)
  useEffect(() => {
    if (!Object.keys(localVal).length) {
      return
    }
    if (localVal) {
      const updatedObj = handleNestedObjOnChange(
        methodology,
        'applicability_methodology',
        'applicability_methodology_2',
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
        key: 'methodology.applicability_methodology.applicability_methodology_2',
        originalValue:
          savedDetails?.methodologies?.applicability_methodology?.data
            ?.applicability_methodology_2 || {},
        updatedValue:
          methodology?.applicability_methodology?.data
            ?.applicability_methodology_2,
      }
      const updatedAdminDraftEditPayload = {
        ...adminDraftEditPayload,
        'methodology.applicability_methodology.applicability_methodology_2':
          objectToAdd,
      }
      if (
        !_.isEqual(
          savedDetails?.methodologies?.applicability_methodology?.data
            ?.applicability_methodology_2?.data,
          methodology?.applicability_methodology?.data
            ?.applicability_methodology_2?.data
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
      {/*{!methodology?.applicability_methodology?.data
        ?.applicability_methodology_2 ? (
        <Spinner />
      ) : (*/}
      <CCEditor2
        editorID="draftPDDCompilation-fourPointtwo"
        defaultBlock={'table'}
        // showAiTune={false}
        value={
          // methodology?.applicability_methodology?.data?.applicability_methodology_2
          role === ROLES.ISSUER
            ? adminChangesForThisSubsection !== undefined
              ? adminChangesForThisSubsection?.data
              : methodology?.applicability_methodology?.data
                  ?.applicability_methodology_2
            : methodology?.applicability_methodology?.data
                ?.applicability_methodology_2
        }
        tableCols={2}
        tableRows={2}
        setValue={(value: any) => {
          setLocalVal(value)
        }}
      />
      {/*)}*/}
    </Box>
  )
}

export default FourPointTwoPointTwo
