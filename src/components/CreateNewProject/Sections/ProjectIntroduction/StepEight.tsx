import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import { Box } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import CCInputField2 from '../../../../atoms/CCInputField2/CCInputField2'
import { setProjectIntroduction } from '../../../../redux/Slices/CreateNewProject/projectIntroductionV2Slice'

const StepSix = () => {
  const dispatch = useAppDispatch()

  const projectIntroduction = useAppSelector(
    ({ projectIntroductionV2 }) => projectIntroductionV2.projectIntroduction
  )

  const handleOnChange = (key: string, value: any) => {
    const projectIntroClone = { ...projectIntroduction }
    const objToBeModified = { ...projectIntroClone['duration'] }
    objToBeModified[key] = value?.toISOString()
    projectIntroClone['duration'] = { ...objToBeModified }
    dispatch(setProjectIntroduction(projectIntroClone))
  }

  return (
    <Box
      sx={{
        mt: 2,
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'center',
        height: '60%',
        gap: '30px',
      }}
    >
      {/* <Box sx={{ height: '25px', width: '150px' }}> */}
      <Box sx={{ height: 'auto', width: '300px', ml: 2 }}>
        <DatePicker
          value={projectIntroduction?.duration?.from || null}
          inputFormat="DD/MM/YYYY"
          onChange={(newValue) => {
            handleOnChange('from', newValue)
          }}
          components={{
            OpenPickerIcon: CalendarMonthOutlinedIcon,
          }}
          renderInput={(params) => (
            <CCInputField2 {...params} required={false} />
          )}
        />
      </Box>
      <Box sx={{ alignSelf: 'center', fontSize: 28 }}>to</Box>
      {/* <Box sx={{ height: '25px', width: '150px' }}> */}
      <Box sx={{ height: 'auto', width: '300px' }}>
        <DatePicker
          value={projectIntroduction?.duration?.to || null}
          inputFormat="DD/MM/YYYY"
          onChange={(newValue) => {
            handleOnChange('to', newValue)
          }}
          components={{
            OpenPickerIcon: CalendarMonthOutlinedIcon,
          }}
          renderInput={(params) => (
            <CCInputField2 {...params} required={false} />
          )}
        />
      </Box>
    </Box>
  )
}

export default StepSix
