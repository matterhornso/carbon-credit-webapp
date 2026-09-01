import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import { Images } from '../../../theme'

// Table-of-contents subtitles for the Project Description section. Previously
// sourced from generateProjectWIthAiConfig's SECTION_LIST (the legacy
// OpenAI-Assistants config, since removed); inlined here since this is the
// only surviving consumer and it only needs the section-title strings.
const PROJECT_DESCRIPTION_SUBTITLES = [
  '1.1 Summary Description of the Project',
  '1.2 Audit History',
  '1.3 Sectoral Scope and Project Type',
  '1.4 Project Eligibility',
  '1.5 Project Design',
  '1.6 Project Proponent',
  '1.7 Other Entities Involved in the Project',
  '1.8 Ownership',
  '1.9 Project Start Date',
  '1.10 Project Crediting Period',
  '1.11 Project Scale and Estimated GHG Emission Reductions or Removals',
  '1.12 Description of Project Activity',
  '1.13 Project Location',
  '1.14 Conditions Prior to Project Initiation',
  '1.15 Compliance with Laws, Statutes and Other Regulatory Frameworks',
  '1.16 Double Counting and Participation under other GHG Programs',
  '1.17 Double Claiming, Other Forms of Credit, and Scope 3 Emissions',
  '1.18 Sustainable Development Contributions',
  '1.19 Additional Information relevant to the project',
]

const ThirdPage = () => {
  const pageName = 'Table of Contents'

  const tableOfContents = [
    {
      title: 'Project Description',
      // subTitles: [
      //   '1.1 Purpose, Objectives, and General Description of the Project',
      //   '1.2 Project Type and Sectoral Scope',
      //   '1.3 Location',
      //   '1.4 Conditions Prior to Initiation',
      //   '1.5 Technology Applied',
      //   '1.5 Technology Applied',
      //   '1.7 Roles and Responsibilities',
      //   '1.7.1 Project Proponent(s)',
      //   '1.7.2 Others Involved in the Project',
      //   '1.7.1 Project Proponent(s)',
      //   '1.8 Chronological Plan/Implementation',
      //   '1.9 Eligibility',
      //   '1.10 Funding',
      //   '1.11 Ownership',
      //   '1.12 Other Certifications',
      //   '1.13 Participation under Other GHG Programs',
      //   '1.14 Other Benefits',
      //   '1.15 Host Country Attestation',
      //   '1.16 Eligibility criteria for Grouped Project',
      //   '1.17 Additional Information',
      // ],
      subTitles: PROJECT_DESCRIPTION_SUBTITLES,
    },
  ]

  return (
    <Box
      sx={{
        // maxWidth: '595px',
        maxWidth: '800px',
        px: 4,
        py: 1.5,
        marginX: 'auto',
        bgcolor: '#FFF',
        height: '842px',
        mt: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <img src={Images.ICRLogo2} height={24} width={42} />
        <Typography sx={{ fontSize: '11px', lineHeight: '16px' }}>
          {pageName}
        </Typography>
      </Box>
      <Divider sx={{ mt: 1, color: '#8BD3DC' }} />
      <Typography
        sx={{
          mt: 2,
          fontSize: '24px',
          lineHeight: '32px',
          color: '#000',
        }}
      >
        {pageName}
      </Typography>
      <Box sx={{ mt: 3 }}>
        {tableOfContents.map((row: any, index: number) => (
          <Box
            sx={{
              // display: 'flex',
              mt: '4px',
              // gap: '4px',
              // fontSize: '11px',
              // lineHeight: '16px',
            }}
            key={index}
          >
            <Typography sx={{ fontSize: 18, color: '#029FB3' }}>
              {row?.title}
            </Typography>
            {row?.subTitles?.map(
              (subtitleIndexRow: any, subtitleIndex: number) => (
                <Box
                  sx={{
                    mt: 1,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  key={subtitleIndex}
                >
                  <Box
                    sx={{
                      fontWeight: 500,
                      fontSize: 14,
                      lineHeight: '24px',
                    }}
                  >
                    {subtitleIndexRow}
                  </Box>
                  <Box
                    sx={{
                      flex: 1,
                      ml: 1,
                      overflow: 'hidden',
                    }}
                  >
                    ....................................................................................................................................................................................................................................................................................................................................
                  </Box>
                </Box>
              )
            )}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default ThirdPage
