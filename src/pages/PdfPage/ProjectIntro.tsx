import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import React, { FC } from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import Layout from './Layout/Layout'
import PageDynamic from './Layout/PageDynamic'

interface ProjectIntroProps {}

const ProjectIntro: FC<ProjectIntroProps> = () => {
  const data = useAppSelector(({ pdfPage }) => pdfPage.pdfData)

  const content_list = [
    {
      key: 'Reference ID',
      value: data?.uuid,
    },
    {
      key: 'Project Name',
      value: data?.company_name,
    },
    {
      key: 'Project Type',
      value: data?.type?.toString().replace(',', ', '),
    },
    {
      key: 'Reference & Applied methodology',
      value: data?.section_a?.step4?.methodologies
        .map((item: any) => item?.methodology)
        .toString()
        .replace(',', ', '),
    },
    {
      key: 'Project start date',
      value: data?.start_date
        ? moment(data?.start_date).format('DD/MM/YYYY')
        : '',
    },
    {
      key: 'First date of submission',
      value: '',
    },
    {
      key: 'Date of validation',
      value: data?.report?.createdAt
        ? moment(data?.report?.createdAt).format('DD/MM/YYYY')
        : '',
    },
    {
      key: 'Version number of the PDD',
      value: 'V1',
    },
    {
      key: 'Date of version',
      value: '',
    },
    {
      key: 'Host country(ies)',
      value: data?.section_a?.step3?.party_and_project_participants
        ?.map((item: any) =>
          item?.party_involved
            ?.map((itm: any) => itm)
            .toString()
            .replace(',', ', ')
        )
        .toString()
        .replace(',', ', '),
    },
    {
      key: 'Host country approval',
      value: '',
    },
    {
      key: 'Sectoral scope of project activity',
      value: '',
    },
    {
      key: 'Grouped project',
      value: '',
    },
    {
      key: 'Other requirements applied',
      value: '',
    },
    {
      key: 'Estimated annual average GHG emission mitigation (t CO2-e)',
      value: '',
    },
  ]

  return (
    <>
      <PageDynamic
        heading="Project Introduction"
        title="Project Design Description"
      >
        {/* <Layout
        title="Project Design Description"
        heading="Project Introduction"
        page={2}
      > */}
        <Box sx={{ border: '1px solid #BFC9C6' }}>
          {content_list?.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{ borderTop: index === 0 ? 'none' : '1px solid #BFC9C6' }}
              >
                <Grid container columnSpacing={7} sx={{}}>
                  <Grid item xs={5}>
                    <Typography
                      sx={{
                        p: 1,
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#003730',
                      }}
                    >
                      {item?.key}
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography
                      sx={{
                        p: 1,
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#141D1B',
                      }}
                    >
                      {item?.value}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )
          })}
        </Box>
        {/* </Layout> */}
      </PageDynamic>
    </>
  )
}

export default ProjectIntro
