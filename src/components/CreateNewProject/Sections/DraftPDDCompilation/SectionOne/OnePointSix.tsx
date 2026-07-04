import React, { useEffect, useState } from 'react'
import SubTitle from '../SubTitle'
import { Box, Typography } from '@mui/material'
import CCEditor from '../../../../CCEditor/CCEditor'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks'
import { handleOnChange } from '../../../../../utils/draftPDDCompilation.util'
import {
  setProjectDescription,
  setTrackingChangesOfDraftPDDCompilationData,
} from '../../../../../redux/Slices/CreateNewProject/draftPDDCompilationV2Slice'
import Spinner from '../../../../../atoms/Spinner'
import { shallowEqual } from 'react-redux'
import { ROLES } from '../../../../../config/constants.config'
import { getLocalItem } from '../../../../../utils/Storage'
import { setAdminDraftEditPayload } from '../../../../../redux/Slices/adminDraftEditSlice'
import {
  setAdminChangesUnattended,
  setAdminDataChanges,
} from '../../../../../redux/Slices/adminEditChangesSlice'
import { useCountChanges } from '../../../../../hooks/useCountChanges'
import _ from 'lodash'

const OnePointSix = () => {
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
      draftPDDCompilationV2.project_description?.aggregated_GHG_emissions,
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

  const adminChangesUnattendedArr = useAppSelector(
    ({ unattendedAdminChanges }) =>
      unattendedAdminChanges.adminChangesUnattendedArr,
    shallowEqual
  )

  const dataChanges = useAppSelector(
    ({ unattendedAdminChanges }) => unattendedAdminChanges?.adminDataChangesObj,
    shallowEqual
  )

  const role = getLocalItem('userDetails')?.type

  const [localVal, setLocalVal] = useState<any>({})
  const subSectionName = 'aggregated_GHG_emissions'

  const adminChangesForThisSubsection =
    dataChanges[subSectionName]?.[0]?.diffValue ?? undefined

  const { markUpdateAsRead } = useCountChanges()

  useEffect(() => {
    if (!Object.keys(localVal).length) {
      return
    }
    if (localVal) {
      const updatedObj = handleOnChange(
        project_description,
        'aggregated_GHG_emissions',
        localVal
      )
      console.log('updated obj 1.6', updatedObj)
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
        key: 'project_description.aggregated_GHG_emissions',
        originalValue:
          savedDetails?.project_description?.aggregated_GHG_emissions || {},
        updatedValue: project_description?.aggregated_GHG_emissions,
      }
      const updatedAminDraftEditPayload = {
        ...adminDraftEditPayload,
        'project_description.aggregated_GHG_emissions': objectToAdd,
      }
      if (
        !_.isEqual(
          savedDetails?.project_description?.aggregated_GHG_emissions?.data,
          project_description?.aggregated_GHG_emissions?.data
        )
      ) {
        dispatch(setAdminDraftEditPayload(updatedAminDraftEditPayload))
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
      <SubTitle
        subTitle="1.6 Aggregated GHG Emission Mitigations"
        infoText={
          <pre
            style={{
              whiteSpace: 'break-spaces',
              lineHeight: 'initial',
              fontFamily: 'poppins',
            }}
          >
            TBD
          </pre>
        }
      />
      <Typography sx={{ fontWeight: 400, fontSize: '16px', pt: 1 }}>
        Provide information on aggregated information on the impacts of the
        project activities.
      </Typography>
      {/*{!project_description?.aggregated_GHG_emissions ? (
        <Spinner />
      ) : (*/}
      <CCEditor
        editorID="aggregatedGHGEmissionMitigations"
        value={
          // project_description?.aggregated_GHG_emissions?.data
          role === ROLES.ISSUER
            ? adminChangesForThisSubsection !== undefined
              ? adminChangesForThisSubsection?.data
              : project_description?.aggregated_GHG_emissions?.data
            : project_description?.aggregated_GHG_emissions?.data
        }
        tableRows={9}
        tableCols={5}
        setValue={(value: any) => {
          setLocalVal(value)
        }}
      />
      {/*)}*/}
    </Box>
  )
}

export default OnePointSix
