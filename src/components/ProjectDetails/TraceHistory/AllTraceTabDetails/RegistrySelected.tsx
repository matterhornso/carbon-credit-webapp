import LocationOnIcon from '@mui/icons-material/LocationOn'
import PersonIcon from '@mui/icons-material/Person'
import PhoneIcon from '@mui/icons-material/Phone'
import { Box } from '@mui/system'
import React, { FC } from 'react'
import { Colors } from '../../../../theme'
import TransactionHash from './TransactionHash'

interface RegistrySelectedProps {
  tabData?: any
}

const RegistrySelected: FC<RegistrySelectedProps> = (props) => {
  const { tabData } = props

  return (
    <>
      {props?.tabData?.transactionId ? (
        <TransactionHash txID={props?.tabData?.transactionId} />
      ) : (
        ''
      )}
      <Box sx={{ fontSize: 14, fontWeight: 500, px: 3, py: 1 }}>
        <Box sx={{ color: '#006B5E' }}>Registry Selected for the Project</Box>
        <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
          <PersonIcon sx={{ color: Colors.darkPrimary1, fontSize: 20 }} />
          <Box>
            {tabData?.registryAssignData?.registry_id?.organisationName}
          </Box>
        </Box>
        <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
          <LocationOnIcon sx={{ color: Colors.darkPrimary1, fontSize: 20 }} />
          <Box>{tabData?.registryAssignData?.registry_id?.address}</Box>
        </Box>
        <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
          <PhoneIcon sx={{ color: Colors.darkPrimary1, fontSize: 20 }} />
          <Box>
            {tabData?.registryAssignData?.registry_id?.phone?.toString()}
          </Box>
        </Box>
      </Box>
    </>
  )
}
export default RegistrySelected
