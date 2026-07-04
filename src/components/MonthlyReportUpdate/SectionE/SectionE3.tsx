import { Grid, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import CCDropAndUpload from '../../../atoms/CCDropAndUpload/CCDropAndUpload'
import SectionE4CalculationSummaryOfEmissionReductions from '../../../assets/Images/SampleData/SectionE4CalculationSummaryOfEmissionReductions.png'
import { useAppSelector, useAppDispatch } from '../../../hooks/reduxHooks'
import { setE3 } from '../../../redux/Slices/MonthlyReport/sectionEMonthly'
import { deleteIndexInArray } from '../../../utils/commonFunctions'
import { shallowEqual } from 'react-redux'
import Spinner from '../../../atoms/Spinner'

const SectionE3 = () => {
  const dispatch = useAppDispatch()

  const E3 = useAppSelector(({ sectionEMonthly }) => sectionEMonthly.E3)
  const { attach_relevant_docs } = E3
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
      currentProjectDetails.section_e.step3.completed
    ) {
      const { calculation_of_leakage, attach_relevant_docs } =
        currentProjectDetails.section_e.step3

      dispatch(
        setE3({ name: 'calculation_of_leakage', value: calculation_of_leakage })
      )
      dispatch(
        setE3({ name: 'attach_relevant_docs', value: attach_relevant_docs })
      )
    }
  }, [currentProjectDetails])

  return loading === true ? (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 450 }}>
      <Spinner />
    </Stack>
  ) : (
    <Grid container sx={{ mt: 3 }}>
      <Grid item sm={12}>
        <CCMultilineTextArea
          label="Calculation of leakage"
          placeholder="Calculation of leakage emissions, if any"
          value={E3.calculation_of_leakage}
          name={'calculation_of_leakage'}
          onChange={({ target: { value, name } }) =>
            dispatch(setE3({ name, value }))
          }
        />
      </Grid>
      <Grid item xs={12}>
        <CCDropAndUpload
          title="Attach relevant datas & docs"
          mediaTitle={[
            'Sample Report - Calculation summary of emission reductions',
          ]}
          mediaItem={[SectionE4CalculationSummaryOfEmissionReductions]}
          imageArray={E3.attach_relevant_docs}
          onImageUpload={(item: any) => {
            dispatch(
              setE3({
                name: 'attach_relevant_docs',
                value: [...attach_relevant_docs, item],
              })
            )
          }}
          onDeleteImage={(index: number) => {
            dispatch(
              setE3({
                name: 'attach_relevant_docs',
                value: deleteIndexInArray(attach_relevant_docs, index),
              })
            )
          }}
        />
      </Grid>
    </Grid>
  )
}

export default SectionE3
