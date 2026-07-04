import React, { useState } from 'react'
import StepOneTwoFa from './StepOne'
import StepTwoTwoFa from './StepTwo'
import { TwoFaProps } from './TwoFa.interface'
import NewUserLandingPage from './NewUserLandingPage'
const TwoFa = (props: TwoFaProps) => {
  const [step, setStep] = useState(1)
  return step === 1 ? (
    <StepOneTwoFa setStep={setStep} />
  ) : (
    <NewUserLandingPage />
  )
}
export default TwoFa
