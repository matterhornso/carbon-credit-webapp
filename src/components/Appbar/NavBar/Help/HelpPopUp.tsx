import { Button, Divider, Menu, Modal, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC } from 'react'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import HelpContent from './HelpContent'
import { useLocation } from 'react-router-dom'
import { pathNames } from '../../../../routes/pathNames'
import IssuanceSectionWiseContent from './IssuanceSectionWiseContent'
import DashboardHelpSection from './DashboardHelpSection'
import { DashboardHelpSectionFAQ } from './SectionA/helpContentData'
import CloseIcon from '@mui/icons-material/Close'
interface HelpPopUpProps {
  modal?: any
  setModal?: any
  data?: any
  issuanceVisible?: any
  dashboardVisible?: any
}
const HelpPopUp: FC<HelpPopUpProps> = (props) => {
  const location = useLocation()
  const { modal, setModal, data, issuanceVisible, dashboardVisible } = props

  return (
    <Modal
      open={modal}
      onClose={() => setModal(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        background: 'rgba(56, 142, 129, 0.4)',
        overflow: 'scroll',
        maxHeight: '100%',
      }}
    >
      <Paper
        sx={{
          px: 3,
          py: 3,
          // display: 'flex',
          // flexDirection: 'column',
          // alignItems: 'center',
          // justifyContent: 'center',
          borderRadius: 3,
          width: dashboardVisible ? '30%' : '50%',
          height: '100%',
          outline: 'none',
          overflowY: 'scroll',

          // maxHeight: '100vh',
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography textAlign="left" sx={{ fontWeight: 500, fontSize: 20 }}>
              Help Center
            </Typography>
            <CloseIcon
              sx={{ cursor: 'pointer' }}
              onClick={() => setModal(false)}
            />
          </Box>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: 14,
              pt: 3,
              pb: 3,
              color: '#858585',
            }}
          >
            For a hassle-free experience using our site, check out the commonly
            asked questions!
          </Typography>
          <Divider sx={{ mt: 2, color: '#E8E8E8' }} />
        </Box>

        {issuanceVisible ? <IssuanceSectionWiseContent data={data} /> : null}
        {dashboardVisible ? <DashboardHelpSection data={data} /> : null}
      </Paper>
    </Modal>
  )
}

export default HelpPopUp
