import { Box } from '@mui/material'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import CCEditor from '../../../CCEditor/CCEditor'
import { setProjectIntroduction } from '../../../../redux/Slices/CreateNewProject/projectIntroductionV2Slice'
import CCEditorStyledInputField from '../../../../atoms/CCEditorStyledInputField/CCEditorStyledInputField'

const StepFive = () => {
  const dispatch = useAppDispatch()

  const projectIntroduction = useAppSelector(
    ({ projectIntroductionV2 }) => projectIntroductionV2.projectIntroduction
  )

  const [showSavedData, setShowSavedData] = useState<boolean | null>(false)

  return (
    <Box
      sx={{
        height: '70%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CCEditorStyledInputField
        placeholder="Type Your Answer Here..."
        value={projectIntroduction?.location?.data}
        onChange={(e: any) => {
          dispatch(
            setProjectIntroduction({
              ...projectIntroduction,
              ['location']: { data: e.target.value },
            })
          )
        }}
      />
      {/* <CCEditor
        editorID="projectIntroduction-location"
        placeholder="Type your answer here..."
        value={projectIntroduction?.location?.data}
        //value={location}
        setValue={(value: any) => {
          const updatedProjectIntro = {
            ...projectIntroduction,
            ['location']: { data: value },
          }
          dispatch(setProjectIntroduction(updatedProjectIntro))
          //dispatch(setLocation(value))
        }}
      /> */}
    </Box>
  )
}

export default StepFive
