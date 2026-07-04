import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC, useEffect, useState } from 'react'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye'

import { Colors, Images } from '../../theme'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
interface DashboardHelpSectionProps {
  modal?: any

  data?: any
  setQuestions?: any
  selectQuestion?: any
}
const DashboardHelpSection: FC<DashboardHelpSectionProps> = (props) => {
  const { data, setQuestions, selectQuestion } = props
  const navigate = useNavigate()

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {data && (
        <Box>
          <Typography
            sx={{
              mt: 2,
              fontSize: 20,
              fontWeight: 500,
              color: Colors.darkPrimary1,
              pb: 3,
            }}
          >
            {data?.title}
          </Typography>

          {data.questions &&
            data.questions.length > 0 &&
            data.questions.map((step: any, index: number) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  py: 2,
                  cursor: 'pointer',
                  backgroundColor:
                    selectQuestion === index
                      ? Colors.lightGreenBackground3
                      : Colors.white,
                  borderRadius: 2,
                }}
                onClick={() => setQuestions(index)}
              >
                <PanoramaFishEyeIcon
                  style={{
                    height: 18,
                    color: Colors.darkGreen,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    ml: 2,
                  }}
                >
                  {step?.title}
                </Typography>
              </Box>
            ))}
        </Box>
      )}
    </Box>
  )
}

export default DashboardHelpSection
