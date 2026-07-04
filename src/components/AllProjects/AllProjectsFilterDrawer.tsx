import React, { useEffect, useState } from 'react'
import { Typography, Box, Stack } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CCButton from '../../atoms/CCButton'
import { Colors } from '../../theme'
import { allProjectsFilters } from '../../config/constants.config'
import CCAccordionCheckBox from '../../atoms/CCAccordionCheckBox/CCAccordionCheckBox'
import MarketPlaceFilterChip from '../../atoms/MarketPlaceFilterChip/MarketPlaceFilterChip'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setProjectsAsPerFilters,
  setSelectedFilters,
  setShowAppliedFilters,
} from '../../redux/Slices/allProjectsFiltersSlice'

interface AllProjectsFilterDrawerProps {
  showDrawer: boolean
  onClose: any
}

const initFilters: any = {
  'Project Type': [],
  'Credit Type': [],
  'Project Categories': [],
  'Verification Standard': [],
}

const AllProjectsFilterDrawer = (props: AllProjectsFilterDrawerProps) => {
  const dispatch = useAppDispatch()

  const selectedFilters = useAppSelector(
    ({ allProjectsFiltersSlice }) => allProjectsFiltersSlice.selectedFilters
  )

  const [_localFilters, _setLocalFilters] = useState<any>(initFilters)

  useEffect(() => {
    _setLocalFilters(selectedFilters)
    return () => _setLocalFilters(initFilters)
  }, [props.showDrawer, selectedFilters])

  const applyFilters = () => {
    dispatch(setSelectedFilters(_localFilters))
    dispatch(setProjectsAsPerFilters(_localFilters))
    dispatch(setShowAppliedFilters(true))
    props.onClose()
  }

  const onClearAll = () => {
    _setLocalFilters(initFilters)
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
            onClick={() => props.onClose(false)}
            sx={{ fontSize: 30, color: '#616161', cursor: 'pointer' }}
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
          {Object.keys(allProjectsFilters).map(
            (item: string, index: number) => (
              <Box key={index} sx={{ my: 2 }}>
                <CCAccordionCheckBox
                  title={item}
                  selectedFilters={_localFilters}
                  dropList={allProjectsFilters[item]}
                  addFilters={(type: string, value: string) => {
                    const foundKey: any = Object.keys(_localFilters).find(
                      (i) => {
                        return i === type
                      }
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
            )
          )}
        </Box>
      </Box>
    </>
  )
}

export default AllProjectsFilterDrawer
