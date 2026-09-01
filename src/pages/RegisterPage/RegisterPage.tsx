import React, { useEffect, useState } from 'react'
import { RegisterPageProps } from './RegisterPage.interface'
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CCButton from '../../atoms/CCButton'
import { pathNames } from '../../routes/pathNames'
import { useNavigate } from 'react-router-dom'
import useForm from '../../hooks/useForm'
import CCInputField from '../../atoms/CCInputField'
import CCSelectBox from '../../atoms/CCSelectBox'
import Logo1 from '../../atoms/Logo'
import { Colors, Images } from '../../theme'
import Captcha from '../../components/Captcha/Captcha'
import { v4 as uuidv4 } from 'uuid'
//import CryptoJs from 'crypto-js'
import CryptoJS from 'crypto-js'
import { department } from '../../api/department.api'
import { USER } from '../../api/user.api'
import { setLocalItem } from '../../utils/Storage'
import isEmail from 'validator/lib/isEmail'
import isAlpha from 'validator/lib/isAlpha'
import isMobilePhone from 'validator/lib/isMobilePhone'
import LoaderOverlay from '../../components/LoderOverlay'
import ClearIcon from '../../atoms/ClearIcon'
import ShowPassword from '../../atoms/ShowPassword'
import HidePassword from '../../atoms/HidePassword'
import LoginAndSignupSideInfo from '../../atoms/LoginAndSignupSideInfo/LoginAndSignupSideInfo'
import { handleApiError } from '../../utils/errorHandler'

const RegisterPage = (props: RegisterPageProps) => {
  const [number, setNumber] = useState<string>('')
  const [password, setPassword] = useState<any>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState('')
  const [captchaToken, setCaptchaToken] = useState('')
  const [captchaInput, setCaptchInput] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)
  const [countryCode, setCountryCode] = useState<any>()
  const [typeOptions, setTypeOptions] = useState<any>([])
  const [selectedRole, setSelectedRole] = useState<any>('')
  const [departmentId, setDepartmentId] = useState<any>()
  const [loading, setLoading] = useState(false)

  const [showFirstNameAdornment, setShowFirstNameAdornment] =
    useState<boolean>(false)
  const [showLastNameAdornment, setShowLastNameAdornment] =
    useState<boolean>(false)
  const [showEmailAdornment, setShowEmailAdornment] = useState<boolean>(false)
  const [showPhoneNumberAdornment, setShowPhoneNumberAdornment] =
    useState<boolean>(false)
  const [showPasswordAdornment, setShowPasswordAdornment] =
    useState<boolean>(false)

  const navigate = useNavigate()

  useEffect(() => {
    getDepartment()
  }, [])

  useEffect(() => {
    setCaptchaTokenFromUUID()
  }, [])

  useEffect(() => {
    setPassword(null)
    setNumber('')
    setFirstName('')
    setLastName('')
    setEmail('')
  }, [])
  const setCaptchaTokenFromUUID = () => {
    setCaptchaToken(uuidv4())
  }

  useEffect(() => {
    fetchingSelectedRoleId()
  }, [selectedRole])

  const fetchingSelectedRoleId = () => {
    const roleId = typeOptions.filter((i: any) => i?.value === selectedRole)
    setDepartmentId(roleId)
  }

  const getDepartment = async () => {
    department
      .getDepartment()
      .then((response: any) => {
        const roles = response?.data
          .filter(
            (department: any) =>
              !['super admin department'].includes(department?.name)
          )
          .map((department: any, index: number) => {
            return {
              value: department.name,
              label: department._id,
            }
          })
        setTypeOptions(roles)
      })
      .catch((e) => handleApiError(e, { action: 'department.getDepartment' }))
  }

  const onBoardingNewUser = async () => {
    if (
      number === '' ||
      number === undefined ||
      password === '' ||
      password === undefined ||
      firstName === '' ||
      firstName === undefined ||
      lastName === '' ||
      lastName === undefined ||
      email === '' ||
      email === undefined 
      // selectedRole === '' ||
      // selectedRole === undefined
    ) {
      alert('Fill all the fields!')
      return
    }

    if (!isAlpha(firstName) || !isAlpha(lastName)) {
      alert('Names cannot contain numbers!')
      return
    }

    if (!isEmail(email)) {
      alert('Enter valid email')
      return
    }

    if (!isMobilePhone(number, 'en-IN')) {
      alert('Enter valid mobile number')
      return
    }

    setLoading(true)
    const payload = {
      fullName: firstName + ' ' + lastName,
      email: email,
      phone: Number(number),
      country_code: '91',
      // departmentId: departmentId[0]?.label,
      // hard coded the departmentId for demo purpose.
      departmentId: '62c58299a3bc6ba32590f94a',
      password: CryptoJS.MD5(password).toString(),
      captcha_id: captchaToken,
      captcha: captchaInput,
    }
    USER.onBoardingUser(payload)
      .then((res: any) => {
        if (res?.data?.success) {
          if (res?.data?.data?.alreadyExits) {
            alert('user already exists')
          } else {
            setLocalItem('uuid', res?.data?.data?.uuid)
            navigate(pathNames.TWOFA)
          }
        } else if (!res?.data?.success) {
          alert(res?.data?.error)
          setCaptchaToken(uuidv4())
          setCaptchInput('')
        }
      })
      .catch((e) => handleApiError(e, { action: 'RegisterPage:177' }))
      .finally(() => {
        setLoading(false)
      })
  }

  const register = () => {
    //alert(JSON.stringify(values))
    // dispatch(registerAction({ roles: ['ISSUER'] })) //calling action from redux
    // authCalls.registerCall()
    //navigate(pathNames.LOGIN, { replace: true })
  }

  const { handleChange, values, errors, handleSubmit } = useForm(register)
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#fafafa',
      }}
    >
      {loading ? <LoaderOverlay show /> : null}
      <Box
        sx={{
          width: {
            sm: '100%',
            lg: '50%',
          },
          overflow: 'scroll',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // justifyContent: 'center',
          height: '100vh',
        }}
        className="hide-scrollbar"
      >
        <Box
          sx={{
            position: 'relative',
            width: '462px',
            marginTop: '49px',
          }}
        >
          {/* <Box
            component={'img'}
            src={Images.climaticon}
            sx={{ position: 'absolute', height: '67px' }}
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

        <Box sx={{ mt: '55px', width: '462px' }}>
          <Typography
            sx={{ fontWeight: '400', fontSize: 32, color: '#029FB3' }}
          >
            Register
          </Typography>
          <Typography sx={{ fontWeight: '500', fontSize: 16 }}>
            Register by providing the information below
          </Typography>
        </Box>

        <Box
          sx={{
            width: '462px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: '24px',
          }}
        >
          <CCInputField
            label="First Name"
            variant="outlined"
            name="firstName"
            size="small"
            onChange={(e: any) => {
              setFirstName(e.target.value)
            }}
            error={firstName !== '' && !isAlpha(firstName)}
            helperText={
              firstName !== '' && !isAlpha(firstName) && 'Enter valid Name'
            }
            // defaultValue={values?.firstName}
            sx={{ mr: 1.5 }}
            clearFn={() => {
              setFirstName('')
            }}
            defaultValue={firstName}
            showAdornment={showFirstNameAdornment}
            onFocus={() => {
              setShowFirstNameAdornment(true)
            }}
            onBlur={() => {
              setShowFirstNameAdornment(false)
            }}
          />

          <CCInputField
            label="Last Name"
            variant="outlined"
            name="firstName"
            size="small"
            onChange={(e: any) => setLastName(e.target.value)}
            error={lastName !== '' && !isAlpha(lastName)}
            helperText={
              lastName !== '' && !isAlpha(lastName) && 'Enter valid Name'
            }
            defaultValue={lastName}
            sx={{}}
            clearFn={() => {
              setLastName('')
            }}
            value={lastName}
            showAdornment={showLastNameAdornment}
            onFocus={() => {
              setShowLastNameAdornment(true)
            }}
            onBlur={() => {
              setShowLastNameAdornment(false)
            }}
          />
        </Box>

        <CCInputField
          label="Work Email ID"
          variant="outlined"
          name="email"
          size="small"
          onChange={(e: any) => setEmail(e.target.value)}
          // error={email !== '' && !isEmail(email)}
          // helperText={email !== '' && !isEmail(email) && 'Enter valid Email ID'}
          defaultValue={email}
          sx={{ width: '462px', mt: '24px' }}
          clearFn={() => {
            setEmail('')
          }}
          value={email}
          showAdornment={showEmailAdornment}
          onFocus={() => {
            setShowEmailAdornment(true)
          }}
          onBlur={() => {
            setShowEmailAdornment(false)
          }}
        />

        {/* <Box sx={{ mt: '24px' }}>
          <CCSelectBox
            label="Participant Type"
            // placeholder='Participant Type'
            items={typeOptions}
            onChange={(e: any) => setSelectedRole(e.target.value)}
            sx={{ width: '462px' }}
            fullWidth={false}
            size="small"
          />
        </Box> */}

        <Box
          sx={{
            width: '462px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: '24px',
          }}
        >
          <CCSelectBox
            variant="outlined"
            sx={{ mr: 1, width: '98px' }}
            name="country_code"
            value={'+91'}
            autoWidth={false}
            items={[{ label: '+91', value: '+91' }]}
            size="small"
          />

          <CCInputField
            label="Phone Number"
            // type="number"
            //comment
            type="string"
            variant="outlined"
            size="small"
            inputProps={{
              maxLength: 10,
            }}
            // error={number !== '' && !isMobilePhone(number, 'en-IN')}
            // helperText={
            //   number !== '' &&
            //   !isMobilePhone(number, 'en-IN') &&
            //   'Enter valid Mobile Number'
            // }
            onChange={(e: any) => {
              setNumber(e.target.value)
            }}
            // onInput={(e: any) => {
            //   const InputElement = e.target as HTMLInputElement
            //   InputElement.value = Math.max(0, parseInt(InputElement.value))
            //     .toString()
            //     .slice(0, 10)
            // }}
            // defaultValue={number}
            sx={{ ml: 4.5 }}
            defaultValue={number}
            clearFn={() => {
              setNumber('')
            }}
            showAdornment={showPhoneNumberAdornment}
            onFocus={() => {
              setShowPhoneNumberAdornment(true)
            }}
            onBlur={() => {
              setShowPhoneNumberAdornment(false)
            }}
          />
        </Box>

        {/* <CCInputField
          label="Password"
          variant="outlined"
          name="password"
          size="small"
          onChange={(e: any) => setPassword(e.target.value)}
          defaultValue={password}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                {!showPassword ? (
                  <HidePassword
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <ShowPassword
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </InputAdornment>
            ),
          }}
          sx={{ width: '462px', mt: '24px' }}
          showAdornment={showPasswordAdornment}
          onFocus={() => {
            setShowPasswordAdornment(true)
          }}
          onBlur={() => {
            setShowPasswordAdornment(false)
          }}
        /> */}
        <CCInputField
          label="Password"
          variant="outlined"
          name="password"
          onChange={(e: any) => setPassword(e.target.value)}
          onBlur={() => {
            setShowPasswordAdornment(false)
          }}
          onFocus={() => {
            setShowPasswordAdornment(true)
          }}
          defaultValue={password}
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

        <Captcha
          token={captchaToken}
          captchaInput={captchaInput}
          setCaptchaInput={setCaptchInput}
          setCaptchaToken={setCaptchaToken}
          sx={{ mt: '10px' }}
        />

        <CCButton
          // fullWidth=
          type="submit"
          onClick={onBoardingNewUser}
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
          Register
        </CCButton>

        <Box
          justifyContent={'center'}
          display="flex"
          alignItems={'center'}
          flexDirection={'column'}
          sx={{ mt: '24px' }}
        >
          <Typography
            sx={{
              // marginTop: '20px',
              // marginBottom: '15px',
              textAlign: 'center',
              fontSize: 16,
              // color: Colors.textColorDarkGreen,
              color: '#0D0E0E',
              fontWeight: '400',
            }}
          >{`Already have an account?`}</Typography>
          {/* <Typography
            onClick={() => navigate(pathNames.LOGIN)}
            sx={{
              fontWeight: '600',
              fontSize: 18,
              px: 1,
              cursor: 'pointer',
              color: Colors.textColorDarkGreen,
            }}
          >
            {' '}
            Login{' '}
          </Typography>
          <Typography
            sx={{
              marginTop: '20px',
              marginBottom: '15px',
              textAlign: 'center',
              fontSize: 14,
              color: Colors.textColorDarkGreen,
              fontWeight: '500',
            }}
          >
            {`here`}
          </Typography> */}

          <CCButton
            // fullWidth=
            type="submit"
            onClick={() => navigate(pathNames.LOGIN)}
            sx={{
              height: '62px',
              width: '462px',
              borderRadius: '8px !important',
              marginTop: '10px !important',
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
            Login
          </CCButton>
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
          backgroundColor: '#0D5058',
          // alignItems: 'center',
          // justifyContent: 'center',
        }}
      >
        <LoginAndSignupSideInfo />
        {/* <Box
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
        /> */}
      </Box>
    </Box>
  )
}

export default RegisterPage
