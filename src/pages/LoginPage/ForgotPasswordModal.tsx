import { Box, Modal, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import isEmail from 'validator/lib/isEmail'
import { v4 as uuidv4 } from 'uuid'
import CCInputField from '../../atoms/CCInputField'
import Captcha from '../../components/Captcha/Captcha'
import { Colors } from '../../theme'
import CCButton from '../../atoms/CCButton'
import { USER } from '../../api/user.api'

interface ForgotPasswordModalProps {
  showModal: boolean
  setShowModal: any
  setLoading: any
  isChangePassword: any
}

const ForgotPasswordModal = ({
  showModal,
  setShowModal,
  setLoading,
  isChangePassword,
}: ForgotPasswordModalProps) => {
  const [email, setEmail] = useState<string>('')
  const [captchaInput, setCaptchaInput] = useState('')
  const [captchaToken, setCaptchaToken] = useState('')

  useEffect(() => {
    setCaptchaTokenFromUUID()
  }, [])

  const setCaptchaTokenFromUUID = () => {
    setCaptchaToken(uuidv4())
  }

  const submit = async () => {
    const payload = {
      email,
      captcha: captchaInput,
      id: captchaToken,
    }
    setLoading(true)
    try {
      const res = await USER.forgotPassword(payload)
      if (res.success && res.data) {
        alert(res.data)
      } else {
        alert(res.error)
      }
    } catch (err) {
      console.log('Error', err)
    } finally {
      setCaptchaInput('')
      setLoading(false)
      setShowModal(false)
    }
  }

  return (
    <Modal
      open={showModal}
      //To Disable unwanted blue border
      disableAutoFocus={true}
      onClose={() => setShowModal(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(56, 142, 129, 0.4)',
      }}
    >
      <Paper
        sx={{
          padding: '40px 70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 3,
          maxWidth: '50vw',
          wordBreak: 'break-word',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography
            sx={{ fontSize: 20, fontWeight: 500, color: Colors.darkPrimary1 }}
          >
            {isChangePassword ? 'Change Password' : 'Forgot Password'}
          </Typography>
          <Typography sx={{ fontSize: 14, mt: 3 }}>
            {isChangePassword
              ? 'Please verify your email to change your password'
              : 'Please verify your email to start the recovery process'}
          </Typography>
          <Box sx={{ width: '80%', mt: 3 }}>
            <CCInputField
              label="Email ID"
              variant="filled"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              error={email !== '' && email !== undefined && !isEmail(email)}
              helperText={
                email !== '' &&
                email !== undefined &&
                !isEmail(email) &&
                'Enter valid Email ID'
              }
              defaultValue={email}
              clearFn={() => setEmail('')}
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <Captcha
              token={captchaToken}
              captchaInput={captchaInput}
              setCaptchaInput={setCaptchaInput}
              setCaptchaToken={setCaptchaToken}
            />
          </Box>
          <Box sx={{ width: '80%' }}>
            <CCButton
              type="submit"
              fullWidth
              sx={{
                height: '50px',
                borderRadius: '6px',
                marginTop: 4,
              }}
              variant="contained"
              onClick={submit}
              disabled={!isEmail(email) || captchaInput.length !== 6}
            >
              {'Submit'}
            </CCButton>
          </Box>
        </Box>
      </Paper>
    </Modal>
  )
}

export default ForgotPasswordModal
