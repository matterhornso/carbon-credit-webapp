import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import React, { FC } from 'react'
import './index.css'
interface RadioGroupDivProps {
  onChange?: any
  value?: any
  radioGroupName?: string
  radioButtonData: any
}

const RadioGroupDiv: FC<RadioGroupDivProps> = ({
  value,
  radioGroupName,
  onChange,
  radioButtonData,
}) => {
  return (
    <Box>
      <FormControl sx={{ width: '100%' }}>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name={radioGroupName}
          value={value}
          onChange={(e) => onChange(e)}
        >
          {radioButtonData &&
            radioButtonData.length > 0 &&
            radioButtonData.map((data: any, index: number) => (
              <Box
                key={index}
                sx={{
                  px: 2,
                  background: '#E6F5F7',
                  mt: 2,
                  py: 2,
                  borderRadius: '8px',
                }}
              >
                <FormControlLabel
                  value={data?.value}
                  control={
                    <Radio
                      sx={{
                        color: '#01717F',
                        '&.Mui-checked': {
                          color: '#029FB3',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label={data?.label}
                  sx={{
                    // fontSize: 40,
                    '&.Mui-Typography': {
                      fontSize: 40,
                    },
                  }}
                />
              </Box>
            ))}
        </RadioGroup>
      </FormControl>
    </Box>
  )
}

export default RadioGroupDiv
