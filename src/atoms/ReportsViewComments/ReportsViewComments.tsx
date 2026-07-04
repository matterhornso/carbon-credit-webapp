import React, { FC, useEffect, useState } from 'react'
//MUI imports
import { Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Box } from '@mui/system'
import TodayIcon from '@mui/icons-material/Today'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import moment from 'moment'
import CCMultilineTextArea from '../CCMultilineTextArea'
import { useAppSelector } from '../../hooks/reduxHooks'
import { useNavigate } from 'react-router-dom'
import { limitTitleFromMiddle } from '../../utils/commonFunctions'

interface ReportsViewCommentsProps {}

const ReportsViewComments: FC<ReportsViewCommentsProps> = (props) => {
  const navigate = useNavigate()

  const viewCommentsData = useAppSelector(
    ({ reportsViewComments }) => reportsViewComments.viewCommentsData
  )

  const [projectReviewDetails, setProjectReviewDetails] = useState<null | any>(
    null
  )

  useEffect(() => {
    if (viewCommentsData) {
      const SettingProjectSubmissionDates = [
        {
          name: 'Date of Report Submission',
          value: moment(viewCommentsData?.report?.createdAt).format(
            'DD/MM/YYYY'
          ),
        },
        {
          name: 'No of VCOs Authorised',
          value: viewCommentsData?.report?.quantity,
        },
        {
          name: 'Date of Verification',
          value: viewCommentsData?.report?.updatedAt,
        },
        {
          name: 'Next Date for monthly report submission',
          value: viewCommentsData?.report?.next_date,
        },
      ]
      setProjectReviewDetails(SettingProjectSubmissionDates)
    }
  }, [viewCommentsData])

  return (
    <Grid container data-testid="reports-view-comments">
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center">
          <ChevronLeftIcon
            onClick={() => navigate(-1)}
            sx={{ cursor: 'pointer' }}
          />
          <Typography sx={{ color: '#F15D5F', fontSize: 28, fontWeight: 400 }}>
            Comments
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} sx={{ pt: 4 }}>
        <Paper elevation={4} sx={{ p: 2 }}>
          <Grid container>
            <Grid item xs={12}>
              <Typography sx={{ fontSize: 24, fontWeight: 400 }}>
                {viewCommentsData?.company_name}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
                {viewCommentsData?.type?.map((type: any, index: number) => (
                  <Box
                    data-testid="reports-view-comments-type"
                    sx={{
                      fontSize: 14,
                      color: '#191C1B',
                      backgroundColor: '#E8F3EF',
                      padding: '2px 4px',
                      mt: 1,
                      mr: 1,
                    }}
                    key={index}
                  >
                    {type}
                  </Box>
                ))}
              </Box>
              <Box sx={{ display: 'flex', mt: 2 }}>
                <TodayIcon sx={{ color: '#006B5E', mr: 1, fontSize: 18 }} />
                <Box>
                  Started on {moment(viewCommentsData?.start_date).format('L')}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', mt: 1 }}>
                <PlaceOutlinedIcon
                  sx={{ color: '#006B5E', mr: 1, fontSize: 18 }}
                />
                <Typography sx={{ fontSize: 14 }}>
                  {viewCommentsData?.location}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ py: 3 }}>
              <Divider sx={{ color: '#CDCDCD' }} />
            </Grid>
            <Grid item xs={10}>
              {projectReviewDetails &&
                projectReviewDetails.map((i: any, index: number) => (
                  <Grid container key={index} sx={{ pb: 2 }}>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                        {i?.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
                        {i?.value}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
            </Grid>
            <Grid item xs={12} sx={{ pt: 3 }}>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  color: '#1D4B44',
                  pb: 2,
                }}
              >
                GHG reduction occuring from this project
              </Typography>
              <CCMultilineTextArea
                value={viewCommentsData?.report?.ghg_reduction_explanation}
                sx={{ background: '#FAFDFA' }}
              />
            </Grid>
            <Grid item xs={12} sx={{ pt: 2 }}>
              <Typography
                sx={{ fontWeight: 500, fontSize: 16, pb: 2, color: '#1D4B44' }}
              >
                Relevant docs
              </Typography>
              {viewCommentsData?.report?.file_attach?.map(
                (fileName: any, index: 'number') => (
                  <Stack
                    key={index}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                    sx={{
                      py: 1,
                      px: 1,
                      background: '#DAF7F0',
                      color: '#1D4B44',
                      borderRadius: 2,
                    }}
                  >
                    <InsertDriveFileOutlinedIcon />
                    <Typography
                      sx={{
                        fontWeight: 500,
                        fontSize: 12,
                      }}
                    >
                      {limitTitleFromMiddle(fileName)}
                    </Typography>
                  </Stack>
                )
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default ReportsViewComments
