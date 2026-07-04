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
import { setB1 } from '../../../redux/Slices/sectionBSlice'

// Functional Imports
import { setShowPopUp } from '../../../redux/Slices/issuanceDataCollection'
import HelpPopUp from '../../Appbar/NavBar/Help/HelpPopUp'
import { IssuanceHelpContentData } from '../../Appbar/NavBar/Help/SectionA/helpContentData'
import { setA7 } from '../../../redux/Slices/sectionASlice'

const SectionA7 = () => {
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

  const A7 = useAppSelector(({ sectionA }) => sectionA.A7)

  useEffect(() => {
    if (
      currentProjectDetails &&
      currentProjectDetails.section_a.step7.completed
    ) {
      const { Level1, Level2a, Level2b, Level3, Level4a, Level4b, Level5 } =
        currentProjectDetails.section_a.step7

      dispatch(setA7({ name: 'Level1', value: Level1 }))
      dispatch(setA7({ name: 'Level2a', value: Level2a }))
      dispatch(
        setA7({
          name: 'Level2b',
          value: Level2b,
        })
      )
      dispatch(
        setA7({
          name: 'Level3',
          value: Level3,
        })
      )
      dispatch(
        setA7({
          name: 'Level4a',
          value: Level4a,
        })
      )
      dispatch(
        setA7({
          name: 'Level4b',
          value: Level4b,
        })
      )
      dispatch(
        setA7({
          name: 'Level5',
          value: Level5,
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
            label="Level 1 - ISO 14064-2 GHG Emissions Additionality"
            placeholder="Summarize how the project scenario is additional to the baseline scenario according to ICRs additionality requirements."
            value={A7.Level1}
            name={'Level1'}
            onChange={({ target: { value, name } }) =>
              dispatch(setA7({ name, value }))
            }
          />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Level 2a – Statutory Additionality "
            placeholder="Demonstrate how the project scenario is additional to relevant statutory requirements in the host country according to ICRs additionality requirements."
            value={A7.Level2a}
            name={'Level2a'}
            onChange={({ target: { value, name } }) =>
              dispatch(setA7({ name, value }))
            }
          />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Level 2b – Non-enforcement additionality "
            placeholder="Demonstrate how the project scenario is additional subject to non-enforcement of statutory requirements in the host country according to ICRs additionality requirements."
            value={A7.Level2b}
            name={'Level2b'}
            onChange={({ target: { value, name } }) =>
              dispatch(setA7({ name, value }))
            }
          />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Level 3 – Technology, Institutional, Common Practice Additionality"
            placeholder="Demonstrate how the project scenario is subject to implementation barriers or its implementation can accelerate the deployment of technology or activities according to ICRs' additionality requirements."
            value={A7.Level3}
            name={'Level3'}
            onChange={({ target: { value, name } }) =>
              dispatch(setA7({ name, value }))
            }
          />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Level 4a – Financial Additionality I"
            placeholder="Demonstrate how the project scenario faces financial limitations that revenues from the sale of carbon credits could mitigate according to ICRs additionality requirements."
            value={A7.Level4a}
            name={'Level4a'}
            onChange={({ target: { value, name } }) =>
              dispatch(setA7({ name, value }))
            }
          />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Level 4b – Financial Additionality II"
            placeholder="Demonstrate how the project scenario faces significant financial limitations or lack of revenues, where the sale of carbon credits is the only source of revenues according to ICRs additionality requirements."
            value={A7.Level4b}
            name={'Level4b'}
            onChange={({ target: { value, name } }) =>
              dispatch(setA7({ name, value }))
            }
          />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Level 5 – Policy Additionality"
            placeholder="Demonstrate how the project scenario goes beyond its host country’s climate objectives and lies outside the scope of the host country's climate action strategy towards its NDC, according to ICRs additionality requirements."
            value={A7.Level5}
            name={'Level5'}
            onChange={({ target: { value, name } }) =>
              dispatch(setA7({ name, value }))
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

export default SectionA7
