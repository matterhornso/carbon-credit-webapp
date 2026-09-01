import { Box, Typography } from '@mui/material'
import moment from 'moment'
import React, { FC, useEffect, useState } from 'react'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'

import CCButton from '../../atoms/CCButton'
import CCTable from '../../atoms/CCTable'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import StatusChips from '../../atoms/StatusChips/StatusChips'

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setRegistryProjectDetails } from '../../redux/Slices/registrySlice'

import { pathNames } from '../../routes/pathNames'

import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import LimitedText from '../../atoms/LimitedText/LimitedText'

import { shallowEqual } from 'react-redux'
import {
  setRegistryDraftProjects,
  setRegistryNewProjects,
  setRegistryReviewedProjects,
} from '../../redux/Slices/Dashboard/dashboardSlice'
import NoData from '../../atoms/NoData/NoData'
import TabSelector from '../../atoms/TabSelector/TabSelector'
import { getTextAccordingToStatus } from '../../utils/commonFunctions'
import { getLocalItem } from '../../utils/Storage'
import { registryCalls } from '../../api/registry.api'
import { SDGSLIST } from '../../config/constants.config'
import {
  setSectionIndex as setMonthlyReportSectionIndex,
  setSubSectionIndex,
  setMainProjectDetails,
} from '../../redux/Slices/MonthlyReportUpdate'

let index = 0
const draftHeadings: any = [
  <LimitedText key={index++} text="ID" />,
  <LimitedText key={index++} text="Project Name" />,
  <LimitedText key={index++} text="Project Proponent" />,
  <LimitedText key={index++} text="Sector" widthLimit="200px" />,
  <LimitedText key={index++} text="Country/Region" widthLimit="250px" />,
  <LimitedText key={index++} text="Status" />,
  <LimitedText key={index++} text="Estimated Annual Emissions" />,
  <LimitedText key={index++} text="SDG's" />,
  <LimitedText key={index++} text="Action" />,
]
const headingsNew: any = [
  <LimitedText key={index++} text="Created on" />,
  <LimitedText key={index++} text="Received on" />,
  <LimitedText key={index++} text="Project Developer" />,
  <LimitedText key={index++} text="Project name" widthLimit="200px" />,
  <LimitedText key={index++} text="Project Status" widthLimit="250px" />,
  <LimitedText key={index++} text="Action" />,
  <LimitedText key={index++} text="" />,
]
const headingsReviewed: any = [
  <LimitedText key={index++} text="Created on" />,
  <LimitedText key={index++} text="Received on" />,
  <LimitedText key={index++} text="Project Developer" />,
  <LimitedText key={index++} text="Project name" widthLimit="200px" />,
  <LimitedText key={index++} text="Project Status" widthLimit="250px" />,
]

interface ProjectTableProps {
  loading: boolean
}

const ProjectTable: FC<ProjectTableProps> = ({ loading }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  const cachedRegistryDraftTabProjects = useAppSelector(
    ({ caching }) => caching.cachedRegistryDraftTabProjects,
    shallowEqual
  )

  const cachedRegistryNewTabAllProjects = useAppSelector(
    ({ caching }) => caching.cachedRegistryNewTabAllProjects,
    shallowEqual
  )

  const cachedRegistryReviewedTabAllProjects = useAppSelector(
    ({ caching }) => caching.cachedRegistryReviewedTabAllProjects,
    shallowEqual
  )

  const registryDraftProjects = useAppSelector(
    ({ dashboard }) => dashboard.registryDraftProjects,
    shallowEqual
  )

  const registryNewProjects = useAppSelector(
    ({ dashboard }) => dashboard.registryNewProjects,
    shallowEqual
  )

  const registryReviewedProjects = useAppSelector(
    ({ dashboard }) => dashboard.registryReviewedProjects,
    shallowEqual
  )

  const [tabIndex, setTabIndex] = useState(1)

  const getAllSectors = (SectorArray: []): string => {
    return SectorArray.join('/')
  }

  const data = [1, 2, 3, 4]

  useEffect(() => {
    const draftTable: any = []

    cachedRegistryDraftTabProjects &&
      cachedRegistryDraftTabProjects.length &&
      cachedRegistryDraftTabProjects.map((item: any, index: any) => {
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
          <Box
            key={index}
            sx={{
              borderRadius: '24px',
              py: 1,
              px: 2,
              background: item?.project_status === 0 ? '#FFECDE' : '#DEFFDC',
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 14,
                color: item?.project_status === 0 ? '#F9954D' : '#5AB852',
                whiteSpace: 'nowrap',
              }}
            >
              {item?.project_status === 0 ? 'Under Going Review' : 'Registered'}
            </Typography>
          </Box>,
          //<LimitedText
          //  key={index}
          //  text={getTextAccordingToStatus(item?.project_status)}
          ///>,
          '-- --',
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
              fontSize: 14,
              width: '180px',
              padding: '5px 20px',
              '&:hover': {
                background: 'white',
                border: '1px solid black',
                color: 'black',
              },
            }}
            onClick={async () => {
              navigate(pathNames.REGISTRY_REVIEW_REPORT, {
                state: { uuid: item?.uuid },
              })
            }}
          >
            {/*{index & 1 ? 'Review Draft Pdd' : 'Add Action Methodology'}*/}
            Review Draft PDD
          </CCButton>,
        ])
      })
    if (draftTable.length !== 0) {
      dispatch(setRegistryDraftProjects(draftTable))
    } else {
      dispatch(setRegistryDraftProjects(null))
    }
  }, [cachedRegistryDraftTabProjects])

  useEffect(() => {
    const newData: any = []

    cachedRegistryNewTabAllProjects &&
      cachedRegistryNewTabAllProjects.length &&
      cachedRegistryNewTabAllProjects.map((project: any, index: any) => {
        newData.push([
          <Box
            key={index}
            sx={{ cursor: 'pointer' }}
            onClick={() => onClickStartHandler(project)}
          >
            <LimitedText
              key={index}
              text={moment(project.createdAt).format('l')}
            />
          </Box>,
          <Box
            key={index}
            sx={{ cursor: 'pointer' }}
            onClick={() => onClickStartHandler(project)}
          >
            <LimitedText
              text={
                project?.report?.createdAt
                  ? moment(project.createdAt).format('l')
                  : '-'
              }
            />
          </Box>,
          <Box
            key={index}
            sx={{ cursor: 'pointer' }}
            onClick={() => onClickStartHandler(project)}
          >
            <LimitedText text={project?.user_id?.organisationName} />
          </Box>,
          <Box
            key={index}
            className="td-as-link"
            onClick={() => onClickStartHandler(project)}
          >
            <LimitedText
              key={index}
              text={project?.company_name}
              widthLimit="200px"
            />
          </Box>,
          <Box key={index} onClick={() => onClickStartHandler(project)}>
            <LimitedText
              text={getTextAccordingToStatus(project?.project_status)}
              widthLimit="250px"
            />
          </Box>,
          //project?.project_status === 8 ? (
          //  <ChevronRightIcon onClick={() => onClickStartHandler(project)} />
          //) : (
          <CCButton
            key={index}
            sx={{
              background: '#006B5E',
              color: '#FFFFFF',
              borderRadius: '32px',
              fontSize: 14,
              px: 3,
              py: 1,
              minWidth: 0,
              whiteSpace: 'nowrap',
            }}
            onClick={() => {
              dispatch(setRegistryProjectDetails(project))
              navigate(pathNames.REGISTRY_REVIEW_REPORT, {
                state: { projectReportDetails: project },
              })
            }}
          >
            Start review
          </CCButton>,
          <ChevronRightIcon
            key={index}
            onClick={() => onClickStartHandler(project)}
          />,
        ])
      })

    if (newData.length !== 0) {
      dispatch(setRegistryNewProjects(newData))
    } else {
      dispatch(setRegistryNewProjects(null))
    }
  }, [cachedRegistryNewTabAllProjects])

  useEffect(() => {
    const reviewedData: any = []

    cachedRegistryReviewedTabAllProjects &&
      cachedRegistryReviewedTabAllProjects.length &&
      cachedRegistryReviewedTabAllProjects.map((project: any, index: any) => {
        reviewedData.push([
          <Box
            key={index}
            sx={{ cursor: 'pointer' }}
            onClick={() => onClickStartHandler(project)}
          >
            <LimitedText text={moment(project.createdAt).format('l')} />
          </Box>,
          <Box
            key={index}
            sx={{ cursor: 'pointer' }}
            onClick={() => onClickStartHandler(project)}
          >
            <LimitedText
              text={
                project?.report?.createdAt
                  ? moment(project.createdAt).format('l')
                  : '-'
              }
            />
          </Box>,
          <Box
            key={index}
            sx={{ cursor: 'pointer' }}
            onClick={() => onClickStartHandler(project)}
          >
            <LimitedText text={project?.user_id?.organisationName} />
          </Box>,
          <Box
            key={index}
            className="td-as-link"
            onClick={() => onClickStartHandler(project)}
          >
            <LimitedText
              key={index}
              text={project?.company_name}
              widthLimit="200px"
            />
          </Box>,
          <Box
            key={index}
            sx={{ cursor: 'pointer' }}
            onClick={() => onClickStartHandler(project)}
          >
            {getTextAccordingToStatus(project?.project_status)}
          </Box>,
        ])
      })

    if (reviewedData.length !== 0) {
      dispatch(setRegistryReviewedProjects(reviewedData))
    } else {
      dispatch(setRegistryReviewedProjects(null))
    }
  }, [cachedRegistryReviewedTabAllProjects])

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

  const renderStatusChips = (status: number) => {
    switch (status) {
      case 6: {
        return (
          <StatusChips
            text="Pending"
            textColor=""
            backgroundColor=""
            cirlceColor=""
          />
        )
      }
      case 7: {
        return (
          <StatusChips
            text="In progress"
            textColor=""
            backgroundColor="rgba(243, 186, 77, 0.24)"
            cirlceColor="#E6A603"
          />
        )
      }
      case 8: {
        return (
          <StatusChips
            text="Completed"
            textColor=""
            backgroundColor="#75F8E4"
            cirlceColor="#00A392"
          />
        )
      }
    }
  }

  const onClickStartHandler = async (projectDetails: any) => {
    dispatch(setRegistryProjectDetails(projectDetails))
    navigate({
      pathname: pathNames.PROJECT_DETAILS_REGISTRY_ACC,
      search: `?${createSearchParams({
        projectId: projectDetails?.uuid,
      })}`,
    })
  }

  return (
    <>
      <TabSelector
        tabArray={['Draft', 'New', 'Reviewed']}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        sx={{ marginBottom: 2 }}
      />

      {loading ? (
        <CCTableSkeleton sx={{ mt: 2 }} items={5} />
      ) : tabIndex === 1 ? (
        registryDraftProjects && registryDraftProjects.length ? (
          <CCTable
            headings={draftHeadings}
            rows={registryDraftProjects}
            sx={{ minWidth: 100 }}
            maxWidth={'100%'}
            tableSx={{ minWidth: 100 }}
            hideScrollbar
            pagination
            rowsPerPageProp={5}
            // stickyLastCol
            // stickySecondLastCol
          />
        ) : (
          <NoData title="No new projects available" />
        )
      ) : tabIndex === 2 ? (
        registryNewProjects && registryNewProjects.length ? (
          <CCTable
            headings={headingsNew}
            rows={registryNewProjects}
            sx={{ minWidth: 100 }}
            maxWidth={'100%'}
            tableSx={{ minWidth: 100 }}
            hideScrollbar
            pagination
            rowsPerPageProp={5}
            // stickyLastCol
            // stickySecondLastCol
          />
        ) : (
          <NoData title="No new projects available" />
        )
      ) : registryReviewedProjects && registryReviewedProjects.length ? (
        <CCTable
          headings={headingsReviewed}
          rows={registryReviewedProjects}
          sx={{ minWidth: 100 }}
          maxWidth={'100%'}
          tableSx={{ minWidth: 100 }}
          hideScrollbar
          pagination
          rowsPerPageProp={5}
        />
      ) : (
        <NoData title="No reviewed projects available" />
      )}
    </>
  )
}

export default ProjectTable

const RenderSdgList = ({ ImageArray }: { ImageArray: number[] }) => {
  return (
    <Box display="flex" alignItems="center">
      <Typography sx={{ fontWeight: 400, fontSize: 14 }}>Planned</Typography>
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
