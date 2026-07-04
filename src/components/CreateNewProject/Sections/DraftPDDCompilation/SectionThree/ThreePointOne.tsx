import { Box, Button, Menu } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CCEditor from '../../../../CCEditor/CCEditor'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import SubTitle from '../SubTitle'
import {
  setSafeGuards,
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

const ThreePointOne = () => {
  const dispatch = useAppDispatch()

  const safeguards = useAppSelector(
    ({ draftPDDCompilationV2 }) => draftPDDCompilationV2.safeguards
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
      draftPDDCompilationV2.safeguards?.statutory_requirements,
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

  const subSectionName = 'statutory_requirements'

  const adminChangesForThisSubsection =
    dataChanges[subSectionName]?.[0]?.diffValue ?? undefined

  const { markUpdateAsRead } = useCountChanges()

  useEffect(() => {
    if (!Object.keys(localVal).length) {
      return
    }
    if (localVal) {
      const updatedObj = handleOnChange(
        safeguards,
        'statutory_requirements',
        localVal
      )
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
        key: 'safeguards.statutory_requirements',
        originalValue: savedDetails?.safeguards?.statutory_requirements || {},
        updatedValue: safeguards?.statutory_requirements,
      }
      const updatedAdminDraftEditPayload = {
        ...adminDraftEditPayload,
        'safeguards.statutory_requirements': objectToAdd,
      }
      if (
        !_.isEqual(
          savedDetails?.safeguards?.statutory_requirements?.data,
          safeguards?.statutory_requirements?.data
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
      <SubTitle subTitle="3.1 Statutory Requirements" infoText={''} />
      <CCEditor
        editorID="statutoryRequirements"
        placeholder="Identify relevant local, regional, and national laws, statutes, and regulatory frameworks and demonstrate compliance."
        value={
          // safeguards?.statutory_requirements?.data
          role === ROLES.ISSUER
            ? adminChangesForThisSubsection !== undefined
              ? adminChangesForThisSubsection?.data
              : safeguards?.statutory_requirements?.data
            : safeguards?.statutory_requirements?.data
        }
        setValue={(value: any) => {
          setLocalVal(value)
        }}
      />
    </Box>
  )
}

export default ThreePointOne
