import { Box, Button, Menu, Typography } from '@mui/material'
import React, { FC } from 'react'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Images } from '../../../../theme'

interface InStepTitleProps {
  subTitle: string
  infoText?: any
  color: string
  fontSz?: any
}
const InStepTitle: FC<InStepTitleProps> = ({
  subTitle,
  infoText,
  color,
  fontSz,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      {' '}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            color: color,
            fontWeight: 500,
            fontSize: fontSz ? fontSz : '16px',
          }}
        >
          {subTitle}
        </Box>
        {infoText && (
          <Box>
            <Button onClick={handleClick}>
              <InfoOutlinedIcon sx={{ color: '#029FB3' }} />
            </Button>
          </Box>
        )}
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          boxShadow: 'none',
          '.MuiMenu-paper': {
            boxShadow: 'none',
            borderRadius: '8px',
            py: 1,
            px: 2,
            background: '#DEEBFF',
            maxWidth: 600,
          },
        }}
      >
        <Box
          sx={{
            borderRadius: '8px',
          }}
        >
          {/* <pre>{infoText}</pre> */}
          {infoText}
        </Box>
      </Menu>
    </>
  )
}

export default InStepTitle
