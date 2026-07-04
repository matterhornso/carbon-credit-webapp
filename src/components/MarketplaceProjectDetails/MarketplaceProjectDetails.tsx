// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Grid, Box, Typography, Paper } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import CCTitleValue from '../../atoms/CCTitleValue/CCTitleValue'
import VitalProjectDetails from './VitalProjectDetails'
import DocumentationList from './DocumentationList'
import { getLocalItem } from '../../utils/Storage'

interface MarketplaceProjectDetailsProps {}

const MarketplaceProjectDetails: FC<MarketplaceProjectDetailsProps> = (
  props
) => {
  const localloggedIn = getLocalItem('loggedIn')
  return (
    <Box sx={{ p: localloggedIn ? 0 : 3 }}>
      <Grid
        container
        xs={12}
        sx={{ p: 0, border: '0px solid' }}
        justifyContent={'space-between'}
      >
        <Grid item mb={5}>
          <BackHeader title="Project Details" iconDisable />
        </Grid>

        <VitalProjectDetails />

        <Box sx={{ width: '100%', margin: 1 }}>
          <Paper sx={{ p: 2, borderRadius: '8px', mb: 2 }}>
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
              Total VCOT Sequestered
            </Typography>

            <Typography sx={{ fontSize: 22, fontWeight: 400 }}>981</Typography>
          </Paper>

          <Paper sx={{ p: 2, borderRadius: '8px' }}>
            <Typography sx={{ fontSize: 16, fontWeight: 500, marginBottom: 2 }}>
              Documentation
            </Typography>

            <DocumentationList />
          </Paper>
        </Box>
      </Grid>
    </Box>
  )
}

export default MarketplaceProjectDetails

// <CCTitleValue
//             title="Total CO2C Tokens :"
//             value="981"
//             fontSize={16}
//             fontWeight={500}
//             sx={{ marginTop: 3, width: '240px', marginBottom: 1.5 }}
//           />
