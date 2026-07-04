import { Grid, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import CCDropAndUpload from '../../../atoms/CCDropAndUpload/CCDropAndUpload'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import SectionE4CalculationSummaryOfEmissionReductions from '../../../assets/Images/SampleData/SectionE4CalculationSummaryOfEmissionReductions.png'
import { setE4 } from '../../../redux/Slices/MonthlyReport/sectionEMonthly'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { deleteIndexInArray } from '../../../utils/commonFunctions'
import { shallowEqual } from 'react-redux'
import Spinner from '../../../atoms/Spinner'
const SectionE4 = () => {
  const dispatch = useAppDispatch()

  const E4 = useAppSelector(({ sectionEMonthly }) => sectionEMonthly.E4)
  const { attach_relevant_docs } = E4

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
      currentProjectDetails.section_e.step4.completed
    ) {
      const { calculation_of_emissions_reduction, attach_relevant_docs } =
        currentProjectDetails.section_e.step4

      dispatch(
        setE4({
          name: 'calculation_of_emissions_reduction',
          value: calculation_of_emissions_reduction,
        })
      )
      dispatch(setE4(attach_relevant_docs))
    }
  }, [currentProjectDetails])

  return loading === true ? (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 450 }}>
      <Spinner />
    </Stack>
  ) : (
    <Grid container sx={{ mt: 3 }}>
      <Grid item xs={12}>
        <CCMultilineTextArea
          label={
            'Summary of calculation of emission reductions or net anthropogenic GHG removals by sinks'
          }
          placeholder="Summary of calculation of emission reductions or net anthropogenic GHG removals by sinks, if any"
          value={E4.calculation_of_emissions_reduction}
          name={'calculation_of_emissions_reduction'}
          onChange={({ target: { value, name } }) =>
            dispatch(setE4({ name, value }))
          }
        />
      </Grid>
      <Grid item xs={12}>
        <CCDropAndUpload
          title={'Attach relevant datas & docs'}
          mediaTitle={[
            'Sample Report - Calculation summary of emission reductions',
          ]}
          mediaItem={[SectionE4CalculationSummaryOfEmissionReductions]}
          imageArray={E4.attach_relevant_docs}
          onImageUpload={(item: any) => {
            dispatch(
              setE4({
                name: 'attach_relevant_docs',
                value: [...attach_relevant_docs, item],
              })
            )
          }}
          onDeleteImage={(index: number) => {
            dispatch(
              setE4({
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

export default SectionE4
