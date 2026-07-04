import React, { FC, useEffect, useState } from 'react'
import { Box, Skeleton, Stack, Typography } from '@mui/material'
import './style.css'
import Arrow from '../../../assets/Images/Icons/arrow-circle.svg'

import { useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { fileUploadCalls } from '../../../api/fileUpload.api'
const SliderComponent = (props: any) => {
  const onWebApp = useAppSelector(({ app }) => !app.throughIFrame, shallowEqual)
  const { projectData } = props
  const [loading, setLoading] = useState(true)
  const [slideList, setSlideList] = useState<any>([])
  const [images, setImages] = useState<any>([])

  useEffect(() => {
    getImages()
  }, [projectData])

  useEffect(() => {
    setImages(slideList?.length > 3 ? slideList?.slice(0, 3) : slideList)
  }, [slideList])

  const getImages = async () => {
    try {
      setLoading(true)
      if (projectData?.project_image.length) {
        const arr = await Promise.all(
          projectData?.project_image?.map((item: any, index: any) => {
            return fileUploadCalls.getFile(item).then((res: any) => {
              const image = URL.createObjectURL(res)
              return image
            })
          })
        )

        setSlideList(arr)
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: SliderComponent.tsx ~ line 59 ~ getImages ~ error',
        error
      )
    } finally {
      setLoading(false)
    }
  }

  const moveSlider = (val: string) => {
    const lastList = document.getElementById('last-list')
    const secondLastList = document.getElementById('prev-list')
    const tempArray = slideList

    if (val === 'next') {
      lastList?.classList.remove('transformPrev')
      lastList?.classList.add('transformThis')
      secondLastList?.classList.add('activeNow')
      tempArray.splice(0, 0, tempArray.splice(tempArray?.length - 1, 1)[0])

      setTimeout(function () {
        lastList?.classList.remove('transformThis')
        lastList?.classList.remove('activeNow')
        setSlideList([...tempArray])
      }, 350)
    } else if (val === 'previous') {
      tempArray.splice(tempArray?.length - 1, 0, tempArray.splice(0, 1)[0])
      setSlideList([...tempArray])
      lastList?.classList.remove('transformPrev')
      lastList?.classList.remove('activeNow')
      setTimeout(function () {
        lastList?.classList.add('transformPrev')
        lastList?.classList.remove('transformThis')
        secondLastList?.classList.add('activeNow')
      }, 1)
    }
  }

  return (
    <Box
      sx={{
        pt: 8,
        width: '100%',
      }}
    >
      {!loading ? (
        <Typography
          sx={{
            fontSize: 32,
            fontWeight: '600',
            color: 'headingColor.main',
            lineHeight: '48px',
            fontStyle: 'normal',
          }}
        >
          Project Images
        </Typography>
      ) : (
        <Skeleton
          variant="rectangular"
          sx={{
            width: '244px',
            height: '28px',
            background: 'linear-gradient(270deg, #EBF0F0 0%, #E5F2ED 100%)',
            borderRadius: '40px',
            mt: 2,
            ml: 2,
          }}
        />
      )}
      {!loading && images?.length ? (
        <div className="container">
          <div className="card-stack">
            <ul className="card-list">
              {images.length === 1 ? (
                <Box
                  style={{
                    flexGrow: '1',
                    backgroundImage: `url(${images[0]})`,
                    height: `calc(100% - 15% * (${1 - (0 + 1)}))`,
                    width: '80%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'tart',
                    alignItems: 'start',
                    borderRadius: '24px',
                    boxShadow: '0px 2px 8px rgba(45, 95, 87, 0.2)',
                    backgroundSize: 'cover',
                    marginLeft: '-30px',
                  }}
                ></Box>
              ) : images.length ? (
                images.map((item: any, index: number) => {
                  return (
                    <li
                      key={index.toString()}
                      id={
                        images?.length === index + 1
                          ? 'last-list'
                          : images?.length - 1 === index + 1
                          ? 'prev-list'
                          : ''
                      }
                      className="card"
                      style={{
                        backgroundImage: `url(${item})`,
                        right: `calc(100px * (${index}))`,
                        height: `calc(100% - 15% * (${
                          images.length - (index + 1)
                        }))`,
                      }}
                    ></li>
                  )
                })
              ) : null}
            </ul>
          </div>
          {slideList.length === 1 ? null : (
            <div className="button-flex">
              <a
                className="buttons prev"
                onClick={() => moveSlider('previous')}
              >
                <img
                  src={Arrow}
                  alt="previous"
                  style={{ filter: !onWebApp ? 'none' : 'contrast(0.5)' }}
                />
              </a>
              <a className="buttons next" onClick={() => moveSlider('next')}>
                <img
                  src={Arrow}
                  alt="next"
                  style={{
                    transform: 'rotate(180deg)',
                    filter: !onWebApp ? 'none' : 'contrast(0.5)',
                  }}
                />
              </a>
            </div>
          )}
        </div>
      ) : loading ? (
        <Box
          className=""
          sx={{
            justifyContent: 'stretch',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Stack
            alignItems="center"
            justifyContent={'center'}
            sx={{ width: '100%', m: 3 }}
          >
            <Skeleton
              variant="rectangular"
              width={'100%'}
              height={'480px'}
              sx={{
                borderRadius: '40px',
                bgcolor: 'linear-gradient(270deg, #EBF0F0 0%, #E5F2ED 100%',
              }}
            />
          </Stack>
        </Box>
      ) : (
        'No Images added'
      )}
    </Box>
  )
}
export default SliderComponent
