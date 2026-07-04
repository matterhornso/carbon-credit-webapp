import { Box } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import RadioGroupDiv from '../../../../atoms/RadioGroupDiv/RadioGroupDiv'
import { setProjectIntroduction } from '../../../../redux/Slices/CreateNewProject/projectIntroductionV2Slice'

const data = [
  {
    label: 'Small Scale',
    value: 'smallScale',
  },
  {
    label: 'Large Scale',
    value: 'largeScale',
  },
]

const StepFour = () => {
  const dispatch = useAppDispatch()

  const projectIntroduction = useAppSelector(
    ({ projectIntroductionV2 }) => projectIntroductionV2.projectIntroduction
  )

  const handleChange = (e: any) => {
    const updatedProjectIntro = {
      ...projectIntroduction,
      ['scale']: e.target.value,
    }
    dispatch(setProjectIntroduction(updatedProjectIntro))
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '70%',
      }}
    >
      <RadioGroupDiv
        radioGroupName="scale-radio-group"
        radioButtonData={data}
        onChange={(e: any) => handleChange(e)}
        value={projectIntroduction?.scale}
      />
    </Box>
  )
}

export default StepFour
