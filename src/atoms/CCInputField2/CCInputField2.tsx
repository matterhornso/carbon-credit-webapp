import React from 'react'
import { InputAdornment, TextField } from '@mui/material'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { CCInputFieldProps2 } from './CCInputField2.interface'
import { useRef } from 'react'

const CCInputField2 = (props: CCInputFieldProps2) => {
  const textFieldRef = useRef<any>(null)

  return (
    <TextField
      id="standard-basic"
      // label="DD /  MM /  YYYY"
      // placeholder="DD /  MM /  YYYY"
      variant="standard"
      inputRef={textFieldRef}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        sx: {
          '&::placeholder': {
            color: 'rgba(1, 113, 127, 0.6) !important',
            fontWeight: '500 !important',
            opacity: '1 !important',
          },
          width: '175px',
          height: '25px',
          fontSize: '20px',
          fontWeight: '400',
        },
        placeholder: 'DD / MM / YYYY',
      }}
      sx={{
        '& .MuiInput-input': {
          fontSize: '36px',
          color: '#029FB3',
        },
        '& .Mui-error:before': {
          borderBottomColor: '#B6BDBE !important',
        },
        '& .Mui-error:after': {
          borderBottomColor: '#B6BDBE !important',
          borderWidth: '0px',
        },
        svg: { color: '#029FB3', fontSize: '32px' },
        '& .MuiInputBase-root': {
          ':hover': {
            ':before': {
              borderColor: '#B6BDBE !important',
              borderWidth: '1px',
            },
            ':after': {
              borderColor: '#B6BDBE !important',
              borderWidth: '1px',
            },
          },
        },
      }}
      InputProps={{
        endAdornment: props?.defaultValue ? (
          <InputAdornment
            position="end"
            onClick={() => {
              textFieldRef.current.value = null
              props.clearFn()
            }}
          >
            <CancelOutlinedIcon sx={{ cursor: 'pointer' }} />
          </InputAdornment>
        ) : null,
      }}
      required={props?.notRequired ? false : true}
      {...props}
    />
  )
}

export default CCInputField2
