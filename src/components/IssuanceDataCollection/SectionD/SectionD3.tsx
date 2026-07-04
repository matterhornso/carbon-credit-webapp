import React, { FC, useEffect } from 'react'
import { Grid, Typography, Stack } from '@mui/material'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { setD3 } from '../../../redux/Slices/sectionDSlice'
import Spinner from '../../../atoms/Spinner'
import HelpPopUp from '../../Appbar/NavBar/Help/HelpPopUp'
import { IssuanceHelpContentData } from '../../Appbar/NavBar/Help/SectionA/helpContentData'
import { setShowPopUp } from '../../../redux/Slices/issuanceDataCollection'
import { Box } from '@mui/system'

const SectionD3: FC = () => {
  const dispatch = useAppDispatch()

  const D3 = useAppSelector(({ sectionD }) => sectionD.D3, shallowEqual)

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
      currentProjectDetails.section_d.step3.completed
    ) {
      const { implementation_of_sampling_plan } =
        currentProjectDetails.section_d.step3

      dispatch(
        setD3({
          name: 'implementation_of_sampling_plan',
          value: implementation_of_sampling_plan,
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
      <Grid
        container
        sx={{ width: '100%', mt: 4 }}
        //columnSpacing={{ xs: 0, md: 1 }}
        //rowSpacing={1}
      >
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <CCMultilineTextArea
            // aria-label="minimum height"
            label={'Implementation of sampling plan'}
            placeholder="Process of Implementation of sampling plan, if applicable"
            name={'implementation_of_sampling_plan'}
            value={D3.implementation_of_sampling_plan}
            onChange={({ target: { name, value } }) =>
              dispatch(setD3({ name, value }))
            }
            required={false}
          />
        </Grid>
        <HelpPopUp
          modal={modal}
          setModal={(item: any) => setModal(item)}
          data={IssuanceHelpContentData?.D3}
          issuanceVisible={true}
        />
      </Grid>
    </Box>
  )
}

export default SectionD3
