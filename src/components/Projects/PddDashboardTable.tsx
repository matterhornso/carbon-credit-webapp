import React, { useState, useEffect } from 'react'
import DashboardTabFilters from '../../atoms/DashboardTabFilters/DashboardTabFilters'
import { Box, Paper, Stack, Typography } from '@mui/material'
import { ProjectDraftCalls } from '../../api/projectDraftCalls.api'
import LimitedText from '../../atoms/LimitedText/LimitedText'
import {
  getEditorBlockData,
  getEstimattedAnnualEmissionsRevenue,
  getProjectProponentName,
} from '../../utils/editor.util'
import CCButton from '../../atoms/CCButton'
import { pathNames } from '../../routes/pathNames'
import { createSearchParams, useNavigate } from 'react-router-dom'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import CCTable from '../../atoms/CCTable'
import EmptyComponent from '../../atoms/EmptyComponent/EmptyComponent'
import {
  PROJECT_STATUS_FILTER,
  SECTORAL_SCOPE,
} from '../../config/projectDraft.config'
import StatusChip from '../../atoms/StatusChip/StatusChip'
import PddDashboardTableActionOptions from './PddDashboardTableActionOptions'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import _ from 'lodash'
import { setPddDashboardCacheTableData } from '../../redux/Slices/pddDashboardCacheSlice'
import { setSectionIndex } from '../../redux/Slices/CreateNewProject/createNewProjectSectionSlice'
import RenderSDG from '../../atoms/RenderSDGS/RenderSDGS'
import { applySelectedFiltersOnDashboardData } from '../../utils/dashboard.util'
import { handleApiError } from '../../utils/errorHandler'

let index = 0
const dashboardTableHeadings = [
  <LimitedText key={index++} text="ID" />,
  <LimitedText key={index++} text="Project Name" />,
  <LimitedText key={index++} text="Project Proponent" />,
  <LimitedText key={index++} text="Sector" />,
  <LimitedText key={index++} text="Country/Region" />,
  <LimitedText key={index++} text="Project Status" />,
  <LimitedText key={index++} text="Estimated Annual Emission Reductions" />,
  <LimitedText key={index++} text="SDGs" />,
  <LimitedText key={index++} text="Action" />,
]

const PddDashboardTable = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const pddDashboardCacheTableData = useAppSelector(
    ({ pddDashboardCache }) => pddDashboardCache.pddDashboardCacheTableData
  )

  const [selectedProjectTypeFilters, setSelectedProjectTypeFilters] =
    useState<any>([])
  const [selectedProjectStatusFilters, setSelectedProjectStatusFilters] =
    useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [allProjectsTableData, setAllProjectsTableData] = useState<any[]>([])

  useEffect(() => {
    getDraftProjects()
  }, [])

  const getDraftProjects = async () => {
    try {
      if (pddDashboardCacheTableData.length === 0) {
        setLoading(true)
      }
      const allProjects = await ProjectDraftCalls.getProjects()
      if (allProjects?.success) {
        if (allProjects) {
          if (!_.isEqual(pddDashboardCacheTableData, allProjects.data)) {
            dispatch(setPddDashboardCacheTableData(allProjects.data))
          }
        }
        // setAllProjectsData(allProjects?.data)
      } else {
        alert('Some issue in fetching the projects details')
      }
    } catch (e) {
      handleApiError(e, { action: 'getting all projects' })
    } finally {
      setLoading(false)
    }
  }

  //   const moveToSection = () => { navigate(
  //     {
  //       pathname: pathNames.PROFILE_DETAILS_ISSUANCE_INFO,
  //       search: `?${createSearchParams({
  //         projectId: projectDetails?.uuid,
  //       })}`,
  //     },
  //     {
  //       state: {
  //         isEdited: true,
  //       },
  //     }
  //   )
  // }}

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
      }
      // else if (redirect === 'Monthly') {
      //   dispatch(setMonthlyReportSectionIndex(0))
      //   dispatch(setSubSectionIndex(0))
      //   dispatch(setMainProjectDetails(projectDetails))
      //   navigate(pathNames.MONTHLY_REPORT_UPDATE)
      // } else if (redirect === 'Verify') {
      //   navigate(pathNames.SELECT_VERIFIER)
      // }
    }
  }

  useEffect(() => {
    if (pddDashboardCacheTableData.length > 0) {
      const allProjectsDataTemp = applySelectedFiltersOnDashboardData(
        selectedProjectStatusFilters,
        selectedProjectTypeFilters,
        pddDashboardCacheTableData
      ).map((item: any, index: any) => {
        return [
          <Box key={index} onClick={() => openProjectDetails(item, 'Details')}>
            <LimitedText text={item.uuid} widthLimit={'100px'} />
          </Box>,
          <Box
            key={index}
            className="td-as-link"
            onClick={() => openProjectDetails(item, 'Details')}
          >
            <LimitedText
              key={index}
              text={
                getEditorBlockData(item?.projectIntroduction?.name?.data) ||
                item?.projectIntroduction?.name?.data
              }
              widthLimit="200px"
            />
          </Box>,
          <Box key={index} className="td-as-link">
            <LimitedText
              key={index}
              text={
                getProjectProponentName(
                  item?.project_description?.roles_responsibility?.data
                ) || '-'
              }
              widthLimit="200px"
            />
          </Box>,
          <Box key={index} className="td-as-link">
            <LimitedText
              key={index}
              text={item.projectIntroduction?.sectoral_scope.join(', ') || '-'}
              widthLimit="200px"
            />
          </Box>,
          <Box key={index} className="td-as-link">
            <LimitedText
              key={index}
              text={
                getEditorBlockData(item.projectIntroduction?.location?.data) ||
                item.projectIntroduction?.location?.data
              }
              widthLimit="200px"
            />
          </Box>,
          <Box key={index} className="td-as-link">
            <StatusChip projectStatus={item?.project_status} />
          </Box>,
          <Box key={index} className="">
            <LimitedText
              key={index}
              text={
                getEstimattedAnnualEmissionsRevenue(
                  item?.project_description?.aggregated_GHG_emissions?.data
                ) || '-'
              }
              widthLimit="200px"
            />
          </Box>,
          <RenderSDG
            key={index}
            ImageArray={item?.projectIntroduction?.SDG || []}
          />,
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignitems: 'center',
            }}
          >
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
                item?.project_status >= 1200 && dispatch(setSectionIndex(3))
                // navigate(pathNames.CREATE_NEW_PROJECT, {
                //   state: { uuid: item?.uuid },
                // })
                navigate(pathNames.ORIGINATION_NEW, {
                  state: { uuid: item?.uuid, existingProject: true },
                })
              }}
            >
              {item?.project_status >= 1200
                ? 'View Draft PDD'
                : // : 'Continue Draft PDD'}
                  'Fill details with AI'}
            </CCButton>
          </Box>,
        ]
      })

      setAllProjectsTableData(allProjectsDataTemp)
    }
  }, [
    pddDashboardCacheTableData,
    selectedProjectTypeFilters,
    selectedProjectStatusFilters,
  ])

  const clearFilters = () => {
    setSelectedProjectTypeFilters([])
    setSelectedProjectStatusFilters([])
  }

  return (
    <>
      {pddDashboardCacheTableData.length !== 0 && (
        <Stack flexDirection={'row'} gap={2} sx={{ my: 3 }}>
          <DashboardTabFilters
            btnTitle={'Project Type'}
            menuFilterList={SECTORAL_SCOPE}
            setAppliedFilters={setSelectedProjectTypeFilters}
            appliedFilters={selectedProjectTypeFilters}
          />

          <DashboardTabFilters
            btnTitle={'Project Status'}
            menuFilterList={PROJECT_STATUS_FILTER}
            setAppliedFilters={setSelectedProjectStatusFilters}
            appliedFilters={selectedProjectStatusFilters}
          />
          {(selectedProjectTypeFilters.length !== 0 ||
            selectedProjectStatusFilters.length !== 0) && (
            <CCButton
              onClick={clearFilters}
              sx={{
                fontSize: '14px',
                color: ' #01434B',
                minWidth: '136px',
                background: '#DEEBFF',
                borderRadius: '24px',
                height: '24px',
                padding: '17px',
              }}
            >
              Clear
            </CCButton>
          )}
        </Stack>
      )}
      {loading ? (
        <CCTableSkeleton sx={{ mt: 2 }} items={5} />
      ) : allProjectsTableData.length !== 0 ? (
        <CCTable
          headings={dashboardTableHeadings}
          rows={allProjectsTableData}
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
        pddDashboardCacheTableData.length === 0 && (
          <EmptyComponent
            listNewProject
            photoType={1}
            title="Let’s kick things off by creating your first project. Click the 'Create Project' button to get started"
            action={() => console.log('')}
          />
        )
      )}
    </>
  )
}

export default PddDashboardTable
