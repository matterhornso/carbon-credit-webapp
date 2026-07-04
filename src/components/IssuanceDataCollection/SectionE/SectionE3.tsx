import { Grid, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import CCDropAndUpload from '../../../atoms/CCDropAndUpload/CCDropAndUpload'
import SectionE4CalculationSummaryOfEmissionReductions from '../../../assets/Images/SampleData/SectionE4CalculationSummaryOfEmissionReductions.png'
import { useAppSelector, useAppDispatch } from '../../../hooks/reduxHooks'
import { setE3 } from '../../../redux/Slices/sectionESlice'
import { deleteIndexInArray } from '../../../utils/commonFunctions'
import { shallowEqual } from 'react-redux'
import Spinner from '../../../atoms/Spinner'
import { setShowPopUp } from '../../../redux/Slices/issuanceDataCollection'
import HelpPopUp from '../../Appbar/NavBar/Help/HelpPopUp'
import { IssuanceHelpContentData } from '../../Appbar/NavBar/Help/SectionA/helpContentData'
import { Box } from '@mui/system'

const SectionE3 = () => {
  const dispatch = useAppDispatch()

  const E3 = useAppSelector(({ sectionE }) => sectionE.E3)
  const { attach_relevant_docs } = E3
  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )

  const loading = useAppSelector(
    ({ newProject }) => newProject.loading,
    shallowEqual
  )

  const modal = useAppSelector(
    ({ issuanceDataCollection }) => issuanceDataCollection.showPopUp
  )
  const setModal = (item: any) => {
    dispatch(setShowPopUp(item))
  }
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
    <Box className="issuance_data_section_scroll">
      <Grid container sx={{ mt: 4 }}>
        <Grid item sm={12}>
          <CCMultilineTextArea
            label="Calculation of leakage"
            placeholder="Calculation of leakage emissions, if any"
            value={E3.calculation_of_leakage}
            name={'calculation_of_leakage'}
            onChange={({ target: { value, name } }) =>
              dispatch(setE3({ name, value }))
            }
            required={false}
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
                  value: item,
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
        <HelpPopUp
          modal={modal}
          setModal={(item: any) => setModal(item)}
          data={IssuanceHelpContentData?.E3}
          issuanceVisible={true}
        />
      </Grid>
    </Box>
  )
}

export default SectionE3
