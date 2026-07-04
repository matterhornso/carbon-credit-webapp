// React Imports
import React, { useState, useEffect } from 'react'

// MUI Imports
import { Box, Grid, Stack, TextareaAutosize, Typography } from '@mui/material'

// Redux Imports
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { setB3 } from '../../../redux/Slices/sectionBSlice'

// Local Components
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import Spinner from '../../../atoms/Spinner'
import { setShowPopUp } from '../../../redux/Slices/issuanceDataCollection'
import HelpPopUp from '../../Appbar/NavBar/Help/HelpPopUp'
import { IssuanceHelpContentData } from '../../Appbar/NavBar/Help/SectionA/helpContentData'
import CCDropAndUpload from '../../../atoms/CCDropAndUpload/CCDropAndUpload'
import { deleteIndexInArray } from '../../../utils/commonFunctions'

const SectionB3 = () => {
  const dispatch = useAppDispatch()

  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )
  const B3 = useAppSelector(({ sectionB }) => sectionB.B3, shallowEqual)

  const { ownership_file_attach } = B3

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
      currentProjectDetails.section_b.step3.completed
    ) {
      const {
        project_boundary,
        eligibility,
        funding,
        ownership,
        ownership_file_attach,
        other_certifications,
        participation_under_GHG_programs,
        other_benefits,
      } = currentProjectDetails.section_b.step3

      dispatch(
        setB3({
          name: 'project_boundary',
          value: project_boundary,
        })
      )
      dispatch(
        setB3({
          name: 'eligibility',
          value: eligibility,
        })
      )
      dispatch(
        setB3({
          name: 'funding',
          value: funding,
        })
      )
      dispatch(
        setB3({
          name: 'ownership',
          value: ownership,
        })
      )
      dispatch(
        setB3({
          name: 'ownership_file_attach',
          value: ownership_file_attach,
        })
      )
      dispatch(
        setB3({
          name: 'other_certifications',
          value: other_certifications,
        })
      )
      dispatch(
        setB3({
          name: 'participation_under_GHG_programs',
          value: participation_under_GHG_programs,
        })
      )
      dispatch(
        setB3({
          name: 'other_benefits',
          value: other_benefits,
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
            label="Project Boundary"
            placeholder="Provide criteria and procedures for identifying and assessing GHG SSRs controlled, related to, or affected by the project. Define the project's boundary, including the physical delineation of the project and which sources and GHGs are included. List GPS coordinates for each GHG SSRs as applicable for identification"
            value={B3.project_boundary}
            name="project_boundary"
            onChange={({ target: { value, name } }) => {
              console.log(value, name), dispatch(setB3({ value, name }))
            }}
          />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Eligibility"
            placeholder="Describe and argue how the project meets eligibility criteria and the ICR program in general."
            value={B3.eligibility}
            name="eligibility"
            onChange={({ target: { value, name } }) =>
              dispatch(setB3({ value, name }))
            }
          />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Funding"
            placeholder="Public funding received, if any, provide information on the sources of the public financing. Provide a summary of funding of the project and supplement information for fulfillment in an Appendix."
            value={B3.funding}
            name="funding"
            onChange={({ target: { value, name } }) =>
              dispatch(setB3({ value, name }))
            }
          />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Ownership"
            placeholder="Evidence of ownership of the project and any IP utilization/ownership in relation to the project activities."
            value={B3.ownership}
            name="ownership"
            onChange={({ target: { value, name } }) =>
              dispatch(setB3({ value, name }))
            }
          />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCDropAndUpload
            mediaTitle={[]}
            title="Ownership"
            mediaItem={[]}
            imageArray={B3.ownership_file_attach}
            onImageUpload={(item: any) => {
              dispatch(
                setB3({
                  name: 'ownership_file_attach',
                  value: item,
                })
              )
            }}
            onDeleteImage={(index: number) => {
              dispatch(
                setB3({
                  name: 'ownership_file_attach',
                  value: deleteIndexInArray(ownership_file_attach, index),
                })
              )
            }}
            required={true}
          />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Other Certifications"
            placeholder="Provide information if another form of GHG-related environmental credit has been received or applied for. Include all relevant information about the GHG-related environmental credit and the related program."
            value={B3.other_certifications}
            name="other_certifications"
            onChange={({ target: { value, name } }) =>
              dispatch(setB3({ value, name }))
            }
          />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Participation under Other GHG Programs"
            placeholder="Provide information on whether the project has been registered or is seeking registration under other GHG programs. If the project has been registered under any other GHG program, provide the registration number and details. If any other GHG programs have rejected the project, provide relevant information, including the reason(s) for rejection and justification of eligibility hereunder."
            value={B3.participation_under_GHG_programs}
            name="participation_under_GHG_programs"
            onChange={({ target: { value, name } }) =>
              dispatch(setB3({ value, name }))
            }
          />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Other Benefits"
            placeholder="Provide information on whether the project has been registered or is seeking registration under other GHG programs. If the project has been registered under any other GHG program, provide the registration number and details. If any other GHG programs have rejected the project, provide relevant information, including the reason(s) for rejection and justification of eligibility hereunder."
            value={B3.other_benefits}
            name="other_benefits"
            onChange={({ target: { value, name } }) =>
              dispatch(setB3({ value, name }))
            }
          />
        </Grid>
      </Grid>
      <HelpPopUp
        modal={modal}
        setModal={(item: any) => setModal(item)}
        data={IssuanceHelpContentData?.B2}
        issuanceVisible={true}
      />
    </Box>
  )
}

export default SectionB3
