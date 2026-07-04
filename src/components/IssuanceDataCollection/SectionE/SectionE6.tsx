import { Grid, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import CCDropAndUpload from '../../../atoms/CCDropAndUpload/CCDropAndUpload'
import { setE6 } from '../../../redux/Slices/sectionESlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { deleteIndexInArray } from '../../../utils/commonFunctions'
import { shallowEqual } from 'react-redux'
import Spinner from '../../../atoms/Spinner'
import { setShowPopUp } from '../../../redux/Slices/issuanceDataCollection'
import HelpPopUp from '../../Appbar/NavBar/Help/HelpPopUp'
import { IssuanceHelpContentData } from '../../Appbar/NavBar/Help/SectionA/helpContentData'
import { Box } from '@mui/system'

const SectionE6 = () => {
  const dispatch = useAppDispatch()

  const E6 = useAppSelector(({ sectionE }) => sectionE.E6)
  const { attach_relevant_docs } = E6

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
      currentProjectDetails.section_e.step6.completed
    ) {
      const { remark_on_difference_from_estimate_value, attach_relevant_docs } =
        currentProjectDetails.section_e.step6

      dispatch(
        setE6({
          name: 'remark_on_difference_from_estimate_value',
          value: remark_on_difference_from_estimate_value,
        })
      )
      dispatch(
        setE6({ name: 'attach_relevant_docs', value: attach_relevant_docs })
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
            label="Remarks on difference from estimated value"
            placeholder="Remarks on difference from estimated value, if any"
            value={E6.remark_on_difference_from_estimate_value}
            name={'remark_on_difference_from_estimate_value'}
            onChange={({ target: { value, name } }) =>
              dispatch(setE6({ name, value }))
            }
            required={false}
          />
        </Grid>
        <Grid item xs={12}>
          <CCDropAndUpload
            title="Attach relevant datas & docs"
            mediaItem={[]}
            mediaTitle={[]}
            imageArray={E6.attach_relevant_docs}
            onImageUpload={(item: any) => {
              dispatch(
                setE6({
                  name: 'attach_relevant_docs',
                  value: item,
                })
              )
            }}
            onDeleteImage={(index: number) => {
              dispatch(
                setE6({
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
          data={IssuanceHelpContentData?.E6}
          issuanceVisible={true}
        />
      </Grid>
    </Box>
  )
}

export default SectionE6
