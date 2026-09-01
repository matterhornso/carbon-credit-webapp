import React, { useState } from 'react'
import { useEffect } from 'react'
import { Colors } from '../../theme'
import RefreshIcon from '@mui/icons-material/Refresh'
import { v4 as uuidv4 } from 'uuid'
import { CaptchaProps } from './Captcha.interface'
import { authCalls } from '../../api/authCalls'
import { Box } from '@mui/system'
import CCInputField from '../../atoms/CCInputField'
import { handleApiError } from '../../utils/errorHandler'

export default function Captcha({
  captchaInput,
  setCaptchaInput,
  setCaptchaToken,
  token,
  sx,
}: CaptchaProps) {
  const [captchaImg, setCaptchaImg] = useState<any>()

  useEffect(() => {
    if (token) {
      getCaptcha(token)
    }
  }, [token])

  const getCaptcha = async (token: string) => {
    authCalls
      .getCaptcha(token)
      .then((imageBlob) => {
        const imageObjectURL = URL.createObjectURL(imageBlob)
        setCaptchaImg(imageObjectURL)
      })
      .catch((e) => handleApiError(e, { action: 'Captcha:33' }))
  }

  return (
    <Box
      sx={{
        display: 'flex',
        // flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        px: 2,
        mt: 2,
        ...sx,
      }}
    >
      <img
        src={captchaImg}
        style={{
          width: 120,
          height: 30,
          marginTop: 10,
        }}
      />
      <Box
        sx={{
          alignSelf: 'center',
          cursor: 'pointer',
          fontSize: 12,
          color: Colors.darkPrimary1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 1,
        }}
        onClick={() => setCaptchaToken(uuidv4())}
      >
        <RefreshIcon
          style={{
            fontSize: 16,
            marginRight: 20,
            marginLeft: 20,
            color: Colors.darkPrimary1,
            fontWeight: '500',
          }}
        />
      </Box>

      <CCInputField
        placeholder="Captcha"
        size="small"
        variant="outlined"
        sx={{ width: 120, mt: 1 }}
        value={captchaInput}
        onChange={(e: any) => setCaptchaInput(e.target.value)}
        inputProps={{
          maxLength: 6,
        }}
        showAdornment={false}
      />
    </Box>
  )
}
