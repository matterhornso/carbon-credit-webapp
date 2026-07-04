// React Imports
import React, { useEffect } from 'react'

// MUI Imports
import { Grid, Stack } from '@mui/material'
import { Box } from '@mui/system'

// Asset Imports
import SectionCOrganisationalStructure from '../../../assets/Images/SampleData/SectionCOrganisationalStructure.png'

// Local Components
import CCDropAndUpload from '../../../atoms/CCDropAndUpload/CCDropAndUpload'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { setE8 } from '../../../redux/Slices/sectionESlice'
import { deleteIndexInArray } from '../../../utils/commonFunctions'
import Spinner from '../../../atoms/Spinner'
import HelpPopUp from '../../Appbar/NavBar/Help/HelpPopUp'
import { IssuanceHelpContentData } from '../../Appbar/NavBar/Help/SectionA/helpContentData'
import { setShowPopUp } from '../../../redux/Slices/issuanceDataCollection'

const SectionE8 = () => {
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

  const loading = useAppSelector(
    ({ newProject }) => newProject.loading,
    shallowEqual
  )

  const E8 = useAppSelector(({ sectionE }) => sectionE.E8, shallowEqual)
  const { appendices_supporting_documents_upload } = E8

  useEffect(() => {
    if (
      currentProjectDetails &&
      currentProjectDetails?.section_e?.step8?.completed
    ) {
      const {
        appendices_supporting_documents,
        appendices_supporting_documents_upload,
      } = currentProjectDetails.section_e.step8
      dispatch(
        setE8({
          name: 'appendices_supporting_documents',
          value: appendices_supporting_documents,
        })
      )
      dispatch(
        setE8({
          name: 'appendices_supporting_documents_upload',
          value: appendices_supporting_documents_upload,
        })
      )
    }
  }, [currentProjectDetails])

  return loading === true ? (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 450 }}>
      <Spinner />
    </Stack>
  ) : (
    <Box className="issuance_data_section_scroll">
      <Grid container sx={{ mt: 2 }} spacing={1}>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Use appendices for supporting information and add any additional documents"
            placeholder="Use appendices for supporting information and add any additional documents"
            value={E8.appendices_supporting_documents}
            name="appendices_supporting_documents"
            onChange={({ target: { value, name } }) =>
              dispatch(setE8({ value, name }))
            }
            required={false}
          />
        </Grid>
        <Grid item xs={12}>
          <CCDropAndUpload
            mediaTitle={[]}
            title="Use appendices for supporting information and add any additional documents"
            mediaItem={[]}
            imageArray={appendices_supporting_documents_upload}
            onImageUpload={(item: any) => {
              dispatch(
                setE8({
                  name: 'appendices_supporting_documents_upload',
                  value: item,
                })
              )
            }}
            onDeleteImage={(index: number) => {
              dispatch(
                setE8({
                  name: 'appendices_supporting_documents_upload',
                  value: deleteIndexInArray(
                    appendices_supporting_documents_upload,
                    index
                  ),
                })
              )
            }}
          />
        </Grid>
      </Grid>
      <HelpPopUp
        modal={modal}
        setModal={(item: any) => setModal(item)}
        data={IssuanceHelpContentData?.C1}
        issuanceVisible={true}
      />
    </Box>
  )
}
export default SectionE8
