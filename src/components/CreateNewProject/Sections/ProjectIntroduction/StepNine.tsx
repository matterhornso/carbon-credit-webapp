import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { fileUploadCalls } from '../../../../api/fileUpload.api'
import { setProjectIntroduction } from '../../../../redux/Slices/CreateNewProject/projectIntroductionV2Slice'
import LoderOverlay from '../../../LoderOverlay'
import CloseIcon from '@mui/icons-material/Close'

const StepNine = () => {
  const dispatch = useAppDispatch()

  const projectIntroduction = useAppSelector(
    ({ projectIntroductionV2 }) => projectIntroductionV2.projectIntroduction
  )

  const [uploadedImg, setUploadedImg] = useState<any>()
  const [savedImg, setSavedImg] = useState<any>()
  const [showUploadedImg, setShowUploadedImg] = useState<any>()
  const [loading, setLoading] = useState<any>(false)

  useEffect(() => {
    if (uploadedImg) {
      dispatch(
        setProjectIntroduction({
          ...projectIntroduction,
          ['project_img']: uploadedImg,
        })
      )
    }
  }, [uploadedImg])

  useEffect(() => {
    if (projectIntroduction?.project_img) {
      getImage(projectIntroduction?.project_img)
    }
  }, [projectIntroduction])

  const addImageUpload = async (event: any) => {
    if (!event?.target?.files?.length) {
      return
    }
    setLoading(true)
    try {
      const fileName = event?.target?.files[0]?.name
      const result: any = await fileUploadCalls.uploadFile(
        event?.target?.files[0],
        fileName
      )
      await getImage(result.data[0].ipfs_hash)
      setUploadedImg(result.data[0].ipfs_hash)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const getImage = async (img: any) => {
    try {
      setLoading(true)
      const imgRes = await fileUploadCalls.getFile(img)
      setSavedImg(URL.createObjectURL(imgRes))
    } catch (e) {
      console.log('Error in getting image in pdf')
    } finally {
      setLoading(false)
    }
  }

  const deleteImg = () => {
    console.log('clicked: ')
    setUploadedImg('')
    dispatch(
      setProjectIntroduction({
        ...projectIntroduction,
        ['project_img']: '',
      })
    )
  }

  return (
    <>
      {loading ? (
        <LoderOverlay show={loading} />
      ) : (
        <Box
          sx={{
            height: '70%',
            width: '100%',
            display: 'flex',
            // justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {!projectIntroduction?.project_img || uploadedImg === '' ? (
            <Box sx={{ position: 'relative', width: '100%' }}>
              <Box
                sx={{
                  mt: 3,
                  width: '100%',
                  border: '1px dashed #1D4B44',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                  py: 8,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 26,
                    fontWeight: 500,
                    color: '#0D0E0E',
                    textAlign: 'center',
                    background: '#AFE3EA',
                    borderRadius: '100px',
                    // width: '90px',
                    whiteSpace: 'nowrap',
                    py: 2,
                    px: 5,
                  }}
                >
                  Upload File
                </Typography>
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  left: '40%',
                  top: '110px',
                  opacity: 0,
                }}
              >
                <input
                  type="file"
                  accept=".png"
                  onChange={(event: any) => {
                    if (event?.target?.files[0]?.type.split('/')[1] !== 'png') {
                      alert('Please Upload PNG image')
                      return
                    }

                    addImageUpload(event)
                    setShowUploadedImg(event?.target?.files[0]?.name)
                  }}
                />
              </Box>
            </Box>
          ) : (
            <Box sx={{ position: 'relative' }}>
              <Box
                onClick={deleteImg}
                sx={{
                  position: 'absolute',
                  right: '0',
                  background: 'rgba(0,0,0,0.5)',
                  top: '0',
                  borderRadius: '50%',
                  paddingTop: '5px',
                  width: '30px',
                  height: '30px',
                  padding: '3px',
                  cursor: 'pointer',
                }}
              >
                <CloseIcon sx={{ color: 'white' }} />
              </Box>
              <img
                src={savedImg}
                width={'500px'}
                height={'250px'}
                style={{ border: 'none', outline: 'none' }}
              />
            </Box>
          )}
        </Box>
      )}
    </>
  )
}

export default StepNine
