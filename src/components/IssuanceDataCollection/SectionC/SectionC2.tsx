// React Imports
import React, { useEffect } from 'react'

// MUI Imports
import { Grid, Stack } from '@mui/material'
import { Box } from '@mui/system'

// Asset Imports
import SectionC2IdentificationOfRelavantSSRs from '../../../assets/Images/SampleData/SectionC2IdentificationOfRelavantSSRs.png'

// Local Components
import CCDropAndUpload from '../../../atoms/CCDropAndUpload/CCDropAndUpload'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { setC2 } from '../../../redux/Slices/sectionCSlice'
import { deleteIndexInArray } from '../../../utils/commonFunctions'
import Spinner from '../../../atoms/Spinner'
import HelpPopUp from '../../Appbar/NavBar/Help/HelpPopUp'
import { IssuanceHelpContentData } from '../../Appbar/NavBar/Help/SectionA/helpContentData'
import { setShowPopUp } from '../../../redux/Slices/issuanceDataCollection'

const SectionC2 = () => {
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

  const C2 = useAppSelector(({ sectionC }) => sectionC.C2, shallowEqual)
  const {
    baseline_emissions_upload,
    project_emissions_upload,
    leakage_upload,
    quantification_of_net_GHG_emission_upload,
  } = C2

  useEffect(() => {
    if (
      currentProjectDetails &&
      currentProjectDetails.section_c.step2.completed
    ) {
      const {
        criteria_and_procedures,
        baseline_emissions,
        baseline_emissions_upload,
        project_emissions,
        project_emissions_upload,
        leakage,
        leakage_upload,
        quantification_of_net_GHG_emission,
        quantification_of_net_GHG_emission_upload,
      } = currentProjectDetails.section_c.step2
      dispatch(
        setC2({
          name: 'criteria_and_procedures',
          value: criteria_and_procedures,
        })
      )
      dispatch(
        setC2({
          name: 'baseline_emissions',
          value: baseline_emissions,
        })
      )
      dispatch(
        setC2({
          name: 'baseline_emissions_upload',
          value: baseline_emissions_upload,
        })
      )
      dispatch(
        setC2({
          name: 'project_emissions',
          value: project_emissions,
        })
      )
      dispatch(
        setC2({
          name: 'project_emissions_upload',
          value: project_emissions_upload,
        })
      )
      dispatch(
        setC2({
          name: 'leakage',
          value: leakage,
        })
      )
      dispatch(
        setC2({
          name: 'leakage_upload',
          value: leakage_upload,
        })
      )
      dispatch(
        setC2({
          name: 'quantification_of_net_GHG_emission',
          value: quantification_of_net_GHG_emission,
        })
      )
      dispatch(
        setC2({
          name: 'quantification_of_net_GHG_emission_upload',
          value: quantification_of_net_GHG_emission_upload,
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
            label="Criteria and Procedures for Quantification"
            placeholder="Please describe the criteria and procedures, including relevant equations, for quantifying GHG emissions and/or removals for selected GHG SSRs. Based on applied criteria, procedures, or methodologies for baseline emissions, project emissions, and leakage. The project proponent shall quantify GHG emissions and/or removals separately for 
						1: each relevant GHG for each GHG SSR relevant to the project and 
						2: each GHG SSR relevant to the baseline scenario."
            value={C2.criteria_and_procedures}
            name="criteria_and_procedures"
            onChange={({ target: { value, name } }) =>
              dispatch(setC2({ value, name }))
            }
          />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Baseline emissions"
            placeholder="Please provide Baseline emissions calculations"
            value={C2.baseline_emissions}
            name="baseline_emissions"
            onChange={({ target: { value, name } }) =>
              dispatch(setC2({ value, name }))
            }
          />
        </Grid>
        <Grid item sx={{}} xs={12}>
          <CCDropAndUpload
            mediaTitle={[]}
            title="Baseline emissions"
            mediaItem={[]}
            imageArray={C2.baseline_emissions_upload}
            onImageUpload={(item: any) => {
              dispatch(
                setC2({
                  name: 'baseline_emissions_upload',
                  value: item,
                })
              )
            }}
            onDeleteImage={(index: number) => {
              dispatch(
                setC2({
                  name: 'baseline_emissions_upload',
                  value: deleteIndexInArray(baseline_emissions_upload, index),
                })
              )
            }}
            required
          />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Project emissions"
            placeholder="Please provide Project emissions calculations"
            value={C2.project_emissions}
            name="project_emissions"
            onChange={({ target: { value, name } }) =>
              dispatch(setC2({ value, name }))
            }
          />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCDropAndUpload
            mediaTitle={[]}
            title="Project emissions"
            mediaItem={[]}
            imageArray={C2.project_emissions_upload}
            onImageUpload={(item: any) => {
              dispatch(
                setC2({
                  name: 'project_emissions_upload',
                  value: item,
                })
              )
            }}
            onDeleteImage={(index: number) => {
              dispatch(
                setC2({
                  name: 'project_emissions_upload',
                  value: deleteIndexInArray(project_emissions_upload, index),
                })
              )
            }}
            required
          />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Leakage"
            placeholder="Please provide leakage emissions calculations"
            value={C2.leakage}
            name="leakage"
            onChange={({ target: { value, name } }) =>
              dispatch(setC2({ value, name }))
            }
          />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCDropAndUpload
            mediaTitle={[]}
            title="Leakage"
            mediaItem={[]}
            imageArray={C2.leakage_upload}
            onImageUpload={(item: any) => {
              dispatch(
                setC2({
                  name: 'leakage_upload',
                  value: item,
                })
              )
            }}
            onDeleteImage={(index: number) => {
              dispatch(
                setC2({
                  name: 'leakage_upload',
                  value: deleteIndexInArray(leakage_upload, index),
                })
              )
            }}
            required
          />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Quantification of Net-GHG Emissions and/or Removals"
            placeholder="Please describe criteria, procedures, or methodologies for quantifying net GHG emissions and/or Removals, including relevant equations and parameters monitored."
            value={C2.quantification_of_net_GHG_emission}
            name="quantification_of_net_GHG_emission"
            onChange={({ target: { value, name } }) =>
              dispatch(setC2({ value, name }))
            }
          />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCDropAndUpload
            mediaTitle={[]}
            title="Quantification of Net-GHG Emissions and/or Removals"
            mediaItem={[SectionC2IdentificationOfRelavantSSRs]}
            imageArray={C2.quantification_of_net_GHG_emission_upload}
            onImageUpload={(item: any) => {
              dispatch(
                setC2({
                  name: 'quantification_of_net_GHG_emission_upload',
                  value: item,
                })
              )
            }}
            onDeleteImage={(index: number) => {
              dispatch(
                setC2({
                  name: 'quantification_of_net_GHG_emission_upload',
                  value: deleteIndexInArray(
                    quantification_of_net_GHG_emission_upload,
                    index
                  ),
                })
              )
            }}
            required
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
export default SectionC2
