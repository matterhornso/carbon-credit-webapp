import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SubTitle from '../../SubTitle'
import CCEditor from '../../../../../CCEditor/CCEditor'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../hooks/reduxHooks'
import { handleNestedObjOnChange } from '../../../../../../utils/draftPDDCompilation.util'
import {
  setQuantificationGHGEmissionMitigations,
  setTrackingChangesOfDraftPDDCompilationData,
} from '../../../../../../redux/Slices/CreateNewProject/draftPDDCompilationV2Slice'
import { getLocalItem } from '../../../../../../utils/Storage'
import { shallowEqual } from 'react-redux'
import { ROLES } from '../../../../../../config/constants.config'
import { setAdminDraftEditPayload } from '../../../../../../redux/Slices/adminDraftEditSlice'
import { useCountChanges } from '../../../../../../hooks/useCountChanges'
import _ from 'lodash'
import { setAdminDataChanges } from '../../../../../../redux/Slices/adminEditChangesSlice'
const EightPointTwoPointOne = () => {
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
        ?.quantification_net_GHG_emissions?.data
        ?.quantification_net_GHG_emissions_1,
    shallowEqual
  )

  const dataChanges = useAppSelector(
    ({ unattendedAdminChanges }) => unattendedAdminChanges?.adminDataChangesObj,
    shallowEqual
  )

  const [localVal, setLocalVal] = useState<any>({})
  const role = getLocalItem('userDetails')?.type

  const subSectionName = 'quantification_net_GHG_emissions_1'
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
        quantification_GHG_emission_mitigations,
        'quantification_net_GHG_emissions',
        'quantification_net_GHG_emissions_1',
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

  // console.log('saved details qghg', savedDetails?.quantificationGHGEmissionMitigations?.criteria_and_procedures_quantification?.baseline_emissions);

  useEffect(() => {
    if (role == ROLES.ADMIN) {
      const objectToAdd = {
        projectId: projectUUID,
        key: 'quantification_GHG_emission_mitigations.quantification_net_GHG_emissions.quantification_net_GHG_emissions_1',
        originalValue:
          savedDetails?.quantificationGHGEmissionMitigations
            ?.quantification_net_GHG_emissions?.data
            ?.quantification_net_GHG_emissions_1 || {},
        updatedValue:
          quantification_GHG_emission_mitigations
            ?.quantification_net_GHG_emissions?.data
            ?.quantification_net_GHG_emissions_1,
      }
      const updatedAdminDraftEditPayload = {
        ...adminDraftEditPayload,
        'quantification_GHG_emission_mitigations.quantification_net_GHG_emissions.quantification_net_GHG_emissions_1':
          objectToAdd,
      }
      if (
        !_.isEqual(
          savedDetails?.quantificationGHGEmissionMitigations
            ?.quantification_net_GHG_emissions?.data
            ?.quantification_net_GHG_emissions_1,
          quantification_GHG_emission_mitigations
            ?.quantification_net_GHG_emissions?.data
            ?.quantification_net_GHG_emissions_1
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
        editorID="draftPDDCompilation-QuantificationOfNet-GHGEmissions"
        placeholder="Type your answer here"
        defaultBlock={'paragraph'}
        value={
          // quantification_GHG_emission_mitigations
          //   ?.quantification_net_GHG_emissions?.data
          //   ?.quantification_net_GHG_emissions_1

          role === ROLES.ISSUER
            ? adminChangesForThisSubsection !== undefined
              ? adminChangesForThisSubsection
              : quantification_GHG_emission_mitigations
                  ?.quantification_net_GHG_emissions?.data
                  ?.quantification_net_GHG_emissions_1
            : quantification_GHG_emission_mitigations
                ?.quantification_net_GHG_emissions?.data
                ?.quantification_net_GHG_emissions_1
        }
        setValue={(value: any) => {
          setLocalVal(value)
        }}
      />
    </Box>
  )
}

export default EightPointTwoPointOne
