// React Imports
import React, { useState, useEffect } from 'react'

// MUI Imports
import { Grid, Stack } from '@mui/material'
import { Box } from '@mui/system'

// Local Imports
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import Spinner from '../../../atoms/Spinner'

// Redux Imports
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { setA6 } from '../../../redux/Slices/sectionASlice'

// Functional Imports
import { setShowPopUp } from '../../../redux/Slices/issuanceDataCollection'
import HelpPopUp from '../../Appbar/NavBar/Help/HelpPopUp'
import { IssuanceHelpContentData } from '../../Appbar/NavBar/Help/SectionA/helpContentData'

const SectionA6 = () => {
  const dispatch = useAppDispatch()

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

  const A6 = useAppSelector(({ sectionA }) => sectionA.A6, shallowEqual)

  const {
    statutory_requirements,
    negative_environmental_and_socio_economic_impacts,
    consultation,
    environmental_impact_assessment,
    risk_assessment,
    additional_information,
  } = A6

  useEffect(() => {
    if (
      currentProjectDetails &&
      currentProjectDetails.section_a.step6.completed
    ) {
      const {
        statutory_requirements,
        negative_environmental_and_socio_economic_impacts,
        consultation,
        environmental_impact_assessment,
        risk_assessment,
        additional_information,
      } = currentProjectDetails.section_a.step6

      dispatch(
        setA6({ name: 'statutory_requirements', value: statutory_requirements })
      )
      dispatch(
        setA6({
          name: 'negative_environmental_and_socio_economic_impacts',
          value: negative_environmental_and_socio_economic_impacts,
        })
      )
      dispatch(
        setA6({
          name: 'consultation',
          value: consultation,
        })
      )
      dispatch(
        setA6({
          name: 'environmental_impact_assessment',
          value: environmental_impact_assessment,
        })
      )
      dispatch(
        setA6({
          name: 'risk_assessment',
          value: risk_assessment,
        })
      )
      dispatch(
        setA6({
          name: 'additional_information',
          value: additional_information,
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
            label="Statutory Requirements"
            placeholder="Identify relevant local, regional, and national laws, statutes, and regulatory frameworks and demonstrate compliance."
            value={statutory_requirements}
            name={'statutory_requirements'}
            onChange={({ target: { value, name } }) =>
              dispatch(setA6({ name, value }))
            }
          />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Potential Negative Environmental and Socio-Economic Impacts"
            placeholder="Identify potential environmental and socio-economic impacts due to the implementation of the project and steps taken to mitigate them. "
            value={negative_environmental_and_socio_economic_impacts}
            name={'negative_environmental_and_socio_economic_impacts'}
            onChange={({ target: { name, value } }) =>
              dispatch(setA6({ value, name }))
            }
          />
        </Grid>

        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Consultation with Interested Parties and Communications"
            placeholder="Identify interested parties to the project and describe consultation conducted with them prior to validation. Include details on actions taken to appropriately engage interested parties and solicit comments (e.g., dates of announcements or meetings, periods during which input was sought) and documentation of outcomes, action taken due to comments, the process of continuous communication, relevant statutory requirements."
            value={consultation}
            name={'consultation'}
            onChange={({ target: { name, value } }) =>
              dispatch(setA6({ value, name }))
            }
          />
        </Grid>

        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Environmental Impact Assessment (EIA)"
            placeholder="Summarize any environmental impact assessments carried out concerning the project. Describe any measures and steps taken to meet the outcome of the assessment. (option to upload supporting document)"
            value={environmental_impact_assessment}
            name={'environmental_impact_assessment'}
            onChange={({ target: { name, value } }) =>
              dispatch(setA6({ value, name }))
            }
          />
        </Grid>

        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Risk assessment "
            placeholder="Identify risks that could substantially affect the project's GHG emissions mitigations. Describe any measures and steps taken due to risk assessment to mitigate risk"
            value={risk_assessment}
            name={'risk_assessment'}
            onChange={({ target: { name, value } }) =>
              dispatch(setA6({ value, name }))
            }
          />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Additional Information on Risk Management"
            placeholder="Additional information on measures, adverse effects on ecosystems or local communities, risk management processes, and methods."
            value={additional_information}
            name={'additional_information'}
            onChange={({ target: { name, value } }) =>
              dispatch(setA6({ value, name }))
            }
          />
        </Grid>
      </Grid>
      <HelpPopUp
        modal={modal}
        setModal={(item: any) => setModal(item)}
        data={IssuanceHelpContentData?.B1}
        issuanceVisible={true}
      />
    </Box>
  )
}

export default SectionA6
