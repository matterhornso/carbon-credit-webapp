import { Box, Typography } from '@mui/material'
import React from 'react'
import { Images } from '../../theme'
import CCButton from '../../atoms/CCButton'
import { CARBON_SERVICES } from '../../config/services.config'
import { useNavigate } from 'react-router-dom'
import { setSelectedService } from '../../redux/Slices/serviceSlice'
import { useAppDispatch } from '../../hooks/reduxHooks'

const NewUserLandingPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  return (
    <Box sx={{ width: '100%', height: '100%', px: 25 }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          pb: 18,
          pt: 8,
        }}
      >
        <img src={Images.ClimatIconRevised} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {CARBON_SERVICES.map((i: any, index: number) => (
          <Box key={index}>
            <Box sx={{}}>
              <img src={i.serviceImg} />
            </Box>
            <Typography
              sx={{
                color: '#00A8FF',
                fontWeight: 500,
                fontSize: '16px',
                textAlign: 'center',
                pt: 3,
                pb: 1,
              }}
            >
              {i.serviceName}
            </Typography>
            <Typography
              sx={{
                color: '#252223',
                fontSize: '12px',
                fontWeight: 500,
                textAlign: 'center',
              }}
            >
              {i.serviceDesc}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
              <CCButton
                onClick={() => {
                  if (i?.existingApp) {
                    if (i?.serviceValue === 'marketPlace') {
                      dispatch(setSelectedService(i?.serviceValue))
                    }
                    navigate(i?.serviceLink)
                  } else {
                    window.open(i.serviceLink, '_blank')
                  }
                  i?.existInApp
                    ? navigate(i.serviceLink)
                    : window.open(i.serviceLink, '_blank')
                }}
                sx={{
                  background: '#252223',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: 14,
                  color: '#fff',
                  minWidth: '0px',
                  width: '80px',
                  padding: '5px 23px',
                }}
              >
                Start
              </CCButton>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default NewUserLandingPage
