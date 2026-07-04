import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import CCEditor from '../../../../CCEditor/CCEditor'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import SubTitle from '../SubTitle'
import { setDeviationFromMethodology } from '../../../../../redux/Slices/CreateNewProject/draftPDDCompilationSlice'
import {
  setMethodology,
  setTrackingChangesOfDraftPDDCompilationData,
} from '../../../../../redux/Slices/CreateNewProject/draftPDDCompilationV2Slice'
import { handleOnChange } from '../../../../../utils/draftPDDCompilation.util'
import { getLocalItem } from '../../../../../utils/Storage'
import { ROLES } from '../../../../../config/constants.config'
import { setAdminDraftEditPayload } from '../../../../../redux/Slices/adminDraftEditSlice'
import {
  setAdminChangesUnattended,
  setAdminDataChanges,
} from '../../../../../redux/Slices/adminEditChangesSlice'
import { useCountChanges } from '../../../../../hooks/useCountChanges'
import _ from 'lodash'

const FourPointThree = () => {
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
      draftPDDCompilationV2.methodology?.deviation_methodology,
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

  const [localVal, setLocalVal] = useState<any>({})
  const role = getLocalItem('userDetails')?.type

  const subSectionName = 'deviation_methodology'

  const adminChangesForThisSubsection =
    dataChanges[subSectionName]?.[0]?.diffValue ?? undefined
  // getting function from hook.
  const { markUpdateAsRead } = useCountChanges()

  useEffect(() => {
    if (!Object.keys(localVal).length) {
      return
    }
    if (localVal) {
      const updatedObj = handleOnChange(
        methodology,
        'deviation_methodology',
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

  console.log('savedDetails', savedDetails)
  useEffect(() => {
    if (role == ROLES.ADMIN) {
      return
      console.log('entered use effect 4.3')
      const objectToAdd = {
        projectId: projectUUID,
        key: 'methodology.deviation_methodology',
        originalValue: savedDetails?.methodologies?.deviation_methodology || {},
        updatedValue: methodology?.deviation_methodology,
      }
      const updatedAdminDraftEditPayload = {
        ...adminDraftEditPayload,
        'methodology.deviation_methodology': objectToAdd,
      }
      if (
        !_.isEqual(
          savedDetails?.methodologies?.deviation_methodology?.data,
          methodology?.deviation_methodologyy?.data
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
      // console.log('updated', updatedArray)
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
      <SubTitle subTitle="4.3 Deviation from Methodology" infoText={''} />
      <CCEditor
        editorID="draftPDDCompilation-MethodologyDeviation"
        placeholder="Type your answer here ... "
        value={
          // methodology?.deviation_methodology?.data
          role === ROLES.ISSUER
            ? adminChangesForThisSubsection !== undefined
              ? adminChangesForThisSubsection?.data
              : methodology?.deviation_methodology?.data
            : methodology?.deviation_methodology?.data
        }
        setValue={(value: any) => {
          setLocalVal(value)
        }}
      />
    </Box>
  )
}

export default FourPointThree
