import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Colors } from '../../theme'
import CCButton from '../../atoms/CCButton'
import BackButton from '../BackButton'

interface StepFourProps {
  step: number
  setStep: React.Dispatch<React.SetStateAction<any>>
}

const StepFour: React.FC<StepFourProps> = ({ step, setStep }) => {
  // const handleSave = () => {
  // }

  const handleBack = () => {
    setStep(step - 1)
  }

  return (
    <div>
      <Typography
        variant="h4"
        sx={{ color: Colors.secondary }}
        component={'div'}
      >
        Record Keeping
      </Typography>
      <div style={{ color: Colors.darkPrimary1 }}>
        Documents to be uploaded for occasional transaction.after end of the
        customer relationship/completion of an{' '}
      </div>
      <Box sx={{ mt: 2 }}>Customer Information</Box>
      <Grid
        container
        sx={{ mt: 1 }}
        justifyContent="space-between"
        xs={8}
        spacing={2}
      >
        <Grid item xs={6}>
          <div>Transactions</div>
        </Grid>
        <Grid container justifyContent={'end'} alignItems={'center'} xs={6}>
          <AddIcon /> Upload
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ mt: 1 }}
        justifyContent="space-between"
        xs={8}
        spacing={2}
      >
        <Grid item xs={6}>
          <div>Internal & External Suspicion Reports</div>
        </Grid>
        <Grid container justifyContent={'end'} alignItems={'center'} xs={6}>
          <AddIcon /> Upload
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ mt: 1 }}
        justifyContent="space-between"
        xs={8}
        spacing={2}
      >
        <Grid item xs={6}>
          <div>
            Money Laundering Reporting Officer (MLRO) annual (& other) reports;
          </div>
        </Grid>
        <Grid container justifyContent={'end'} alignItems={'center'} xs={6}>
          <AddIcon /> Upload
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ mt: 1 }}
        justifyContent="space-between"
        xs={8}
        spacing={2}
      >
        <Grid item xs={6}>
          <div>Information not Acted Upon</div>
        </Grid>
        <Grid container justifyContent={'end'} alignItems={'center'} xs={6}>
          <AddIcon /> Upload
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ mt: 1 }}
        justifyContent="space-between"
        xs={8}
        spacing={2}
      >
        <Grid item xs={6}>
          <div>Training & Compliance Monitoring</div>
        </Grid>
        <Grid container justifyContent={'end'} alignItems={'center'} xs={6}>
          <AddIcon /> Upload
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ mt: 1 }}
        justifyContent="space-between"
        xs={8}
        spacing={2}
      >
        <Grid item xs={6}>
          <div>Information about the Effectiveness of Training</div>
        </Grid>
        <Grid container justifyContent={'end'} alignItems={'center'} xs={6}>
          <AddIcon /> Upload
        </Grid>
      </Grid>
      <Grid container justifyContent="end" sx={{ mt: 2 }} xs={8} spacing={2}>
        <Grid item>
          <BackButton onClick={handleBack}>Back</BackButton>
        </Grid>
        <Grid item>
          <CCButton
            // sx={{ background: Colors.darkPrimary1, color: '#fff' }}
            variant="contained"
            // onClick={handleSave}
          >
            Save
          </CCButton>
        </Grid>
      </Grid>
    </div>
  )
}

export default StepFour
