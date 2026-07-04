// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Box, Input, TextField, Typography } from '@mui/material'

// Local Imports

interface LabelInputProps {
  label?: string | number
  value?: string | number
  setValue?: any
  sx?: any
  textFieldSx?: any
  onBlur?: any
  placeholder?: string
}

const LabelInput: FC<LabelInputProps> = (props) => {
  return (
    <Box
      sx={{
        mt: 1,
        width: '100%',
        ...props.sx,
      }}
    >
      {/* <Typography sx={{ fontSize: 14, fontWeight: 400, marginBottom: 1 }}>
        {props.label}
      </Typography> */}
      <TextField
        inputProps={{ 'data-testid': 'label-input' }}
        id="outlined-basic"
        label={props.label}
        placeholder={props.placeholder}
        variant="outlined"
        sx={{ width: '100%', ...props.textFieldSx }}
        value={props.value ? props.value : ''}
        onChange={
          props?.setValue
            ? props?.setValue
            : () => {
                return ''
              }
        }
        // {...props}
        onBlur={props?.onBlur}
      />
    </Box>
  )
}

export default LabelInput
