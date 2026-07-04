import {
  createTheme,
  InputAdornment,
  TextField,
  ThemeProvider,
} from '@mui/material'
import React, { useRef } from 'react'
import { CCInputFieldProps } from './CCInputField.interface'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { initialState } from '../../redux/Slices/themeSlice'

import './style.css'

const CCInputField = (props: CCInputFieldProps) => {
  const inputRef = useRef<any>(null)
  const theme = createTheme({
    components: {
      MuiFormLabel: {
        styleOverrides: {
          asterisk: {
            color: 'red',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#B6BDBE',
            },
          },
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            color: '#029FB3',
          },
        },
      },
    },
    ...initialState,
  })

  return (
    <ThemeProvider theme={theme}>
      <TextField
        inputProps={{ 'data-testid': 'cc-input-field' }}
        variant="outlined"
        inputRef={inputRef}
        fullWidth
        sx={{
          // background: '#EEF3F7 !important',
          color: '#0D0E0E',
          borderRadius: '4px 4px 0 0',
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: 'orange',
            },
          },
          position: 'relative',
        }}
        InputProps={{
          sx: { height: '56px' },
          // endAdornment: props?.defaultValue ? (
          //   <InputAdornment
          //     position="end"
          //     onClick={() => {
          //       inputRef.current.value = null
          //       props.clearFn()
          //     }}
          //   >
          //     <CancelOutlinedIcon sx={{ cursor: 'pointer' }} />
          //   </InputAdornment>
          // ) : null,
          endAdornment:
            props?.defaultValue || props?.showAdornment ? (
              <InputAdornment
                position="end"
                onClick={() => {
                  inputRef.current.value = null
                  props.clearFn()
                }}
                sx={{ height: 20 }}
              >
                <CancelOutlinedIcon sx={{ cursor: 'pointer' }} />
              </InputAdornment>
            ) : null,
        }}
        InputLabelProps={{
          shrink:
            props?.showAdornment || inputRef.current?.value ? true : false,
          style: { color: props?.disabled ? '#BFC9C6' : '#006B5E' },
        }}
        color={props?.color ? props?.color : 'darkPrimary1'}
        // color={props?.color ? 'info' : 'warning'}
        required={props?.notRequired ? false : true}
        FormHelperTextProps={{
          style: {
            position: 'absolute',
            top: '53px',
          },
        }}
        {...props}
      />
    </ThemeProvider>
  )
}
export default CCInputField
