import { Checkbox } from '@mui/material'
import React, { FC } from 'react'
import { shallowEqual } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'
import { pathNames } from '../../routes/pathNames'

interface CustomCheckboxProps {
  label: string
  onChange: any
  selectedFilters: any
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({
  label,
  onChange,
  selectedFilters,
}) => {
  const location = useLocation()

  const onWebApp = useAppSelector(({ app }) => !app.throughIFrame, shallowEqual)

  return (
    <Checkbox
      checked={selectedFilters.includes(label)}
      sx={{
        // color: '#55DBC8',
        color: onWebApp ? '#4A635E' : '#DAE5E1',
        '&.Mui-checked': {
          // color: '#55DBC8',
          color: onWebApp ? '#4A635E' : '#DAE5E1',
        },
        '.MuiSvgIcon-root': {
          width: '16px',
          height: '16px',
        },
        width: '26px',
        height: '26px',
      }}
      onChange={onChange}
    />
  )
}

export default CustomCheckbox
