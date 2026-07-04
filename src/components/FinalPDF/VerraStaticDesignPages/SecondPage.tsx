import { Box, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../../hooks/reduxHooks'
import moment from 'moment'

const SecondPage = () => {
  const pageName = 'Contents'

  const projectData: any = useAppSelector(
    ({ finalPDFSlice }) => finalPDFSlice.projectData
  )

  const tableOfContents = [
    {
      title: 'PROJECT DETAILS',
      pageNo: 4,
      indexNo: 1,
      subTitleData: [
        {
          subTitle: 'Summary Description of the Project',
          pageNo: 4,
          indexNo: '1.1',
        },
        { subTitle: 'Audit History', pageNo: 5, indexNo: '1.2' },
        {
          subTitle: 'Sectoral Scope and Project Type',
          pageNo: 5,
          indexNo: '1.3',
        },
        { subTitle: 'Project Eligibility', pageNo: 6, indexNo: '1.4' },
        { subTitle: 'Project Design', pageNo: 8, indexNo: '1.5' },
        { subTitle: 'Project Proponent', pageNo: 12, indexNo: '1.6' },
        {
          subTitle: 'Other Entities Involved in the Project',
          pageNo: 12,
          indexNo: '1.7',
        },
        { subTitle: 'Ownership', pageNo: 12, indexNo: '1.8' },
        { subTitle: 'Project Start Date', pageNo: 13, indexNo: '1.9' },
        { subTitle: ' Project Crediting Period', pageNo: 13, indexNo: '1.10' },
        {
          subTitle:
            ' Project Scale and Estimated GHG Emission Reductions or Removals',
          pageNo: 13,
          indexNo: '1.11',
        },
        {
          subTitle: ' Description of the Project Activity',
          pageNo: 14,
          indexNo: '1.12',
        },
        { subTitle: ' Project Location', pageNo: 21, indexNo: '1.13' },
        {
          subTitle: ' Conditions Prior to Project Initiation',
          pageNo: 21,
          indexNo: '1.14',
        },
        {
          subTitle:
            ' Compliance with Laws, Statutes and Other Regulatory Frameworks',
          pageNo: 37,
          indexNo: '1.15',
        },
        {
          subTitle:
            ' Double Counting and Participation under Other GHG Programs',
          pageNo: 38,
          indexNo: '1.16',
        },
        {
          subTitle:
            ' Double Claiming, Other Forms of Credit, and Scope 3 Emissions',
          pageNo: 39,
          indexNo: '1.17',
        },
        {
          subTitle: ' Sustainable Development Contributions',
          pageNo: 40,
          indexNo: '1.18',
        },
        {
          subTitle: ' Additional Information Relevant to the Project',
          pageNo: 41,
          indexNo: '1.19',
        },
      ],
    },
    {
      title: 'SAFEGUARDS AND STAKEHOLDER ENGAGEMENT',
      pageNo: 41,
      indexNo: 2,
      subTitleData: [
        {
          subTitle: 'Stakeholder Engagement and Consultation ',
          pageNo: 41,
          indexNo: '2.1',
        },
        {
          subTitle: ' Risks to Stakeholders and the Environment ',
          pageNo: 44,
          indexNo: '2.2',
        },
        {
          subTitle: ' Respect for Human Rights and Equity ',
          pageNo: 44,
          indexNo: '2.3',
        },
        { subTitle: ' Ecosystem Health ', pageNo: 46, indexNo: '2.4' },
      ],
    },
    {
      title: ' APPLICATION OF METHODOLOGY ',
      pageNo: 47,
      indexNo: '3',
      subTitleData: [
        {
          subTitle: ' Title and Reference of Methodology ',
          pageNo: 47,
          indexNo: '3.1',
        },
        {
          subTitle: 'Applicability of Methodology ',
          pageNo: 47,
          indexNo: '3.2',
        },
        { subTitle: ' Project Boundary ', pageNo: 50, indexNo: '3.3' },
        { subTitle: ' Baseline Scenario ', pageNo: 50, indexNo: '3.4' },
      ],
    },
  ]

  return (
    <Box
      className="libre-franklin-normal"
      sx={{
        maxWidth: '800px',
        py: 1.5,
        marginX: 'auto',
        bgcolor: '#FFF',
        height: '842px',
        mt: 3,
        p: 4,
        px: 12,
      }}
    >
      <Typography
        sx={{
          mt: 4,
          fontSize: '40px',
          color: '#2b3a57',
          textTransform: 'uppercase',
        }}
        className="libre-franklin-normal"
      >
        {pageName}
      </Typography>
      <Divider sx={{ background: '#000' }} />
      <Box sx={{ mt: 1, color: '#2b3957' }}>
        {tableOfContents.map((titleData: any, index: number) => (
          <Box key={index} sx={{ mt: 1 }}>
            {titleData?.title ? (
              <Box sx={{ display: 'flex', fontWeight: 600 }}>
                <Box sx={{ width: '8%' }}>
                  <Box>{titleData?.indexNo}</Box>
                </Box>
                <Box sx={{ width: '92%' }}>
                  <Box
                    sx={{ display: 'flex' }}
                    className="libre-franklin-bolder"
                  >
                    <Box>{titleData?.title}</Box>
                    <Box
                      sx={{
                        flex: 1,
                        ml: '8px',
                        overflow: 'hidden',
                      }}
                    >
                      ....................................................................................................................................................................................................................................................................................................................................
                    </Box>
                    <Box sx={{ ml: '4px' }}>{titleData.pageNo}</Box>
                  </Box>
                </Box>
              </Box>
            ) : null}
            <Box>
              {titleData?.subTitleData?.map(
                (subTitleData: any, subTitleIndex: number) => (
                  <Box
                    key={subTitleIndex}
                    sx={{ display: 'flex', fontSize: '14px' }}
                  >
                    <Box sx={{ width: '8%' }}>
                      <Box sx={{ ml: '18px' }}>{subTitleData?.indexNo}</Box>
                    </Box>
                    <Box sx={{ width: '92%' }}>
                      <Box sx={{ display: 'flex', letterSpacing: '0.2px' }}>
                        <Box sx={{ ml: '20px' }}>{subTitleData.subTitle}</Box>
                        <Box
                          sx={{
                            flex: 1,
                            ml: '4px',
                            overflow: 'hidden',
                          }}
                        >
                          ....................................................................................................................................................................................................................................................................................................................................
                        </Box>
                        <Box sx={{ ml: '4px' }}>{subTitleData.pageNo}</Box>
                      </Box>
                    </Box>
                  </Box>
                )
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default SecondPage
