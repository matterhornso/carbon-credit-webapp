import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC, useEffect, useState } from 'react'
import { Colors, Images } from '../../../../theme'

import { IssuanceHelpContentData } from './SectionA/helpContentData'
interface HelpPopUpIssuanceAllSectionProps {
  modal?: any

  data?: any
}
const IssuanceAllSectionContent: FC<HelpPopUpIssuanceAllSectionProps> = (
  props
) => {
  const { data } = props

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {data && (
        <Box>
          <Typography
            sx={{
              my: 2,
              fontSize: 16,
              fontWeight: 500,
              color: Colors.darkPrimary1,
            }}
          >
            {data?.title}
          </Typography>
          <Typography sx={{ mt: 3, fontSize: 14, color: '#141D1B' }}>
            {data?.description}
          </Typography>

          {data.steps &&
            data.steps.length > 0 &&
            data.steps.map((step: any, index: number) => (
              <Box key={index}>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: Colors.lightPrimary1,
                    mb: 2,
                    mt: 6,
                  }}
                >
                  {step?.title}
                </Typography>
                <Typography sx={{ fontSize: 14, color: '#141D1B', mt: 3 }}>
                  {step?.description}
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
                  {step?.footerText}
                </Typography>
                {step?.imgSrcEmptyFields && (
                  <Box
                    sx={{
                      mt: 1,
                      // height: '220px',
                      p: 1,
                      bgcolor: Colors.lightPrimary2,
                      borderRadius: '4px',
                      // display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={step?.imgSrcEmptyFields}
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
                  {step?.footerTextWith}
                </Typography>
                {step?.imgSrcFields && (
                  <Box
                    sx={{
                      mt: 1,
                      // height: '220px',
                      p: 1,
                      bgcolor: Colors.lightPrimary2,
                      borderRadius: '4px',
                      // display: 'flex',
                      alignItems: 'center',
                      mb: 4,
                    }}
                  >
                    <img
                      src={step?.imgSrcFields}
                      // height="200px"
                      // width="100%"
                      height="auto"
                      width="100%"
                      style={{ borderRadius: '4px' }}
                    />
                  </Box>
                )}

                {step.subSections &&
                  step.subSections.length > 0 &&
                  step.subSections.map((subSections: any, index: number) => (
                    <Box key={index}>
                      <Typography
                        sx={{
                          mt: -3,

                          fontSize: 14,
                          fontWeight: 500,
                          color: Colors.lightPrimary1,
                        }}
                      >
                        {subSections?.title}
                      </Typography>
                      <Typography
                        sx={{ mb: 2, mt: 3, fontSize: 14, color: '#141D1B' }}
                      >
                        {subSections?.description}
                      </Typography>
                      <Typography
                        sx={{
                          mb: 2,
                          mt: 6,
                          fontSize: 11,
                          color: '#667080',
                          textAlign: 'center',
                        }}
                      >
                        {subSections?.footerText}
                      </Typography>
                      {subSections?.imgSrcEmptyFields && (
                        <Box
                          sx={{
                            mt: 1,
                            // height: '220px',
                            p: 1,
                            bgcolor: Colors.lightPrimary2,
                            borderRadius: '4px',
                            // display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <img
                            src={subSections?.imgSrcEmptyFields}
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
                          mb: 2,
                          mt: 6,
                          fontSize: 11,
                          color: '#667080',
                          textAlign: 'center',
                        }}
                      >
                        {subSections?.footerTextWith}
                      </Typography>
                      {subSections?.imgSrcFields && (
                        <Box
                          sx={{
                            mt: 1,
                            mb: 8,
                            // height: '220px',
                            p: 1,
                            bgcolor: Colors.lightPrimary2,
                            borderRadius: '4px',
                            // display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <img
                            src={subSections?.imgSrcFields}
                            // height="200px"
                            // width="100%"
                            height="auto"
                            width="100%"
                            style={{ borderRadius: '4px' }}
                          />
                        </Box>
                      )}
                    </Box>
                  ))}
              </Box>
            ))}
        </Box>
      )}
    </Box>
  )
}

export default IssuanceAllSectionContent
