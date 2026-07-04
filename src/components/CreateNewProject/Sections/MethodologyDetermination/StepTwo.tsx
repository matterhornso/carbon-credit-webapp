import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import CheckboxDiv from '../../../../atoms/CheckboxDiv/CheckboxDiv'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import {
  //setGoal,
  setMethodologyDetermination,
} from '../../../../redux/Slices/CreateNewProject/methodologyDeterminationSlice'

const data = [
  {
    title: 'Sequester more Carbon credits',
    value: 'sequester_more_carbon_credits',
  },
  {
    title: 'Social Impact, Community Upliftment',
    value: 'Social_impact_community_upliftment',
  },
]

const StepTwo = () => {
  const dispatch = useAppDispatch()

  const methodology = useAppSelector(
    ({ methodologyDetermination }) => methodologyDetermination?.methodology
  )

  return (
    <Box sx={{ mt: 2 }}>
      {data.map((obj, index) => (
        <CheckboxDiv
          key={index}
          title={obj?.title}
          onChange={() => {
            const updatedMethodlogyObj = {
              ...methodology,
              ['goal']: obj?.value,
            }
            dispatch(setMethodologyDetermination(updatedMethodlogyObj))
          }}
          checked={obj?.value === methodology?.goal}
        />
      ))}
    </Box>
  )
}

export default StepTwo
