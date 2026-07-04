// React Imports
import React, { useState, useEffect } from 'react'

// MUI Imports
import {
  Button,
  Grid,
  Stack,
  TextareaAutosize,
  Typography,
  Modal,
  Paper,
} from '@mui/material'
import { Box } from '@mui/system'

// Asset Imports
import SectionCOrganisationalStructure from '../../../assets/Images/SampleData/SectionCOrganisationalStructure.png'
import SectionC1ProjectProponents from '../../../assets/Images/SampleData/SectionC1ProjectProponents.png'
import SectionC1OthersInvolvedInProject from '../../../assets/Images/SampleData/SectionC1OthersInvolvedInProject.png'

// Local Components
import CCDropAndUpload from '../../../atoms/CCDropAndUpload/CCDropAndUpload'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { setC1 } from '../../../redux/Slices/sectionCSlice'
import { deleteIndexInArray } from '../../../utils/commonFunctions'
import Spinner from '../../../atoms/Spinner'
import HelpPopUp from '../../Appbar/NavBar/Help/HelpPopUp'
import { IssuanceHelpContentData } from '../../Appbar/NavBar/Help/SectionA/helpContentData'
import { setShowPopUp } from '../../../redux/Slices/issuanceDataCollection'

const SectionC1 = () => {
  const dispatch = useAppDispatch()

  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )
  const modal = useAppSelector(
    ({ issuanceDataCollection }) => issuanceDataCollection.showPopUp
  )
  const setModal = (item: any) => {
    dispatch(setShowPopUp(item))
  }

  const loading = useAppSelector(
    ({ newProject }) => newProject.loading,
    shallowEqual
  )

  const C1 = useAppSelector(({ sectionC }) => sectionC.C1, shallowEqual)
  const {
    attach_org_structure_and_responsibilities_chart,
    project_proponents_upload,
    others_involved_upload,
  } = C1

  useEffect(() => {
    if (
      currentProjectDetails &&
      currentProjectDetails.section_c.step1.completed
    ) {
      const {
        description,
        monitoring_plan,
        attach_org_structure_and_responsibilities_chart,
        specific_data_monitored,
        training_and_maintenance,
        management_of_data_quality,
        project_proponents_upload,
        others_involved_upload,
      } = currentProjectDetails.section_c.step1

      dispatch(setC1({ name: 'description', value: description }))
      dispatch(
        setC1({
          name: 'specific_data_monitored',
          value: specific_data_monitored,
        })
      )
      dispatch(setC1({ name: 'monitoring_plan', value: monitoring_plan }))
      dispatch(
        setC1({
          name: 'training_and_maintenance',
          value: training_and_maintenance,
        })
      )
      dispatch(
        setC1({
          name: 'management_of_data_quality',
          value: management_of_data_quality,
        })
      )
      dispatch(
        setC1({
          name: 'attach_org_structure_and_responsibilities_chart',
          value: attach_org_structure_and_responsibilities_chart,
        })
      )
      dispatch(
        setC1({
          name: 'project_proponents_upload',
          value: project_proponents_upload,
        })
      )
      dispatch(
        setC1({
          name: 'others_involved_upload',
          value: others_involved_upload,
        })
      )
    }
  }, [currentProjectDetails])

  return loading === true ? (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 450 }}>
      <Spinner />
    </Stack>
  ) : (
    <Box className="issuance_data_section_scroll">
      <Grid container sx={{ mt: 2 }} spacing={1}>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Description of monitoring system "
            placeholder="Description of the monitoring system,organisational structure of the team, their roles & responsibilities, training and maintenance"
            value={C1.description}
            name={'description'}
            onChange={({ target: { name, value } }) =>
              dispatch(setC1({ value, name }))
            }
          />
        </Grid>

        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Monitoring Plan"
            placeholder="According to registered and the applied methodology, describe plan of monitoring variables"
            value={C1.monitoring_plan}
            name={'monitoring_plan'}
            onChange={({ target: { name, value } }) =>
              dispatch(setC1({ value, name }))
            }
          />

          <CCDropAndUpload
            mediaTitle={[
              'Sample Report - Organizational Structure & Responsibilities Chart',
            ]}
            mediaItem={[SectionCOrganisationalStructure]}
            title="Attach organizational structure & responsibilities chart"
            imageArray={attach_org_structure_and_responsibilities_chart}
            onImageUpload={(item: any) => {
              dispatch(
                setC1({
                  name: 'attach_org_structure_and_responsibilities_chart',
                  value: item,
                })
              )
            }}
            onDeleteImage={(index: number) => {
              dispatch(
                setC1({
                  name: 'attach_org_structure_and_responsibilities_chart',
                  value: deleteIndexInArray(
                    attach_org_structure_and_responsibilities_chart,
                    index
                  ),
                })
              )
            }}
            required={true}
          />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCDropAndUpload
            mediaTitle={[]}
            mediaItem={[SectionC1ProjectProponents]}
            title="Project Proponent(s)"
            imageArray={project_proponents_upload}
            onImageUpload={(item: any) => {
              dispatch(
                setC1({
                  name: 'project_proponents_upload',
                  value: item,
                })
              )
            }}
            onDeleteImage={(index: number) => {
              dispatch(
                setC1({
                  name: 'project_proponents_upload',
                  value: deleteIndexInArray(project_proponents_upload, index),
                })
              )
            }}
            required
          />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCDropAndUpload
            mediaTitle={[]}
            mediaItem={[SectionC1OthersInvolvedInProject]}
            title="Others Involved in the Project"
            imageArray={others_involved_upload}
            onImageUpload={(item: any) => {
              dispatch(
                setC1({
                  name: 'others_involved_upload',
                  value: item,
                })
              )
            }}
            onDeleteImage={(index: number) => {
              dispatch(
                setC1({
                  name: 'others_involved_upload',
                  value: deleteIndexInArray(others_involved_upload, index),
                })
              )
            }}
            required
          />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Specific Datas Monitored "
            placeholder="According to registered and the applied methodology, specific datas monitored"
            value={C1.specific_data_monitored}
            name={'specific_data_monitored'}
            onChange={({ target: { name, value } }) =>
              dispatch(setC1({ value, name }))
            }
          />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Training and Maintenance "
            //placeholder="According to registered and the applied methodology, specific datas monitored"
            value={C1.training_and_maintenance}
            name={'training_and_maintenance'}
            onChange={({ target: { name, value } }) =>
              dispatch(setC1({ value, name }))
            }
          />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Management of data quality"
            placeholder="Describe quality management procedures to manage data and information relevant to the project and baseline scenario, accompanied by the uncertainty assessment. Ensure that the management procedures include a description of how data is maintained and recorded. Describe the information management system used in the project. Location and retention of stored data and data management that includes a procedure for data transfers between different systems or documentation forms shall be included."
            value={C1.management_of_data_quality}
            name={'management_of_data_quality'}
            onChange={({ target: { name, value } }) =>
              dispatch(setC1({ value, name }))
            }
          />
        </Grid>
      </Grid>
      <HelpPopUp
        modal={modal}
        setModal={(item: any) => setModal(item)}
        data={IssuanceHelpContentData?.C1}
        issuanceVisible={true}
      />
    </Box>
  )
}
export default SectionC1
