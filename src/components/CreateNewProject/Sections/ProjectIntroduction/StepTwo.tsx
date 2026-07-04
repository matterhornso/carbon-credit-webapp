import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import CCEditor from '../../../CCEditor/CCEditor'
import { handleOnChange } from '../../../../utils/draftPDDCompilation.util'
import { setProjectIntroduction } from '../../../../redux/Slices/CreateNewProject/projectIntroductionV2Slice'
import './index.css'
import CCEditorStyledInputField from '../../../../atoms/CCEditorStyledInputField/CCEditorStyledInputField'

const StepTwo = () => {
  const dispatch = useAppDispatch()

  const projectIntroduction = useAppSelector(
    ({ projectIntroductionV2 }) => projectIntroductionV2.projectIntroduction
  )

  const [localVal, setLocalVal] = useState<any>(null)

  // useEffect(() => {
  //   if (localVal) {
  //     // const updatedObj = handleOnChange(projectIntroduction, 'name', localVal)
  //     dispatch(
  //       setProjectIntroduction({ ...projectIntroduction, ['name']: localVal })
  //     )
  //   }
  // }, [localVal])

  return (
    <Box
      sx={{
        // mt: 2,
        height: '70%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* <CCEditor
        editorID="projectIntroduction-name"
        placeholder="Type your answer here..."
        value={projectIntroduction?.name?.data}
        setValue={(value: any) => {
          setLocalVal(value)
        }}
      /> */}
      {/* <TextInput setLocalVal={setLocalVal}/> */}
      <CCEditorStyledInputField
        placeholder="Type Your Answer Here..."
        value={projectIntroduction?.name?.data}
        onChange={(e: any) => {
          dispatch(
            setProjectIntroduction({
              ...projectIntroduction,
              ['name']: { data: e.target.value },
            })
          )
        }}
      />
      {/* <input
        placeholder="Type Your Answer Here..."
        value={projectIntroduction?.name}
        onChange={(e) => {
          dispatch(
            setProjectIntroduction({
              ...projectIntroduction,
              ['name']: e.target.value,
            })
          )
        }}
        style={{
          padding: '5px',
          paddingBottom: '15px',
          outline: 'none',
          borderTop: 'none',
          borderLeft: 'none',
          borderRight: 'none',
          borderBottom: '1px solid #B6BDBE',
          width: '100%',
          fontSize: '36px',
          fontWeight: 400,
          color: '#01717F99',
          marginLeft: '10px',
        }}
      /> */}
    </Box>
  )
}

export default StepTwo
