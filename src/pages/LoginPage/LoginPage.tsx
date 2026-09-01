// React Imports
import React, { useEffect, useState, useRef } from 'react'

// MUI Imports
import { Alert, Box, Grid, InputAdornment, Typography } from '@mui/material'

// Functional Imports
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import { loginAction } from '../../redux/Slices/authSlice'
import { authCalls } from '../../api/authCalls'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { pathNames } from '../../routes/pathNames'
import { Colors, Images } from '../../theme'
import { USER } from '../../api/user.api'
import { setLocalItem } from '../../utils/Storage'

// Local Imports
import Logo from '../../atoms/Logo'
import useForm from '../../hooks/useForm'
import CCButton from '../../atoms/CCButton'
import CCInputField from '../../atoms/CCInputField'
import Captcha from '../../components/Captcha/Captcha'
import LoaderOverlay from '../../components/LoderOverlay'
import isEmail from 'validator/lib/isEmail'
import ForgotPasswordModal from './ForgotPasswordModal'
import { setWalletAdded } from '../../redux/Slices/walletSlice'

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { updateWalletBalance } from '../../utils/commonAPI.utils'
import climat_marketplace from '../../assets/Images/logo/climat_marketplace.svg'
import climat_carbon from '../../assets/Images/logo/climat_carbon.svg'

// import './style.css'
import ShowPassword from '../../atoms/ShowPassword'
import HidePassword from '../../atoms/HidePassword'
import LoginAndSignupSideInfo from '../../atoms/LoginAndSignupSideInfo/LoginAndSignupSideInfo'
import { handleApiError } from '../../utils/errorHandler'
declare let window: any

const Login = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const [captchaInput, setCaptchaInput] = useState('')
  const [captchaToken, setCaptchaToken] = useState('')
  const [pwdCopy, setPwdCopy] = useState('')
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showEmailAdornment, setShowEmailAdornment] = useState<boolean>(false)
  const [showPasswordAdornment, setShowPasswordAdornment] =
    useState<boolean>(false)
  const [logo, setLogo] = useState<any>(Images.ClimatIconRevised)
  const [sessionExpired, setSessionExpired] = useState(false)

  // auth-service's real /auth/login response only issues an OTP (via a
  // fire-and-forget email) and never returns a token directly — a second
  // /auth/verify-otp call is required to actually get a session. loginId is
  // the login-response's `id` field, which verify-otp expects back as `uuid`.
  const [otpStep, setOtpStep] = useState(false)
  const [loginId, setLoginId] = useState('')
  const [otpInput, setOtpInput] = useState('')
  const [otpError, setOtpError] = useState('')

  useEffect(() => {
    setCaptchaTokenFromUUID()
  }, [])

  useEffect(() => {
    // Set by the axios 401 handler before it redirects here.
    if (sessionStorage.getItem('sessionExpired')) {
      setSessionExpired(true)
      sessionStorage.removeItem('sessionExpired')
    }
  }, [])

  const params = new URLSearchParams(location?.search)

  useEffect(() => {
    if (params) {
      const getId = params.get('id')
      if (getId === 'ccmp') {
        setLogo(climat_marketplace)
      } else if (getId === 'ccc') {
        setLogo(climat_carbon)
      }
    }
  }, [params])

  const setCaptchaTokenFromUUID = () => {
    console.log('loginn page setCaptchaTokenFromUUID')
    setCaptchaToken(uuidv4())
  }

  const login = async () => {
    if (/^\s|\s$/.test(pwdCopy)) {
      alert('White Space not allowed!')
      return false
    }

    setLoading(true)
    const payload = { email: '', id: '', password: '', captcha: '' }

    payload.email = values?.email
    payload.password = CryptoJS.MD5(pwdCopy).toString()
    payload.id = captchaToken
    payload.captcha = captchaInput

    if (
      navigator.userAgent.indexOf('Chrome') != -1 ||
      navigator.userAgent.indexOf('Edg') != -1 ||
      (navigator.userAgent.indexOf('Opera') ||
        navigator.userAgent.indexOf('OPR')) != -1
    ) {
      const cred = new window.PasswordCredential({
        id: payload.email,
        password: uuidv4(),
      })
      //store the credentials
      navigator.credentials.store(cred).then(function () {
        console.log('Done Saving Creds')
      })
    }

    try {
      setLoading(true)
      const res = await authCalls.loginCall(payload)
      if (res?.status === 204) {
        alert('Retry login with new Captch')
        setCaptchaInput('')
        return
      }
      if (res?.success && res?.data?.id) {
        // Login step only issues an OTP — move to the verification step
        // rather than treating this as a completed session.
        setLoginId(res.data.id)
        setOtpError('')
        setOtpStep(true)
      } else if (res?.error || res.status !== 200) {
        alert(
          res?.error ||
            'Something seems wrong with your credentials. Please try again!'
        )
        setCaptchaTokenFromUUID()
        setCaptchaInput('')
      }
    } catch (e: any) {
      handleApiError(e, { action: 'authCalls.loginCall' })
    } finally {
      new window.PasswordCredential({ id: payload.email, password: uuidv4() })
      setLoading(false)
    }
  }

  // Marketplace wallet/profile side data — best-effort. A failure here
  // shouldn't strand a verified session without ever dispatching login.
  const loadWalletAndProfile = async (uuid: string) => {
    try {
      const userResponse = await USER.getUsersById(uuid)
      setLocalItem('userDetails2', userResponse?.data)
      updateWalletBalance()
      dispatch(setWalletAdded(userResponse?.data?.wallet_added))
      setLocalItem('profileCompleted', userResponse?.data?.orgName ? true : false)
    } catch (e: any) {
      handleApiError(e, { action: 'USER.getUsersById' })
    }
  }

  const verifyOtp = async () => {
    if (!otpInput) return
    setLoading(true)
    setOtpError('')
    try {
      const res = await authCalls.verifyLoginOtp({ uuid: loginId, otp: otpInput })
      if (res?.success && res?.data?.jwtToken) {
        await loadWalletAndProfile(res.data.uuid)
        dispatch(loginAction(res.data))
        if (res.data.type === 'ISSUER' || res.data.type === 'VERIFIER') {
          navigate(pathNames.DASHBOARD, { replace: true })
        }
        window.location.reload()
      } else {
        setOtpError(res?.error || 'Incorrect or expired code — try again.')
      }
    } catch (e: any) {
      setOtpError('Incorrect or expired code — try again.')
      handleApiError(e, { action: 'authCalls.verifyLoginOtp' })
    } finally {
      setLoading(false)
    }
  }

  const resendOtp = async () => {
    setOtpError('')
    try {
      const res = await authCalls.resendOTP({
        uuid: loginId,
        id: captchaToken,
        captcha: captchaInput,
      })
      if (res?.success) {
        setOtpError('A new code has been sent.')
      } else {
        setOtpError(res?.error || 'Could not resend the code.')
      }
    } catch (e: any) {
      setOtpError('Could not resend the code.')
      handleApiError(e, { action: 'authCalls.resendOTP' })
    }
  }

  const { handleChange, values, resetField, errors, handleSubmit } =
    useForm(login)

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {loading ? <LoaderOverlay show /> : null}
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
          height: '100vh',
          background: '#fafafa',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ height: '100%', overflow: 'scroll' }}
          className="hide-scrollbar"
        >
          <Box
            sx={{
              position: 'relative',
              width: '462px',
              // height: '67px',
              marginTop: '64px',
              '@media (max-width:1440px)': {
                marginTop: '64px',
              },
            }}
          >
            <Box
              component={'img'}
              // src={Images.ClimatIconRevised}
              src={logo}
              // sx={{ position: 'absolute' }}
            />
            {/* <Box
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
          </Box>

          <Box sx={{ mt: '87px', width: '462px' }}>
            <Typography
              sx={{ fontWeight: '400', fontSize: 28, color: '#029FB3' }}
            >
              {otpStep ? 'Enter verification code' : 'Login'}
            </Typography>
            <Typography
              sx={{ fontWeight: '500', fontSize: 16, marginTop: 0.5 }}
            >
              {otpStep
                ? 'We sent a code to your email — it expires in a couple of minutes.'
                : 'Login by providing the information below'}
            </Typography>
            {sessionExpired && (
              <Alert
                severity="info"
                sx={{ mt: 2 }}
                onClose={() => setSessionExpired(false)}
              >
                Your session expired. Please log in again to continue.
              </Alert>
            )}
          </Box>

          {otpStep && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <CCInputField
                label="Verification code"
                variant="outlined"
                name="otp"
                value={otpInput}
                onChange={(e: any) => setOtpInput(e.target.value)}
                onKeyDown={(e: any) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    verifyOtp()
                  }
                }}
                sx={{ width: '462px', mt: '24px' }}
              />
              {otpError && (
                <Alert severity="info" sx={{ mt: 2, width: '462px' }}>
                  {otpError}
                </Alert>
              )}
              <CCButton
                type="button"
                onClick={verifyOtp}
                sx={{
                  height: '62px',
                  width: '462px',
                  borderRadius: '8px !important',
                  marginTop: '24px !important',
                  background: 'linear-gradient(225deg, #01623D 0%, #8BD3DC 100%)',
                  boxShadow: '0px 4px 6px 0px rgba(29, 74, 67, 0.15)',
                  color: 'white !important',
                  fontSize: '20px !important',
                  fontWeight: '500',
                }}
                variant="contained"
              >
                {loading ? 'Verifying...' : 'Verify'}
              </CCButton>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '462px', mt: 2 }}>
                <Typography
                  sx={{ fontSize: 14, cursor: 'pointer', color: Colors.textColorDarkGreen, fontWeight: '500' }}
                  onClick={() => {
                    setOtpStep(false)
                    setOtpInput('')
                    setOtpError('')
                  }}
                >
                  Back to login
                </Typography>
                <Typography
                  sx={{ fontSize: 14, cursor: 'pointer', color: Colors.textColorDarkGreen, fontWeight: '500' }}
                  onClick={resendOtp}
                >
                  Resend code
                </Typography>
              </Box>
            </Box>
          )}

          {!otpStep && (
          <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <CCInputField
              label="Work Email ID"
              // placeholder="Work Email ID"
              variant="outlined"
              type="email"
              name="email"
              onChange={handleChange}
              sx={{
                width: '462px',
                mt: '24px',
              }}
              defaultValue={values?.email}
              // clearFn={() => handleChange({ target: { value: '' } })}
              clearFn={() => {
                resetField('email')
              }}
              showAdornment={showEmailAdornment}
              onFocus={() => {
                setShowEmailAdornment(true)
                console.log('focused from comp')
              }}
              onBlur={() => {
                setShowEmailAdornment(false)
              }}
            />
            <CCInputField
              label="Password"
              variant="outlined"
              name="password"
              onChange={(e: any) => {
                handleChange(e)
                setPwdCopy(e.target.value)
              }}
              onBlur={(e) => {
                setPwdCopy(e.target.value)
                setShowPasswordAdornment(false)
                if (e.target.value.length > 0) {
                  e.target.value = uuidv4()
                  handleChange(e)
                }
              }}
              onFocus={() => {
                setShowPasswordAdornment(true)
              }}
              defaultValue={values?.password}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    {!showPassword ? (
                      <HidePassword
                        onClick={() => {
                          setShowPassword(!showPassword)
                        }}
                      />
                    ) : (
                      <ShowPassword
                        onClick={() => {
                          setShowPassword(!showPassword)
                        }}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
              sx={{ width: '462px', mt: '24px' }}
              showAdornment={showPasswordAdornment}
            />
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                fontSize: 14,
              }}
            >
              <Typography
                sx={{
                  fontWeight: '500',
                  mt: '8px',
                  color: '#1D4B44',
                  cursor: 'pointer',
                  mr: 0.5,
                }}
                onClick={() => setOpenModal(true)}
              >
                Forgot password?
              </Typography>
            </Box>
          </Box>

          <Captcha
            token={captchaToken}
            captchaInput={captchaInput}
            setCaptchaInput={setCaptchaInput}
            setCaptchaToken={setCaptchaToken}
          />

          <Box
            sx={{
              // border: '2px solid',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            {/* <CCButton
              type="submit"
              sx={{
                height: '40px',
                width: '100%',
                borderRadius: '6px',
                marginTop: 4,
              }}
              variant="contained"
            >
              {loading ? 'Logging in...' : 'Login'}
            </CCButton> */}
            <CCButton
              // fullWidth=
              type="submit"
              // onClick={() => login()}
              sx={{
                height: '62px',
                width: '462px',
                borderRadius: '8px !important',
                marginTop: '24px !important',
                background: 'linear-gradient(225deg, #01623D 0%, #8BD3DC 100%)',
                boxShadow: '0px 4px 6px 0px rgba(29, 74, 67, 0.15)',
                color: 'white !important',
                fontSize: '20px !important',
                fontWeight: '500',
              }}
              variant="contained"
            >
              {loading ? 'Logging in...' : 'Login'}
            </CCButton>
            <Box
              justifyContent={'center'}
              display="flex"
              alignItems={'center'}
              flexDirection={'column'}
            >
              <Typography
                sx={{
                  marginTop: '20px',
                  textAlign: 'center',

                  fontSize: 16,
                  color: Colors.textColorDarkGreen,
                  fontWeight: '500',
                }}
              >
                {`Don't have an account?`}
              </Typography>
              {/* <Typography
                onClick={() => navigate(pathNames.REGISTER)}
                sx={{
                  fontWeight: '500',
                  fontSize: 18,
                  px: 1,
                  pt: 0.5,
                  cursor: 'pointer',
                  color: Colors.textColorDarkGreen,
                }}
              >
                {' '}
                Register{' '}
              </Typography>
              <Typography
                sx={{
                  marginTop: '20px',
                  marginBottom: '15px',
                  textAlign: 'center',

                  fontSize: 14,
                  fontWeight: '500',
                  color: Colors.textColorDarkGreen,
                }}
              >
                {`here`}
              </Typography> */}
              <Box>
                <CCButton
                  // fullWidth=
                  type="submit"
                  onClick={() => navigate(pathNames.REGISTER)}
                  sx={{
                    height: '62px',
                    width: '462px',
                    borderRadius: '8px !important',
                    marginTop: '6px !important',
                    boxShadow: '0px 4px 6px 0px rgba(29, 74, 67, 0.15)',
                    border: '1px solid #01623D !important',
                    fontSize: '20px',
                    fontWeight: '500',
                    marginBottom: '20px !important',
                    backgroundColor: '#FAFDFA',
                    '&:hover': {
                      background: '#006B5E14',
                    },
                  }}
                  variant="contained"
                >
                  Register
                </CCButton>
              </Box>
            </Box>
          </Box>
          </>
          )}
        </Box>
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
          // alignItems: 'center',
          // justifyContent: 'center',
          backgroundColor: '#0D5058',
        }}
      >
        {/* <Box
          flexDirection="column"
          component={'img'}
          // src={Images.illustration}
          sx={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${Images.illustration})`,
            // objectFit: 'cover',
            // objectPosition: 'center',
            // backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat',
          }}
        /> */}
        <LoginAndSignupSideInfo />
      </Box>
      <ForgotPasswordModal
        isChangePassword={false}
        showModal={openModal}
        setShowModal={setOpenModal}
        setLoading={setLoading}
      />
    </Box>
  )
}

export default Login
