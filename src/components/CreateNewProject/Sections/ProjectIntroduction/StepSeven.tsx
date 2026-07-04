import { Box } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { DatePicker } from '@mui/x-date-pickers'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'

import CCInputField2 from '../../../../atoms/CCInputField2/CCInputField2'
import { setProjectIntroduction } from '../../../../redux/Slices/CreateNewProject/projectIntroductionV2Slice'

const StepSix = () => {
  const dispatch = useAppDispatch()
  const projectIntroduction = useAppSelector(
    ({ projectIntroductionV2 }) => projectIntroductionV2.projectIntroduction
  )

  return (
    <Box
      sx={{
        height: '70%',
        width: '100%',
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ height: 'auto', width: '300px', ml: 2 }}>
        <DatePicker
          value={projectIntroduction?.start_date}
          inputFormat="DD/MM/YYYY"
          onChange={(newValue) => {
            const updatedProjectIntro = {
              ...projectIntroduction,
              ['start_date']: newValue?.toISOString(),
            }
            dispatch(setProjectIntroduction(updatedProjectIntro))
          }}
          components={{
            OpenPickerIcon: CalendarMonthOutlinedIcon,
          }}
          renderInput={(params: any) => (
            <CCInputField2 {...params} required={false} />
          )}
        />
      </Box>
    </Box>
  )
}

export default StepSix
