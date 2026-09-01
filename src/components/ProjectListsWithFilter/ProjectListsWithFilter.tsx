import {
  Box,
  Checkbox,
  Container,
  Drawer,
  Grid,
  Typography,
} from '@mui/material'
import { Stack } from '@mui/system'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import EmptyComponent from '../../atoms/EmptyComponent/EmptyComponent'
import { filters, FILTER_ACTION } from '../../config/constants.config'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { Colors } from '../../theme'
import ProjectDetailsCard from '../ProjectDetails/OtherProjects/ProjectDetailsCard'
import ProjectDetailsCardSkeleton from '../ProjectDetails/OtherProjects/ProjectDetailsCardSkeleton'
import CustomCheckbox from './CustomCheckbox'
import './index.css'
import MarketPlaceFiltersDrawer from './MarketPlaceFiltersDrawer'
import {
  setFilterApplicableProjects,
  setFiltersApplied,
  setMarketPlaceProjects,
  resetFilter,
  setSelectedFilters as redux_setSelectedFilters,
  setAppliedFiltersCount,
  setRemoveFilters,
} from '../../redux/Slices/marketPlaceFiltersDrawerSlice'
import { setCachedMarketplaceProject } from '../../redux/Slices/marketPlaceCachingSlice'
import MarketPlaceFilterChip from '../../atoms/MarketPlaceFilterChip/MarketPlaceFilterChip'
import CCButton from '../../atoms/CCButton'
import lodash from 'lodash'
import { handleApiError } from '../../utils/errorHandler'

const ProjectListsWithFilter = () => {
  console.log('Reloadeed ProjectListsWithFilter **')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  // const location = useLocation()

  const onWebApp = useAppSelector(({ app }) => !app.throughIFrame, shallowEqual)

  const [selectedFilters, setSelectedFilters] = useState<any[]>([])
  const [projects, setProjects] = useState<any>(null)
  const [filteredProjects, setFilteredProjects] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [action, setAction] = useState<string>(FILTER_ACTION.APPLY)
  const [showDrawer, setShowDrawer] = useState<any>(false)
  //const [showDrawer, setShowDrawer] = useState<any>({ right: false })

  const marketPlaceProjects = useAppSelector(
    ({ marketPlaceFiltersDrawer }) =>
      marketPlaceFiltersDrawer.marketPlaceProjects
  )
  const filterApplicableProjects = useAppSelector(
    ({ marketPlaceFiltersDrawer }) =>
      marketPlaceFiltersDrawer.filterApplicableProjects
  )
  const filtersApplied = useAppSelector(
    ({ marketPlaceFiltersDrawer }) => marketPlaceFiltersDrawer.filtersApplied,
    shallowEqual
  )

  const redux_selectedFilters = useAppSelector(
    ({ marketPlaceFiltersDrawer }) => marketPlaceFiltersDrawer.selectedFilters,
    shallowEqual
  )
  const appliedFiltersCount = useAppSelector(
    ({ marketPlaceFiltersDrawer }) =>
      marketPlaceFiltersDrawer.appliedFiltersCount,
    shallowEqual
  )
  const cachedMarketplaceProject = useAppSelector(
    ({ marketplaceCaching }) => marketplaceCaching.cachedMarketplaceProject,
    shallowEqual
  )

  useEffect(() => {
    getAllProjects()
  }, [])

  useEffect(() => {
    setSelectedFilters(redux_selectedFilters)
    dispatch(
      setAppliedFiltersCount(Object.values(redux_selectedFilters).flat().length)
    )
    dispatch(
      setFiltersApplied(Object.values(redux_selectedFilters).flat().length)
    )
  }, [redux_selectedFilters])

  useEffect(() => {
    if (!filtersApplied) {
      setProjects(marketPlaceProjects)
    } else {
      setProjects(filterApplicableProjects)
    }
  }, [filtersApplied, filterApplicableProjects])

  useEffect(() => {
    dispatch(setMarketPlaceProjects(cachedMarketplaceProject))
    dispatch(setFilterApplicableProjects(cachedMarketplaceProject))
  }, [cachedMarketplaceProject])

  const getAllProjects = async () => {
    try {
      if (cachedMarketplaceProject.length === 0) {
        setLoading(true)
      }
      const projectRes = await dataCollectionCalls.getVerifiedProjects()
      if (projectRes.success) {
        //setProjects(projectRes.data)
        //setFilteredProjects(projectRes.data)
        if (!lodash.isEqual(cachedMarketplaceProject, projectRes.data)) {
          dispatch(setCachedMarketplaceProject(projectRes.data))
        }
      }
    } catch (e) {
      handleApiError(e, { action: 'dataCollectionCalls.getVerifiedProjects' })
    } finally {
      setLoading(false)
    }
  }

  // const filterProjects = () => {
  //   if (!selectedFilters.length) {
  //     setFilteredProjects(projects)
  //     return
  //   }
  //   if (projects && projects?.length) {
  //     const projectsMatchingFilter: any[] = []
  //     projects.forEach((project: any) => {
  //       const projectType = project?.type
  //       if (
  //         projectType.some((item: string) => selectedFilters.includes(item))
  //       ) {
  //         projectsMatchingFilter.push(project)
  //       }
  //     })
  //     setFilteredProjects(projectsMatchingFilter)
  //     setAction(FILTER_ACTION.RESET)
  //   }
  // }

  const viewRenderer = useCallback(() => {
    console.log('viewRenderer')
    return (
      <>
        <Stack
          flexDirection={'row'}
          alignItems="flex-end"
          justifyContent={'space-between'}
          sx={{ mb: filtersApplied ? 3 : 5, mt: 2 }}
        >
          <Typography
            sx={{
              fontSize: '28px',
              color: onWebApp ? Colors.tertiary : '#55DBC8',
            }}
          >
            Projects
          </Typography>
          <Typography
            sx={{
              color: onWebApp ? Colors.textColorLightGreen : '#55DBC8',
              padding: '10px 24px',
              border: '1px solid #6E7976',
              borderRadius: '40px',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
            }}
            onClick={() => setShowDrawer(true)}
          >
            Filter{' '}
            {appliedFiltersCount ? `(${appliedFiltersCount.toString()})` : null}
          </Typography>
        </Stack>
        {filtersApplied ? (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
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
              {filtersApplied && (
                <MarketPlaceFilterChip
                  selectedFilters={selectedFilters}
                  onDelete={(type: any, value: any) => {
                    //  dispatch(setRemoveFilters({ type: type, filterValue: value }))
                    const foundKey: any = Object.keys(selectedFilters).find(
                      (i) => i === type
                    )
                    const toApplyFilter = {
                      ...selectedFilters,
                      [foundKey]: selectedFilters[foundKey].filter(
                        (i: any) => i !== value
                      ),
                    }
                    dispatch(redux_setSelectedFilters(toApplyFilter))
                  }}
                />
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
                dispatch(setFilterApplicableProjects(marketPlaceProjects))
                dispatch(setFiltersApplied(false))
                dispatch(resetFilter())
              }}
            >
              Clear All
            </CCButton>
          </Box>
        ) : null}
        <Grid
          container
          spacing={{ sm: 2, md: 3, lg: 3, xl: 3 }}
          rowSpacing={3}
          columns={{ sm: 10, md: 9, lg: 12, xl: 12 }}
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            height: '75vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            pb: 1,
          }}
        >
          {loading && cachedMarketplaceProject?.length === 0 ? (
            <ProjectDetailsCardSkeleton />
          ) : projects?.length !== 0 ? (
            projects?.map((project: any, index: number) => (
              <ProjectDetailsCard
                key={index}
                project={project}
                navigationAction={(item: any) => navigate(item)}
              />
            ))
          ) : (
            <Grid
              item
              sm={12}
              display="flex"
              sx={{ height: '90%', width: '100%' }}
            >
              <EmptyComponent
                photoType={1}
                title="No Projects to show."
                // listNewProject
                // action={() => listNewProject()}
                sx={{ width: '100%', height: '100%', mt: 0 }}
              />
            </Grid>
          )}
        </Grid>
      </>
    )
  }, [
    filterApplicableProjects,
    loading,
    selectedFilters,
    filtersApplied,
    appliedFiltersCount,
  ])

  return onWebApp ? (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        background: onWebApp
          ? ''
          : 'linear-gradient(180deg, #222926 63.19%, #121E18 100%)',
        padding: onWebApp ? 0 : '56px 6vw',
        maxHeight: '85vh',
      }}
    >
      <Drawer
        anchor={'right'}
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
      >
        {showDrawer && (
          <MarketPlaceFiltersDrawer
            onClose={() => setShowDrawer(false)}
            showDrawer={showDrawer}
          />
        )}
      </Drawer>
      {viewRenderer()}
    </Container>
  ) : (
    <Box
      sx={{
        background: onWebApp
          ? ''
          : 'linear-gradient(180deg, #222926 63.19%, #121E18 100%)',
        padding: onWebApp ? 0 : '56px 6vw',
        height: '100vh',
      }}
    >
      {viewRenderer()}
    </Box>
  )
}

export default ProjectListsWithFilter
