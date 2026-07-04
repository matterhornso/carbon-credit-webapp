import { Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import CCButton from '../../../atoms/CCButton'
import CCInputField from '../../../atoms/CCInputField'
import { dataCollectionCalls } from '../../../api/dataCollectionCalls'

import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { setA2 } from '../../../redux/Slices/sectionASlice'
import CCDropAndUpload from '../../../atoms/CCDropAndUpload/CCDropAndUpload'
import { deleteIndexInArray } from '../../../utils/commonFunctions'
import Spinner from '../../../atoms/Spinner'
import HelpPopUp from '../../Appbar/NavBar/Help/HelpPopUp'
import { IssuanceHelpContentData } from '../../Appbar/NavBar/Help/SectionA/helpContentData'
import { setShowPopUp } from '../../../redux/Slices/issuanceDataCollection'

const SectionA2 = () => {
  const dispatch = useAppDispatch()

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
  const A2 = useAppSelector(({ sectionA }) => sectionA.A2)

  const { file_attach } = A2

  const loading = useAppSelector(
    ({ newProject }) => newProject.loading,
    shallowEqual
  )

  useEffect(() => {
    if (
      currentProjectDetails &&
      currentProjectDetails.section_a.step2.completed
    ) {
      const {
        country,
        state,
        city,
        pincode,
        landmark,
        file_attach,
        geographic_coordinates,
        aerial_photo,
      } = currentProjectDetails.section_a.step2

      dispatch(setA2({ name: 'city', value: city }))
      dispatch(setA2({ name: 'country', value: country }))
      dispatch(setA2({ name: 'state', value: state }))
      dispatch(setA2({ name: 'pincode', value: pincode }))
      dispatch(setA2({ name: 'landmark', value: landmark }))
      dispatch(
        setA2({ name: 'geographic_coordinates', value: geographic_coordinates })
      )
      dispatch(setA2({ name: 'aerial_photo', value: aerial_photo }))
      dispatch(setA2({ name: 'file_attach', value: file_attach }))
    }
  }, [currentProjectDetails])

  return loading === true ? (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 450 }}>
      <Spinner />
    </Stack>
  ) : (
    <Grid
      container
      className="issuance_data_section_scroll"
      sx={{ width: '100%', mt: 2 }}
      columnSpacing={{ xs: 0, md: 1 }}
      rowSpacing={1}
      xs={12}
      md={12}
      lg={12}
      xl={12}
    >
      <Grid
        container
        sx={{ width: '100%' }}
        columnSpacing={{ xs: 0, md: 1 }}
        rowSpacing={2}
        xs={12}
        md={12}
        lg={12}
        xl={12}
      >
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <Typography>Location of the project activity</Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={6} xl={6}>
          <CCInputField
            label=" Country"
            style={{ backgroundColor: ' #FFFFFF', border: '1px solid white' }}
            value={A2.country}
            name={'country'}
            onChange={({ target: { name, value } }) =>
              dispatch(setA2({ name, value }))
            }
          />
        </Grid>
        <Grid item xs={12} md={12} lg={6} xl={6}>
          <CCInputField
            label=" Region/ State/ Province"
            sx={{ backgroundColor: ' #FFFFFF' }}
            value={A2.state}
            name={'state'}
            onChange={({ target: { name, value } }) =>
              dispatch(setA2({ name, value }))
            }
          />
        </Grid>
        <Grid item xs={12} md={12} lg={6} xl={6}>
          <CCInputField
            label="City/Town/District"
            sx={{ backgroundColor: ' #FFFFFF' }}
            value={A2.city}
            name={'city'}
            onChange={({ target: { name, value } }) =>
              dispatch(setA2({ name, value }))
            }
          />
        </Grid>
        <Grid item xs={12} md={12} lg={6} xl={6}>
          <CCInputField
            label="Landmark"
            sx={{ backgroundColor: ' #FFFFFF' }}
            value={A2.landmark}
            name={'landmark'}
            onChange={({ target: { name, value } }) =>
              dispatch(setA2({ name, value }))
            }
          />
        </Grid>
      </Grid>
      <Grid
        sx={{ mt: 1 }}
        container
        alignItems={'center'}
        spacing={1}
        xs={12}
        md={12}
        lg={12}
        xl={12}
      >
        <Grid item xs={12} md={12} lg={6} xl={6}>
          <CCInputField
            label="Pincode"
            type="number"
            sx={{ backgroundColor: ' #FFFFFF' }}
            value={A2.pincode}
            name={'pincode'}
            onChange={({ target: { value, name } }) =>
              dispatch(setA2({ value, name }))
            }
          />
        </Grid>
        <Grid item xs={12} md={12} lg={6} xl={6}>
          <CCInputField
            label="Geographic coordinates"
            sx={{ backgroundColor: ' #FFFFFF' }}
            value={A2.geographic_coordinates}
            name={'geographic_coordinates'}
            onChange={({ target: { value, name } }) =>
              dispatch(setA2({ value, name }))
            }
          />
        </Grid>
        <Grid item xs={12} md={12} lg={6} xl={6}>
          <CCInputField
            label="Link to an aerial photo of the location"
            sx={{ backgroundColor: ' #FFFFFF' }}
            value={A2.aerial_photo}
            name={'aerial_photo'}
            onChange={({ target: { value, name } }) =>
              dispatch(setA2({ value, name }))
            }
          />
        </Grid>
      </Grid>
      <Grid item sx={{ mt: 1 }} xs={12}>
        <CCDropAndUpload
          mediaTitle={['Sample Report - Implementation of Milestones']}
          title={'Upload location map images'}
          mediaItem={[]}
          imageArray={A2.file_attach}
          onImageUpload={(item: any) => {
            dispatch(
              // setA2({ name: 'file_attach', value: [...file_attach, ...item] })
              setA2({ name: 'file_attach', value: item })
            )
          }}
          onDeleteImage={(index: number) => {
            dispatch(
              setA2({
                name: 'file_attach',
                value: deleteIndexInArray(file_attach, index),
              })
            )
          }}
          required={true}
        />
      </Grid>
      <HelpPopUp
        modal={modal}
        setModal={(item: any) => setModal(item)}
        data={IssuanceHelpContentData?.A2}
        issuanceVisible={true}
      />
    </Grid>
  )
}

export default SectionA2
