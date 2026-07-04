import { Box, Typography } from '@mui/material'
import React from 'react'
import { GenerateDraftPDDMenu } from './data'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

const LeftSection = () => {
  return (
    <Box
      sx={{
        //pt: 1,
        p: 3,
        background: '#E6F5F7',
        height: '100%',
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
        borderRadius: '16px 0 0 16px',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '75vh',
        overflowY: 'auto',
      }}
    >
      {GenerateDraftPDDMenu?.map((i: any, index: number) => (
        <Box
          key={index}
          sx={{
            //background: index === index ? '#BEF7FE' : '#E6F5F7',
            //borderRadius: '8px',
            cursor: 'pointer',
            color: '#01434B',
            //flexGrow: 1,
          }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 500, p: 1 }}>
            {i?.menuName}
          </Typography>
          <Box sx={{ pl: 2 }}>
            {i?.contents?.map((content: any, contentIndex: number) => (
              <Box key={contentIndex} sx={{ py: 1 }}>
                <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                  {content?.name}
                </Typography>
                {i?.subMenu && <ArrowDropDownIcon />}
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default LeftSection
