import { Grid, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import CCDropAndUpload from '../../../atoms/CCDropAndUpload/CCDropAndUpload'
import SectionE1GHGEmissionBaseline from '../../../assets/Images/SampleData/SectionE1GHGEmissionBaseline.png'
import { setE1 } from '../../../redux/Slices/sectionESlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { deleteIndexInArray } from '../../../utils/commonFunctions'
import Spinner from '../../../atoms/Spinner'
import { setShowPopUp } from '../../../redux/Slices/issuanceDataCollection'
import HelpPopUp from '../../Appbar/NavBar/Help/HelpPopUp'
import { IssuanceHelpContentData } from '../../Appbar/NavBar/Help/SectionA/helpContentData'
import { Box } from '@mui/system'

const SectionE1 = () => {
  const dispatch = useAppDispatch()

  const E1 = useAppSelector(({ sectionE }) => sectionE.E1)
  const { attach_relevant_docs } = E1
  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )
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
      currentProjectDetails.section_e.step1.completed
    ) {
      const {
        calculation_of_baselineEmissions_or_net_GHG,
        attach_relevant_docs,
      } = currentProjectDetails.section_e.step1

      dispatch(
        setE1({
          name: 'calculation_of_baselineEmissions_or_net_GHG',
          value: calculation_of_baselineEmissions_or_net_GHG,
        })
      )
      dispatch(
        setE1({ name: 'attach_relevant_docs', value: attach_relevant_docs })
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
        <Grid item xs={12}>
          <CCMultilineTextArea
            label="Calculation of baseline emissions or net GHG removals by sinks"
            placeholder="Calculation of baseline emissions or  net GHG removals by sinks, if any"
            value={E1.calculation_of_baselineEmissions_or_net_GHG}
            name={'calculation_of_baselineEmissions_or_net_GHG'}
            onChange={({ target: { value, name } }) =>
              dispatch(setE1({ name, value }))
            }
            required={false}
          />
        </Grid>
        <Grid item xs={12}>
          <CCDropAndUpload
            title={'Attach relevant datas & docs'}
            mediaTitle={[
              'Sample Report - GHG Emission baseline from renewable energy generation',
            ]}
            mediaItem={[SectionE1GHGEmissionBaseline]}
            imageArray={E1.attach_relevant_docs}
            onImageUpload={(item: any) => {
              dispatch(
                setE1({
                  name: 'attach_relevant_docs',
                  value: item,
                })
              )
            }}
            onDeleteImage={(index: number) => {
              dispatch(
                setE1({
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
          data={IssuanceHelpContentData?.E1}
          issuanceVisible={true}
        />
      </Grid>
    </Box>
  )
}

export default SectionE1
