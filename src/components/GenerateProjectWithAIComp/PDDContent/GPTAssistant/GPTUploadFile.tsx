import React from 'react'
import upload_files_to_assistant_icon from '../../../../assets/Images/Icons/upload_files_to_assistant_icon.svg'
import { Box } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import {
  setUploadedFiles,
  setUploadedImages,
} from '../../../../redux/Slices/generateProjectWithAISlice'

const GPTUploadFile = () => {
  const dispatch = useAppDispatch()

  const uploadedImages: any = useAppSelector(
    ({ generateProjectWithAISlice }) =>
      generateProjectWithAISlice.uploadedImages
  )

  const onChangeFileUploadHandler = (e: any) => {
    console.log(e.target.files)
    const uploadedFileDetails = e.target.files[0]
    if (!uploadedFileDetails) {
      return
    }
    if (uploadedFileDetails?.type.split('/')[0] !== 'image') {
      dispatch(setUploadedFiles([uploadedFileDetails?.name]))
    }
    if (uploadedFileDetails?.type.split('/')[0] === 'image') {
      const reader = new FileReader()
      reader.onloadend = () => {
        const image = {
          name: uploadedFileDetails.name,
          preview: reader.result,
        }
        console.log(image)
        dispatch(setUploadedImages([image]))
      }
      reader.readAsDataURL(uploadedFileDetails)
    }
  }
  return (
    <Box sx={{ position: 'relative' }}>
      <Box component={'img'} src={upload_files_to_assistant_icon} />
      <Box sx={{ position: 'absolute', top: 0, width: '100%', opacity: 0 }}>
        <input
          type="file"
          style={{ width: '100%' }}
          onChange={(e: any) => onChangeFileUploadHandler(e)}
        />
      </Box>
    </Box>
  )
}

export default GPTUploadFile
