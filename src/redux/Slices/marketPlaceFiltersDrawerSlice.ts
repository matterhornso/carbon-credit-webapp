import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface marketPlaceFiltersDrawerReducerInterface {
  marketPlaceProjects: any
  filterApplicableProjects: any
  selectedFilters: any
  filtersApplied: boolean
  appliedFiltersCount: number
  //projectType : any
  //creditType : any
  //projectCategories : any
  //verificationStandars : any
}
const initialState: marketPlaceFiltersDrawerReducerInterface = {
  marketPlaceProjects: [],
  filterApplicableProjects: [],
  selectedFilters: {
    'Project Type': [],
    'Credit Type': [],
    'Project Categories': [],
    'Verification Standard': [],
  },
  filtersApplied: false,
  appliedFiltersCount: 0,
}
const marketPlaceFiltersDrawer = createSlice({
  name: 'marketPlaceFiltersDrawer',
  initialState,
  reducers: {
    setMarketPlaceProjects: (state, action: PayloadAction<any>) => {
      state.marketPlaceProjects = action.payload
    },
    setFilterApplicableProjects: (state, action: PayloadAction<any>) => {
      state.filterApplicableProjects = action.payload
    },
    setSelectedFilters: (state, action: PayloadAction<any>) => {
      state.selectedFilters = action.payload
    },
    setFiltersApplied: (state, action: PayloadAction<any>) => {
      state.filtersApplied = action.payload
    },
    setAppliedFiltersCount: (state, action: PayloadAction<any>) => {
      state.appliedFiltersCount = action.payload
    },
    setAddFilters: (state, action: PayloadAction<any>) => {
      const { type, filterValue } = action.payload
      state.selectedFilters[type] = [
        filterValue,
        ...state.selectedFilters[type],
      ]
    },
    setRemoveFilters: (state, action: PayloadAction<any>) => {
      const { type, filterValue } = action.payload
      state.selectedFilters[type] = state.selectedFilters[type].filter(
        (item: string) => item !== filterValue
      )
    },
    resetFilter: (state) =>{
      state.selectedFilters= initialState.selectedFilters
      state.appliedFiltersCount = 0
      state.filtersApplied = false
    }
  },
})

export const {
  setMarketPlaceProjects,
  setFilterApplicableProjects,
  setSelectedFilters,
  setAddFilters,
  setRemoveFilters,
  setFiltersApplied,
  setAppliedFiltersCount,
  resetFilter
} = marketPlaceFiltersDrawer.actions
export default marketPlaceFiltersDrawer.reducer
