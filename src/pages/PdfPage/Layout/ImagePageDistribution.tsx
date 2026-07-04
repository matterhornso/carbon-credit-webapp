import { Box, Typography } from '@mui/material'
import React, { FC, useEffect, useRef, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { fileUploadCalls } from '../../../api/fileUpload.api'
import { useAppSelector } from '../../../hooks/reduxHooks'
import Layout from './Layout'
import PageDynamic from './PageDynamic'

interface ImagePageDistributionProps {
  children?: any
  images: any
  title?: string
  imageTitle?: string
  mainTitle?: string
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
        pt: 2,
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
          height: '100%',
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

const ImagePageDistribution: FC<ImagePageDistributionProps> = ({
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

  const calcRemainingPage = () => {
    const files = imageList
    if (files && files?.length > 1) {
      setRemainingPages(Math.ceil((files?.length - 1) / 2))
    }
  }

  useEffect(() => {
    calcRemainingPage()
  }, [imageList])

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

  const content = () => {
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Box ref={children_ref}>{children}</Box>
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
                        // height: ref?.current?.clientHeight,
                      }}
                    >
                      <ShowImage val={imageList[0]} index={1} />
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

  return (
    <>
      {children &&
        (images?.length > 0 ? (
          <Layout title={title} heading={mainTitle}>
            {content()}{' '}
          </Layout>
        ) : (
          <PageDynamic title={title} heading={mainTitle}>
            {content()}
          </PageDynamic>
        ))}
      {remainingPages !== 0 &&
        [...Array(remainingPages)]
          ?.map((itm, idx) => idx)
          ?.map((item, index) => {
            return (
              <Layout title={title} key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <Box sx={{ height: '50%' }}>
                    {!children && (
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
                    )}
                    <ShowImage
                      val={imageList[item + (children ? 1 : 0) + index]}
                      index={item + (children ? 2 : 1) + index}
                    />
                  </Box>
                  {imageList[item + (children ? 2 : 1) + index] && (
                    <Box sx={{ height: '50%' }}>
                      <ShowImage
                        val={imageList[item + (children ? 2 : 1) + index]}
                        index={item + (children ? 3 : 2) + index}
                      />
                    </Box>
                  )}
                </Box>
              </Layout>
            )
          })}
    </>
  )
}

export default ImagePageDistribution
