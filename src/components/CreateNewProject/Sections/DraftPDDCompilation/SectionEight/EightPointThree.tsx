import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import CCEditor from '../../../../CCEditor/CCEditor'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import SubTitle from '../SubTitle'
import {
  setQuantificationGHGEmissionMitigations,
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

const EightPointTwo = () => {
  const dispatch = useAppDispatch()

  const quantification_GHG_emission_mitigations = useAppSelector(
    ({ draftPDDCompilationV2 }) =>
      draftPDDCompilationV2.quantification_GHG_emission_mitigations
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
      draftPDDCompilationV2.quantification_GHG_emission_mitigations
        ?.risk_Assessment_permanence,
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
  const subSectionName = 'risk_Assessment_permanence'

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
        quantification_GHG_emission_mitigations,
        'risk_Assessment_permanence',
        localVal
      )
      dispatch(setQuantificationGHGEmissionMitigations(updatedObj))
      if (role == ROLES.ISSUER) {
        dispatch(
          setTrackingChangesOfDraftPDDCompilationData({
            sectionIndex: 7,
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
        key: 'quantification_GHG_emission_mitigations.risk_Assessment_permanence',
        originalValue:
          savedDetails?.quantificationGHGEmissionMitigations
            ?.risk_Assessment_permanence || {},
        updatedValue:
          quantification_GHG_emission_mitigations?.risk_Assessment_permanence,
      }
      const updatedAdminDraftEditPayload = {
        ...adminDraftEditPayload,
        'quantification_GHG_emission_mitigations.risk_Assessment_permanence':
          objectToAdd,
      }
      if (
        !_.isEqual(
          savedDetails?.quantificationGHGEmissionMitigations
            ?.risk_Assessment_permanence?.data,
          quantification_GHG_emission_mitigations?.risk_Assessment_permanence
            ?.data
        )
      ) {
        dispatch(setAdminDraftEditPayload(updatedAdminDraftEditPayload))
      }
    }
  }, [payloadValue])

  useEffect(() => {
    if (role === ROLES.ISSUER) {
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
      <SubTitle subTitle="8.3 Risk Assessment for Permanence" infoText={''} />
      <CCEditor
        editorID="draftPDDCompilation-RiskAssessmentForPermanence"
        placeholder="Type your answer here"
        value={
          // quantification_GHG_emission_mitigations?.risk_Assessment_permanence?.data

          role === ROLES.ISSUER
            ? adminChangesForThisSubsection !== undefined
              ? adminChangesForThisSubsection?.data
              : quantification_GHG_emission_mitigations
                  ?.risk_Assessment_permanence?.data
            : quantification_GHG_emission_mitigations
                ?.risk_Assessment_permanence?.data
        }
        setValue={(value: any) => {
          setLocalVal(value)
        }}
      />
    </Box>
  )
}

export default EightPointTwo
