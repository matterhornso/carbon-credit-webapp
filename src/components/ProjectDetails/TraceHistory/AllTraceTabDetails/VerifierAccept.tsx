import LocationOnIcon from '@mui/icons-material/LocationOn'
import PersonIcon from '@mui/icons-material/Person'
import PhoneIcon from '@mui/icons-material/Phone'
import { Box } from '@mui/system'
import React, { FC } from 'react'
import { Colors } from '../../../../theme'

interface VerifierAcceptProps {
  tabData?: any
}

const VerifierAccept: FC<VerifierAcceptProps> = (props) => {
  const { tabData } = props

  return (
    <Box sx={{ fontSize: 14, fontWeight: 500, px: 3 }}>
      <Box sx={{ color: '#006B5E' }}>Verifier accepted Project request</Box>
      <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
        <PersonIcon sx={{ color: Colors.darkPrimary1, fontSize: 20 }} />
        <Box>{tabData?.data?.verifier_name}</Box>
      </Box>
      <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
        <LocationOnIcon sx={{ color: Colors.darkPrimary1, fontSize: 20 }} />
        <Box>{tabData?.data?.verifier_address}</Box>
      </Box>
      <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
        <PhoneIcon sx={{ color: Colors.darkPrimary1, fontSize: 20 }} />
        <Box>{tabData?.data?.verifier_number}</Box>
      </Box>
    </Box>
  )
}
export default VerifierAccept
