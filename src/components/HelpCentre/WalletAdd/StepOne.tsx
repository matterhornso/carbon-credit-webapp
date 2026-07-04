import React from 'react'
import stepOneImage from '../../../assets/Images/wallet_steps/wallet_step_01.png'

interface Props {}

const StepOne = (props: Props) => {
  return (
    <img
      onClick={() => window.open('https://metamask.io', '_blank')}
      src={stepOneImage}
      width="100%"
    />
  )
}

export default StepOne
