import { Grid, Typography, Box, Radio, Paper } from '@mui/material'
import { borderColor } from '@mui/system'

import React, { FC, useEffect, useState } from 'react'
import { dataCollectionCalls } from '../../../api/dataCollectionCalls'
import CCButton from '../../../atoms/CCButton'
import { ROLES } from '../../../config/constants.config'
import { Colors, Images } from '../../../theme'
import { getLocalItem } from '../../../utils/Storage'
import TraceDetails from './TraceDetails'
import './TraceHistory.css'
interface TraceHistoryProps {
  projectId?: any
}
const TraceHistory: FC<TraceHistoryProps> = (props) => {
  const traceTab = [
    {
      key: 0,
      value: 'Project Developer Allenghey Trust created this project',
    },
    {
      key: 1,
      value: 'Project Developer Allenghey Trust Submitted For verification',
    },
    {
      key: 2,
      value: 'Verifier Allenghey Trust received verification request',
    },
    {
      key: 3,
      value: 'Verifier Allenghey Trust started verification process',
    },
    {
      key: 4,
      value:
        'Verifier Allenghey Trust submitted its verification report on this project',
    },
    {
      key: 5,
      value:
        'Registry Allenghey Trust received the verification report for approve',
    },
    {
      key: 6,
      value: 'Registry Allenghey Trust Approves the verification report',
    },
    {
      key: 7,
      value: 'Project Developer Allenghey Trust get verification report',
    },
    {
      key: 8,
      value: 'Buyer -1 buy VCOT By Project Developer',
    },
  ]
  const { projectId } = props
  const [loading, setLoading] = useState(false)
  const [traceOption, setTraceOption] = useState(0)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    //setting dark or light theme based on roles
    const userType: any = getLocalItem('userDetails')?.type
    if ([ROLES.REGISTRY, ROLES.VERIFIER].includes(userType)) {
      setTheme('')
    } else setTheme('dark')
  }, [])

  const [traceAllData, setTraceAllData] = useState<any>([])
  const [traceTabList, setTraceTabList] = useState<any>([])
  useEffect(() => {
    getAllDetails()
  }, [])

  const getAllDetails = () => {
    setLoading(true)
    dataCollectionCalls
      .getProjectById(projectId)
      .then((res) => {
        console.log('getProjectById', res)
        const filterArray =
          traceTab &&
          traceTab.filter(
            (item: any, index: any) => index <= res?.data?.project_status
          )
        console.log('filterArray', filterArray)
        setTraceAllData(res?.data)
        setTraceTabList(filterArray)
        setLoading(false)
      })
      .catch((error) => {
        console.log('error', error)
        setLoading(false)
      })
  }
  return (
    <Grid
      container
      justifyContent={'space-between'}
      alignItems={'center'}
      flexDirection="row"
      sx={{
        p: 10,
        background:
          theme === 'dark'
            ? // ? 'linear-gradient(180deg, #111E17 9.55%, rgba(7, 19, 13, 0.79) 100%)'
              'rgba(0, 107, 94, 0.08)'
            : '#FFFFFF',
      }}
      // height={'30%'}
    >
      <Typography
        sx={{
          color: theme === 'dark' ? '#55DBC8' : '#1D4B44',
          fontSize: '32px',
          fontWeight: 500,
          mt: -4,
        }}
      >
        Trace History
      </Typography>
      <Paper
        sx={{
          mt: 4,
          height: '30%',
          widht: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          p: 4,

          background:
            theme === 'dark'
              ? 'linear-gradient(179.8deg, rgba(98, 98, 98, 0) 0.18%, rgba(64, 96, 91, 0.59) 151.96%, #2D5F57 237.11%)'
              : '#FFFFFF',
          overflow: 'hidden',
        }}
      >
        <Grid
          item
          display={'flex'}
          justifyContent={'start'}
          alignItems={'center'}
          flexDirection="column"
          mt={3}
          px={'20px'}
          height={'520px'}
          py={5}
          overflow="auto"
          className="scroll-container"
        >
          {traceTabList &&
            traceTabList.length > 0 &&
            traceTabList.map((item: any, index: any) => (
              <Grid
                container
                display={'flex'}
                justifyContent={'start'}
                alignItems={'center'}
                flexDirection="row"
                sx={{ mx: 2 }}
                key={index}
              >
                <Grid
                  item
                  justifyContent={'center'}
                  alignItems={'center'}
                  flexDirection="column"
                  display={'flex'}
                  width={'10%'}
                  // height={'50px'}
                >
                  <Box
                    sx={{
                      height: '20px',
                      width: '20px',
                      borderRadius: '20px',
                      border:
                        traceOption === index
                          ? '1px solid #CCE8E1'
                          : '1px solid #006B5E',
                      backgroundColor: '#006B5E',
                    }}
                  ></Box>
                  <Box
                    sx={{
                      height: '70px',
                      width: '4px',
                      background:
                        index === traceTabList.length - 1
                          ? ''
                          : theme === 'dark'
                          ? 'linear-gradient(179.98deg, #B1CCC6 -46.26%, #2ECBB2 154.81%)'
                          : '#CCE8E1',
                    }}
                  ></Box>
                </Grid>
                <Grid
                  item
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  flexDirection="row"
                  width={'90%'}
                  sx={{
                    py: 2,
                    px: 4,
                    background:
                      theme === 'dark'
                        ? '#006B5E'
                        : traceOption === index
                        ? ' #CCE8E1'
                        : '#FAFDFA',
                    borderRadius: '8px',
                    heigth: '100px',
                    mt: -8,
                    borderLeft:
                      theme === 'dark'
                        ? traceOption === index
                          ? '10px solid #CCE8E1'
                          : '10px solid #006B5E'
                        : traceOption === index
                        ? '10px solid #55DBC8'
                        : '10px solid transparent',
                  }}
                  onClick={() => setTraceOption(index)}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'start',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      data-testid="logo-img"
                      className="logoImage"
                      src={Images.user}
                      color={theme === 'dark' ? 'White' : '#3F4946'}
                      style={{ width: '30px' }}
                    />
                    <Typography
                      sx={{
                        color:
                          theme === 'dark'
                            ? 'white'
                            : traceOption === index
                            ? '#3F4946'
                            : '#191C1B',
                        fontSize: 14,
                        fontWeight: 400,
                        ml: 1,
                      }}
                    >
                      {item?.value}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            ))}
        </Grid>
        <TraceDetails
          traceOption={traceOption}
          setTraceOption={(item: any) => setTraceOption(item)}
          theme={theme}
          projectId={projectId}
          projectDetails={traceAllData}
          traceTab={traceTab}
          // choosenVerifiers={choosenVerifiers}
        />
      </Paper>
    </Grid>
  )
}
export default TraceHistory
