import React, { useEffect, useState } from 'react'
import { Chip } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setAppliedFiltersCount,
  setRemoveFilters,
} from '../../redux/Slices/marketPlaceFiltersDrawerSlice'
import CloseIcon from '@mui/icons-material/Close'
interface MarketPlaceFilterChipProps {
  onDelete?: any
  selectedFilters: any
}

const MarketPlaceFilterChip =({selectedFilters,onDelete}:MarketPlaceFilterChipProps) => {
  const dispatch = useAppDispatch()

  const [chips, setChips] = useState<any>([])

  // const selectedFilters = useAppSelector(
  //   ({ marketPlaceFiltersDrawer }) => marketPlaceFiltersDrawer.selectedFilters
  // )
  const filtersApplied = useAppSelector(
    ({ marketPlaceFiltersDrawer }) => marketPlaceFiltersDrawer.filtersApplied
  )
  

  useEffect(() => {
    setChips(selectedFilters)
    if (Object.values(selectedFilters).length && filtersApplied)
      dispatch(
        setAppliedFiltersCount(Object.values(selectedFilters).flat().length)
      )

  }, [selectedFilters, filtersApplied])

  return (
    <div>
      {Object.keys(chips)?.map((type: string) =>
        chips[type]?.map((item: string, index: number) => (
          <Chip
            key={index.toString()}
            label={item}
            onDelete={() =>{
              onDelete(type,item)
              // dispatch(setRemoveFilters({ type: type, filterValue: item }))
            }}
            deleteIcon={
              <CloseIcon sx={{ color: '#4A635E', fontWeight: 500 }} />
            }
            sx={{
              py: 2,
              margin: '2px',
              borderRadius: 2,
              background: '#CCE8E1',
              color: '#4A635E',
              fontWeight: 500,
              fontSize: 14,
            }}
          />
        ))
      )}
    </div>
  )
}

export default MarketPlaceFilterChip
