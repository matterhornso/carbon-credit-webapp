import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { DashboardTabFiltersPropsInterface } from './DashboardTabFilters.interface'
import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  ThemeProvider,
  createTheme,
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { initialState } from '../../redux/Slices/themeSlice'

const DashboardTabFilters = ({
  btnTitle,
  menuFilterList,
  setAppliedFilters,
  appliedFilters,
}: DashboardTabFiltersPropsInterface) => {
  const theme = createTheme({
    components: {
      MuiMenu: {
        styleOverrides: {
          list: {
            my: 0,
            py: 0,
          },
        },
      },
    },
    ...initialState,
  })

  const [selectedFilters, setSelectedFilters] = useState<any[]>([])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  useEffect(() => {
    if (selectedFilters.length !== 0 && appliedFilters.length === 0) {
      setSelectedFilters(appliedFilters)
    }
  }, [appliedFilters])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onSelectFilter = (event: any, index: number) => {
    if (selectedFilters.includes(event.target.name)) {
      const updatedFilters = [...selectedFilters].filter((i: any) => {
        return i !== event.target.name
      })
      setSelectedFilters(updatedFilters)
    } else setSelectedFilters([event.target.name, ...selectedFilters])
  }

  const onClear = () => {
    setSelectedFilters([])
    setAppliedFilters([])
  }

  const onApply = () => {
    setAppliedFilters(selectedFilters)
    handleClose()
  }

  return (
    <>
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <Box>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{
              textTransform: 'unset',
              fontSize: '14px',
              color: ' #01434B',
              height: '38x',
              minWidth: '136px',
              background: '#DEEBFF',
              pr: selectedFilters.length !== 0 ? '30px' : '0px',
              borderRadius: '10px',
              cursor: 'pointer',
            }}
          >
            {btnTitle}
          </Button>
        </Box>
        <Box sx={{ ml: 2 }}>
          {selectedFilters.length !== 0 && (
            <ClearIcon
              onClick={onClear}
              sx={{
                position: 'absolute',
                top: '9px',
                right: '8px',
                zIndex: 999,
                width: '20px',
                height: '20px',
              }}
            />
          )}
        </Box>
      </Box>
      <ThemeProvider theme={theme}>
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {menuFilterList?.map((i: any, index: number) => (
            <MenuItem key={i + index} sx={{ pl: '20px', pr: 15, py: '2px' }}>
              <FormControlLabel
                control={<Checkbox />}
                label={i.name}
                name={i.title}
                onChange={(e) => onSelectFilter(e, index)}
                checked={selectedFilters.includes(i.title) ? true : false}
              />
            </MenuItem>
          ))}
          <Stack flexDirection={'row'} sx={{ pl: '10px', pb: 1 }}>
            <Button
              onClick={onApply}
              sx={{
                background: '#DEEBFF',
                fontSize: '14px',
                color: ' #01434B',
                fontWeight: 500,
              }}
            >
              Apply
            </Button>
            <Button
              variant="outlined"
              onClick={onClear}
              sx={{
                fontSize: '14px',
                fontWeight: 500,
                outline: 'none',
                border: 'none',
              }}
            >
              Clear
            </Button>
          </Stack>
        </Menu>
      </ThemeProvider>
    </>
  )
}

export default DashboardTabFilters
