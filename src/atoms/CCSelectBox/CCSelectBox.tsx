import React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { CCSelectBoxProps } from './CCSelectBox.interface'
import './style.css'
import DropIcon from '../DropIcon'

import { createTheme, ThemeProvider } from '@mui/material'
import { initialState } from '../../redux/Slices/themeSlice'

const CCSelectBox = (props: CCSelectBoxProps) => {
  const [age, setAge] = React.useState('Wallet')

  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value)
  // }

  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#B6BDBE',
            },
          },
        },
      },
    },
    ...initialState,
  })

  return (
    <ThemeProvider theme={theme}>
      <FormControl
        variant="outlined"
        sx={{
          color: '#006B5E',
          borderRadius: '4px 4px 0 0',
          // pb: 1
        }}
      >
        {props.label && (
          <InputLabel
            id="demo-simple-select-label"
            sx={{ color: '#01717F', paddingBottom: 1 }}
          >
            {props.label}
          </InputLabel>
        )}
        <Select
          // onChange={props.handleChange}
          labelId="demo-simple-select-label"
          displayEmpty
          inputProps={{
            'aria-label': 'Without label',
            color: '#006B5E',
          }}
          {...props}
          style={{ height: '56px' }}
          // sx={{ '& .MuiSvgIcon-root': { color: '#029FB3' } }}
          // IconComponent={DropIcon}
        >
          {props?.items?.map((item: any, index: number) => {
            return (
              <MenuItem
                key={index.toString()}
                value={item.value}
                sx={{ color: '#006B5E' }}
              >
                {item.value}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </ThemeProvider>
  )
}

export default CCSelectBox
