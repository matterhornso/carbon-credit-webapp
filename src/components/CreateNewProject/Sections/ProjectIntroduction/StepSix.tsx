import { Box } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import CCEditor from '../../../CCEditor/CCEditor'
import { setProjectIntroduction } from '../../../../redux/Slices/CreateNewProject/projectIntroductionV2Slice'
import CCEditorStyledInputField from '../../../../atoms/CCEditorStyledInputField/CCEditorStyledInputField'

const StepSix = () => {
  const dispatch = useAppDispatch()

  const projectIntroduction = useAppSelector(
    ({ projectIntroductionV2 }) => projectIntroductionV2.projectIntroduction
  )

  return (
    <Box
      sx={{
        height: '70%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* <CCEditor
        editorID="projectIntroduction-area"
        placeholder="Type your answer here..."
        value={projectIntroduction?.area?.data}
        setValue={(value: any) => {
          const updatedProjectIntro = {
            ...projectIntroduction,
            ['area']: { data: value },
          }
          dispatch(setProjectIntroduction(updatedProjectIntro))
        }}
      /> */}
      <CCEditorStyledInputField
        placeholder="Type Your Answer Here..."
        value={projectIntroduction?.area?.data}
        onChange={(e: any) => {
          dispatch(
            setProjectIntroduction({
              ...projectIntroduction,
              ['area']: { data: e.target.value },
            })
          )
        }}
      />
    </Box>
  )
}

export default StepSix
