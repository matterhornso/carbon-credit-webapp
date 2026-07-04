// React Imports
import React, { useState, useEffect } from 'react'

// MUI Imports
import { Box, Grid, Stack, TextareaAutosize, Typography } from '@mui/material'

// Redux Imports
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { setB2 } from '../../../redux/Slices/sectionBSlice'

// Local Components
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import Spinner from '../../../atoms/Spinner'
import { setShowPopUp } from '../../../redux/Slices/issuanceDataCollection'
import HelpPopUp from '../../Appbar/NavBar/Help/HelpPopUp'
import { IssuanceHelpContentData } from '../../Appbar/NavBar/Help/SectionA/helpContentData'

const SectionB2 = () => {
  const dispatch = useAppDispatch()

  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )
  const B2 = useAppSelector(({ sectionB }) => sectionB.B2, shallowEqual)

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

  useEffect(() => {
    if (
      currentProjectDetails &&
      currentProjectDetails.section_b.step2.completed
    ) {
      const {
        temporary_deviation,
        corrections,
        permanent_changes_from_registered_monitoring_plan,
        change_project_design,
        change_startDate_creditPeriod,
        typeOf_changes_specific,
      } = currentProjectDetails.section_b.step2

      dispatch(
        setB2({
          name: 'typeOf_changes_specific',
          value: typeOf_changes_specific,
        })
      )
      dispatch(
        setB2({ name: 'change_project_design', value: change_project_design })
      )
      dispatch(
        setB2({
          name: 'change_startDate_creditPeriod',
          value: change_startDate_creditPeriod,
        })
      )
      dispatch(setB2({ name: 'corrections', value: corrections }))
      dispatch(
        setB2({
          name: 'permanent_changes_from_registered_monitoring_plan',
          value: permanent_changes_from_registered_monitoring_plan,
        })
      )
      dispatch(
        setB2({ name: 'temporary_deviation', value: temporary_deviation })
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
            label="Temporary deviations from registered monitoring plan or applied methodology"
            placeholder="Write down the deviations from registered monitoring plan or applied methodology, if any"
            value={B2.temporary_deviation}
            name="temporary_deviation"
            onChange={({ target: { value, name } }) =>
              dispatch(setB2({ value, name }))
            }
          />
        </Grid>

        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Corrections"
            placeholder="Write Corrections from registered monitoring plan or applied methodology, if any"
            value={B2.corrections}
            name={'corrections'}
            onChange={({ target: { name, value } }) =>
              dispatch(setB2({ value, name }))
            }
          />
        </Grid>

        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Permanent changes from registered monitoring plan or applied methodology"
            placeholder="Write the technical description of the equipment, its specification, supplier name, installed by the project activity"
            value={B2.permanent_changes_from_registered_monitoring_plan}
            name={'permanent_changes_from_registered_monitoring_plan'}
            onChange={({ target: { name, value } }) =>
              dispatch(setB2({ value, name }))
            }
          />
        </Grid>

        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Brief on purpose and general description of project activity "
            placeholder="Write a brief of the implemented registered project activity"
            value={B2.typeOf_changes_specific}
            name={'typeOf_changes_specific'}
            onChange={({ target: { name, value } }) =>
              dispatch(setB2({ value, name }))
            }
          />
        </Grid>

        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Changes to project design of registered project activity"
            placeholder="Write the technical description of the equipment, its specification, supplier name, installed by the project activity"
            value={B2.change_project_design}
            name={'change_project_design'}
            onChange={({ target: { name, value } }) =>
              dispatch(setB2({ value, name }))
            }
          />
        </Grid>

        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Changes to start date of crediting period"
            placeholder="Changes introduced to start date of crediting period, if any."
            value={B2.change_startDate_creditPeriod}
            name={'change_startDate_creditPeriod'}
            onChange={({ target: { name, value } }) =>
              dispatch(setB2({ value, name }))
            }
          />
        </Grid>
      </Grid>
      <HelpPopUp
        modal={modal}
        setModal={(item: any) => setModal(item)}
        data={IssuanceHelpContentData?.B2}
        issuanceVisible={true}
      />
    </Box>
  )
}

export default SectionB2
