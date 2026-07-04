// React Imports
import React, { FC, useEffect, useState } from 'react'
// MUI Imports
import { Grid, Box, Typography, Button, Paper } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
// Comp Imports
import CCDocViewer from '../CCDocViewer'
// API Imports
import { fileUploadCalls } from '../../api/fileUpload.api'
import { Colors, Images } from '../../theme'
import { IMAGE_SIZE_PREFIXES } from '../../config/constants.config'

declare let window: any

interface CCFileViewerProps {
  title?: string | number
  index?: number
  deleteImage?: any
  fileSize: number | string
}

const CCFileViewer: FC<CCFileViewerProps> = (props) => {
  const item: any = props.title
  const [file, setFile] = useState<any>()
  useEffect(() => {
    getImages()
  }, [item])
  const getImages = async () => {
    try {
      // setLoading(true)
      if (item) {
        const fileURL =
          item.search('.pdf') > 0 ? item : IMAGE_SIZE_PREFIXES.THUMBNAIL + item

        const file_api: any =
          item.search('.pdf') > 0
            ? fileUploadCalls.getPdfFile
            : fileUploadCalls.getFile

        file_api(fileURL).then((res: any) => {
          const image = URL.createObjectURL(res)
          setFile(image)
          return image
        })
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: SliderComponent.tsx ~ line 59 ~ getImages ~ error',
        error
      )
    } finally {
      // setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        width: '116px',
        height: '140px',
        backgroundColor: '#E5F2FF',
        display: 'inline-block',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '4px',

        mt: 1,
        mr: 2,
      }}
    >
      <Box
        sx={{
          px: 1,
        }}
      >
        <Box
          sx={{
            position: 'relative',
          }}
        >
          {file ? (
            <Box
              sx={{
                mt: 1,
                background: 'white',
                width: 100,
                height: 100,
                borderRadius: '2px',
              }}
              onClick={() => {
                window.open().location.href = file
              }}
              component="img"
              src={item?.includes('.pdf') ? Images?.pdfViewer2 : file}
            />
          ) : (
            <Box
              sx={{
                mt: 1,
                background: 'white',
                width: 100,
                height: 100,
                borderRadius: '2px',
              }}
            />
          )}
          {props?.deleteImage && (
            <CloseIcon
              onClick={() => props.deleteImage(props?.index)}
              style={{
                color: '#001E31',
                cursor: 'pointer',
                position: 'absolute',
                top: 6,
                right: 0,
                fontSize: 20,
              }}
            />
          )}
        </Box>
        <Box
          sx={{
            pb: 1,
            flexDirection: 'row',
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 500,
              whiteSpace: 'nowrap',
              width: '100px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {props.title}
          </Typography>
          {/* {props.fileSize > 0 && (
            <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
              {props.fileSize} MB
            </Typography>
          )} */}
        </Box>
      </Box>
    </Box>
  )
}

export default CCFileViewer
