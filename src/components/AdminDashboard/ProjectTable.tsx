import React, { FC, useEffect, useState } from 'react'
import { Box } from '@mui/system'
import CCButton from '../../atoms/CCButton'
import CCTable from '../../atoms/CCTable'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import LimitedText from '../../atoms/LimitedText/LimitedText'
import { shallowEqual } from 'react-redux'
import TabSelector from '../../atoms/TabSelector/TabSelector'
import { getTextAccordingToStatus } from '../../utils/commonFunctions'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { setAdminDraftProjects } from '../../redux/Slices/Dashboard/dashboardSlice'
import { SDGSLIST } from '../../config/constants.config'
import { pathNames } from '../../routes/pathNames'
import {
  setSectionIndex as setMonthlyReportSectionIndex,
  setSubSectionIndex,
  setMainProjectDetails,
} from '../../redux/Slices/MonthlyReportUpdate'
import { Typography } from '@mui/material'
import NoData from '../../atoms/NoData/NoData'
import { ProjectDraftCalls } from '../../api/projectDraftCalls.api'

let index = 0
const headings: any = [
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

interface ProjectTableProps {
  loading: boolean
}

const ProjectTable: FC<ProjectTableProps> = ({ loading }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const cachedAdminAllProjects = useAppSelector(
    ({ caching }) => caching.cachedAdminDashboardProjects,
    shallowEqual
  )

  const currentProjectDraftDetails = useAppSelector(
    ({ projectDraftDetails }) => projectDraftDetails.currentProjectDraftDetails
  )

  const adminAllProjects = useAppSelector(
    ({ dashboard }) => dashboard.adminDraftProjects
  )

  const [tabIndex, setTabIndex] = useState<number>(1)

  const getAllSectors = (SectorArray: []): string => {
    return SectorArray.join('/')
  }

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

  const data = [1, 2, 3, 4]

  useEffect(() => {
    const draftTable: any = []
    // console.log('entered ', draftTable)

    cachedAdminAllProjects &&
      cachedAdminAllProjects.length &&
      cachedAdminAllProjects.map((item: any, index: any) => {
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
              text={
                item?.projectIntroduction?.name?.data?.blocks[0].data?.text ||
                item?.projectIntroduction?.name?.data
              }
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
              item?.projectIntroduction?.location?.data?.blocks[0].data?.text ||
              item?.projectIntroduction?.location
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
            onClick={async () => {
              if (item?.project_status === 1200) {
                await updateAdminStatus(item?.uuid)
              }
              navigate(pathNames.PROJECT_DETAILS, {
                state: { uuid: item?.uuid },
              })
            }}
          >
            {item?.project_status >= 1050 || item?.project_status <= 1100
              ? 'Review Draft PDD'
              : 'Edit and Review'}
          </CCButton>,
        ])
      })

    if (draftTable.length !== 0) {
      dispatch(setAdminDraftProjects(draftTable))
    } else {
      dispatch(setAdminDraftProjects(null))
    }
    console.log('got filled for admin dashboard', draftTable)
  }, [cachedAdminAllProjects])

  const updateAdminStatus = async (uuid: string) => {
    try {
      if (!uuid) {
        return
      }
      const res = await ProjectDraftCalls.adminStatusUpdate({
        uuid,
      })
    } catch (e) {
      console.log('Error in updating admin under review: ', e)
    }
  }
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
        tabArray={[
          'Project Type',
          'Project Status',
          'Undergoing Review',
          'Reviewed',
        ]}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        sx={{ marginBottom: 2 }}
      />

      {loading ? (
        <CCTableSkeleton sx={{ mt: 2 }} items={5} />
      ) : tabIndex === 1 ? (
        adminAllProjects && adminAllProjects.length ? (
          <CCTable
            headings={headings}
            rows={adminAllProjects}
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
          <NoData title="No drafted projects available" />
        )
      ) : (
        <div>No Projects Available</div>
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

export default ProjectTable
