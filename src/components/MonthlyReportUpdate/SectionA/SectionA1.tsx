import { Grid, Stack, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React, { useState, useEffect } from 'react'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import CCInputField from '../../../atoms/CCInputField'
import CCTextarea from '../../../atoms/CCTextarea'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import { authCalls } from '../../../api/authCalls'
import { dataCollectionCalls } from '../../../api/dataCollectionCalls'
// Redux Imports
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { setA1 } from '../../../redux/Slices/MonthlyReport/sectionAMonthly'
import { setCurrentProjectDetails } from '../../../redux/Slices/MonthlyReportUpdate'
import Spinner from '../../../atoms/Spinner'
const SectionA1 = () => {
  const dispatch = useAppDispatch()

  const currentProjectDetails = useAppSelector(
    ({ MonthlyReportUpdate }) => MonthlyReportUpdate.currentProjectDetails,
    shallowEqual
  )
  const A1 = useAppSelector(
    ({ sectionAMonthly }) => sectionAMonthly.A1,
    shallowEqual
  )

  useEffect(() => {
    if (
      currentProjectDetails &&
      currentProjectDetails.section_a.step1.completed
    ) {
      const { total_GHG_emission } = currentProjectDetails.section_a.step1

      dispatch(
        setA1({
          name: 'total_GHG_emission',
          value: total_GHG_emission,
        })
      )
    }
  }, [currentProjectDetails])

  const loading = useAppSelector(
    ({ selectDate }) => selectDate.loading,
    shallowEqual
  )

  return loading === true ? (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 450 }}>
      <Spinner />
    </Stack>
  ) : (
    <Grid container sx={{ mt: 3 }} spacing={1} xs={12} md={12} lg={12} xl={12}>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <CCMultilineTextArea
          label={
            '   Total GHG emission reductions or net anthropogenic GHG removals by sinks achieved in this monitoring period'
          }
          placeholder="(Total GHG emission reductions or net anthropogenic GHG removals by sinks achieved during this monitoring period.)"
          name={'total_GHG_emission'}
          value={A1.total_GHG_emission}
          onChange={({ target: { name, value } }) =>
            dispatch(setA1({ name, value }))
          }
        />
      </Grid>
    </Grid>
  )
}

export default SectionA1
