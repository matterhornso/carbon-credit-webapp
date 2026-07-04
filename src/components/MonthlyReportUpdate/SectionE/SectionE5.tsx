import { Grid, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import CCDropAndUpload from '../../../atoms/CCDropAndUpload/CCDropAndUpload'
import SectionE5ComparisonOfActualEmissionReductions from '../../../assets/Images/SampleData/SectionE5ComparisonOfActualEmissionReductions.png'
import { setE5 } from '../../../redux/Slices/MonthlyReport/sectionEMonthly'
import { useAppSelector, useAppDispatch } from '../../../hooks/reduxHooks'
import { deleteIndexInArray } from '../../../utils/commonFunctions'
import { shallowEqual } from 'react-redux'
import Spinner from '../../../atoms/Spinner'

const SectionE5 = () => {
  const dispatch = useAppDispatch()

  const E5 = useAppSelector(({ sectionEMonthly }) => sectionEMonthly.E5)
  const { attach_relevant_docs } = E5
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
      currentProjectDetails.section_e.step5.completed
    ) {
      const { comparison_of_actual_emission_reduction, attach_relevant_docs } =
        currentProjectDetails.section_e.step5

      dispatch(
        setE5({
          name: 'comparison_of_actual_emission_reduction',
          value: comparison_of_actual_emission_reduction,
        })
      )
      dispatch(
        setE5({ name: 'attach_relevant_docs', value: attach_relevant_docs })
      )
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
          label="Comparison of actual emission reductions or net anthropogenic GHG removals by sinks with estimates in registered PDD"
          placeholder="Comparison of actual emission reductions or net anthropogenic GHG removals by sinks with estimates in registered PDD, if any"
          value={E5.comparison_of_actual_emission_reduction}
          name={'comparison_of_actual_emission_reduction'}
          onChange={({ target: { value, name } }) =>
            dispatch(setE5({ name, value }))
          }
        />
      </Grid>
      <Grid item xs={12}>
        <CCDropAndUpload
          title={'Attach relevant datas & docs'}
          mediaTitle={[
            'Sample Report - Comparison of actual emission reductions',
          ]}
          mediaItem={[SectionE5ComparisonOfActualEmissionReductions]}
          imageArray={E5.attach_relevant_docs}
          onImageUpload={(item: any) => {
            dispatch(
              setE5({
                name: 'attach_relevant_docs',
                value: [...attach_relevant_docs, item],
              })
            )
          }}
          onDeleteImage={(index: number) => {
            dispatch(
              setE5({
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

export default SectionE5
