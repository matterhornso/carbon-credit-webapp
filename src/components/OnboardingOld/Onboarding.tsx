import React, { useState } from 'react'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import StepFour from './StepFour'
import './onboarding.css'

const Onboarding = () => {
  const [step, setStep] = useState<number>(1)

  return (
    <>
      {step === 1 && <StepOne step={step} setStep={setStep} />}
      {step === 2 && <StepTwo step={step} setStep={setStep} />}
      {step === 3 && <StepThree step={step} setStep={setStep} />}
      {step === 4 && <StepFour step={step} setStep={setStep} />}
    </>
  )
}
export default Onboarding
