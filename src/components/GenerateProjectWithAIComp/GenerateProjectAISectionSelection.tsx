import { Box, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CCSelectBox from '../../atoms/CCSelectBox'
import { SECTION_LIST } from '../../config/generateProjectWIthAiConfig'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setSelectedSectionForGenerateProjectWithAI,
  setUpdatedCompiledDataByUser,
  setUserPrompt,
} from '../../redux/Slices/generateProjectWithAISlice'

const GenerateProjectAISectionSelection = () => {
  const dispatch = useAppDispatch()
  const selectedSectionForGenerateProjectWithAI = useAppSelector(
    ({ generateProjectWithAISlice }) =>
      generateProjectWithAISlice.selectedSectionForGenerateProjectWithAI
  )

  const loaderForStoringAsstIds: any = useAppSelector(
    ({ generateProjectWithAISlice }) =>
      generateProjectWithAISlice.loaderForStoringAsstIds
  )
  const chatLoader = useAppSelector(
    ({ generateProjectWithAISlice }) => generateProjectWithAISlice.chatLoader
  )

  const [selectedSection, setSelectedSection] = useState<any>('')

  useEffect(() => {
    if (selectedSectionForGenerateProjectWithAI?.value) {
      setSelectedSection(selectedSectionForGenerateProjectWithAI?.value)
    }
  }, [selectedSectionForGenerateProjectWithAI])

  return (
    <Box>
      <Select
        // multiple
        fullWidth
        disabled={loaderForStoringAsstIds || chatLoader ? true : false}
        // displayEmpty
        // value={selectedSectionForGenerateProjectWithAI?.value}
        value={selectedSection}
        onChange={(e: any) => {
          const selectedSubSectionObj = SECTION_LIST.find((i: any) => {
            return i?.value === e.target.value
          })
          dispatch(
            setSelectedSectionForGenerateProjectWithAI({
              ...selectedSubSectionObj,
            })
          )
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
        {Object.values(SECTION_LIST)?.map((list: any, listIdx: number) => (
          <MenuItem
            value={list?.value}
            // name={'wefnewf'}
            key={listIdx}
            sx={{
              color: '#01434B',
              fontWeight: 400,
              fontSize: 14,
              background:
                list?.value === selectedSectionForGenerateProjectWithAI?.value
                  ? '#BEF7FE'
                  : '#fff',
              py: 3,
            }}
          >
            {list?.value}
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}

export default GenerateProjectAISectionSelection
