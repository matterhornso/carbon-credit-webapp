import { Menu, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import LanguageIcon from '@mui/icons-material/Language'
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { USER } from '../../api/user.api'
import Spinner from '../../atoms/Spinner'

interface VerifierDetailsProps {
  verifierDetails: any
  //verifierId: string
  anchorEl: any
  handleClose: any
  open: any
}

const VerifierDetails = ({
  verifierDetails,
  anchorEl,
  handleClose,
  open,
}: VerifierDetailsProps) => {
  //const [verifierDetails, setVerifierDetails] = useState<any | null>(null)

  return (
    <>
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
            boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.12)',
            borderRadius: '16px',
            py: 1,
            px: 1,
          },
        }}
      >
        {/*{loading ? (
          <Box
            sx={{
              minHeight: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Spinner />
          </Box>
        ) : (*/}
        <Box>
          <Box sx={{ display: 'flex' }}>
            <PlaceOutlinedIcon sx={{ color: '#006B5E', mr: 1 }} />
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
              {verifierDetails?.address}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', mt: 1 }}>
            <LanguageIcon
              sx={{
                color: '#006B5E',
                mr: 1,
              }}
            />
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 500,
                color: '#25BBD2',
                textDecoration: 'underline',
              }}
            >
              {verifierDetails?.website}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', mt: 1 }}>
            <PermIdentityOutlinedIcon sx={{ color: '#006B5E', mr: 1 }} />
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
              {verifierDetails?.fullName}, {verifierDetails?.designation}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', mt: 1 }}>
            <PhoneInTalkOutlinedIcon sx={{ color: '#006B5E', mr: 1 }} />
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
              {verifierDetails?.phone}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', mt: 1 }}>
            <MailOutlineIcon sx={{ color: '#006B5E', mr: 1 }} />
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 500,
                color: '#25BBD2',
                textDecoration: 'underline',
              }}
            >
              {verifierDetails?.email}
            </Typography>
          </Box>
        </Box>
        {/*)}*/}
      </Menu>
    </>
  )
}

export default VerifierDetails
