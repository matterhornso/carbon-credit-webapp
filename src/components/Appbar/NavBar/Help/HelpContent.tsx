import { KeyboardArrowLeft } from '@mui/icons-material'
import { Box, Divider } from '@mui/material'
import React, { FC } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import SectionWiseContent from './SectionWiseContent'

interface HelpContentProps {
  closeMenu: any
}
const HelpContent: FC<HelpContentProps> = ({ closeMenu }) => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 18,
            color: '#1D4B44',
          }}
        >
          <KeyboardArrowLeft sx={{ cursor: 'pointer' }} onClick={closeMenu} />
          Help Center
        </Box>
        <CloseIcon sx={{ cursor: 'pointer' }} onClick={closeMenu} />
      </Box>
      <Box sx={{ mt: 2, color: '#858585', fontSize: 14 }}>
        For a hassle-free experience using our site, check out the commonly
        asked questions!
      </Box>
      <Divider sx={{ mt: 2, color: '#E8E8E8' }} />
      <SectionWiseContent />
    </Box>
  )
}

export default HelpContent
