// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Box, Divider, Grid, Paper, Stack, Typography } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { Colors } from '../../theme'
import { HelpCentreProps } from './HelpCentre.interface'
import VerifierProfileIllustration from '../../assets/Images/illustrations/VerifierProfile.png'
import CCInputField from '../../atoms/CCInputField'
import TextButton from '../../atoms/TextButton/TextButton'
import { USER } from '../../api/user.api'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import { getLocalItem } from '../../utils/Storage'
import Spinner from '../../atoms/Spinner'
import CCButton from '../../atoms/CCButton'
import DashboardHelpSection from './DashboardHelpSection'
import {
  DashboardHelpSectionFAQ,
  HelpContentIssuanceAllData,
  IssuanceHelpContentData,
} from '../Appbar/NavBar/Help/SectionA/helpContentData'

import IssuanceAllSectionContent from '../Appbar/NavBar/Help/IssuanceAllSectionContent'
import WalletAdd from './WalletAdd'

const HelpCentre = (props: HelpCentreProps) => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [selectQuestion, setQuestions] = useState(0)
  if (loading) {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: 450 }}
      >
        <Spinner />
      </Stack>
    )
  } else {
    return (
      <Box sx={{ p: 0 }}>
        <BackHeader
          title="Help Centre"
          onClick={() => navigate(-1)}
          sx={{
            position: 'fixed',
            marginTop: '-20px',
          }}
        />
        <Grid
          container
          xs={12}
          sx={{ p: 0, border: '0px solid', width: '100%' }}
        >
          <Grid item xs={12} sx={{ p: 1, mt: '20px' }}>
            <Paper
              sx={{
                // height: '750px',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                borderRadius: '8px',
                // border: '2px solid',
                backgroundColor: Colors.white,

                p: 2,
              }}
            >
              <Box
                sx={{
                  width: '25%',
                  position: 'fixed',
                  zIndex: 10,
                  height: '100%',
                }}
              >
                <DashboardHelpSection
                  data={DashboardHelpSectionFAQ}
                  setQuestions={(item: any) => setQuestions(item)}
                  selectQuestion={selectQuestion}
                />
              </Box>
              <Box sx={{ width: '50px', alignItems: 'center', ml: '30%' }}>
                <Divider sx={{ color: '#E8E8E8' }} orientation={'vertical'} />
              </Box>
              <Box sx={{ width: '65%', ml: 3 }}>
                {/* {selectQuestion === 0 ? <WalletAdd /> : null} */}
                {selectQuestion === 0 ? (
                  <IssuanceAllSectionContent
                    data={HelpContentIssuanceAllData}
                  />
                ) : null}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    )
  }
}

export default HelpCentre
