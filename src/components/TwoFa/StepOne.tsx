import React, { useEffect, useState } from 'react'
import { TwoFaProps } from './TwoFa.interface'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import OtpInput from 'react-otp-input'
import CCButton from '../../atoms/CCButton'
import { Colors, Images } from '../../theme'
import { getLocalItem } from '../../utils/Storage'
import { authCalls } from '../../api/authCalls'
import ResendOTPModal from './ResendOTPModal'
import LoaderOverlay from '../../components/LoderOverlay'
import { handleApiError } from '../../utils/errorHandler'

const StepOneTwoFa = (props: TwoFaProps) => {
  const uuid = getLocalItem('uuid')

  const [otp, setOtp] = useState<any>('')
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [seconds, setSeconds] = useState(90)

  useEffect(() => {
    const myInterval: any = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      }
      if (seconds === 0) {
        clearInterval(myInterval)
      }
    }, 1000)
    return () => {
      clearInterval(myInterval)
    }
  })

  const handleChange = (event: React.ChangeEvent<HTMLButtonElement>) => {
    setOtp(event)
  }

  const handleVerify = () => {
    if (otp.length < 6) {
      alert('Enter all the digits!')
      return
    }

    const payload = {
      uuid: uuid,
      otp: otp,
    }

    authCalls
      .verifyOtp(payload)
      .then((res: any) => {
        setLoading(true)
        if (res?.success && res?.data === 'verified') {
          props.setStep(2)
        } else {
          alert('Please enter valid OTP')
        }
      })
      .catch((err) => handleApiError(err, { action: 'authCalls.verifyOtp' }))
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <LoaderOverlay show={loading} />
      <Box
        sx={{
          width: {
            sm: '100%',
            lg: '50%',
          },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // justifyContent: 'center',
          // height: '500px',
          height: '100vh',
          // border: '1px solid red',
          background: '#fafafa',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '462px',
            // height: '67px',
            mt: '64px',
            // border: '1px solid lime',
          }}
        >
          {/* <Box
            component={'img'}
            src={Images.climaticon}
            sx={{ position: 'absolute' }}
          />
          <Box
            sx={{
              color: '#009B72',
              fontWeight: 700,
              fontSize: '40px',
              fontFamily: 'Nunito',
              zIndex: 5,
              position: 'absolute',
              top: '2px',
              left: '23px',
            }}
          >
            Climat
          </Box> */}

          <Box
            component={'img'}
            src={Images.ClimatIconRevised}
            // sx={{ position: 'absolute' }}
          />
        </Box>

        <Box sx={{ mt: '151px', width: '462px' }}>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 32,
              // pb: 2,
              // color: '#325743',
              color: '#029FB3',
            }}
          >
            Verify Account
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 14,
              lineHeight: '24px',
              color: '#0D0E0E',
            }}
          >
            {'Please enter the verification code sent to your registered '}
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 14,
              lineHeight: '24px',
              color: '#0D0E0E',
            }}
          >
            {'email id below. This code is valid for 90 secs.'}
          </Typography>
        </Box>
        <Box sx={{ width: '462px', mt: '32px' }}>
          <OtpInput
            value={otp}
            isInputNum
            onChange={handleChange}
            numInputs={6}
            containerStyle={{
              // justifyContent: 'flex-start',
              justifyContent: 'space-between',
            }}
            inputStyle={{
              width: 64,
              height: 72,
              color: 'black',
              fontSize: 20,
              // border: 'none',
              border: '1px solid #B6BDBE',
              borderRadius: 8,
              backgroundColor: '#FAFDFA !important',
            }}
          />
          <Box>
            <Typography
              sx={{
                mt: 1,
                width: '100%',
                color: seconds === 0 ? Colors.lightPrimary1 : Colors.tertiary,
                textAlign: 'right',
                fontSize: 14,
              }}
            >
              {seconds === 0
                ? 'Code Expired'
                : `Code expires in : ${seconds} seconds`}
            </Typography>
          </Box>
        </Box>
        <Typography
          align="right"
          sx={{
            // py: 3,
            mt: '10px',
            fontWeight: 500,
            fontSize: 14,
            color: '#1C4A43',
          }}
        >
          Didn’t receive code yet?{' '}
          <Typography
            sx={{
              cursor: 'pointer',
              // color: Colors.lightPrimary1,
              color: '#388E81',
              fontSize: 14,
              fontWeight: 500,
            }}
            display={'inline'}
            onClick={() => {
              setOtp('')
              setOpenModal(true)
            }}
          >
            Resend Code
          </Typography>
        </Typography>
        <CCButton
          variant="contained"
          sx={{
            height: '62px',
            width: '462px',
            borderRadius: '8px !important',
            marginTop: '8px !important',
            background: 'linear-gradient(225deg, #01623D 0%, #8BD3DC 100%)',
            boxShadow: '0px 4px 6px 0px rgba(29, 74, 67, 0.15)',
            color: 'white !important',
            fontSize: '20px !important',
            fontWeight: '500',
          }}
          onClick={handleVerify}
        >
          Verify Account
        </CCButton>
      </Box>
      <Box
        sx={{
          display: {
            sm: 'none',
            xs: 'none',
            // lg: 'flex',
            lg: 'block',
          },
          width: '50%',
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: '#0D5058',
          // alignItems: 'center',
          // justifyContent: 'center',
        }}
      >
        <Box
          flexDirection="column"
          component="img"
          sx={{
            // width: '100% !important',
            // // height: 'auto !important',
            // height: '100% !important',
            // // objectFit: 'cover',
            // backgroundSize: 'contain',
            // backgroundPosition: 'center center',
            // backgroundRepeat: 'no-repeat',
            // position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: `url(${Images.illustration})`,
            // objectFit: 'cover',
            // objectPosition: 'center',
            // backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </Box>
      <ResendOTPModal
        showModal={openModal}
        setShowModal={setOpenModal}
        setLoading={setLoading}
        setSeconds={setSeconds}
      />
    </Box>
  )
}

export default StepOneTwoFa
