import React, { useState } from 'react'
import { TwoFaInterface } from './TwoFaPage.interface'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Button, Typography } from '@mui/material'
// import OtpInput from 'react-otp-input'
import { Container } from '@mui/system'
import CCButton from '../../atoms/CCButton'
import { Images } from '../../theme'
import TwoFa from '../../components/TwoFa'

const TwoFaPage = (props: TwoFaInterface) => {
  const [otp, setOtp] = useState<any>()

  const handleChange = (event: React.ChangeEvent<HTMLButtonElement>) => {
    setOtp(event)
  }

  const handleVerify = () => {
    setOtp('')
  }

  return <TwoFa />
}

export default TwoFaPage
