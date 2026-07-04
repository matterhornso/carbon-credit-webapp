import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { AnyAction } from '@reduxjs/toolkit'
import React, { FC, useEffect, useRef, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { fileUploadCalls } from '../../../api/fileUpload.api'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { setPageHeight } from '../../../redux/Slices/pdfSlice'
import ImagePageDistribution from './ImagePageDistribution'
import Layout from './Layout'
import LayoutTwo from './LayoutTwo'
import MainHeading from './MainHeading'
import SubData from './SubData'

interface PageLayoutTwoProps {
  children?: any
  sections?: any
  title?: string
  heading?: string
  mainHeading?: string
  index?: number
}
const MAX_DATA_LIMIT = 2800
const IMAGE_HEIGHT = 400

const PageLayoutTwo: FC<PageLayoutTwoProps> = ({
  children,
  title,
  heading,
  sections,
  mainHeading,
  index,
}) => {
  console.log('🚀 ~ file: PageLayoutTwo.tsx ~ line 26 ~ sections', sections)
  const [childHeight, setChildHeight] = useState<any>(0)
  const [parentHeight, setParentHeight] = useState<any>(0)
  const [extraPage, setExtraPage] = useState<number>(0)
  const [dataContent, setDataContent] = useState<any>([])
  console.log(
    '🚀 ~ file: PageLayoutTwo.tsx ~ line 26 ~ dataContent',
    dataContent
  )
  const dispatch = useAppDispatch()

  const parent_ref = useRef<any>(null)
  const child_ref = useRef<any>(null)

  // useEffect(() => {
  //   setChildHeight(child_ref?.current?.clientHeight)
  //   setParentHeight(parent_ref?.current?.clientHeight)

  //   dispatch(setPageHeight(parent_ref?.current?.clientHeight))
  //   window.addEventListener('resize', handleWindowSizeChange)
  //   return () => {
  //     window.removeEventListener('resize', handleWindowSizeChange)
  //   }
  // }, [{ ...child_ref?.current }, { ...parent_ref?.current }])

  // const handleWindowSizeChange = () => {
  //   setChildHeight(child_ref?.current?.clientHeight)
  //   setParentHeight(parent_ref?.current?.clientHeight)
  // }

  useEffect(() => {
    if (sections && dataContent.length == 0) {
      dataMaker(MAX_DATA_LIMIT, sections, dataContent, 0, 0)
    }
    findLastWord()
  }, [sections])

  //   useEffect(() => {
  //     if (childHeight !== 0 || parentHeight !== 0)
  //       if (childHeight > parentHeight)
  //         setExtraPage(Math.ceil(childHeight / parentHeight))
  //       else setExtraPage(0)
  //   }, [
  //     parentHeight,
  //     childHeight,
  //     { ...child_ref?.current },
  //     { ...parent_ref?.current },
  //   ])

  const sectionMaker = (value: any, lastCount: any) => {
    const newVal: any = {}

    if (value.content && typeof value.content == 'string') {
      newVal.content = value.content?.slice(
        value.nextIndex > 0 ? value.nextIndex : 0
      )
    }

    if (!value.words && value.content && typeof value.content == 'string') {
      newVal.words = value.content?.split(' ').length
    }

    if (!value.chars && value.content && typeof value.content == 'string') {
      newVal.chars = value.content?.length
    } else if (value?.images?.length) {
      newVal.chars = 114 * (IMAGE_HEIGHT / 23) - lastCount
    }

    if (value.images?.length) {
      newVal.imageHeight = value?.images?.length
    } else {
      newVal.imageHeight = 0
    }

    return { ...value, ...newVal }
  }

  const lastIndexFinder = (string: string) => {
    const text = string.split(' ')
    const val = text[text.length - 1].length
    console.log(
      '🚀 ~ file: PageLayoutTwo.tsx ~ line 114 ~ lastIndexFinder ~ val',
      text,
      val
    )
    return val
  }

  const dataMaker = (
    DATA_LIMIT: number,
    inputData: any,
    mainData: any,
    lastCount: number,
    leftChars: number
  ) => {
    console.log('🚀 ~ file: PageLayoutTwo.tsx ~ line 118 ~ mainData', mainData)
    console.log(
      '🚀 ~ file: PageLayoutTwo.tsx ~ line 74 ~ dataMaker ~ DATA_LIMIT',
      DATA_LIMIT
    )
    console.log(
      '🚀 ~ file: PageLayoutTwo.tsx ~ line 73 ~ dataMaker ~ inputData',
      inputData
    )
    let toPassData = mainData
    const datas = [...inputData]
      .map((section: any) => {
        return section?.values?.map((value: any) => {
          console.log('78value', value)
          return sectionMaker(value, lastCount)
          // return {...value, content: value.content && typeof value.content == 'string'? value.content?.slice(value.nextIndex > 0 ? value.nextIndex: 0  ): value.content , words:!value.words && (value.content && typeof value.content=='string') ? value.content?.split(" ").length  :value.words || 0 , chars:!value.chars && (value.content && typeof value.content=='string') ? value.content?.length: value?.images?.length ? ((IMAGE_HEIGHT/23) *114)-lastCount :value.chars || 0, imageHeight: value?.images?.length ? IMAGE_HEIGHT : 0 || 0}
        })
      })
      .flat()

    let count = 0
    let toBeData: any = []

    for (let i = 0; i < datas.length; i++) {
      count += datas[i].chars || 0
      if (count > DATA_LIMIT && inputData.length) {
        const left_Chars = count - DATA_LIMIT
        const now_data = datas[i]

        if (left_Chars > 0 && typeof now_data?.content == 'string') {
          // now_data.content =   now_data?.content?.substring( 0, datas[i].chars- left_Chars );

          toBeData = [
            ...toBeData,
            {
              ...datas[i],
              lastWord: findLastWord(
                datas[i].content.slice(0, datas[i].chars - left_Chars),
                count - left_Chars
              ),
              content: datas[i].content.slice(
                0,
                datas[i].chars -
                  left_Chars -
                  lastIndexFinder(
                    datas[i].content.slice(0, datas[i].chars - left_Chars)
                  )
              ),
              chars:
                datas[i].chars -
                lastIndexFinder(
                  datas[i].content.slice(0, datas[i].chars - left_Chars)
                ) -
                left_Chars,
            },
          ]
          console.log(
            '🚀 ~ file: PageLayoutTwo.tsx ~ line 151 ~ toBeData',
            toBeData
          )
          toPassData = mainData.concat([{ values: [...toBeData] }])
          setDataContent(toPassData)
          now_data.nextIndex =
            datas[i].chars -
            left_Chars -
            lastIndexFinder(
              datas[i].content.slice(0, datas[i].chars - left_Chars)
            )
          now_data.chars =
            left_Chars -
            lastIndexFinder(
              datas[i].content.slice(0, datas[i].chars - left_Chars)
            )
          now_data.ignoreTitle = true
        }
        const nextData = [...inputData].map((section: any) => {
          return {
            ...section,
            values: section.values
              .slice(0, datas[i].chars - left_Chars)

              .concat([now_data]),
          }
        })
        dataMaker(
          DATA_LIMIT,
          nextData,
          toPassData,
          datas[i]?.chars,
          left_Chars
        )
        break
      }
      // else if(datas[i]?.imageHeight > 0 && ((datas[i]?.imageHeight/17) *113)+ count > (((DATA_LIMIT)/17) *113)){
      //     const nextData= [...inputData].map((section:any)=>{ return {...section, values:section.values.slice(i)}})
      //     dataMaker(DATA_LIMIT,nextData, toPassData, count )

      // }
      else {
        toBeData = [...toBeData, datas[i]]
        toPassData = mainData.concat([{ values: [...toBeData] }])
        setDataContent(toPassData)
      }
    }
  }

  const findLastWord = (string?: string, index?: number, limit?: number) => {
    const curString = string || 'find a word from here'
    const givenIndex = index || 9

    let spaceIndex = 0
    for (let i = 0; i < curString.length; i++) {
      if (curString.charAt(i) == ' ') {
        if (i < givenIndex) {
          spaceIndex++
        } else {
          // found what we need
          console.log('spaceIndex', spaceIndex)
        }
      }
    }
    return spaceIndex
  }

  return (
    <>
      <>
        {dataContent?.map((section: any, ind: any) => {
          return (
            <LayoutTwo
              key={ind.toString()}
              parent_ref={parent_ref}
              child_ref={child_ref}
              parent_ref_value={parentHeight}
              title={title}
              heading={ind == 0 && index == 0 ? heading : ''}
              page_dynamic={true}
            >
              {ind == 0 && mainHeading ? (
                <MainHeading value={mainHeading} />
              ) : null}
              {section.values.map((value: any) => {
                console.log('value 135', value)

                return (
                  <React.Fragment key={value.title}>
                    {!value.images && (
                      <SubData
                        key={value.title}
                        title={value.title}
                        ignoreTitle={value?.ignoreTitle}
                      >
                        {value.content}
                      </SubData>
                    )}
                    {value.images?.length ? (
                      <ImageLayout images={value.images} />
                    ) : null}
                  </React.Fragment>
                )
              })}
            </LayoutTwo>
          )
        })}
      </>
      {/* </LayoutTwo> */}

      {/* {extraPage !== 0 &&
        extraPage !== Infinity &&
        [...Array(extraPage)]?.map((item, index) => {
          if (index !== 0) {
            return (
              <LayoutTwo
                parent_ref_value={parentHeight - 170}
                page_dynamic={true}
                title={title}
                heading={heading}
                page_index={index}
                dynamic_heading={true}
              >
                <Box>{children}</Box>
              </LayoutTwo>
            )
          }
        })} */}
    </>
  )
}

export default PageLayoutTwo

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
                      height: IMAGE_HEIGHT,
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
