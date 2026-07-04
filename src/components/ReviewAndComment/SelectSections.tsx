import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Colors } from '../../theme'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import {
  setSelectedSection,
  setSelectedSectionIndex,
} from '../../redux/Slices/commentsSlice'

export default function SelectSections() {
  const dispatch = useAppDispatch()

  const sections = useAppSelector(
    ({ comments }) => comments.sections,
    shallowEqual
  )
  const selectedSection = useAppSelector(
    ({ comments }) => comments.selectedSection,
    shallowEqual
  )

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuClick = (section: string, index: number) => {
    dispatch(setSelectedSectionIndex(index))
    dispatch(setSelectedSection(section))
    handleClose()
  }

  return (
    <Box
      sx={{
        p: 2,
        background: '#fff',
        borderBottom: '1px solid #A8ACAA',
      }}
    >
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ p: 0 }}
      >
        <Typography sx={{ fontWeight: 500, fontSize: 16, color: 'black' }}>
          {selectedSection ? selectedSection?.name : ''}
        </Typography>
        &nbsp;
        <ArrowDropDownIcon sx={{ color: Colors.darkPrimary1 }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {sections &&
          sections.length &&
          sections.map((section: any, index: number) => (
            <MenuItem
              key={index}
              onClick={() => handleMenuClick(section, index)}
            >
              <Box
                sx={{
                  fontSize: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box>{section?.name}</Box>
                {section?.unreadCount ? (
                  <Box
                    sx={{
                      ml: 1,
                      p: '4px',
                      background: Colors.lightPrimary2,
                      color: Colors.darkPrimary1,
                      borderRadius: '50%',
                      height: '20px',
                      width: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    {section?.unreadCount}
                  </Box>
                ) : null}
              </Box>
            </MenuItem>
          ))}
      </Menu>
    </Box>
  )
}
