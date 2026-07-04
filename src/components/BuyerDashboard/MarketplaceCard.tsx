import { IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC } from 'react'
import { Colors } from '../../theme'
import CheckIcon from '@mui/icons-material/Check'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'

interface MarketplaceCardProps {
  elongated?: boolean
}
const MarketplaceCard: FC<MarketplaceCardProps> = ({ elongated }) => {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        background:
          'radial-gradient(133.53% 133.53% at 50% 133.53%, #006B5E 12.15%, #55A9BB 61.11%, #A3F2E6 100%)',
        // height: 'calc(50vh - 120px)',
        p: 1.5,
        boxShadow: '1px 1px 2px 2px #CCC',
        borderRadius: '8px',
      }}
    >
      <Typography sx={{ fontSize: 18, color: Colors.darkPrimary1 }}>
        Marketplace
      </Typography>
      <Typography sx={{ mt: 1, fontSize: 14, color: '#141D1B' }}>
        Explore and purchase projects listed on the Marketplace.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#DAF7F0',
          padding: 1,
          borderRadius: '12px',
          marginBottom: 1,
          marginTop: elongated ? '80px' : '8px',
        }}
      >
        <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
          Explore Now
        </Typography>
        <IconButton
          color="primary"
          sx={{
            height: '40px',
            width: '40px',
            borderRadius: '20px',
            backgroundColor: '#388E81',
          }}
        >
          <ArrowRightAltIcon
            style={{ color: '#FFF' }}
            onClick={() => navigate(pathNames.MARKETPLACE)}
          />
        </IconButton>
      </Box>
    </Box>
  )
}

export default MarketplaceCard
