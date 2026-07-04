import React from 'react'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import Layout from './Layout/Layout'
import PageDynamic from './Layout/PageDynamic'
import { useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'

const IndexPage = () => {
  const sectionA = useAppSelector(
    ({ pdfPage }) => pdfPage.sectionA,
    shallowEqual
  )

  const sectionB = useAppSelector(
    ({ pdfPage }) => pdfPage.sectionB,
    shallowEqual
  )
  const sectionC = useAppSelector(
    ({ pdfPage }) => pdfPage.sectionC,
    shallowEqual
  )
  const sectionD = useAppSelector(
    ({ pdfPage }) => pdfPage.sectionD,
    shallowEqual
  )
  const sectionE = useAppSelector(
    ({ pdfPage }) => pdfPage.sectionE,
    shallowEqual
  )

  const content_list = [
    {
      name: 'PROJECT INTRODUCTION',
      page: '1',
    },
    {
      name: 'Description of Project Activity',
      page: sectionA,
      section: 'A',
      list: [
        'Purpose & General description',
        'Location',
        'Parties & Project Participants',
        'Reference & Applied Methodology',
        'Crediting Period',
        'Safeguard',
        'Additionality',
      ],
    },
    {
      name: 'Implementation of the project activity',
      page: sectionB,
      section: 'B',
      list: [
        'Description of implemented registered project activity',
        'Post registration changes',
      ],
    },
    {
      name: 'Description of Monitoring Activity',
      page: sectionC,
      section: 'C',
    },
    {
      name: 'Data and parameters',
      page: sectionD,
      section: 'D',
      list: [
        'Data and parameters at ex-ante ',
        'Data & parameters monitored ',
        'Implementation of Sampling Plan',
      ],
    },
    {
      name: 'Calculation of emission reductions or GHG removals by sinks',
      page: sectionE,
      section: 'E',
      list: [
        'Calculation of baseline emissions',
        'Calculation of project emissions',
        'Calculation of leakage',
        'Calculation summary of emission reductions',
        'Comparison of actual emission reductions ',
        'Remarks on difference from estimated value',
        'Actual emission reductions in first commitment period and the period',
      ],
    },
  ]

  return (
    <>
      <PageDynamic title="Project Design Description" heading="Contents">
        <Box
          sx={{ display: 'flex', flexDirection: 'column', gap: '20px', pl: 3 }}
        >
          {content_list?.map((item) => {
            return (
              <Box key={item?.name}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '15px',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: '#006B5E',
                        fontSize: 14,
                        fontWeight: 500,
                        textTransform: 'uppercase',
                      }}
                    >
                      {(item?.section
                        ? 'SECTION ' + item?.section + ': '
                        : '') + item?.name}
                    </Typography>
                  </Box>
                  <Box sx={{ flexGrow: '1' }}>
                    <Box sx={{ borderTop: '1px solid #CCE8E1' }}></Box>
                  </Box>
                  <Box>
                    <Typography
                      sx={{ color: '#006B5E', fontSize: 14, weight: 500 }}
                    >
                      {item?.page}
                    </Typography>
                  </Box>
                </Box>
                {item?.list &&
                  item?.list?.length > 0 &&
                  item?.list?.map((itm, index) => {
                    return (
                      <Box
                        key={index}
                        sx={{
                          mt: 1,
                          color: 'black',
                          fontSize: 12,
                          fontWeight: 400,
                        }}
                      >
                        {(item?.section
                          ? item?.section + (index + 1) + ': '
                          : '') + itm}
                      </Box>
                    )
                  })}
              </Box>
            )
          })}
        </Box>
      </PageDynamic>
    </>
  )
}

export default IndexPage
