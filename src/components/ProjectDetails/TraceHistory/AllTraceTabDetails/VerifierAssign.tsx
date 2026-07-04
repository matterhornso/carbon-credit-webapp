import LocationOnIcon from '@mui/icons-material/LocationOn'
import PersonIcon from '@mui/icons-material/Person'
import PhoneIcon from '@mui/icons-material/Phone'
import { Box } from '@mui/system'
import React, { FC } from 'react'
import { Colors } from '../../../../theme'
import TransactionHash from './TransactionHash'

interface VerifierAssignProps {
  tabData?: any
}

const VerifierAssign: FC<VerifierAssignProps> = (props) => {
  const { tabData } = props

  return (
    <>
      {tabData?.transactionId ? (
        <TransactionHash txID={tabData?.transactionId} />
      ) : (
        ''
      )}
      <Box sx={{ mt: 1, fontSize: 14, fontWeight: 500, px: 3 }}>
        <Box sx={{ color: '#006B5E' }}>Finalised Verifier</Box>
        <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
          <PersonIcon sx={{ color: Colors.darkPrimary1, fontSize: 20 }} />
          <Box>
            {tabData?.verifierAssignData?.verifier_id?.organisationName || '-'}
          </Box>
        </Box>
        <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
          <LocationOnIcon sx={{ color: Colors.darkPrimary1, fontSize: 20 }} />
          <Box>{tabData?.verifierAssignData?.verifier_id.address || '-'}</Box>
        </Box>
        <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
          <PhoneIcon sx={{ color: Colors.darkPrimary1, fontSize: 20 }} />
          <Box>{tabData?.verifierAssignData?.verifier_id.phone || '-'}</Box>
        </Box>
      </Box>
    </>
  )
}
export default VerifierAssign
