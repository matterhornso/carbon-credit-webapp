import { Grid, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import CCDropAndUpload from '../../../atoms/CCDropAndUpload/CCDropAndUpload'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import SectionE7ActualReductionInFirstEmission from '../../../assets/Images/SampleData/SectionE7ActualReductionInFirstEmission.png'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { setE7 } from '../../../redux/Slices/MonthlyReport/sectionEMonthly'
import { deleteIndexInArray } from '../../../utils/commonFunctions'
import { shallowEqual } from 'react-redux'
import Spinner from '../../../atoms/Spinner'

const SectionE7 = () => {
  const dispatch = useAppDispatch()

  const E7 = useAppSelector(({ sectionEMonthly }) => sectionEMonthly.E7)
  const { attach_relevant_docs } = E7

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
      currentProjectDetails.section_e.step7.completed
    ) {
      const { actual_emission_reductions, attach_relevant_docs } =
        currentProjectDetails.section_e.step7

      dispatch(
        setE7({
          name: 'actual_emission_reductions',
          value: actual_emission_reductions,
        })
      )
      dispatch(
        setE7({ name: 'attach_relevant_docs', value: attach_relevant_docs })
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
          label="Actual emission reductions or net anthropogenic GHG removals during 1st commitment period"
          placeholder="Actual emission reductions or net anthropogenic GHG removals during 1st commitment period, if any"
          value={E7.actual_emission_reductions}
          name={'actual_emission_reductions'}
          onChange={({ target: { value, name } }) =>
            dispatch(setE7({ name, value }))
          }
        />
      </Grid>
      <Grid item xs={12}>
        <CCDropAndUpload
          title={'Attach relevant datas & docs'}
          mediaTitle={[
            'Sample Report - Actual emission reductions in 1st commitment period',
          ]}
          mediaItem={[SectionE7ActualReductionInFirstEmission]}
          imageArray={E7.attach_relevant_docs}
          onImageUpload={(item: any) => {
            dispatch(
              setE7({
                name: 'attach_relevant_docs',
                value: [...attach_relevant_docs, item],
              })
            )
          }}
          onDeleteImage={(index: number) => {
            dispatch(
              setE7({
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

export default SectionE7
