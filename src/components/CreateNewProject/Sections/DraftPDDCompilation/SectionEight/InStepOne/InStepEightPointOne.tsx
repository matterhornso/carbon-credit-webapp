import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SubTitle from '../../SubTitle'
import CCEditor from '../../../../../CCEditor/CCEditor'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../hooks/reduxHooks'
import { handleNestedObjOnChange } from '../../../../../../utils/draftPDDCompilation.util'
import { setQuantificationOfNetGHGEmissions } from '../../../../../../redux/Slices/CreateNewProject/draftPDDCompilationSlice'
import {
  setQuantificationGHGEmissionMitigations,
  setTrackingChangesOfDraftPDDCompilationData,
} from '../../../../../../redux/Slices/CreateNewProject/draftPDDCompilationV2Slice'
import _ from 'lodash'
import { getLocalItem } from '../../../../../../utils/Storage'
import { shallowEqual } from 'react-redux'
import { ROLES } from '../../../../../../config/constants.config'
import { setAdminDraftEditPayload } from '../../../../../../redux/Slices/adminDraftEditSlice'
import { useCountChanges } from '../../../../../../hooks/useCountChanges'
import { setAdminDataChanges } from '../../../../../../redux/Slices/adminEditChangesSlice'

const InStepEightPointOne = () => {
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
        ?.criteria_and_procedures_quantification
        ?.criteria_and_procedures_quantification,
    shallowEqual
  )
  const dataChanges = useAppSelector(
    ({ unattendedAdminChanges }) => unattendedAdminChanges?.adminDataChangesObj,
    shallowEqual
  )

  const [localVal, setLocalVal] = useState<any>({})
  const role = getLocalItem('userDetails')?.type

  const subSectionName = 'criteria_and_procedures_quantification'
  const adminChangesForThisSubsection =
    dataChanges[subSectionName]?.[0]?.diffValue ?? undefined
  // getting function from hook.
  const { markUpdateAsRead } = useCountChanges()

  useEffect(() => {
    if (!Object.keys(localVal).length) {
      return
    }
    if (localVal) {
      const updatedObj = {
        ...quantification_GHG_emission_mitigations,
        ['criteria_and_procedures_quantification']: {
          ...quantification_GHG_emission_mitigations.criteria_and_procedures_quantification,
          ['criteria_and_procedures_quantification']: { data: localVal },
        },
      }
      console.log('8.1 criteria ', updatedObj)
      dispatch(setQuantificationGHGEmissionMitigations(updatedObj))
      // dispatch(setQuantificationOfNetGHGEmissions(updatedObj))
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
        key: 'quantification_GHG_emission_mitigations.criteria_and_procedures_quantification.criteria_and_procedures_quantification',
        originalValue:
          savedDetails?.quantificationGHGEmissionMitigations
            ?.criteria_and_procedures_quantification
            ?.criteria_and_procedures_quantification || {},
        updatedValue:
          quantification_GHG_emission_mitigations
            ?.criteria_and_procedures_quantification
            ?.criteria_and_procedures_quantification,
      }
      const updatedAdminDraftEditPayload = {
        ...adminDraftEditPayload,
        'quantification_GHG_emission_mitigations.criteria_and_procedures_quantification.criteria_and_procedures_quantification':
          objectToAdd,
      }
      if (
        !_.isEqual(
          savedDetails?.quantificationGHGEmissionMitigations
            ?.criteria_and_procedures_quantification
            ?.criteria_and_procedures_quantification?.data,
          quantification_GHG_emission_mitigations
            ?.criteria_and_procedures_quantification
            ?.criteria_and_procedures_quantification?.data
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
    <Box sx={{ mt: 2 }}>
      <SubTitle
        subTitle="8.1 Criteria and Procedures for Quantification"
        infoText={' '}
        showGenerateAIBtn={false}
      />
      <CCEditor
        showAiTune={false}
        editorID="draftPDDCompilation-Criteria.ProceduresForQuantification"
        placeholder="Type your answer here"
        //value={criteriaProcedureForQuantification}
        value={
          // quantification_GHG_emission_mitigations
          //   ?.criteria_and_procedures_quantification
          //   ?.criteria_and_procedures_quantification?.data

          role === ROLES.ISSUER
            ? adminChangesForThisSubsection !== undefined
              ? adminChangesForThisSubsection?.data
              : quantification_GHG_emission_mitigations
                  ?.criteria_and_procedures_quantification
                  ?.criteria_and_procedures_quantification?.data
            : quantification_GHG_emission_mitigations
                ?.criteria_and_procedures_quantification
                ?.criteria_and_procedures_quantification?.data
        }
        setValue={(value: any) => {
          setLocalVal(value)
        }}
      />
    </Box>
  )
}

export default InStepEightPointOne
