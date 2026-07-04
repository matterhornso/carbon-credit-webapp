import React, { useEffect } from 'react'
import { TwoFaProps } from './TwoFa.interface'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import AccountCreatedImage from '../../assets/Images/AccountCreatedImage.png'
import { Colors, Images } from '../../theme'
import CCButton from '../../atoms/CCButton'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'

const StepTwoTwoFa = (props: TwoFaProps) => {
  const navigate = useNavigate()
  // const changeToLoginPage = () => {
  //   navigate(pathNames.LOGIN)
  // }
  // setTimeout(() => changeToLoginPage, 450)
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(pathNames.LOGIN)
    }, 14000)

    // This will clear the timer if the component is unmounted before the redirection happens.
    return () => clearTimeout(timer)
  }, [])
  return (
    <Box
      sx={{
        height: '100vh',
        background: '#fafafa',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}
    >
      <Box component={'img'} sx={{ pt: 1 }} src={Images.check1} />
      <Box>
        {' '}
        <Typography
          sx={{
            // fontWeight: 500,
            fontWeight: 400,
            fontSize: 36,
            // color: '#325743',
            color: '#325743',
          }}
        >
          Congratulations
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: 16,
            color: '#325743',
            pb: 3,
          }}
        >
          Your account has been successfully created
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 0.38,
          '@media (min-width:1440px)': {
            flex: '0.46',
          },
        }}
      >
        <img src={Images.illustration5} width={'100%'} height={'100%'} />
      </Box>
    </Box>
  )
}

export default StepTwoTwoFa
