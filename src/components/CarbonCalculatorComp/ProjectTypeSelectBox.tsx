import { MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { setSelectedProjectType } from '../../redux/Slices/carbonCreditCalculatorSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { CARBON_CALCULATOR_PROJECT_TYPES } from '../../config/carbonCalculator.config'

const ProjectTypeSelectBox = () => {
  const dispatch = useAppDispatch()
  const selectedProjectType = useAppSelector(
    ({ carbonCreditCalculator }) => carbonCreditCalculator.selectedProjectType
  )

  const [selectedSection, setSelectedSection] = useState<any>('')

  useEffect(() => {
    if (!selectedProjectType?.value) {
      setSelectedSection('')
      return
    }
    if (selectedProjectType?.value) {
      setSelectedSection(selectedProjectType?.value)
    }
  }, [selectedProjectType])

  return (
    <>
      <Select
        fullWidth
        placeholder={'Select project type'}
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        variant="standard"
        value={selectedSection}
        onChange={(e: any) => {
          const selectedTypeLabel = CARBON_CALCULATOR_PROJECT_TYPES.find(
            (i) => {
              return i?.value === e.target.value
            }
          )
          dispatch(setSelectedProjectType(selectedTypeLabel))
        }}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          PaperProps: {
            sx: {
              maxHeight: '200px',
              borderRadius: 2,
              mt: 1,
            },
          },
        }}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {CARBON_CALCULATOR_PROJECT_TYPES?.map((type: any, index: number) => (
          <MenuItem value={type?.value} key={index}>
            {type?.value}
          </MenuItem>
        ))}
      </Select>
    </>
  )
}

export default ProjectTypeSelectBox
