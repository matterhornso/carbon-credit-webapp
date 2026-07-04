import React, { FC, useState } from 'react'
import { Box, Grid, TextareaAutosize, Typography, Input } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SampleModal from '../../atoms/SampleModal/SampleModal'

const ImageComponent: FC = () => {
  const [imageArray, setImageArray]: Array<any> = useState([])

  return (
    <Grid container>
      {imageArray.map((item: any, index: any) => {
        return (
          <Box
            key={index}
            component="img"
            sx={{
              height: '250px',
              width: '420px',
              margin: '20px',
              // border: '2px solid',
            }}
            src={item}
          />
        )
      })}

      <Input
        type="file"
        sx={{
          height: '250px',
          width: '420px',
          border: '2px dashed',
          marginLeft: '10px',
          margin: '20px',
        }}
        onChange={(event: any) => {
          if (event?.target?.files?.length) {
            const selectedFile = event.target.files[0]
            console.log('selectedFile', selectedFile)
            const objectUrl = URL.createObjectURL(selectedFile)
            if (objectUrl) {
              const selectedImagesCopy = [...imageArray]
              selectedImagesCopy.push(objectUrl)
              setImageArray(selectedImagesCopy)
            }
          }
        }}
       
      />
      
      {/* 
      <Box
        // component="input"
        // type="file"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          height: '250px',
          width: '420px',
          border: '2px dashed',
          marginLeft: '10px',
          margin: '20px',
        }}
      >
        <AddIcon />
        <Typography sx={{ fontSize: 20 }}>Attach More</Typography>
      </Box> */}
    </Grid>
  )
}

export default ImageComponent
