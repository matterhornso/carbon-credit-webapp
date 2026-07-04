import { Box } from '@mui/material'
import React, { FC, useEffect, useRef, useState } from 'react'
import { fileUploadCalls } from '../../../api/fileUpload.api'
import { Typography } from '@mui/material'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
 
const IMAGE_HEIGHT = 400
interface ImagePageDistributionProps {
    children?: any
    images: any
    title?: string
    imageTitle?: string
    mainTitle?: string
  }
  
const ImageLayout: FC<ImagePageDistributionProps> = ({
    children,
    images,
    title,
    imageTitle,
    mainTitle,
  }) => {
    const [remainingPages, setRemainingPages] = useState<number>(0)
    const ref = useRef<any>(0)
    const children_ref = useRef<any>(0)
    const [imageList, setImageList] = useState([])
    const pageHeight = useAppSelector(
      ({ pdfPage }) => pdfPage.pageHeight,
      shallowEqual
    )
  
    useEffect(() => {
      if (images) {
        setImageList(images)
        const main_height = children_ref?.current?.clientHeight
        if (main_height > pageHeight / 2) {
          const img_arr = JSON.parse(JSON.stringify(images))
          img_arr.unshift('')
          setImageList(img_arr)
        }
      }
    }, [images, children, children_ref, pageHeight])
  
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: IMAGE_HEIGHT + 23,
            my:1
          }}
        >
          {/* <Box ref={children_ref}>{children}</Box> */}
          <Box sx={{ flexGrow: '1', opacity: imageList[0] ? 1 : 0 }}>
            {imageList?.length > 0 && (
              <Box sx={{ height: '100%', width: '100%' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: '#2B2B2B',
                        fontSize: 12,
                        fontWeight: 500,
                        mb: 1,
                      }}
                    >
                      {imageTitle}
                    </Typography>
                  </Box>
  
                  <Box sx={{ flexGrow: '1', position: 'relative' }}>
                    {/* <Box sx={{ height: '100%' }} ref={ref}></Box> */}
                    <Box
                      sx={{
                        // position: 'absolute',
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%',
                        mb: 1,
                        // height: ref?.current?.clientHeight,
                      }}
                    >
                      {imageList.map((i, ind) => {
                        {
                          return (
                            <ShowImage key={ind.toString()} val={i} index={ind} />
                          )
                        }
                      })}
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </>
    )
  }
  
  interface ShowImageProps {
    val: string
    index?: number
  }
  
  const ShowImage: FC<ShowImageProps> = ({ val, index }) => {
    const [image, setImage] = useState<any>('')
  
    const getImage = (val: string) => {
      if (val)
        fileUploadCalls
          .getFile('large-' + val)
          .then((res) => {
            setImage(URL.createObjectURL(res))
          })
          .catch(() => {
            // console.log('object')
          })
    }
  
    useEffect(() => getImage(val), [val])
    return (
      <Box
        sx={{
          maxWidth: '100%',
        //   pt: 2,
          height: '100%',
          position: 'relative',
          width: '100%',
        }}
      >
        <Box
          sx={{
            color: '#4A635E',
            fontSize: 10,
            fontWeight: 400,
            mb: 1,
            // position: 'absolute',
            textAlign: 'center',
            width: '100%',
          }}
        >
          {index + ': ' + val?.split('.')[0]}
        </Box>
        <Box
          sx={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center top',
            // background
            width: '100%',
            maxWidth: '100%',
            height: IMAGE_HEIGHT,
            // objectPosition: 'top',
          }}
        ></Box>
        {/* <img
            src={image}
            alt="val"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              // objectPosition: 'top',
            }}
          /> */}
      </Box>
    )
  }
  
export default ImageLayout