import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Colors } from '../../theme'
import CCButton from '../../atoms/CCButton'
import BackButton from '../BackButton'

interface StepTwoProps {
  step: number
  setStep: React.Dispatch<React.SetStateAction<any>>
}

const StepTwo: React.FC<StepTwoProps> = ({ step, setStep }) => {
  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  return (
    <>
      <Typography
        variant="h4"
        sx={{ color: Colors.secondary }}
        component={'div'}
      >
        KYC/KYB
      </Typography>
      <Typography>Upload Company Documents</Typography>
      <Grid
        container
        sx={{ mt: 1 }}
        justifyContent="space-between"
        xs={8}
        spacing={3}
      >
        <Grid item xs={6}>
          <div>Articles of Association or other Governing Documents</div>
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
        spacing={3}
      >
        <Grid item xs={6}>
          <div>Proof of Legal Existence</div>
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
        spacing={3}
      >
        <Grid item xs={6}>
          <div>Documents Disclosing Beneficial Ownership Structure</div>
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
        spacing={3}
      >
        <Grid item xs={6}>
          <div>Proof of Registered & Physical Address</div>
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
            sx={{ fontSize: 16 }}
            variant="contained"
            onClick={handleNext}
          >
            Next
          </CCButton>
        </Grid>
      </Grid>
    </>
  )
}

export default StepTwo
