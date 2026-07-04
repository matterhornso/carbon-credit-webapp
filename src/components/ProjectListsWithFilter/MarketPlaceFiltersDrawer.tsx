import { Chip, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import CCButton from '../../atoms/CCButton'
import { Colors } from '../../theme'
import CloseIcon from '@mui/icons-material/Close'
import CCAccordionCheckBox from '../../atoms/CCAccordionCheckBox/CCAccordionCheckBox'
import { availableFilters, filters } from '../../config/constants.config'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setAddFilters,
  setFilterApplicableProjects,
  setFiltersApplied,
  setRemoveFilters,
  setSelectedFilters,
} from '../../redux/Slices/marketPlaceFiltersDrawerSlice'
import MarketPlaceFilterChip from '../../atoms/MarketPlaceFilterChip/MarketPlaceFilterChip'

const initFilters: any = {
  'Project Type': [],
  'Credit Type': [],
  'Project Categories': [],
  'Verification Standard': [],
}

const exemptedFilters = ['ICR', 'Carbon Credit']

const MarketPlaceFiltersDrawer = ({
  showDrawer,
  onClose,
}: {
  showDrawer: boolean
  onClose: any
}) => {
  const dispatch = useAppDispatch()

  const marketPlaceProjects = useAppSelector(
    ({ marketPlaceFiltersDrawer }) =>
      marketPlaceFiltersDrawer.marketPlaceProjects
  )
  const filterApplicableProjects = useAppSelector(
    ({ marketPlaceFiltersDrawer }) =>
      marketPlaceFiltersDrawer.filterApplicableProjects
  )

  const selectedFilters = useAppSelector(
    ({ marketPlaceFiltersDrawer }) => marketPlaceFiltersDrawer.selectedFilters
  )

  const [_localFilters, _setLocalFilters] = useState(initFilters)

  useEffect(() => {
    // alert("yes")
    _setLocalFilters(selectedFilters)
    return () => _setLocalFilters(initFilters)
  }, [showDrawer, selectedFilters])

  const applyFilters = () => {
    let filteredProjects = marketPlaceProjects.filter((i: any) => {
      return Object.values(_localFilters)
        .flat()
        .some((j: any) => {
          return i.type.includes(j)
        })
    })

    const isLocalFilterInExemptedList = Object.values(_localFilters)
      .flat()
      .some((item: any) => exemptedFilters.includes(item))
    if (
      Object.values(_localFilters).flat().length === 0 ||
      isLocalFilterInExemptedList
    ) {
      filteredProjects = marketPlaceProjects
    }
    dispatch(setFilterApplicableProjects(filteredProjects))
    dispatch(setFiltersApplied(true))
    dispatch(setSelectedFilters(_localFilters))
    onClose()
  }

  const onClearAll = () => {
    dispatch(setFilterApplicableProjects(marketPlaceProjects))
    dispatch(setFiltersApplied(false))
    dispatch(setSelectedFilters(initFilters))
    _setLocalFilters(initFilters)
    onClose()
  }

  return (
    <>
      <Box
        sx={{ width: 400, margin: '15px' }}
        role="presentation"
        //onClick={toggleDrawer(anchor, false)}
        //onKeyDown={toggleDrawer(anchor, false)}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={{ fontSize: '24px' }}>Filters</Typography>
          <CloseIcon
            onClick={onClose}
            sx={{ fontSize: 30, color: '#616161' }}
          />
        </Box>
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 2,
            }}
          >
            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
              FILTER ACTIVE
            </Typography>
            <Stack
              flexDirection={'row'}
              justifyContent="center"
              alignItems="center"
              columnGap={2}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#006B5E',
                  cursor: 'pointer',
                }}
                onClick={() => onClearAll()}
              >
                Clear
              </Typography>
              <CCButton
                sx={{
                  minWidth: 0,
                  padding: '7px 42px',
                  background: Colors.textColorLightGreen,
                  color: '#FFFFFF',
                  borderRadius: 20,
                  fontSize: 14,
                  fontWeight: 500,
                }}
                onClick={() => applyFilters()}
              >
                Apply
              </CCButton>
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            rowGap: 1,
            columnGap: 1,
          }}
        >
          <MarketPlaceFilterChip
            onDelete={(type: any, value: any) => {
              const foundKey: any = Object.keys(_localFilters).find(
                (i) => i === type
              )
              const toApplyFilter = {
                ..._localFilters,
                [foundKey]: _localFilters[foundKey].filter(
                  (i: any) => i !== value
                ),
              }
              _setLocalFilters(toApplyFilter)
            }}
            selectedFilters={_localFilters}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          {Object.keys(availableFilters).map((item: any, index: any) => (
            <Box key={index} sx={{ my: 2 }}>
              <CCAccordionCheckBox
                title={item}
                selectedFilters={_localFilters}
                dropList={availableFilters[item]}
                addFilters={(type: string, value: string) => {
                  const foundKey: any = Object.keys(_localFilters).find(
                    (i) => i === type
                  )
                  const toApplyFilter = {
                    ..._localFilters,
                    [foundKey]: [..._localFilters[foundKey], value],
                  }
                  _setLocalFilters(toApplyFilter)
                }}
                removeFilters={(type: string, value: string) => {
                  const foundKey: any = Object.keys(_localFilters).find(
                    (i) => i === type
                  )
                  const toApplyFilter = {
                    ..._localFilters,
                    [foundKey]: _localFilters[foundKey].filter(
                      (i: any) => i !== value
                    ),
                  }
                  _setLocalFilters(toApplyFilter)
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  )
}

export default MarketPlaceFiltersDrawer
