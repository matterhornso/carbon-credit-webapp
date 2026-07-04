// React Imports
import React, { FC, useState, useEffect } from 'react'

// MUI Imports
import { Box, Chip, Grid, Paper, Typography } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'

// Functional Imports
import moment from 'moment'

// Local Imports
import { Colors } from '../../theme'
import CCTable from '../../atoms/CCTable'
import TextButton from '../../atoms/TextButton/TextButton'
import ApprovalChip from '../../atoms/ApprovalChip/ApprovalChip'
import { verifierCalls } from '../../api/verifierCalls.api'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import NoData from '../../atoms/NoData/NoData'
import ShortenedIDComp from '../../atoms/ShortenedIDComp.tsx/ShortenedIDComp'
import { getLocalItem } from '../../utils/Storage'
import TabSelector from '../../atoms/TabSelector/TabSelector'
import { PROJECT_ALL_STATUS } from '../../config/constants.config'
import { shallowEqual, useDispatch } from 'react-redux'
import {
  setVerifierAcceptedProjects,
  setVerifierNewProjects,
  setVerifierRegisteredProjects,
  setVerifierRejectedProjects,
} from '../../redux/Slices/Dashboard/dashboardSlice'
import { useAppSelector } from '../../hooks/reduxHooks'

const headingsNew = [
  'Reference ID',
  'Recieved On',
  'Issuer',
  'Project Name',
  'Location',
  'Status',
  'Action',
  '',
]

const headingsRegistered = [
  'Reference ID',
  'Recieved On',
  'Issuer',
  'Project Name',
  'Location',
  'Next Submission Dt',
  'Status',
  'Action',
  '',
]

interface ListOfProjectsProps {
  data?: any
  loading?: any
  updateStatus?: any
}

const ListOfProjects: FC<ListOfProjectsProps> = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cachedVerifierDashboardProjects = useAppSelector(
    ({ caching }) => caching.cachedVerifierDashboardProjects,
    shallowEqual
  )

  const verifierNewProjects = useAppSelector(
    ({ dashboard }) => dashboard.verifierNewProjects,
    shallowEqual
  )
  const verifierAcceptedProjects = useAppSelector(
    ({ dashboard }) => dashboard.verifierAcceptedProjects,
    shallowEqual
  )

  const verifierRegisteredProjects = useAppSelector(
    ({ dashboard }) => dashboard.verifierRegisteredProjects,
    shallowEqual
  )

  const verifierRejectedProjects = useAppSelector(
    ({ dashboard }) => dashboard.verifierRejectedProjects,
    shallowEqual
  )

  const [tabIndex, setTabIndex] = useState(1)

  const [newRequests, setNewRequests] = useState(0)

  useEffect(() => {
    verifierState()
  }, [newRequests])

  const verifierState = () => {
    verifierCalls
      .getVerifierProjectDashboardStats(getLocalItem('userDetails')?.user_id)
      .then((response) => {
        setNewRequests(response.data?.new_requests)
      })
  }
  useEffect(() => {
    const newData: any = [],
      registeredData: any = [],
      acceptedData: any = [],
      rejectedData: any = []
    cachedVerifierDashboardProjects &&
      cachedVerifierDashboardProjects.length &&
      cachedVerifierDashboardProjects.map((item: any, index: any) => {
        if (
          item.project_status === PROJECT_ALL_STATUS.POTENTIAL_VERIFIER_SELECTED
        ) {
          newData.push([
            <ShortenedIDComp
              key={index}
              referenceId={item?.project_id?.uuid}
            />,
            moment(item.createdAt).format('DD/MM/YYYY'),
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <WorkOutlineIcon />
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  ml: 1,
                }}
              >
                {item.project_id.company_name}
              </Typography>
            </Box>,
            item.verifier_name,
            item.verifier_address,
            item.project_status ===
            PROJECT_ALL_STATUS.POTENTIAL_VERIFIER_SELECTED ? (
              <ApprovalChip key={index} variant={'Pending'} />
            ) : item.project_status ===
              PROJECT_ALL_STATUS.VERIFIER_APPROVED_THE_PROJECT ? (
              <ApprovalChip key={index} variant={'Approved'} />
            ) : (
              <ApprovalChip key={index} variant={'Rejected'} />
            ),
            item.project_status ===
            PROJECT_ALL_STATUS.POTENTIAL_VERIFIER_SELECTED ? (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {/* <TextButton sx={{ width: '90px' }} title="Approve" /> */}
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: Colors.textColorDarkGreen,
                    ml: 2,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    props.updateStatus(
                      PROJECT_ALL_STATUS.VERIFIER_APPROVED_THE_PROJECT,
                      item
                    )
                    verifierState()
                  }}
                >
                  Approve
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: Colors.textColorBrightRed2,
                    ml: 2,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    props.updateStatus(10, item)
                    verifierState()
                  }}
                >
                  Reject
                </Typography>
              </Box>
            ) : (
              '-'
            ),
            (item.project_status ===
              PROJECT_ALL_STATUS.POTENTIAL_VERIFIER_SELECTED ||
              item.project_status ===
                PROJECT_ALL_STATUS.VERIFIER_APPROVED_THE_PROJECT) && (
              <ChevronRightIcon
                key={index}
                onClick={() => {
                  // navigate(pathNames.VERIFIER_PROJECTS_DETAILS, {
                  //   state: { project_uuid: item.project_id.uuid },
                  // })
                  navigate(
                    {
                      pathname: pathNames.PROJECT_DETAILS_REGISTRY_ACC,
                      search: `?${createSearchParams({
                        projectId: item?.project_id.uuid,
                      })}`,
                    },
                    {
                      state: {
                        project_uuid: item?.project_id.uuid,
                        projectDetails: item?.project_id,
                      },
                    }
                  )
                }}
              />
            ),
          ])
        }

        if (
          item.project_status ===
            PROJECT_ALL_STATUS.VERIFIER_APPROVED_THE_PROJECT ||
          item.project_status ===
            PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT ||
          item.project_status ===
            PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY ||
          PROJECT_ALL_STATUS.PROJECT_UNDER_REVIEW_IN_REGISTRY
        ) {
          acceptedData.push([
            <ShortenedIDComp
              key={index}
              referenceId={item?.project_id?.uuid}
            />,
            moment(item.createdAt).format('DD/MM/YYYY'),
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <WorkOutlineIcon />
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  ml: 1,
                }}
              >
                {item.project_id.company_name}
              </Typography>
            </Box>,
            item.verifier_name,
            item.verifier_address,
            item.project_status ===
            PROJECT_ALL_STATUS.POTENTIAL_VERIFIER_SELECTED ? (
              <ApprovalChip key={index} variant={'Pending'} />
            ) : item.project_status ===
              PROJECT_ALL_STATUS.VERIFIER_APPROVED_THE_PROJECT ? (
              <ApprovalChip key={index} variant={'Approved'} />
            ) : (
              <ApprovalChip key={index} variant={'Rejected'} />
            ),
            item.project_status ===
            PROJECT_ALL_STATUS.POTENTIAL_VERIFIER_SELECTED ? (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {/* <TextButton sx={{ width: '90px' }} title="Approve" /> */}
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: Colors.textColorDarkGreen,
                    ml: 2,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    props.updateStatus(
                      PROJECT_ALL_STATUS.VERIFIER_APPROVED_THE_PROJECT,
                      item
                    )
                    verifierState()
                  }}
                >
                  Approve
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: Colors.textColorBrightRed2,
                    ml: 2,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    props.updateStatus(10, item)
                    verifierState()
                  }}
                >
                  Reject
                </Typography>
              </Box>
            ) : (
              '-'
            ),
            (item.project_status ===
              PROJECT_ALL_STATUS.POTENTIAL_VERIFIER_SELECTED ||
              item.project_status ===
                PROJECT_ALL_STATUS.VERIFIER_APPROVED_THE_PROJECT) && (
              <ChevronRightIcon
                key={index}
                onClick={() => {
                  // navigate(pathNames.VERIFIER_PROJECTS_DETAILS, {
                  //   state: { project_uuid: item.project_id.uuid },
                  // })
                  navigate(
                    {
                      pathname: pathNames.PROJECT_DETAILS_REGISTRY_ACC,
                      search: `?${createSearchParams({
                        projectId: item?.project_id.uuid,
                      })}`,
                    },
                    {
                      state: {
                        project_uuid: item?.project_id.uuid,
                        projectDetails: item?.project_id,
                      },
                    }
                  )
                }}
              />
            ),
          ])
        }

        if (
          item.project_status ===
          PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT
        ) {
          registeredData.push([
            <ShortenedIDComp
              key={index}
              referenceId={item?.project_id?.uuid}
            />,
            moment(item.createdAt).format('DD/MM/YYYY'),
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <WorkOutlineIcon />
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  ml: 1,
                }}
              >
                {item?.project_id?.company_name}
              </Typography>
            </Box>,
            item?.verifier_name,
            item?.verifier_address,
            moment(item?.createdAt).format('DD/MM/YYYY'),
            item?.project_status ===
            PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT ? (
              <ApprovalChip key={index} variant={'Pending'} />
            ) : (
              <ApprovalChip key={index} variant={'Verified'} />
            ),
            item?.project_status ===
            PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT ? (
              <TextButton
                key={index}
                sx={{ width: '90px' }}
                onClick={() =>
                  navigate(pathNames.VERIFIER_VERIFY_REPORT, {
                    state: {
                      project: item?.project_id,
                      pdf: item?.project_id?.project_pdf,
                    },
                  })
                }
                title="Verify"
              />
            ) : (
              '-'
            ),
            <ChevronRightIcon
              sx={{ cursor: 'pointer' }}
              key={index}
              onClick={() =>
                navigate({
                  pathname: pathNames.PROJECT_DETAILS_REGISTRY_ACC,
                  search: `?${createSearchParams({
                    projectId: item?.project_id.uuid,
                  })}`,
                })
              }
            />,
          ])
        }

        if (
          item.project_status === PROJECT_ALL_STATUS.REJECTED_BY_THE_VERIFIER
        ) {
          rejectedData.push([
            <ShortenedIDComp
              key={index}
              referenceId={item?.project_id?.uuid}
            />,
            moment(item.createdAt).format('DD/MM/YYYY'),
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <WorkOutlineIcon />
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  ml: 1,
                }}
              >
                {item?.project_id?.company_name}
              </Typography>
            </Box>,
            item?.verifier_name,
            item?.verifier_address,
            moment(item?.createdAt).format('DD/MM/YYYY'),
            item?.project_status ===
            PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT ? (
              <ApprovalChip key={index} variant={'Pending'} />
            ) : (
              <ApprovalChip key={index} variant={'Verified'} />
            ),
            item?.project_status ===
            PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT ? (
              <TextButton
                key={index}
                sx={{ width: '90px' }}
                onClick={() =>
                  navigate(pathNames.VERIFIER_VERIFY_REPORT, {
                    state: {
                      project: item?.project_id,
                      pdf: item?.project_id?.project_pdf,
                    },
                  })
                }
                title="Verify"
              />
            ) : (
              '-'
            ),
            <ChevronRightIcon
              sx={{ cursor: 'pointer' }}
              key={index}
              onClick={() =>
                navigate({
                  pathname: pathNames.PROJECT_DETAILS_REGISTRY_ACC,
                  search: `?${createSearchParams({
                    projectId: item?.project_id.uuid,
                  })}`,
                })
              }
            />,
          ])
        }
      })

    if (newData.length !== 0) {
      dispatch(setVerifierNewProjects(newData))
    } else {
      dispatch(setVerifierNewProjects([{}]))
    }

    if (registeredData.length !== 0) {
      dispatch(setVerifierRegisteredProjects(registeredData))
    } else {
      dispatch(setVerifierRegisteredProjects([{}]))
    }

    if (acceptedData.length !== 0) {
      dispatch(setVerifierAcceptedProjects(acceptedData))
    } else {
      dispatch(setVerifierAcceptedProjects([{}]))
    }
    if (rejectedData.length !== 0) {
      dispatch(setVerifierRejectedProjects(rejectedData))
    } else {
      dispatch(setVerifierRejectedProjects([{}]))
    }
  }, [props])

  const renderDashboardTableTabData = (selectedTab: any) => {
    if (selectedTab === 1) {
      return verifierNewProjects && verifierNewProjects.length ? (
        <CCTable
          headings={headingsNew}
          rows={verifierNewProjects}
          sx={{ minWidth: 100 }}
          maxWidth={'100%'}
          tableSx={{ minWidth: 100 }}
          hideScrollbar
          pagination
          rowsPerPageProp={5}
          stickyLastCol
          stickySecondLastCol
        />
      ) : (
        <NoData title="No new projects available" />
      )
    }
    if (selectedTab === 2) {
      return verifierAcceptedProjects && verifierAcceptedProjects.length ? (
        <CCTable
          headings={headingsNew}
          rows={verifierAcceptedProjects}
          sx={{ minWidth: 100 }}
          maxWidth={'100%'}
          tableSx={{ minWidth: 100 }}
          hideScrollbar
          pagination
          rowsPerPageProp={5}
          stickyLastCol
          stickySecondLastCol
        />
      ) : (
        <NoData title="No accepted projects available" />
      )
    }
    if (selectedTab === 3) {
      return verifierRegisteredProjects && verifierRegisteredProjects.length ? (
        <CCTable
          headings={headingsRegistered}
          rows={verifierRegisteredProjects}
          sx={{ minWidth: 100 }}
          maxWidth={'100%'}
          tableSx={{ minWidth: 100 }}
          hideScrollbar
          pagination
          rowsPerPageProp={5}
          stickyLastCol
          stickySecondLastCol
        />
      ) : (
        <NoData title="No registered projects available" />
      )
    }
    if (selectedTab === 4) {
      return verifierRejectedProjects && verifierRejectedProjects.length ? (
        <CCTable
          headings={headingsNew}
          rows={verifierRejectedProjects}
          sx={{ minWidth: 100 }}
          maxWidth={'100%'}
          tableSx={{ minWidth: 100 }}
          hideScrollbar
          pagination
          rowsPerPageProp={5}
          stickyLastCol
          stickySecondLastCol
        />
      ) : (
        <NoData title="No rejected projects available" />
      )
    }
  }
  return (
    <>
      <TabSelector
        tabArray={['New', 'Accepted', 'Registered', 'Rejected']}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        sx={{ marginBottom: 2 }}
      />

      {props?.loading ? (
        <CCTableSkeleton sx={{ mt: 2 }} items={5} />
      ) : (
        renderDashboardTableTabData(tabIndex)
      )}
    </>
  )
}

export default ListOfProjects
