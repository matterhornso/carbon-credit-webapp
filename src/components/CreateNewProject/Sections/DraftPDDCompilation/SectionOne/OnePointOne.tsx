import { Box, Modal, Paper, TextareaAutosize } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SubTitle from '../SubTitle'
import CCEditor from '../../../../CCEditor/CCEditor'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks'
import draftPDDCompilationV2Slice, {
  setProjectDescription,
  setTrackingChangesOfDraftPDDCompilationData,
} from '../../../../../redux/Slices/CreateNewProject/draftPDDCompilationV2Slice'
import { handleOnChange } from '../../../../../utils/draftPDDCompilation.util'
import {
  setOpenCommentModal,
  setSavedProjectDetails,
} from '../../../../../redux/Slices/CreateNewProject/createNewProjectSlice'
import { getLocalItem, setLocalItem } from '../../../../../utils/Storage'

import { shallowEqual } from 'react-redux'
import { ROLES } from '../../../../../config/constants.config'
import { setAdminDraftEditPayload } from '../../../../../redux/Slices/adminDraftEditSlice'
import {
  setAdminChangesUnattended,
  setAdminDataChanges,
} from '../../../../../redux/Slices/adminEditChangesSlice'
import _ from 'lodash'
import { useCountChanges } from '../../../../../hooks/useCountChanges'
import { INITIAL_STATE_AI_BLOCK } from '../../../../../redux/Slices/CreateNewProject/initialData'

const OnePointOne = () => {
  const dispatch: any = useAppDispatch()

  const openCommentModal = useAppSelector(
    ({ createNewProject }) => createNewProject.openCommentModal
  )
  const project_description = useAppSelector(
    ({ draftPDDCompilationV2 }) => draftPDDCompilationV2.project_description
  )
  const savedDetails = useAppSelector(
    ({ createNewProject }) => createNewProject.savedProjectDetails,
    shallowEqual
  )
  const payloadValue = useAppSelector(
    ({ draftPDDCompilationV2 }) =>
      draftPDDCompilationV2?.project_description
        ?.purpose_objective_general_description,
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

  const subSectionName = 'purpose_objective_general_description'

  const adminChangesUnattendedArr = useAppSelector(
    ({ unattendedAdminChanges }) =>
      unattendedAdminChanges.adminChangesUnattendedArr,
    shallowEqual
  )

  const dataChanges = useAppSelector(
    ({ unattendedAdminChanges }) => unattendedAdminChanges?.adminDataChangesObj,
    shallowEqual
  )

  const adminChangesForThisSubsection =
    dataChanges[subSectionName]?.[0]?.diffValue ?? undefined
  const pddReadChanges = dataChanges[subSectionName]?.[0]?.read

  const { markUpdateAsRead } = useCountChanges()

  const [localVal, setLocalVal] = useState<any>('')
  const role = getLocalItem('userDetails')?.type

  // console.log('saved data from admin side', savedData)
  // console.log('adminDraftEditArray', adminDraftEditArray)
  useEffect(() => {
    if (!Object.keys(localVal).length) {
      return
    }
    if (localVal) {
      const updatedObj = handleOnChange(
        project_description,
        'purpose_objective_general_description',
        localVal
      )
      dispatch(setProjectDescription(updatedObj))
      if (role === ROLES.ISSUER) {
        console.log('running inside 1.1')
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
    if (role === ROLES.ADMIN) {
      // console.log('running inside')
      const objectToAdd = {
        projectId: projectUUID,
        key: 'project_description.purpose_objective_general_description',
        originalValue:
          savedDetails?.project_description
            ?.purpose_objective_general_description || {},
        updatedValue:
          // project_description?.purpose_objective_general_description?.data,
          project_description?.purpose_objective_general_description,
      }
      const updatedAdminDraftEditPayload = {
        ...adminDraftEditPayload,
        'project_description.purpose_objective_general_description':
          objectToAdd,
      }

      if (
        !_.isEqual(
          savedDetails?.project_description
            ?.purpose_objective_general_description?.data,
          project_description?.purpose_objective_general_description?.data
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
      // adding delay before unread messages red dot disappears.
      setTimeout(() => {
        dispatch(setAdminChangesUnattended(updatedArray))
      }, 700)

      // console.log('updated', updatedArray)
    }
  }, [])

  useEffect(() => {
    if (
      adminChangesForThisSubsection &&
      role === ROLES.ISSUER
      // !pddReadChanges
    ) {
      const { [subSectionName]: _, ...newData } = dataChanges
      dispatch(setAdminDataChanges(newData))
      markUpdateAsRead(projectUUID, dataChanges, subSectionName)
    }
  }, [])

  return (
    <Box sx={{ mt: 2 }}>
      <Box>
        <Modal
          open={openCommentModal}
          onClose={() => {
            dispatch(setOpenCommentModal(false))
          }}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(56, 142, 129, 0.4)',
          }}
        >
          <Paper>
            Enter comment here
            <TextareaAutosize />
          </Paper>
        </Modal>
      </Box>
      <SubTitle
        subTitle="1.1 Purpose, Objectives, and General Description of the Project"
        infoText={
          <pre
            style={{
              whiteSpace: 'break-spaces',
              lineHeight: 'initial',
              fontFamily: 'poppins',
            }}
          >
            Provide a summary and a general description of the project in order
            to provide an understanding of the nature of the project, including:{' '}
            <br />- Project title. <br />- Conditions prior to initiation of the
            project. <br />- Technologies/measures to be utilized and/or
            implemented. <br />- Project boundary. <br />- Baseline scenario.{' '}
            <br />- Estimate of annual average and total GHG emission
            mitigation.
          </pre>
        }
      />

      <CCEditor
        editorID="purposeObjectives"
        placeholder="Type your answer here..."
        value={
          //project_description?.purpose_objective_general_description?.data
          role === ROLES.ISSUER
            ? adminChangesForThisSubsection !== undefined && !pddReadChanges
              ? adminChangesForThisSubsection?.data
              : project_description?.purpose_objective_general_description?.data
            : project_description?.purpose_objective_general_description?.data
        }
        setValue={(value: any) => {
          console.log('value: ', value)
          setLocalVal(value)
        }}
      />
    </Box>
  )
}

export default OnePointOne
