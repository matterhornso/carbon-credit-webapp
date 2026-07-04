import { Box } from '@mui/system'
import React, { FC } from 'react'
import { PROJECT_ALL_STATUS, ROLES } from '../../config/constants.config'
import { Colors } from '../../theme'
import { getLocalItem } from '../../utils/Storage'
import Reports from './Reports'

interface ReportsTabProps {
  projectDetails: any
  verifierStatus?: any
}
const ReportsTab: FC<ReportsTabProps> = ({
  projectDetails,
  verifierStatus,
}) => {
  const userType = getLocalItem('userDetails')?.type

  const getText = (project_status: number) => {
    switch (project_status) {
      case 3: {
        return 'Please Approve or Reject Project Developer request'
      }
      case 4: {
        return 'Verifier Yet to be confirmed from Issuer side'
      }
      case 9: {
        return 'Project Rejected from Issuer side'
      }
      case 10: {
        return 'Project Rejected from Verifier side'
      }
    }
  }
  return (
    <Box>
      {userType === ROLES.VERIFIER &&
      [
        PROJECT_ALL_STATUS.POTENTIAL_VERIFIER_SELECTED,
        PROJECT_ALL_STATUS.VERIFIER_APPROVED_THE_PROJECT,
        PROJECT_ALL_STATUS.REJECTED_BY_THE_ISSUER,
        PROJECT_ALL_STATUS.REJECTED_BY_THE_VERIFIER,
      ].includes(verifierStatus) ? (
        <Box
          sx={{
            p: 4,
            mt: 1,
            background: '#FFF',
            color: Colors.darkPrimary1,
            fontSize: 22,
            fontWeight: 500,
            borderRadius: '8px',
            boxShadow: '0px 5px 20px rgba(45, 95, 87, 0.1)',
          }}
        >
          {getText(verifierStatus)}
        </Box>
      ) : (
        <Reports projectDetails={projectDetails} />
      )}
    </Box>
  )
}

export default ReportsTab
