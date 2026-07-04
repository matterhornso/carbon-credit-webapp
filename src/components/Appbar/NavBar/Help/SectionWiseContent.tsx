import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Colors, Images } from '../../../../theme'
import { HelpContentData } from './helpContentData'

const SectionWiseContent = () => {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    setData(HelpContentData)
  }, [])

  return (
    <>
      {data && (
        <Box>
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
            {data?.sectionDescription}
          </Typography>
          {data.steps &&
            data.steps.length > 0 &&
            data.steps.map((step: any, index: number) => (
              <Box key={index}>
                <Typography
                  sx={{
                    mt: 2,
                    fontSize: 14,
                    fontWeight: 500,
                    color: Colors.lightPrimary1,
                  }}
                >
                  {step?.title}
                </Typography>
                <Typography sx={{ mt: 1, fontSize: 14, color: '#141D1B' }}>
                  {step?.description}
                </Typography>
                {step?.imgSrc && (
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
                      src={step?.imgSrc}
                      // height="200px"
                      // width="100%"
                      height="auto"
                      width="100%"
                      style={{ borderRadius: '4px' }}
                    />
                  </Box>
                )}
                <Typography sx={{ mt: 1, fontSize: 11, color: '#667080' }}>
                  {step?.footerText}
                </Typography>
              </Box>
            ))}
        </Box>
      )}
    </>
  )
}

export default SectionWiseContent
