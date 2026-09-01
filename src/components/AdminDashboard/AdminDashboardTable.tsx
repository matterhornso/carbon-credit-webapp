import { Box, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DashboardTabFilters from '../../atoms/DashboardTabFilters/DashboardTabFilters'
import {
  PROJECT_STATUS_FILTER,
  SECTORAL_SCOPE,
} from '../../config/projectDraft.config'
import CCButton from '../../atoms/CCButton'
import LimitedText from '../../atoms/LimitedText/LimitedText'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import { useNavigate } from 'react-router-dom'
import {
  getEditorBlockData,
  getEstimattedAnnualEmissionsRevenue,
  getProjectProponentName,
} from '../../utils/editor.util'
import RenderSDG from '../../atoms/RenderSDGS/RenderSDGS'
import StatusChip from '../../atoms/StatusChip/StatusChip'
import { pathNames } from '../../routes/pathNames'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setSectionIndex } from '../../redux/Slices/CreateNewProject/createNewProjectSectionSlice'
import { shallowEqual } from 'react-redux'
import { applySelectedFiltersOnDashboardData } from '../../utils/dashboard.util'
import CCTable from '../../atoms/CCTable'
import { setSubSectionIndex } from '../../redux/Slices/CreateNewProject/createNewProjectSubSectionSlice'

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

const AdminDashboardTable = ({ loading }: any) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const cachedAdminAllProjects = useAppSelector(
    ({ caching }) => caching.cachedAdminDashboardProjects,
    shallowEqual
  )

  const [selectedProjectTypeFilters, setSelectedProjectTypeFilters] =
    useState<any>([])
  const [selectedProjectStatusFilters, setSelectedProjectStatusFilters] =
    useState<any>([])
  const [allProjectsTableData, setAllProjectsTableData] = useState<any>([])

  useEffect(() => {
    if (cachedAdminAllProjects.length > 0) {
      const allProjectsDataTemp = applySelectedFiltersOnDashboardData(
        selectedProjectStatusFilters,
        selectedProjectTypeFilters,
        cachedAdminAllProjects
      ).map((item: any, index: any) => {
        return [
          <Box key={index}>
            <LimitedText text={item.uuid} widthLimit={'100px'} />
          </Box>,
          // <LimitedText
          //   key={index}
          //   text={moment(item.createdAt).format('DD/MM/YYYY')}
          // />,
          <Box key={index}>
            <LimitedText
              key={index}
              text={
                getEditorBlockData(item.projectIntroduction?.name?.data) ||
                item?.projectIntroduction?.name?.data
              }
              widthLimit="200px"
            />
          </Box>,
          <Box
            key={index}
            className="td-as-link"
            // onClick={() => openProjectDetails(item, 'Details')}
          >
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
          <Box
            key={index}
            className="td-as-link"
            // onClick={() => openProjectDetails(item, 'Details')}
          >
            <LimitedText
              key={index}
              text={item.projectIntroduction?.sectoral_scope.join(', ') || '-'}
              widthLimit="200px"
            />
          </Box>,
          <Box
            key={index}
            className="td-as-link"
            // onClick={() => openProjectDetails(item, 'Details')}
          >
            <LimitedText
              key={index}
              text={getEditorBlockData(
                item.projectIntroduction?.location?.data
              )}
              widthLimit="200px"
            />
          </Box>,
          <Box
            key={index}
            className="td-as-link"
            // onClick={() => openProjectDetails(item, 'Details')}
          >
            {/* <LimitedText
                key={index}
                text={getStatusKey(item?.project_status)?.toString() || '-'}
                widthLimit="200px"
              /> */}
            <StatusChip projectStatus={item?.project_status} />
          </Box>,
          <Box
            key={index}
            className=""
            // onClick={() => openProjectDetails(item, 'Details')}
          >
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
            {/* {item?.project_status < 1200 ? ( */}
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
                if (item?.project_status === 1050) {
                  dispatch(setSectionIndex(1))
                  dispatch(setSubSectionIndex(3))
                }
                navigate(pathNames.PROJECT_DETAILS, {
                  state: { uuid: item?.uuid },
                })
              }}
            >
              {item?.project_status === 1050
                ? 'Add Methodology'
                : item?.project_status <= 1200
                ? 'Review Draft PDD'
                : 'Edit and Review'}
            </CCButton>
          </Box>,
        ]
      })

      setAllProjectsTableData(allProjectsDataTemp)
    }
  }, [
    cachedAdminAllProjects,
    selectedProjectTypeFilters,
    selectedProjectStatusFilters,
  ])

  const clearFilters = () => {
    setSelectedProjectTypeFilters([])
    setSelectedProjectStatusFilters([])
  }

  return (
    <>
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
        {(selectedProjectTypeFilters || selectedProjectStatusFilters) && (
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
      {loading ? (
        <CCTableSkeleton sx={{ mt: 2 }} items={5} />
      ) : allProjectsTableData.length !== 0 ? (
        <CCTable
          headings={headings}
          rows={allProjectsTableData}
          sx={{ minWidth: 100 }}
          maxWidth={'100%'}
          tableSx={{ minWidth: 100 }}
          hideScrollbar
          pagination
          rowsPerPageProp={5}
          stickyLastCol
          stickySecondLastCol
        />
      ) : null}
    </>
  )
}

export default AdminDashboardTable
