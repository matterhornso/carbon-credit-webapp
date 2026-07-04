import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { fileUploadCalls } from '../../../api/fileUpload.api'

const ImageComp = ({ imgData }: any) => {
  console.log('imgData: ', imgData)

  const [image, setImage] = useState<any>()

  useEffect(() => {
    if (imgData?.img) {
      getImage()
    }
  }, [imgData])

  const getImage = async () => {
    try {
      const imgRes = await fileUploadCalls.getFile(imgData?.img)
      console.log('imgRes: ', URL.createObjectURL(imgRes))
      setImage(URL.createObjectURL(imgRes))
    } catch (e) {
      console.log('Error in getting image in pdf')
    }
  }

  return (
    <Box sx={{ py: 1 }}>
      {image && <Box component={'img'} src={image} width={'100%'} />}
      {imgData?.imgDescription && (
        <Typography>{imgData?.imgDescription}</Typography>
      )}
    </Box>
  )
}

export default ImageComp
