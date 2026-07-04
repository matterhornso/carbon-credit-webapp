import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC, useEffect, useState } from 'react'
import { Colors, Images } from '../../../../theme'

import { IssuanceHelpContentData } from './SectionA/helpContentData'
interface HelpPopUpIssuanceSectionProps {
  modal?: any

  data?: any
}
const IssuanceSectionWiseContent: FC<HelpPopUpIssuanceSectionProps> = (
  props
) => {
  const { data } = props

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {data && (
        <Box style={{ paddingBottom: '20px' }}>
          <Typography
            sx={{
              mt: 2,
              fontSize: 16,
              fontWeight: 500,
              color: Colors.darkPrimary1,
            }}
          >
            {data?.title}
          </Typography>
          <Typography sx={{ mt: 1, fontSize: 14, color: '#141D1B' }}>
            {data?.description}
          </Typography>
          <Typography
            sx={{
              fontSize: 11,
              color: '#667080',
              textAlign: 'center',
              mb: 2,
              mt: 6,
            }}
          >
            {data?.footerText}
          </Typography>
          {data?.imgSrcEmptyFields && (
            <Box
              sx={{
                mt: 1,
                // height: '220px',
                p: 1,
                bgcolor: Colors.lightPrimary2,
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src={data?.imgSrcEmptyFields}
                // height="200px"
                // width="100%"
                height="auto"
                width="100%"
                style={{ borderRadius: '4px' }}
              />
            </Box>
          )}

          <Typography
            sx={{
              fontSize: 11,
              color: '#667080',
              textAlign: 'center',
              mb: 2,
              mt: 6,
            }}
          >
            {data?.footerTextWith}
          </Typography>
          {data?.imgSrcFields && (
            <Box
              sx={{
                mt: 1,
                // height: '220px',
                p: 1,
                bgcolor: Colors.lightPrimary2,
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src={data?.imgSrcFields}
                // height="200px"
                // width="100%"
                height="auto"
                width="100%"
                style={{ borderRadius: '4px' }}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}

export default IssuanceSectionWiseContent
