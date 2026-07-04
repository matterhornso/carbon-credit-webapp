import { Box, Typography } from '@mui/material'
import React from 'react'

const SectionTitle = ({ title, sectionTitle = true }: any) => {
  return (
    <Box sx={{ mb: sectionTitle ? '14px' : '10px' }}>
      <Typography
        sx={{
          color: sectionTitle ? '#0D5058' : '#000',
          fontWeight: 500,
          fontSize: sectionTitle ? '20px' : '18px',
          textTransform: 'capitalize',
        }}
      >
        {/*{capitalizeFirstLetters(title)}*/}
        {title}
      </Typography>
    </Box>
  )
}

export default SectionTitle
