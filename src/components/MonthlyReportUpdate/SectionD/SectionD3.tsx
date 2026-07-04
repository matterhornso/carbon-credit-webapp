import React, { FC, useEffect } from 'react'
import { Grid, Typography, Stack } from '@mui/material'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { setD3 } from '../../../redux/Slices/MonthlyReport/sectionDMonthly'
import Spinner from '../../../atoms/Spinner'

const SectionD3: FC = () => {
  const dispatch = useAppDispatch()

  const D3 = useAppSelector(
    ({ sectionDMonthly }) => sectionDMonthly.D3,
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
    if (
      currentProjectDetails &&
      currentProjectDetails.section_d.step3.completed
    ) {
      const { implementation_of_sampling_plan } =
        currentProjectDetails.section_d.step3

      dispatch(
        setD3({
          name: 'implementation_of_sampling_plan',
          value: implementation_of_sampling_plan,
        })
      )
    }
  }, [currentProjectDetails])

  return loading === true ? (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 450 }}>
      <Spinner />
    </Stack>
  ) : (
    <Grid
      container
      sx={{ width: '100%', mt: 3 }}
      columnSpacing={{ xs: 0, md: 1 }}
      rowSpacing={1}
      xs={12}
      md={12}
      lg={12}
      xl={12}
    >
      <Typography sx={{ marginTop: '64px' }}></Typography>
      <CCMultilineTextArea
        // aria-label="minimum height"
        label={'Implementation of sampling plan'}
        placeholder="Process of Implementation of sampling plan, if applicable"
        name={'implementation_of_sampling_plan'}
        value={D3.implementation_of_sampling_plan}
        onChange={({ target: { name, value } }) =>
          dispatch(setD3({ name, value }))
        }
      />
    </Grid>
  )
}

export default SectionD3
