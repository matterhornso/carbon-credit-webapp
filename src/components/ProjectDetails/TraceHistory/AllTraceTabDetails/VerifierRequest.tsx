import PersonIcon from '@mui/icons-material/Person'
import { List, ListItem } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC } from 'react'
import { Colors } from '../../../../theme'

interface VerifierRequestProps {
  tabData?: any
}

const VerifierRequest: FC<VerifierRequestProps> = (props) => {
  const { tabData } = props

  return (
    <Box sx={{ fontSize: 14, fontWeight: 500, px: 3 }}>
      <Box sx={{ color: '#006B5E' }}>Potential Verifier(s)</Box>
      <List sx={{ p: 0 }}>
        {tabData?.verifierRequestData &&
          tabData?.verifierRequestData.length > 0 &&
          tabData?.verifierRequestData.map((verifier: any, index: number) => (
            <ListItem key={index} sx={{ p: 0, mt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ color: Colors.darkPrimary1, fontSize: 20 }} />
                <Box>
                  {verifier?.verifier_id?.organisationName
                    ? verifier?.verifier_id?.organisationName
                    : '-'}
                </Box>
              </Box>
            </ListItem>
          ))}
      </List>
    </Box>
  )
}
export default VerifierRequest
