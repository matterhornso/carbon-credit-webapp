import React, { useEffect, useState } from 'react'
import {
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import CCInputField from '../../atoms/CCInputField'
import { Box } from '@mui/system'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { setEndDate, setStartDate } from '../../redux/Slices/SelectDateSlice'
import Spinner from '../../atoms/Spinner'
import moment from 'moment'
const SelectDate = () => {
  const dispatch = useAppDispatch()

  const startDate = useAppSelector(
    ({ selectDate }) => selectDate.startDate,
    shallowEqual
  )

  const endDate = useAppSelector(
    ({ selectDate }) => selectDate.endDate,
    shallowEqual
  )

  const currentProjectDetails = useAppSelector(
    ({ MonthlyReportUpdate }) => MonthlyReportUpdate.currentProjectDetails,
    shallowEqual
  )

  const loading = useAppSelector(
    ({ selectDate }) => selectDate.loading,
    shallowEqual
  )

  useEffect(() => {
    if (currentProjectDetails) {
      const { end_date, createdAt } = currentProjectDetails

      dispatch(setStartDate(createdAt))
      dispatch(setEndDate(end_date))
    }
  }, [])

  return loading === true ? (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 450 }}>
      <Spinner />
    </Stack>
  ) : (
    <Grid container xs={12} spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={6} md={6}>
        <DatePicker
          label="Start Date"
          value={startDate}
          maxDate={endDate ? endDate : undefined}
          onChange={(newValue) => {
            dispatch(setStartDate(newValue))
          }}
          components={{
            OpenPickerIcon: CalendarMonthOutlinedIcon,
          }}
          renderInput={(params) => (
            <CCInputField
              {...params}
              InputLabelProps={{
                style: { color: '#3F4946' },
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={6} md={6}>
        <DatePicker
          label="End Date"
          minDate={startDate ? startDate : undefined}
          value={endDate}
          onChange={(newValue) => {
            dispatch(setEndDate(newValue))
          }}
          components={{
            OpenPickerIcon: CalendarMonthOutlinedIcon,
          }}
          renderInput={(params) => (
            <CCInputField
              {...params}
              InputLabelProps={{
                style: { color: '#3F4946' },
              }}
            />
          )}
        />
      </Grid>
    </Grid>
  )
}

export default SelectDate
