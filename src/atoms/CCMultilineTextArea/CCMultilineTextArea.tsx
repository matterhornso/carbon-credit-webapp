import { InputAdornment, TextField, ThemeProvider } from '@mui/material'
import React, { useRef } from 'react'
import { CCMultilineTextAreaProps } from './CCMultilineTextArea.interface'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { createTheme } from '@mui/material'
import { initialState } from '../../redux/Slices/themeSlice'

const CCMultilineTextArea = (props: CCMultilineTextAreaProps) => {
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
    },
    ...initialState,
  })
  return (
    <ThemeProvider theme={theme}>
      <TextField
        inputRef={inputRef}
        inputProps={{ 'data-testid': 'cc-input-field-multiline' }}
        multiline
        minRows={6}
        fullWidth
        sx={{
          background: '#FFFFFF',
          color: '#3F4946',
        }}
        InputProps={{
          endAdornment: props?.defaultValue ? (
            <InputAdornment
              position="end"
              onClick={() => {
                inputRef.current.value = null
                props.clearFn()
              }}
            >
              <CancelOutlinedIcon sx={{ cursor: 'pointer' }} />
            </InputAdornment>
          ) : null,
        }}
        InputLabelProps={{ style: { color: '#006B5E' } }}
        color={props?.color ? props?.color : 'darkPrimary1'}
        required
        {...props}
      />
    </ThemeProvider>
  )
}
export default CCMultilineTextArea
