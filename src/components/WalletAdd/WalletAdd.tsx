import React, { useEffect } from 'react'
import { WalletAddProps } from './WalletAdd.interface'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useAppDispatch } from '../../hooks/reduxHooks'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import StepFour from './StepFour'
import { setGuide } from '../../redux/Slices/walletSlice'

const steps = [
  'Install MetaMask',
  'Create MetaMask Account',
  'Login to MetaMask',
  'Add Polygon Network',
]

const WalletAdd = (props: WalletAddProps) => {
  const dispatch = useAppDispatch()
  const [activeStep, setActiveStep] = React.useState(0)
  const [skipped, setSkipped] = React.useState(new Set<number>())

  useEffect(() => {
    if (activeStep === steps.length) {
      // dispatch(setLoadWallet(false))
      setActiveStep(0)
      dispatch(setGuide(false))
    }
  }, [activeStep])

  const isStepOptional = (step: number) => {
    return false
  }

  const isStepSkipped = (step: number) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.")
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const renderSteps = (steps: any) => {
    switch (steps) {
      case 1:
        return <StepOne />
      case 2:
        return <StepTwo />
      case 3:
        return <StepThree />
      case 4:
        return <StepFour />
      default:
        null
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {}
          const labelProps: {
            optional?: React.ReactNode
          } = {}
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            )
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      {
        <Box sx={{ maxHeight: 350, overflowY: 'auto' }}>
          {renderSteps(activeStep + 1)}
        </Box>
      }
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        {activeStep === steps.length ? null : (
          <>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </>
        )}
      </Box>
    </Box>
  )
}

export default WalletAdd
