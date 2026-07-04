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

// Local Components
import CCDropAndUpload from '../../../atoms/CCDropAndUpload/CCDropAndUpload'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { setC1 } from '../../../redux/Slices/MonthlyReport/sectionCMonthly'
import { deleteIndexInArray } from '../../../utils/commonFunctions'
import Spinner from '../../../atoms/Spinner'

const SectionC1 = () => {
  const dispatch = useAppDispatch()

  const currentProjectDetails = useAppSelector(
    ({ MonthlyReportUpdate }) => MonthlyReportUpdate.currentProjectDetails,
    shallowEqual
  )
  const loading = useAppSelector(
    ({ selectDate }) => selectDate.loading,
    shallowEqual
  )

  const C1 = useAppSelector(
    ({ sectionCMonthly }) => sectionCMonthly.C1,
    shallowEqual
  )
  const { attach_org_structure_and_responsibilities_chart } = C1

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
          name: 'attach_org_structure_and_responsibilities_chart',
          value: attach_org_structure_and_responsibilities_chart,
        })
      )
    }
  }, [currentProjectDetails])

  return loading === true ? (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 450 }}>
      <Spinner />
    </Stack>
  ) : (
    <Box>
      <Grid container sx={{ mt: 4 }} spacing={1}>
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
            title="Attach organizational structure & responsibilities chart*"
            imageArray={attach_org_structure_and_responsibilities_chart}
            onImageUpload={(item: any) => {
              dispatch(
                setC1({
                  name: 'attach_org_structure_and_responsibilities_chart',
                  value: [
                    item,
                    ...attach_org_structure_and_responsibilities_chart,
                  ],
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
      </Grid>
    </Box>
  )
}
export default SectionC1
