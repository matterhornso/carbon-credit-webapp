// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Grid, Box, Typography, Button, Paper } from '@mui/material'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import CloseIcon from '@mui/icons-material/Close'
import SampleModal from '../SampleModal/SampleModal'
import { ImageUpload } from './ImageHandle'
import { ENDPOINTS } from '../../api/configs/Endpoints'
import { resizeFile } from '../../utils/Filehandler.util'
import CCDocViewer from '../CCDocViewer'
import { fileUploadCalls } from '../../api/fileUpload.api'
import CCFileViewer from '../CCFileViewer/CCFileViewer'
import { setFileUploadInProgress } from '../../redux/Slices/issuanceDataCollection'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { handleApiError } from '../../utils/errorHandler'

// Local Imports

interface CCDropAndUploadProps {
  title?: string | number
  sx?: any
  mediaItem?: Array<any>
  mediaTitle?: Array<any>
  imageArray?: any
  onImageUpload?: any
  onDeleteImage?: any
  required?: boolean
  fontSize?: string | number
  multiple?: boolean
}

const CCDropAndUpload: FC<CCDropAndUploadProps> = (props) => {
  const dispatch = useAppDispatch()
  const hiddenFileInput = React.useRef<any>(null)
  const { multiple = true } = props
  const [showModal, setShowModal] = useState(false)
  const [uploading, setUploading] = useState(false)
  console.log('CCDropAndUpload', props)
  const handleClick = (event: any) => {
    hiddenFileInput.current.click()
  }

  const addMoreImageUpload = async (event: any) => {
    if (event?.target?.files?.length) {
      let all_files: any = [...props.imageArray]
      Promise.all(
        Array.from(event?.target?.files).map(async (selectedFile: any) => {
          console.log(selectedFile)
          const image =
            selectedFile?.type !== 'application/pdf'
              ? await resizeFile(selectedFile)
              : selectedFile
          setUploading(true)

          // const objectUrl = URL.createObjectURL(image)
          // const sizeTemp = selectedFile.size / 1000000

          //return ImageUpload(image, selectedFile?.name)
          //  .then((result) => {
          //    setUploading(false)
          //    all_files = result?.success
          //      ? [...all_files, result.data[0].ipfs_hash]
          //      : null
          //    console.log(
          //      '🚀 ~ file: CCDropAndUpload.tsx ~ line 49 ~ .then ~ all_files',
          //      all_files
          //    )
          //    return all_files
          //  })
          //  .catch((error) => {
          //    console.log(
          //      '🚀 ~ file: CCDropAndUpload.tsx ~ line 56 ~ Promise.all ~ error',
          //      error
          //    )
          //    // setUploading(false)
          //  })
          try {
            dispatch(setFileUploadInProgress(true))
            const result: any = await fileUploadCalls.uploadFile(
              image,
              selectedFile?.name
            )
            console.log('uploadStatus: ', result)
            all_files = result?.success
              ? [...all_files, result.data[0].ipfs_hash]
              : null
            return all_files
          } catch (e) {
            handleApiError(e, { action: 'CCDropAndUpload.addMoreImageUpload' })
          } finally {
            dispatch(setFileUploadInProgress(false))
            setUploading(false)
          }
        })
      ).then(() => props.onImageUpload([...all_files]))
    }
  }

  const deleteImage = (index: number) => {
    props.onDeleteImage(index)
  }

  return (
    <Box sx={{ ...props.sx }}>
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: props?.fontSize ? props?.fontSize : 16,
              fontWeight: 500,
              color: '#1D4B44',
            }}
          >
            {props.title || '-'}
            {props?.required && (
              <span style={{ color: 'red', fontSize: '14px', paddingLeft: 4 }}>
                *
              </span>
            )}
          </Typography>
          {props.mediaItem && props.mediaItem.length > 0 && (
            <Typography
              onClick={() => setShowModal(true)}
              sx={{
                fontSize: 16,
                fontWeight: 500,
                color: '#2B2B2B',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              Check Sample Data
            </Typography>
          )}
        </Box>
      </Box>
      <div style={{ position: 'relative' }}>
        <input
          ref={hiddenFileInput}
          style={{
            opacity: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          }}
          accept=".png,.jpeg,.pdf,.jpg"
          multiple={multiple}
          type="file"
          onChange={(event: any) => {
            console.log('changed onChange click')
            addMoreImageUpload(event)
          }}
        />

        <Box
          sx={{
            width: '100%',
            height: '90px',
            border: '2px dashed #1D4B44',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 1,
          }}
          onClick={handleClick}
        >
          <Typography sx={{ fontSize: 16, fontWeight: 500, color: '#141D1B' }}>
            Drop files or upload manually
          </Typography>
        </Box>

        <Button
          sx={{
            backgroundColor: '#F3BA4D',
            textTransform: 'none',
            width: '100%',
            borderRadius: '8px',
            mt: 2,
            mb: 1,
            color: '#005046',
          }}
          variant="contained"
          component="label"
          disabled={uploading}
          onClick={handleClick}
        >
          {uploading ? 'Uploading' : 'Upload'}
        </Button>
      </div>

      {/* {uploading && (
        <FileTab key={-1} title={'Uploading...'} index={-1} fileSize={0} />
      )} */}

      {props.imageArray && props.imageArray.length
        ? props.imageArray.map((item: any, index: number) => {
            if (typeof item === 'string') {
              return (
                <CCFileViewer
                  key={index.toString()}
                  title={item}
                  index={index}
                  deleteImage={deleteImage}
                  fileSize={0}
                />
              )
            } else {
              return (
                <CCFileViewer
                  key={index.toString()}
                  title={item.fileName}
                  index={index}
                  deleteImage={deleteImage}
                  fileSize={item.fileSize}
                />
              )
            }
          })
        : null}

      <SampleModal
        mediaArray={props.mediaItem ? [...props.mediaItem] : []}
        stringArray={props.mediaTitle ? [...props.mediaTitle] : []}
        modalVisibility={showModal}
        setModalVisibility={setShowModal}
      />
    </Box>
  )
}

export default CCDropAndUpload
