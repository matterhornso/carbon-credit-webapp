import { Box, Checkbox } from '@mui/material'
import React, { FC } from 'react'

interface CheckboxDivProps {
  title: string
  name?: string
  onChange?: any
  checked?: any
  pointerEvents?: boolean
}

const CheckboxDiv: FC<CheckboxDivProps> = ({
  title,
  name,
  checked,
  onChange,
  pointerEvents = false,
}) => {
  return (
    <Box
      sx={{
        background: '#E6F5F7',
        display: 'flex',
        mt: 2,
        py: 2,
        pl: 2,
        alignItems: 'center',
        borderRadius: '8px',
        columnGap: 1,
      }}
    >
      <Box>
        <Checkbox
          name={name ? name : ''}
          checked={checked}
          sx={{
            color: '#01717F',
            height: '30px',
            width: '30px',
            '&.Mui-checked': {
              color: '#029FB3',
            },
            pointerEvents: pointerEvents ? 'none' : '',
          }}
          onChange={(e) => onChange(e)}
        />
      </Box>
      <Box sx={{ color: '#01717F', fontSize: '32px' }}>{title}</Box>
    </Box>
  )
}

export default CheckboxDiv
