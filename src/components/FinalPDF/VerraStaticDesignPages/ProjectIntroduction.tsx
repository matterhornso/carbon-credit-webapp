import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Images } from '../../../theme'
import { useAppSelector } from '../../../hooks/reduxHooks'

const ProjectIntroduction = () => {
  const pdfCoverPageData: any = useAppSelector(
    ({ finalPDFSlice }) => finalPDFSlice.pdfCoverPageData
  )

  const [projectDesignData, setProjectDesignData] = useState<any>([])

  useEffect(() => {
    if (pdfCoverPageData) {
      setProjectDesignData([
        {
          title: 'Project title',
          value: pdfCoverPageData?.project_title || '',
        },
        {
          title: 'Version',
          value: pdfCoverPageData?.version_no_pdd,
        },
        // { title: 'Project ID', value: pdfCoverPageData?.project_id },
        // {
        //   title: 'Crediting period ',
        //   value: pdfCoverPageData?.crediting_period,
        // },
        {
          title: 'Date of issue',
          value: pdfCoverPageData?.original_date_of_issue,
        },
        // {
        //   title: 'Most recent date of issue',
        //   value: pdfCoverPageData?.most_recent_data_of_issue,
        // },
        // {
        //   title: 'VCS Standard Version',
        //   value: pdfCoverPageData?.vsc_standard,
        // },
        {
          title: 'Prepared by',
          value: pdfCoverPageData?.prepared_by_person,
        },
        {
          title: 'Contact',
          value: pdfCoverPageData?.contact,
        },
      ])
    }
  }, [pdfCoverPageData])

  return (
    <Box
      sx={{
        // maxWidth: '595px',
        maxWidth: '800px',
        px: 12,
        textAlign: 'center',
        marginX: 'auto',
        bgcolor: '#FFF',
        height: '842px',
        fontStyle: '',
      }}
    >
      <Box>
        <Box sx={{ p: 4, pt: 8 }}>
          <img
            style={{
              height: '136px',
              width: '440px',
            }}
            src={Images.VerraFullLogo}
          />
        </Box>
        <Typography
          sx={{
            fontSize: '28px',
            fontWeight: 400,
            textAlign: 'center',
            color: '#0D0E0E',
            mt: 1,
          }}
        >
          {pdfCoverPageData?.project_title || ''}
        </Typography>
        <Box
          sx={{
            p: 4,
          }}
        >
          <img
            src={pdfCoverPageData?.company_logo}
            style={{
              height: '60px',
              width: '240px',
            }}
          />
        </Box>

        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 400,
            textAlign: 'center',
            color: '#0D0E0E',
          }}
        >
          Document Prepared by {pdfCoverPageData?.prepared_by_company}
        </Typography>
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 400,
            textAlign: 'center',
            color: '#0D0E0E',
            mt: 2,
          }}
        >
          {pdfCoverPageData?.prepared_by_email}
        </Typography>

        <Box sx={{ mt: 5 }}>
          {projectDesignData.map((row: any, index: number) => (
            <Box
              sx={{
                display: 'flex',
                mt: '1px',
                gap: '1px',
                fontSize: '11px',
                lineHeight: '16px',
              }}
              key={index}
              className="libre-franklin-normal"
            >
              <Box
                sx={{
                  px: 1.5,
                  py: 1,
                  flex: 3,
                  color: '#fff',
                  bgcolor: '#2b3957',
                  fontWeight: 500,
                  textAlign: 'right',
                  fontSize: '14px',
                }}
              >
                {row?.title}
              </Box>
              <Box
                sx={{
                  px: 1.5,
                  py: 1,
                  flex: 7,
                  bgcolor: '#f2f2f2',
                  fontWeight: 400,
                  fontSize: '12px',
                  textAlign: 'left',
                  fontStyle: 'italic',
                }}
              >
                {row?.value}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default ProjectIntroduction
