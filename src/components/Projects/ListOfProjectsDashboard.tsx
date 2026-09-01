// React Imports
import React, { FC, useState, useEffect } from 'react'

// MUI Imports
import { Grid, Box, Typography } from '@mui/material'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import CreateIcon from '@mui/icons-material/Create'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

// Functional Imports
import moment from 'moment'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { shallowEqual, useDispatch } from 'react-redux'

// Local Imports
import TabSelector from '../../atoms/TabSelector/TabSelector'
import NoData from '../../atoms/NoData/NoData'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import { pathNames } from '../../routes/pathNames'
import {
  setSectionIndex as setMonthlyReportSectionIndex,
  setSubSectionIndex,
  setMainProjectDetails,
} from '../../redux/Slices/MonthlyReportUpdate'
import { PROJECT_ALL_STATUS } from '../../config/constants.config'
import { useAppSelector } from '../../hooks/reduxHooks'
import CCTable from '../../atoms/CCTable'
import LimitedText from '../../atoms/LimitedText/LimitedText'
import { Colors } from '../../theme'
import {
  // setAdminDraftProjects,
  setPdDraftProjects,
  setIssuerNewProjects,
  setIssuerRegisteredProjects,
  setIssueVerificationProjects,
} from '../../redux/Slices/Dashboard/dashboardSlice'
import { getTextAccordingToStatus } from '../../utils/commonFunctions'
import CCButton from '../../atoms/CCButton'

// sdg's list imported from constants.config.ts

import { SDGSLIST } from '../../config/constants.config'

let index = 0
const headingsNew = [
  <LimitedText key={index++} text="Reference ID" />,
  <LimitedText key={index++} text="Creation Dt" />,
  <LimitedText key={index++} text="Project Name" widthLimit="200px" />,
  <LimitedText key={index++} text="Location" />,
  <LimitedText key={index++} text="Project Status" widthLimit="250px" />,
  <LimitedText
    key={index++}
    text="Estimated Annual Emission Reductions"
    widthLimit="180px"
  />,
  <LimitedText key={index++} text="SDGs" widthLimit="160px" />,
  <LimitedText key={index++} text="Action" />,
  <LimitedText key={index++} text="" />,
]
const headingsInVerification = [
  <LimitedText key={index++} text="Reference ID" />,
  <LimitedText key={index++} text="Creation Dt" />,
  <LimitedText key={index++} text="Project Name" widthLimit="200px" />,
  <LimitedText key={index++} text="Location" />,
  <LimitedText key={index++} text="Verifier" />,
  <LimitedText key={index++} text="Project Status" widthLimit="250px" />,
  <LimitedText key={index++} text="Action" />,
  <LimitedText key={index++} text="" />,
]

const headingsRegistered = [
  <LimitedText key={index++} text="Reference ID" />,
  <LimitedText key={index++} text="Creation Dt" />,
  <LimitedText key={index++} text="Project Name" widthLimit="200px" />,
  <LimitedText key={index++} text="Location" />,
  <LimitedText key={index++} text="Verifier" />,
  <LimitedText
    key={index++}
    text="Next Date"
    tooltipText="Next Report Submission Dt"
  />,
  <LimitedText key={index++} text="Project Status" widthLimit="250px" />,
  <LimitedText key={index++} text="" />,
]
// headings for draft tab
const headingsDrafted = [
  <LimitedText key={index++} text="Reference ID" />,
  <LimitedText key={index++} text="ProjectName" />,
  <LimitedText key={index++} text="Project Proponent" />,
  <LimitedText key={index++} text="Sector" />,
  <LimitedText key={index++} text="Country/Region" />,
  <LimitedText key={index++} text="Project Status" />,
  <LimitedText
    key={index++}
    text="Estimated Annual Emission Reductions"
    // widthLimit="180px"
  />,
  <LimitedText key={index++} text="SDGs" />,
  <LimitedText key={index++} text="Action" />,
]

interface ListOfProjectsDashboardProps {
  data?: any
  loading?: any
}

const ListOfProjectsDashboard: FC<ListOfProjectsDashboardProps> = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cachedIssuerDashboardProjects = useAppSelector(
    ({ caching }) => caching.cachedIssuerDashboardProjects,
    shallowEqual
  )
  const issuerNewProjects = useAppSelector(
    ({ dashboard }) => dashboard.issuerNewProjects,
    shallowEqual
  )
  const issuerRegisteredProjects = useAppSelector(
    ({ dashboard }) => dashboard.issuerRegisteredProjects,
    shallowEqual
  )

  // const adminDraftedProjects = useAppSelector(
  //   ({ dashboard }) => dashboard.adminDraftProjects,
  //   shallowEqual
  // )

  const pdDraftedProjects = useAppSelector(
    ({ dashboard }) => dashboard.pdDraftProjects,
    shallowEqual
  )

  const issuerVerificationProjects = useAppSelector(
    ({ dashboard }) => dashboard.issuerVerificationProjects,
    shallowEqual
  )
  const cachedNewTabAllProjects = useAppSelector(
    ({ caching }) => caching.cachedNewTabAllProjects,
    shallowEqual
  )

  const cachedVerificationTabAllProjects = useAppSelector(
    ({ caching }) => caching.cachedVerificationTabAllProjects,
    shallowEqual
  )

  const cachedRegisterTabAllProjects = useAppSelector(
    ({ caching }) => caching.cachedRegisterTabAllProjects,
    shallowEqual
  )

  const cachedDraftTabProjects = useAppSelector(
    ({ caching }) => caching.cachedDraftProjects,
    shallowEqual
  )

  // console.log('from list of project dashboard', cachedDraftTabProjects)

  const [tabIndex, setTabIndex] = useState(1)

  const openProjectDetails = (projectDetails: any, redirect: any) => {
    if (projectDetails) {
      // const percentageAddedData = addSectionPercentages(projectDetails)

      // dispatch(setCurrentProjectDetailsUUID(projectDetails?.uuid))
      // dispatch(setCurrentProjectDetails(projectDetails))

      if (redirect === 'Details') {
        navigate(
          {
            pathname: pathNames.PROFILE_DETAILS_ISSUANCE_INFO,
            search: `?${createSearchParams({
              projectId: projectDetails?.uuid,
            })}`,
          },
          {
            state: {
              status: projectDetails?.project_status,
            },
          }
        )
      } else if (redirect === 'Monthly') {
        dispatch(setMonthlyReportSectionIndex(0))
        dispatch(setSubSectionIndex(0))
        dispatch(setMainProjectDetails(projectDetails))
        navigate(pathNames.MONTHLY_REPORT_UPDATE)
      } else if (redirect === 'Verify') {
        navigate(pathNames.SELECT_VERIFIER)
      }
    }
  }

  const data = [1, 2, 3, 4] // testing purpose

  // creating a table for the draft tab inside the table present in the overview page

  const getAllSectors = (SectorArray: []): string => {
    return SectorArray.join('/')
  }

  useEffect(() => {
    const draftTable: any = []
    // console.log('entered ', draftTable)

    cachedDraftTabProjects &&
      cachedDraftTabProjects.length &&
      cachedDraftTabProjects.map((item: any, index: any) => {
        draftTable.push([
          <Box
            key={index}
            className="td-as-link"
            onClick={() => openProjectDetails(item, 'Details')}
          >
            <LimitedText
              key={index}
              text={item?.uuid}
              widthLimit={'100px'}
              ellispsisAtStart
            />
          </Box>,
          // <LimitedText key={index} text={moment(item?.createdAt).format('DD/MM/YYYY')}/>,
          <Box
            key={index}
            className="td-as-link"
            onClick={() => openProjectDetails(item, 'Details')}
          >
            <LimitedText
              text={item?.projectIntroduction?.name?.data?.blocks[0].data?.text}
              widthLimit="200px"
            />
          </Box>,
          '-',
          <LimitedText
            key={index}
            text={getAllSectors(item?.projectIntroduction?.sectoral_scope)}
          />,
          <LimitedText
            key={index}
            text={
              item?.projectIntroduction?.location?.data?.blocks[0].data?.text
            }
          />,
          <LimitedText
            key={index}
            text={getTextAccordingToStatus(item?.project_status)}
          />,
          '-',
          <RenderSdgList key={index} ImageArray={data} />,
          // <Box key={index}>
          //    <ChevronRightIcon sx={{cursor:'pointer'}} onClick={()=>openProjectDetails(item,'Details')}/>
          // </Box>
          <CCButton
            key={index}
            sx={{
              minWidth: 0,
              color: 'black',
              background: '#BED7FE',
              borderRadius: '24px',
              whiteSpace: 'nowrap',
              fontSize: 12,
              padding: '9px 20px',
              '&:hover': {
                background: 'white',
                border: '1px solid black',
                color: 'black',
              },
            }}
            onClick={() => {
              navigate(pathNames.ORIGINATION_NEW, {
                state: { uuid: item?.uuid },
              })
            }}
          >
            {/*{index & 1 ? 'Review Draft Pdd' : 'Add Action Methodology'}*/}
            Continue
          </CCButton>,
        ])
      })

    if (draftTable.length !== 0) {
      dispatch(setPdDraftProjects(draftTable))
    } else {
      dispatch(setPdDraftProjects(null))
    }
  }, [cachedDraftTabProjects])

  // console.log(
  //   'admin drafted projects from list of projects dashboard',
  //   adminDraftedProjects
  // )

  useEffect(() => {
    const newData: any = []

    cachedNewTabAllProjects &&
      cachedNewTabAllProjects.length &&
      cachedNewTabAllProjects.map((item: any, index: any) => {
        newData.push([
          // <ShortenedIDComp key={index} referenceId={item.uuid} />,
          <Box
            key={index}
            className="td-as-link"
            onClick={() => openProjectDetails(item, 'Details')}
          >
            <LimitedText
              key={index}
              text={item?.uuid}
              widthLimit={'100px'}
              ellispsisAtStart
            />
          </Box>,
          <LimitedText
            key={index}
            text={moment(item?.createdAt).format('DD/MM/YYYY')}
          />,
          <Box
            key={index}
            className="td-as-link"
            onClick={() => openProjectDetails(item, 'Details')}
          >
            <LimitedText text={item?.company_name} widthLimit="200px" />
          </Box>,

          <LimitedText key={index} text={item?.location} />,
          <LimitedText
            key={index}
            text={getTextAccordingToStatus(item?.project_status)}
            widthLimit="250px"
          />,
          '-', // for estimated emissions dummy space
          <RenderSdgList key={'1'} ImageArray={data} />, // for sdgs
          // item.completed ? (
          <CCButton
            key={'1'}
            onClick={() =>
              navigate(pathNames.SELECT_VERIFIER, {
                state: { _id: item?._id },
              })
            }
            sx={{
              minWidth: 0,
              color: 'black',
              background: '#BED7FE',
              borderRadius: '24px',
              whiteSpace: 'nowrap',
              fontSize: 14,
              padding: '9px 20px',
              '&:hover': {
                background: 'white',
                border: '1px solid black',
                color: 'black',
              },
            }}
          >
            Select Verifier
          </CCButton>,
          // ) : item.project_status === PROJECT_ALL_STATUS.CREATED_PROJECT ? (
          //   // isProjectCompleted(item) ? (
          //   //   <TextButton
          //   //     title="Select Verifier"
          //   //     onClick={() => openProjectDetails(item, 'Verify')}
          //   //   />
          //   // ) : (
          //   <CreateIcon
          //     sx={{ cursor: 'pointer' }}
          //     key="1"
          //     onClick={() => moveToSection(item)}
          //   />
          // ) : (
          //  " "
          // )
          <Box key="1">
            <ChevronRightIcon
              sx={{ cursor: 'pointer' }}
              onClick={() => openProjectDetails(item, 'Details')}
            />
          </Box>,
        ])
      })

    if (newData.length !== 0) {
      dispatch(setIssuerNewProjects(newData))
    } else {
      dispatch(setIssuerNewProjects(null))
    }
  }, [cachedNewTabAllProjects])

  useEffect(() => {
    const verificationData: any = []

    cachedVerificationTabAllProjects &&
      cachedVerificationTabAllProjects.length &&
      cachedVerificationTabAllProjects.map((item: any, index: any) => {
        verificationData.push([
          // <ShortenedIDComp key={index} referenceId={item.uuid} />,
          <Box
            key={index}
            className="td-as-link"
            onClick={() => openProjectDetails(item, 'Details')}
          >
            <LimitedText
              key={index}
              text={item?.uuid}
              widthLimit={'100px'}
              ellispsisAtStart
            />
          </Box>,
          <LimitedText
            key={index}
            text={moment(item?.createdAt).format('DD/MM/YYYY')}
          />,
          <Box
            key={index}
            className="td-as-link"
            onClick={() => openProjectDetails(item, 'Details')}
          >
            <LimitedText text={item?.company_name} widthLimit="200px" />
          </Box>,
          <LimitedText key={index} text={item?.location} />,
          item?.verifier_details_id?.verifier_id?.organisationName ? (
            <LimitedText
              text={item?.verifier_details_id?.verifier_id?.organisationName}
            />
          ) : (
            '-'
          ),
          <LimitedText
            key={index}
            text={getTextAccordingToStatus(item?.project_status)}
            widthLimit="250px"
          />,
          !item?.registry_details_id ? (
            <CCButton
              onClick={() =>
                navigate(pathNames.SELECT_REGISTRY, {
                  state: { _id: item?._id, projectUUID: item?.uuid },
                })
              }
              sx={{
                minWidth: 0,
                color: 'white',
                background: Colors.darkPrimary1,
                borderRadius: '32px',
                whiteSpace: 'nowrap',
                fontSize: 14,
                '&:hover': {
                  background: 'white',
                  border: '1px solid black',
                  color: 'black',
                },
              }}
            >
              Select Registry
            </CCButton>
          ) : //item?.project_status ===
          //    PROJECT_ALL_STATUS.POTENTIAL_VERIFIER_SELECTED &&
          item.project_status ===
            PROJECT_ALL_STATUS.VERIFIER_APPROVED_THE_PROJECT ? (
            <CCButton
              onClick={() => {
                navigate(
                  {
                    pathname: pathNames.PROFILE_DETAILS_ISSUANCE_INFO,
                    search: `?${createSearchParams({
                      projectId: item?.uuid,
                    })}`,
                  },
                  {
                    state: {
                      status: 3,
                      projectDetailsTabIndex: 2,
                      //isEdited: true,
                    },
                  }
                )
              }}
              sx={{
                minWidth: 0,
                color: 'white',
                background: Colors.darkPrimary1,
                borderRadius: '32px',
                whiteSpace: 'nowrap',
                fontSize: 14,
                '&:hover': {
                  background: 'white',
                  border: '1px solid black',
                  color: 'black',
                },
              }}
            >
              Finalise Verifier
            </CCButton>
          ) : (
            '-'
          ),
          <Box key="1">
            <ChevronRightIcon
              sx={{ cursor: 'pointer' }}
              onClick={() => openProjectDetails(item, 'Details')}
            />
          </Box>,
        ])
      })

    if (verificationData.length !== 0) {
      dispatch(setIssueVerificationProjects(verificationData))
    } else {
      dispatch(setIssueVerificationProjects(null))
    }
  }, [cachedVerificationTabAllProjects])

  useEffect(() => {
    const registeredData: any = []

    cachedRegisterTabAllProjects &&
      cachedRegisterTabAllProjects.length &&
      cachedRegisterTabAllProjects.map((item: any, index: any) => {
        registeredData.push([
          <Box
            key={index}
            className="td-as-link"
            onClick={() => openProjectDetails(item, 'Details')}
          >
            {' '}
            <LimitedText
              key={index}
              text={item.uuid}
              widthLimit={'100px'}
              ellispsisAtStart
            />
          </Box>,
          <LimitedText
            key={index}
            text={moment(item.createdAt).format('DD/MM/YYYY')}
          />,
          <Box
            key={index}
            className="td-as-link"
            onClick={() => openProjectDetails(item, 'Details')}
          >
            <LimitedText
              key={index}
              text={item.company_name}
              widthLimit="200px"
            />
          </Box>,
          <LimitedText key={index} text={item.location} />,
          item?.verifier_details_id?.verifier_id?.organisationName ? (
            <LimitedText
              text={item?.verifier_details_id?.verifier_id?.organisationName}
            />
          ) : (
            '-'
          ),
          <LimitedText
            key={index}
            text={moment(item.report?.next_date).format('DD/MM/YYYY')}
          />,
          // item.project_status ===
          // PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY ? (
          //   <TextButton
          //     key="1"
          //     title="Add Monthly Data"
          //     onClick={() => openProjectDetails(item, 'Monthly')}
          //   />
          // ) : (
          //   '-'
          // ),
          <LimitedText
            key={index}
            text={getTextAccordingToStatus(item?.project_status)}
            widthLimit="250px"
          />,
          <Box
            key="1"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ChevronRightIcon
              sx={{ cursor: 'pointer' }}
              onClick={() => openProjectDetails(item, 'Details')}
            />
          </Box>,
        ])
      })

    if (registeredData.length !== 0) {
      dispatch(setIssuerRegisteredProjects(registeredData))
    } else {
      dispatch(setIssuerRegisteredProjects(null))
    }
  }, [cachedRegisterTabAllProjects])

  const moveToSection = (projectDetails: any) => {
    if (projectDetails) {
      navigate(
        {
          pathname: pathNames.PROFILE_DETAILS_ISSUANCE_INFO,
          search: `?${createSearchParams({
            projectId: projectDetails?.uuid,
          })}`,
        },
        {
          state: {
            isEdited: true,
          },
        }
      )
    }
  }

  return (
    <>
      <TabSelector
        tabArray={['Draft', 'New', 'In Verification', 'Registered']}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        sx={{ marginBottom: 2 }}
      />

      {props?.loading ? (
        <CCTableSkeleton sx={{ mt: 2 }} items={5} />
      ) : tabIndex === 1 ? (
        pdDraftedProjects && pdDraftedProjects.length ? (
          <CCTable
            headings={headingsDrafted}
            rows={pdDraftedProjects}
            sx={{ minWidth: 100 }}
            maxWidth={'100%'}
            tableSx={{ minWidth: 100 }}
            hideScrollbar
            pagination
            rowsPerPageProp={5}
            stickyLastCol
            // stickySecondLastCol
          />
        ) : (
          <NoData title="No drafted projects available" />
        )
      ) : tabIndex === 2 ? (
        issuerNewProjects && issuerNewProjects.length ? (
          <CCTable
            headings={headingsNew}
            rows={issuerNewProjects}
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
      ) : tabIndex === 3 ? (
        issuerVerificationProjects && issuerVerificationProjects.length ? (
          <CCTable
            headings={headingsInVerification}
            rows={issuerVerificationProjects}
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
          <NoData title="No verification projects available" />
        )
      ) : issuerRegisteredProjects && issuerRegisteredProjects.length ? (
        <CCTable
          headings={headingsRegistered}
          rows={issuerRegisteredProjects}
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
      )}
    </>
  )
}

const RenderSdgList = ({ ImageArray }: { ImageArray: number[] }) => {
  return (
    <Box display="flex" alignItems="center">
      <Typography>Planned</Typography>
      <Box marginLeft="4px" display="flex" alignItems="center">
        {ImageArray.map((value: number) => {
          const matchingSDG = SDGSLIST.find((sdg) => sdg.key === value)
          if (matchingSDG) {
            return (
              <img
                key={value}
                src={matchingSDG.image}
                alt={`SDG ${value}`}
                style={{ width: '30px', height: '30px', marginRight: '3px' }}
              />
            )
          }
          return null
        })}
      </Box>
    </Box>
  )
}
export default ListOfProjectsDashboard
