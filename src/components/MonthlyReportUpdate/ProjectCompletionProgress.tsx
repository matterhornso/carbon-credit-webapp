import { Box, LinearProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { SECTION_NAMES } from '../../config/constants.config'
import { useAppSelector } from '../../hooks/reduxHooks'
import { Colors, Images } from '../../theme'

const ProjectCompletionProgress = (props: { sectionIndex: number }) => {
  const currentProjectDetails = useAppSelector(
    ({ MonthlyReportUpdate }) => MonthlyReportUpdate.currentProjectDetails,
    shallowEqual
  )

  const [stepsCompletionData, setStepsCompletionData] = useState<any | null>()
  const [stepsCompletionPercent, setStepsCompletionPercent] = useState(0)
  useEffect(() => {
    let stepsCompletionPercent
    if (currentProjectDetails) {
      stepsCompletionPercent = [
        {
          title: SECTION_NAMES.SELECT_DATE,
          completionPercent: 100,
        },
        {
          title: SECTION_NAMES.SECTION_A,
          completionPercent:
            currentProjectDetails?.section_a?.completionPercentage,
        },
        {
          title: SECTION_NAMES.SECTION_B,
          completionPercent:
            currentProjectDetails?.section_b?.completionPercentage,
        },
        {
          title: SECTION_NAMES.SECTION_C,
          completionPercent:
            currentProjectDetails?.section_c?.completionPercentage,
        },
        {
          title: SECTION_NAMES.SECTION_D,
          completionPercent:
            currentProjectDetails?.section_d?.completionPercentage,
        },
        {
          title: SECTION_NAMES.SECTION_E,
          completionPercent:
            currentProjectDetails?.section_e?.completionPercentage,
        },
      ]
      setStepsCompletionData(stepsCompletionPercent)
    } else {
      stepsCompletionPercent = [
        {
          title: SECTION_NAMES.SELECT_DATE,
          completionPercent: 0,
        },
        {
          title: SECTION_NAMES.SECTION_A,
          completionPercent: 0,
        },
        {
          title: SECTION_NAMES.SECTION_B,
          completionPercent: 0,
        },
        {
          title: SECTION_NAMES.SECTION_C,
          completionPercent: 0,
        },
        {
          title: SECTION_NAMES.SECTION_D,
          completionPercent: 0,
        },
        {
          title: SECTION_NAMES.SECTION_E,
          completionPercent: 0,
        },
      ]
    }
    setStepsCompletionData(stepsCompletionPercent)
  }, [currentProjectDetails])

  useEffect(() => {
    const totalStepsCount = 4
    let completedStepsCount = 0
    if (stepsCompletionData && stepsCompletionData.length) {
      stepsCompletionData.forEach((step: any) => {
        if (
          ![SECTION_NAMES.SECTION_D, SECTION_NAMES.SECTION_E].includes(
            step?.title
          )
        ) {
          if (step?.completionPercent === 100) {
            completedStepsCount += 1
          }
        }
      })
    }

    const completionPercent = Math.floor(
      (completedStepsCount / totalStepsCount) * 100
    )
    setStepsCompletionPercent(completionPercent)
  }, [stepsCompletionData])

  return (
    <Box sx={{ py: 2, px: { md: 3, lg: 4 } }}>
      <Box sx={{ display: 'flex' }}>
        <img src={Images.ProjectCompletion} />
        <Typography sx={{ fontSize: 18, color: Colors.darkPrimary1 }}>
          Project Completion
        </Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontSize: 12, color: '#F15D5F' }}>
          {stepsCompletionPercent !== 100 ? 'In Progress' : 'Complete'}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={stepsCompletionPercent}
          sx={{
            borderRadius: 8,
            height: 8,
            backgroundColor: '#CCE8E1',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#388E81',
            },
          }}
        />
      </Box>
      <Typography sx={{ mt: 2 }}>
        Project application progress at a glance
      </Typography>
      {stepsCompletionData?.map((item: any, index: number) => (
        <div key={index} style={{ minHeight: 50 }}>
          <li
            key={index.toString()}
            className="list-group-item pt-0 position-relative"
            style={{
              background: 'transparent',
              border: 'none',
              paddingTop: 0,
              position: 'relative',
              listStyle: 'none',
            }}
          >
            <Box>
              <Box
                sx={{
                  fontSize: 16,
                  fontWeight: 600,
                  p: 1,
                  ml: 3,
                  backgroundColor: '#DAF7F0',
                  borderRadius: '8px',
                }}
              >
                <Typography
                  sx={{ color: '#141D1B', fontSize: 16, fontWeight: 500 }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    color:
                      item?.completionPercent === 100 ? '#006B5E' : '#BA1B1B',
                    fontSize: 14,
                  }}
                >
                  {item.completionPercent}% Complete
                </Typography>
              </Box>
              {stepsCompletionData && index < stepsCompletionData?.length - 1 && (
                <Box
                  className="trace-line position-absolute"
                  sx={{
                    top: 0,
                    left: 4,
                    bottom: -17,
                    width: '1px',
                    background:
                      index < props?.sectionIndex + 1 ? '#000000' : '#DAE5E1',
                    position: 'absolute',
                  }}
                />
              )}
              <Box
                className="trace-circle position-absolute"
                sx={{
                  background:
                    index === props?.sectionIndex
                      ? '#F3BA4D'
                      : index < props?.sectionIndex + 1
                      ? '#006B5E'
                      : '#DAE5E1',
                  width: 10,
                  height: 20,
                  top: -48,
                  borderRadius: '5px',
                  position: 'relative',
                }}
              />
            </Box>
          </li>
        </div>
      ))}
    </Box>
  )
}

export default ProjectCompletionProgress
