import { Box, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DashboardTabFilters from '../../atoms/DashboardTabFilters/DashboardTabFilters'
import {
  PROJECT_STATUS_FILTER,
  SECTORAL_SCOPE,
} from '../../config/projectDraft.config'
import { getLocalItem } from '../../utils/Storage'
import CCButton from '../../atoms/CCButton'
import {
  getEditorBlockData,
  getEstimattedAnnualEmissionsRevenue,
  getProjectProponentName,
} from '../../utils/editor.util'
import LimitedText from '../../atoms/LimitedText/LimitedText'
import StatusChip from '../../atoms/StatusChip/StatusChip'
import { pathNames } from '../../routes/pathNames'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { useNavigate } from 'react-router-dom'
import { applySelectedFiltersOnDashboardData } from '../../utils/dashboard.util'
import RenderSDG from '../../atoms/RenderSDGS/RenderSDGS'
import { shallowEqual } from 'react-redux'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import CCTable from '../../atoms/CCTable'

let index = 0
const dashboardTableHeadings: any = [
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

const RegistryDashboardTable = ({ loading }: any) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const userRole = getLocalItem('userDetails')?.type

  const cachedRegistryDraftTabProjects = useAppSelector(
    ({ caching }) => caching.cachedRegistryDraftTabProjects,
    shallowEqual
  )

  const [selectedProjectTypeFilters, setSelectedProjectTypeFilters] =
    useState<any>([])
  const [selectedProjectStatusFilters, setSelectedProjectStatusFilters] =
    useState<any>([])
  const [allProjectsTableData, setAllProjectsTableData] = useState<any>([])

  // const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (cachedRegistryDraftTabProjects.length > 0) {
      // const allProjectsDataTemp = filterDataAsPerAppliedFilters().map(
      const allProjectsDataTemp = applySelectedFiltersOnDashboardData(
        selectedProjectStatusFilters,
        selectedProjectTypeFilters,
        cachedRegistryDraftTabProjects
      )
        .filter((i: any) => {
          return i.project_status >= 1400
        })
        .map((item: any, index: any) => {
          return [
            <Box key={index}>
              <LimitedText text={item.uuid} widthLimit={'100px'} />
            </Box>,
            <Box key={index} className="td-as-link">
              <LimitedText
                key={index}
                text={getEditorBlockData(item.projectIntroduction?.name?.data)}
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
                text={
                  item.projectIntroduction?.sectoral_scope.join(', ') || '-'
                }
                widthLimit="200px"
              />
            </Box>,
            <Box key={index} className="td-as-link">
              <LimitedText
                key={index}
                text={getEditorBlockData(
                  item.projectIntroduction?.location?.data
                )}
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
              // ImageArray={sdgDummyData}
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
                  navigate(pathNames.REGISTRY_REVIEW_REPORT, {
                    state: { uuid: item?.uuid },
                  })
                }}
              >
                {'Start Reviewing'}
              </CCButton>
            </Box>,
          ]
        })

      setAllProjectsTableData(allProjectsDataTemp)
    }
  }, [
    cachedRegistryDraftTabProjects,
    selectedProjectTypeFilters,
    selectedProjectStatusFilters,
  ])

  const clearFilters = () => {
    setSelectedProjectTypeFilters([])
    setSelectedProjectStatusFilters([])
  }

  return (
    <>
      {cachedRegistryDraftTabProjects.length !== 0 && (
        <Stack flexDirection={'row'} gap={2} sx={{ my: 3 }}>
          <DashboardTabFilters
            btnTitle={'Project Type'}
            menuFilterList={SECTORAL_SCOPE}
            setAppliedFilters={setSelectedProjectTypeFilters}
            appliedFilters={selectedProjectTypeFilters}
          />

          <DashboardTabFilters
            btnTitle={'Project Status'}
            menuFilterList={PROJECT_STATUS_FILTER.filter((i: any) => {
              return i?.role.includes(userRole)
            })}
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
      )}
      {loading ? (
        <CCTableSkeleton sx={{ mt: 2 }} items={5} />
      ) : (
        allProjectsTableData.length !== 0 && (
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
        )
      )}
    </>
  )
}

export default RegistryDashboardTable
