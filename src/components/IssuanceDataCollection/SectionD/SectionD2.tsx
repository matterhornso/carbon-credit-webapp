import React, { FC, useEffect, useState } from 'react'
import {
  Box,
  Grid,
  TextareaAutosize,
  Typography,
  Input,
  Stack,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SampleModal from '../../../atoms/SampleModal/SampleModal'
import ImageComponent from '../../../atoms/ImageComponent/ImageComponent'
import { dataCollectionCalls } from '../../../api/dataCollectionCalls'
import CCButton from '../../../atoms/CCButton'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { setD2 } from '../../../redux/Slices/sectionDSlice'
import { deleteIndexInArray } from '../../../utils/commonFunctions'
import CCDropAndUpload from '../../../atoms/CCDropAndUpload/CCDropAndUpload'
import sampleD2 from '../../../assets/Images/sample-d2.png'
import sampleD3 from '../../../assets/Images/sample-d3.png'
import sampleD4 from '../../../assets/Images/sample-d4.png'
import Spinner from '../../../atoms/Spinner'
import HelpPopUp from '../../Appbar/NavBar/Help/HelpPopUp'
import { IssuanceHelpContentData } from '../../Appbar/NavBar/Help/SectionA/helpContentData'
import { setShowPopUp } from '../../../redux/Slices/issuanceDataCollection'

const SectionD2: FC = () => {
  const dispatch = useAppDispatch()

  const D2 = useAppSelector(({ sectionD }) => sectionD.D2, shallowEqual)

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
      currentProjectDetails.section_d.step2.completed
    ) {
      const { data_and_parameter_monitored_ExPost, attach_ex_ante_table } =
        currentProjectDetails.section_d.step2

      dispatch(
        setD2({
          name: 'data_and_parameter_monitored_ExPost',
          value: data_and_parameter_monitored_ExPost,
        })
      )
      dispatch(
        setD2({ name: 'attach_ex_ante_table', value: attach_ex_ante_table })
      )
    }
  }, [currentProjectDetails])

  const { attach_ex_ante_table } = D2

  return loading === true ? (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 450 }}>
      <Spinner />
    </Stack>
  ) : (
    <Box className="issuance_data_section_scroll">
      <Grid
        container
        sx={{ width: '100%', mt: 4 }}
        columnSpacing={{ xs: 0, md: 1 }}
        rowSpacing={1}
      >
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <CCMultilineTextArea
            // aria-label="minimum height"
            label={'Data and parameters monitored ex-post (actuals)'}
            placeholder="If data for this project is monitored and calculated based on an ex-post method, please explain."
            value={D2.data_and_parameter_monitored_ExPost}
            name={'data_and_parameter_monitored_ExPost'}
            onChange={({ target: { value, name } }) =>
              dispatch(setD2({ name, value }))
            }
            required={false}
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
            mediaTitle={[
              'Sample Report - Monitored ex - post',
              'Sample Report - Project emissions',
              'Sample Report - Leakage emissions',
            ]}
            mediaItem={[sampleD2, sampleD3, sampleD4]}
            title=" Attach datas & parameters fixed ex-ante table"
            imageArray={D2.attach_ex_ante_table}
            onImageUpload={(item: any) => {
              dispatch(
                setD2({
                  name: 'attach_ex_ante_table',
                  value: item,
                })
              )
            }}
            onDeleteImage={(index: number) => {
              dispatch(
                setD2({
                  name: 'attach_ex_ante_table',
                  value: deleteIndexInArray(attach_ex_ante_table, index),
                })
              )
            }}
          />
        </Grid>
        <HelpPopUp
          modal={modal}
          setModal={(item: any) => setModal(item)}
          data={IssuanceHelpContentData?.D2}
          issuanceVisible={true}
        />
      </Grid>
    </Box>
  )
}

export default SectionD2
