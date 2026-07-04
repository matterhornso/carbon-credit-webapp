import React, { useRef, useState } from 'react'
import { CARBON_SERVICES } from '../../../config/services.config'
import { Box, Typography } from '@mui/material'
import navbar_carbon_logo from '../../../assets/Images/logo/navbar_climat_logo.svg'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import useClickOutside from '../../../hooks/useClickOutside'
import { useNavigate } from 'react-router-dom'
import { setSelectedService } from '../../../redux/Slices/serviceSlice'
import { useAppDispatch } from '../../../hooks/reduxHooks'

const ServiceDropdown = () => {
  const ref = useRef()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [openServicesList, setOpenServicesList] = useState<boolean>(false)
  const [selectedServiceName, setSelectedServiceName] = useState<any>(
    CARBON_SERVICES[2]?.serviceName
  )
  const [selectedServiceDesc, setSelectedServiceDesc] = useState<any>(
    CARBON_SERVICES[2]?.serviceDesc
  )

  useClickOutside(ref, () => {
    openServicesList && setOpenServicesList(false)
  })

  return (
    <Box ref={ref} sx={{ position: 'relative' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: 1 }}>
        <Box>
          <img src={navbar_carbon_logo} />
        </Box>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              sx={{ color: '#01434B', fontWeight: 500, fontSize: '14px' }}
            >
              {selectedServiceName}
            </Typography>
            <KeyboardArrowDownIcon
              sx={{ color: '#1D4B44' }}
              onClick={() => setOpenServicesList(true)}
            />
          </Box>
          <Typography sx={{ color: '#868686', fontSize: 12, fontWeight: 400 }}>
            {selectedServiceDesc}
          </Typography>
        </Box>
      </Box>
      <Box>
        {openServicesList && (
          <Box
            sx={{
              position: 'absolute',
              color: 'black',
              right: '-130px',
              width: '330px',
              boxShadow: '0px 4px 4px 0px #00000029',
              borderRadius: '8px',
              background: '#fff',
              p: 1,
            }}
          >
            {CARBON_SERVICES.map((i: any, index: any) => (
              <Box
                key={index}
                sx={{ pb: 2, cursor: 'pointer' }}
                onClick={() => {
                  setOpenServicesList(false)
                  setSelectedServiceName(i?.serviceName)
                  setSelectedServiceDesc(i?.serviceDesc)
                  i?.serviceValue !== 'report' &&
                    dispatch(setSelectedService(i?.serviceValue))
                  i?.existInApp
                    ? navigate(i.serviceLink)
                    : window.open(i.serviceLink, '_blank')
                }}
              >
                <Typography
                  sx={{ color: '#01434B', fontWeight: 500, fontSize: 14 }}
                >
                  {i?.serviceName}
                </Typography>
                <Typography
                  sx={{ color: '#868686', fontWeight: 500, fontSize: 12 }}
                >
                  {i?.serviceDesc}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  )
}
export default ServiceDropdown
