import { Box, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import CCButton from '../../../../atoms/CCButton'
import { setSubSectionIndex } from '../../../../redux/Slices/CreateNewProject/createNewProjectSubSectionSlice'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'

const StepOne = () => {
  const dispatch = useAppDispatch()
  const subSectionIndex: any = useAppSelector(
    ({ createNewProjectSubSection }) =>
      createNewProjectSubSection?.subSectionIndex,
    shallowEqual
  )
  // const ref = useRef(null)

  // const [show, setShow] = useState(false)
  // const [top, setTop] = useState(0)
  // const [left, setLeft] = useState(0)

  // useEffect(() => {
  //   if (ref?.current) {
  //     const element: any = ref.current

  //     element.addEventListener('mouseup', (e: any) => {
  //       const selection = window.getSelection()
  //       handleTextSelection(e, selection)

  //       const rect = element.getBoundingClientRect()
  //       console.log('rect', rect)
  //       setShow(true)

  //       setTop(rect?.y)
  //       setLeft(rect?.x)
  //     })

  //     return () => {
  //       element.removeEventListener('select', handleTextSelection)
  //     }
  //   }
  // }, [ref?.current])

  // const handleTextSelection = (e: any, selection: any) => {
  //   console.log('handleTextSelection called', e)
  //   console.log('selection', selection)
  //   console.log('selection?.toString()', selection?.toString())
  // }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography sx={{ color: '#0D0E0E' }}>
        {`Welcome to your new project! To begin, kindly provide comprehensive
        details regarding the project's key aspects. If you require assistance
        in formulating these details, feel free to utilize the AI's support
        wherever available, by pressing the 'Space' key on your keyboard.`}
      </Typography>
      <Typography
        sx={{
          color: '#01434B',
          fontSize: 16,
          fontWeight: 500,
          pt: '20px',
          pb: '17px',
        }}
      >
        Get started by clicking the ‘Proceed’ button.
      </Typography>
      <CCButton
        onClick={() => {
          dispatch(setSubSectionIndex(1))
        }}
        sx={{
          background: '#BED7FE',
          color: '#0D0E0E',
          fontWeight: 500,
          fontSize: 14,
          borderRadius: '20px',
          p: '7px 24px',
        }}
      >
        Proceed
      </CCButton>
    </Box>
  )
}

export default StepOne
