// React Imports
import React, { FC, useEffect } from 'react'

// MUI Imports
import {
  Grid,
  Box,
  Typography,
  Paper,
  Divider,
  InputAdornment,
} from '@mui/material'

// Local Imports
// import CreditCardImg from '../../assets/Images/illustrations/credit-card.png'
import { Colors } from '../../theme'

import CCInputField from '../../atoms/CCInputField'
import CCButtonOutlined from '../../atoms/CCButtonOutlined'
import CCButton from '../../atoms/CCButton'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Captcha from '../Captcha/Captcha'
interface ChangePasswordProps {
  onChangeInput?: any
  profileDetails?: any
  typeOptions?: any
  setIsChangePassowrdVisible?: any
  onSave?: any
  setSelectedRole?: any
  captchaToken?: any
  captchaInput?: any
  setCaptchaToken?: any
  setCaptchInput?: any
  showPassword?: any
  setShowPassword?: any
  setPassword?: any
  password?: any
  newPassword?: any
  setNewPassword?: any
  showNewPassword?: any
  setShowNewPassword?: any
  setOpenModal?: any
  onChangePassword?: any
}

const ChangePassword: FC<ChangePasswordProps> = (props) => {
  const {
    setIsChangePassowrdVisible,
    onSave,
    captchaToken,
    captchaInput,
    setCaptchaToken,
    setCaptchInput,
    setShowPassword,
    setPassword,
    password,
    newPassword,
    setNewPassword,
    showPassword,
    showNewPassword,
    setShowNewPassword,
    setOpenModal,
    onChangePassword,
  } = props
  return (
    <Paper
      sx={{
        height: '98%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        borderRadius: '8px',

        mt: 1,
        padding: 2,
        ml: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          paddingX: '15px',
        }}
      >
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 400,
            color: Colors.textColorDarkGreen,
            mt: 1,
          }}
        >
          Change Password
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            // width: '100%',
            padding: '10px',
            mt: 2,
          }}
        >
          <CCButtonOutlined
            rounded
            onClick={() => setIsChangePassowrdVisible(false)}
            style={{
              width: '40px',
              height: '40px',
              fontSize: 12,
              fontWeight: 500,
              color: '#005046',
              cursor: 'pointer',
              backgroundColor: '#F6F9F7',
              border: 0,
            }}
          >
            Cancel
          </CCButtonOutlined>
          <CCButton
            onClick={() => onChangePassword()}
            disabled={captchaInput.length !== 6}
            rounded
            style={{
              width: '40px',
              height: '40px',
              fontSize: 12,
              fontWeight: 500,
              marginLeft: '10px',
              backgroundColor: '#006B5E',
              color: ' #FFFFFF',
              cursor: 'pointer',
            }}
          >
            Save
          </CCButton>
        </Box>
      </Box>
      <CCInputField
        label="Old Passsword"
        variant="outlined"
        name="password"
        size="medium"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              {!showPassword ? (
                <VisibilityOffIcon
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <VisibilityIcon
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </InputAdornment>
          ),
        }}
        sx={{ width: '410px', mb: 2 }}
      />

      <CCInputField
        label="New Password"
        variant="outlined"
        name="newPassword"
        size="medium"
        value={newPassword}
        onChange={(e) => {
          const regexExp = /\s/

          if (regexExp.test(e.target.value)) {
            alert('Password cannnot contain empty spaces')
          } else {
            setNewPassword(e.target.value)
          }
        }}
        type={showNewPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              {!showNewPassword ? (
                <VisibilityOffIcon
                  onClick={() => setShowNewPassword(!showNewPassword)}
                />
              ) : (
                <VisibilityIcon
                  onClick={() => setShowNewPassword(!showNewPassword)}
                />
              )}
            </InputAdornment>
          ),
        }}
        sx={{ width: '410px', mb: 2 }}
      />
      <Captcha
        token={captchaToken}
        captchaInput={captchaInput}
        setCaptchaInput={setCaptchInput}
        setCaptchaToken={setCaptchaToken}
        sx={{ mt: 1, width: '520px' }}
      />
      <Typography
        onClick={() => setOpenModal(true)}
        sx={{
          fontWeight: '500',
          fontSize: 18,

          cursor: 'pointer',
          color: '#1D4B44',
          textAlign: 'right',
          width: '410px',
        }}
      >
        Forgot password?
      </Typography>
    </Paper>
  )
}

export default ChangePassword
