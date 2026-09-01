import { Box, Drawer, Grid, Paper, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import CCButton from '../../atoms/CCButton'
import MarketPlaceFilterChip from '../../atoms/MarketPlaceFilterChip/MarketPlaceFilterChip'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setCachingAllProjects } from '../../redux/Slices/allProjectsCachingSlice'
import {
  setAllProjectsCopy,
  resetFilter,
  setAppliedFiltersCount,
  setSelectedFilters as redux_setSelectedFilters,
  setShowAppliedFilters,
  setAllProjects,
  setProjectsAsPerFilters,
} from '../../redux/Slices/allProjectsFiltersSlice'
import ProjectDetailsCard from '../ProjectDetails/OtherProjects/ProjectDetailsCard'
import ProjectDetailsCardSkeleton from '../ProjectDetails/OtherProjects/ProjectDetailsCardSkeleton'
import AllProjectsFilterDrawer from './AllProjectsFilterDrawer'
import lodash from 'lodash'
import EmptyComponent from '../../atoms/EmptyComponent/EmptyComponent'
import TabSelector from '../../atoms/TabSelector/TabSelector'
import {
  ALL_PROJECTS_STATUS,
  PROJECT_STATUS_FILTER,
} from '../../config/projectDraft.config'
import { ProjectDraftCalls } from '../../api/projectDraftCalls.api'
import AllProjectsFiltersTabs from './AllProjectsFiltersTabs'
import { handleApiError } from '../../utils/errorHandler'

const AllProjects = () => {
  const dispatch = useAppDispatch()

  const cachingAllProjects = useAppSelector(
    ({ allProjectsCaching }) => allProjectsCaching.cachingAllProjects
  )

  const allProjects = useAppSelector(
    ({ allProjectsFiltersSlice }) => allProjectsFiltersSlice.allProjects
  )
  const allProjectsCopy = useAppSelector(
    ({ allProjectsFiltersSlice }) => allProjectsFiltersSlice.allProjectsCopy
  )

  const showAppliedFilters = useAppSelector(
    ({ allProjectsFiltersSlice }) => allProjectsFiltersSlice.showAppliedFilters
  )

  const redux_selectedFilters = useAppSelector(
    ({ allProjectsFiltersSlice }) => allProjectsFiltersSlice.selectedFilters
  )

  const appliedFiltersCount = useAppSelector(
    ({ allProjectsFiltersSlice }) => allProjectsFiltersSlice.appliedFiltersCount
  )

  const [projects, setProjects] = useState<any>([])
  const [loading, setLoading] = useState<any>(false)
  const [openFiltersDrawer, setOpenFiltersDrawer] = useState<boolean>(false)
  const [selectedFilters, setSelectedFilters] = useState<any>([])
  const [appliedFilterStatuses, setAppliedFilterStatuses] = useState<any>([])

  useEffect(() => {
    getAllProjects()
  }, [])

  useEffect(() => {
    if (appliedFilterStatuses.length !== 0) {
      filterProjectsBasedOnAppliedFilters()
    }
  }, [appliedFilterStatuses])

  const filterProjectsBasedOnAppliedFilters = () => {
    if (!allProjects.length || !appliedFilterStatuses.length) return
    console.log('appliedFilterStatuses: ', appliedFilterStatuses)
    const filteredProjects = allProjects.filter((i: any) => {
      return appliedFilterStatuses.includes(i?.project_status)
    })
    setProjects(filteredProjects)
  }

  useEffect(() => {
    if (!showAppliedFilters) {
      setProjects(allProjects)
    } else {
      setProjects(allProjectsCopy)
    }
  }, [showAppliedFilters, allProjectsCopy])

  useEffect(() => {
    dispatch(setAllProjects(cachingAllProjects))
    dispatch(setAllProjectsCopy(cachingAllProjects))
  }, [cachingAllProjects])

  // useEffect(() => {
  //   setSelectedFilters(redux_selectedFilters)
  //   dispatch(
  //     setAppliedFiltersCount(Object.values(redux_selectedFilters).flat().length)
  //   )
  //   Object.values(redux_selectedFilters).flat().length === 0 &&
  //     dispatch(setShowAppliedFilters(false))
  // }, [redux_selectedFilters])

  const getAllProjects = async () => {
    try {
      if (cachingAllProjects.length === 0) {
        setLoading(true)
      }
      // const res = await dataCollectionCalls.getAllProjects()
      const res = await ProjectDraftCalls.getProjects()
      if (!lodash.isEqual(cachingAllProjects, res?.data)) {
        dispatch(setCachingAllProjects(res?.data))
      }
    } catch (err) {
      handleApiError(err, { action: 'AllProjects.getAllProjects' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Paper sx={{ borderRadius: 2, p: '32px 24px', height: '100%' }}>
        <Box sx={{ height: '100%' }}>
          <Stack
            direction="row"
            justifyContent={'space-between'}
            alignItems="center"
            sx={{}}
          >
            <Typography
              sx={{
                fontSize: '32px',
                fontWeight: 500,
                color: '#0D0E0E',
              }}
            >
              Projects
            </Typography>

            {/* <Typography
              sx={{
                color: '#006B5E',
                padding: '10px 24px',
                border: '1px solid #6E7976',
                borderRadius: '40px',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 500,
              }}
              onClick={() => setOpenFiltersDrawer(true)}
            >
              Filters
              {appliedFiltersCount
                ? `(${appliedFiltersCount.toString()})`
                : null}
            </Typography> */}
          </Stack>
          <Box sx={{ overflowX: 'scroll', width: '100%', display: 'flex' }}>
            {ALL_PROJECTS_STATUS.map((i: any, idx: number) => (
              <Box key={idx}>
                <AllProjectsFiltersTabs
                  label={i.name}
                  // tabIndex={0}
                  // setTabIndex={() => {
                  //   return
                  // }}
                  onClick={() => {
                    setAppliedFilterStatuses(i?.applicableStatuses)
                  }}
                  sx={{ marginBottom: 2 }}
                />
              </Box>
            ))}
          </Box>
          {/* <Box>
            {showAppliedFilters ? (
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 4,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    direction: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#006B5E',
                      fontSize: 14,
                      fontWeight: 500,
                      marginRight: 5,
                    }}
                  >
                    Showing results for:{' '}
                  </Typography>
                  {showAppliedFilters && (
                    <>
                      <MarketPlaceFilterChip
                        selectedFilters={selectedFilters}
                        onDelete={(type: any, value: any) => {
                          console.log('onDelete :', type, value)
                          const foundKey: any = Object.keys(
                            selectedFilters
                          ).find((i) => i === type)
                          const toApplyFilter = {
                            ...selectedFilters,
                            [foundKey]: selectedFilters[foundKey].filter(
                              (i: any) => i !== value
                            ),
                          }
                          dispatch(redux_setSelectedFilters(toApplyFilter))
                          dispatch(setProjectsAsPerFilters(toApplyFilter))
                        }}
                      />
                    </>
                  )}
                </Box>
                <CCButton
                  sx={{
                    textAlign: 'end',
                    padding: '4px 24px',
                    minWidth: 0,
                    borderRadius: 30,
                    background: '#006B5E',
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                  onClick={() => {
                    dispatch(resetFilter())
                  }}
                >
                  Clear All
                </CCButton>
              </Box>
            ) : null}
          </Box> */}
          {/* <Drawer
            anchor={'right'}
            open={openFiltersDrawer}
            onClose={() => setOpenFiltersDrawer(false)}
          >
            {openFiltersDrawer && (
              <AllProjectsFilterDrawer
                onClose={(bol: boolean) => setOpenFiltersDrawer(bol)}
                showDrawer={openFiltersDrawer}
              />
            )}
          </Drawer> */}
          <Grid
            container
            // spacing={{ sm: 2, md: 3, lg: 3, xl: 3 }}
            // spacing={3}
            rowSpacing={3}
            // columns={1}
            // columns={{ sm: 10, md: 9, lg: 10, xl: 12 }}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              height: '65vh',
              overflowY: 'auto',
              overflowX: 'hidden',
              columnGap: '10px',
              rowGap: '20px',
              ml: '20px',
            }}
          >
            {loading ? (
              <ProjectDetailsCardSkeleton />
            ) : projects?.length === 0 ? (
              <EmptyComponent
                photoType={1}
                title="No Projects to show."
                sx={{ width: '100%', height: '100%', mt: 0, ml: 3 }}
              />
            ) : (
              projects?.map((project: any, index: number) => (
                <ProjectDetailsCard
                  key={index}
                  project={project}
                  navigationAction={(item: any) => console.log(project)}
                />
              ))
            )}
          </Grid>
        </Box>
      </Paper>
    </>
  )
}

export default AllProjects
