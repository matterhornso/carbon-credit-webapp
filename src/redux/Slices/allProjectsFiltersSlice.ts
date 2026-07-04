import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  ALL_PROJECTS_FILTERS_CONSTANTS,
  PROJECT_ALL_STATUS,
} from '../../config/constants.config'

interface allProjectsInterface {
  selectedFilters: any
  showAppliedFilters: any
  appliedFiltersCount: any
  allProjectsCopy: any
  allProjects: any
}
const initialState: allProjectsInterface = {
  allProjects: [],
  allProjectsCopy: [],
  selectedFilters: {
    'Project Type': [],
    'Credit Type': [],
    'Project Categories': [],
    'Verification Standard': [],
  },
  showAppliedFilters: false,
  appliedFiltersCount: null,
}
console.log(
  'filteredProjects _ allProjectsCopy: ',
  initialState.allProjectsCopy
)
const allProjectsFiltersSlice = createSlice({
  name: 'allProjects',
  initialState,
  reducers: {
    setAllProjects: (state, action: PayloadAction<any>) => {
      state.allProjects = action.payload
    },
    setAllProjectsCopy: (state, action: PayloadAction<any>) => {
      state.allProjectsCopy = action.payload
    },
    setSelectedFilters: (state, action: PayloadAction<any>) => {
      state.selectedFilters = action.payload
    },
    setShowAppliedFilters: (state, action: PayloadAction<boolean>) => {
      state.showAppliedFilters = action.payload
    },
    setAppliedFiltersCount: (state, action: PayloadAction<any>) => {
      state.appliedFiltersCount = action.payload
    },
    setProjectsAsPerFilters: (state, action: PayloadAction<any>) => {
      // selected filters will be getting from action
      const exemptedFilters = ['ICR', 'Carbon Credit']
      const projectTypeFilters = action.payload['Project Type']
      const projectCategoriesFilters = action.payload['Project Categories']

      let filteredProjects: any = []

      // fitering projects for project type filters
      if (projectTypeFilters.length > 0) {
        filteredProjects = state.allProjects.filter((i: any) => {
          if (
            (projectTypeFilters.includes(
              ALL_PROJECTS_FILTERS_CONSTANTS.REGISTERED_OR_ACTIVE_PROJECT
            ) &&
              i.project_status ===
                PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT) ||
            (projectTypeFilters.includes(
              ALL_PROJECTS_FILTERS_CONSTANTS.PROVISIONAL_PROJECT_OR_FUTURE_PROJECT
            ) &&
              i.project_status <
                PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT)
          ) {
            return i
          }
        })
      }
      //fitering projects for project Categories filters
      if (projectCategoriesFilters.length > 0) {
        const localIfBlockFilter = (
          filteredProjects.length > 0 ? filteredProjects : state.allProjects
        ).filter((i: any) => {
          return projectCategoriesFilters.some((j: any) => {
            return i.type.includes(j)
          })
        })
        filteredProjects =
          localIfBlockFilter.length > 0 ? localIfBlockFilter : filteredProjects
      }

      // for Credit Type and Verification Standard filters
      const isLocalFilterInExemptedList = Object.values(action.payload)
        .flat()
        .some((item: any) => exemptedFilters.includes(item))

      if (
        Object.values(action.payload).flat().length === 0 ||
        isLocalFilterInExemptedList
      ) {
        filteredProjects = state.allProjects
      }
      state.allProjectsCopy = filteredProjects
    },
    resetFilter: (state) => {
      state.selectedFilters = initialState.selectedFilters
      state.appliedFiltersCount = 0
      state.showAppliedFilters = false
    },
  },
})

export const {
  setAllProjects,
  setAllProjectsCopy,
  setSelectedFilters,
  setProjectsAsPerFilters,
  setShowAppliedFilters,
  setAppliedFiltersCount,
  resetFilter,
} = allProjectsFiltersSlice.actions

export default allProjectsFiltersSlice.reducer
