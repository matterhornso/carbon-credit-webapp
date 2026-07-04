import { Box, Chip, Typography, Stack, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CCTable from '../../atoms/CCTable'
import CircleIcon from '@mui/icons-material/Circle'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { getLocalItem } from '../../utils/Storage'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import moment from 'moment'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import DataTablesBriefCase from '../../assets/Images/Icons/DataTablesBriefCase.png'
import { limitTitle } from '../../utils/commonFunctions'
import DashboardPencil from '../../assets/Images/Icons/DashboardPencil.png'
import { addSectionPercentages } from '../../utils/newProject.utils'
import {
  setCurrentProjectDetails,
  setCurrentProjectDetailsUUID,
} from '../../redux/Slices/issuanceDataCollection'
import { useAppDispatch } from '../../hooks/reduxHooks'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import { PROJECT_ALL_STATUS } from '../../config/constants.config'

const headings = [
  'Reference ID',
  'Created Dt',
  'Project Name',
  'Location',
  'Verifier Status',
  'Verifier',
  'Action',
]

const ProjectsUnderRegistration = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userDetails = getLocalItem('userDetails')

  const [allProjects, setAllProjects] = useState<any>(undefined)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getAllProjects()
  }, [])

  const handleProjectDetails = (projectDetails: any) => {
    if (projectDetails) {
      dispatch(setCurrentProjectDetailsUUID(projectDetails?.uuid))
      dispatch(setCurrentProjectDetails(projectDetails))
      if (
        !projectDetails?.projectCompleted ||
        projectDetails?.project_status === 1
      ) {
        navigate({
          pathname: pathNames.PROFILE_DETAILS_ISSUANCE_INFO,
          search: `?${createSearchParams({
            projectId: projectDetails?.uuid,
          })}`,
        })
      } else if (projectDetails?.projectCompleted) {
        navigate(pathNames.SELECT_VERIFIER)
      }
    }
  }

  const getAllProjects = () => {
    setLoading(true)
    dataCollectionCalls.getAllProjects(userDetails?.email).then((res: any) => {
      if (res?.data?.success) {
        const modifiedRows = res?.data?.data.map((i: any) =>
          addSectionPercentages(i)
        )
        const rows =
          modifiedRows &&
          modifiedRows.map((i: any, index: number) => {
            return [
              <Typography
                key={index}
                textAlign="start"
                sx={{ fontSize: 15, fontWeight: 500 }}
              >
                {limitTitle(i?.uuid, 10)}
              </Typography>,
              <Typography
                key={index}
                textAlign="start"
                sx={{ fontSize: 15, fontWeight: 500 }}
              >
                {moment(i?.createdAt).format(`DD/MM/YY`)}
              </Typography>,
              <Typography
                key={index}
                textAlign="start"
                sx={{ fontSize: 15, fontWeight: 500 }}
              >
                {i?.company_name}
              </Typography>,
              <Typography
                key={index}
                textAlign="start"
                sx={{ fontSize: 15, fontWeight: 500 }}
              >
                {i?.location}
              </Typography>,
              <Chip
                sx={{
                  pl: 1,
                  backgroundColor:
                    i?.project_status ===
                    PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT
                      ? '#75F8E4'
                      : '#DAE5E1',
                }}
                key={index}
                icon={
                  <CircleIcon
                    sx={{
                      fontSize: 10,
                      color:
                        i?.project_status ===
                        PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT
                          ? '#00A392'
                          : '#96B1AB',
                    }}
                  />
                }
                label={
                  i?.project_status === PROJECT_ALL_STATUS.CREATED_PROJECT
                    ? 'Yet to select'
                    : i?.project_status ===
                      PROJECT_ALL_STATUS.POTENTIAL_VERIFIER_SELECTED
                    ? 'Selected'
                    : i?.project_status ===
                        PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT &&
                      'Finalised'
                }
              />,
              <Stack
                key={index}
                direction={'row'}
                alignItems="center"
                justifyContent={'flex-end'}
              >
                {i?.verifier_details_id ? (
                  <>
                    <img src={DataTablesBriefCase} width="35px" height="35px" />
                    <Typography sx={{ fontSize: 15, fontWeight: 500, pl: 1 }}>
                      {i?.verifier_details_id?.verifier_name}
                    </Typography>
                  </>
                ) : (
                  '-'
                )}
              </Stack>,
              <Grid
                container
                flexDirection="row"
                alignItems={'center'}
                key={index}
              >
                <Grid item xs={9} sx={{ pl: 2 }}>
                  {!i?.verifier_details_id &&
                    i?.project_status !==
                      PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT && (
                      <img
                        src={DashboardPencil}
                        onClick={() => handleProjectDetails(i)}
                      />
                    )}
                </Grid>
                <Grid item xs={3}>
                  {/*{data?.project_status !== 3 && (*/}
                  <Box key={index}>
                    <ArrowRightIcon
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleProjectDetails(i)}
                    />
                  </Box>
                  {/*)}*/}
                </Grid>
              </Grid>,
            ]
          })
        setAllProjects(rows)
      }
      setLoading(false)
    })
  }

  return (
    <Box>
      {loading ? (
        <CCTableSkeleton height={16} />
      ) : (
        <CCTable headings={headings} rows={allProjects} pagination={true} />
      )}
    </Box>
  )
}

export default ProjectsUnderRegistration
