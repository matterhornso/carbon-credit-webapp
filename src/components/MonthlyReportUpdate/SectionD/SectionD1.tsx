import React, { FC, useEffect } from 'react'
import { Grid, Stack } from '@mui/material'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { setD1 } from '../../../redux/Slices/MonthlyReport/sectionDMonthly'
import { deleteIndexInArray } from '../../../utils/commonFunctions'
import CCDropAndUpload from '../../../atoms/CCDropAndUpload/CCDropAndUpload'
import sampleAnteTable from '../../../assets/Images/sample-d1.png'
import Spinner from '../../../atoms/Spinner'

const SectionD1: FC = () => {
  const dispatch = useAppDispatch()
  const D1 = useAppSelector(
    ({ sectionDMonthly }) => sectionDMonthly.D1,
    shallowEqual
  )
  const { attach_ex_ante_table } = D1

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
      currentProjectDetails.section_d.step1.completed
    ) {
      const { data_and_parameter_fixed_ExAnte, attach_ex_ante_table } =
        currentProjectDetails.section_d.step1

      dispatch(
        setD1({
          name: 'data_and_parameter_fixed_ExAnte',
          value: data_and_parameter_fixed_ExAnte,
        })
      )
      dispatch(
        setD1({ name: 'attach_ex_ante_table', value: attach_ex_ante_table })
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
      <Grid item sx={{ mt: 1 }} xs={12}>
        <CCMultilineTextArea
          // aria-label="minimum height"
          label=" Data and parameters fixed ex ante or at renewal of crediting period"
          placeholder="If data for this project is monitored and calculated based on an ex-ante method, please explain."
          value={D1.data_and_parameter_fixed_ExAnte}
          name={'data_and_parameter_fixed_ExAnte'}
          onChange={({ target: { value, name } }) =>
            dispatch(setD1({ name, value }))
          }
        />
      </Grid>

      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        xl={12}
        sx={{ mt: 1 }}
        justifyContent="center"
        alignItems={'center'}
        direction="column"
      >
        <CCDropAndUpload
          mediaTitle={['Check Sample Data']}
          mediaItem={[sampleAnteTable]}
          title="Attach datas & parameters fixed ex-ante table"
          imageArray={D1.attach_ex_ante_table}
          onImageUpload={(item: any) => {
            dispatch(
              setD1({
                name: 'attach_ex_ante_table',
                value: [...attach_ex_ante_table, item],
              })
            )
          }}
          onDeleteImage={(index: number) => {
            dispatch(
              setD1({
                name: 'attach_ex_ante_table',
                value: deleteIndexInArray(attach_ex_ante_table, index),
              })
            )
          }}
        />
      </Grid>
    </Grid>
  )
}

export default SectionD1
