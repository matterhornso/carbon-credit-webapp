import React, { FC, useEffect, useRef, useState } from 'react'
import { Box } from '@mui/system'
import IcrLogo from '../../../assets/Images/logo/ICR_LOGO_1.svg'
import FooterImage from '../../../assets/Images/illustrations/Footer.svg'
import { Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import {
  setChildrenElement,
  setSectionA,
  setSectionB,
  setSectionC,
  setSectionD,
  setSectionE,
} from '../../../redux/Slices/pdfSlice'

interface LayoutProps {
  title?: string | number
  heading?: string
  children: any
  child_ref?: any
  parent_ref_value?: number
  parent_ref?: any
  page_dynamic?: boolean
  page_index?: number
  dynamic_heading?: boolean
}

const LayoutTwo: FC<LayoutProps> = ({
  title,
  heading,
  children,
  child_ref,
  parent_ref,
  parent_ref_value,
  page_dynamic,
  page_index,
  dynamic_heading = false,
}) => {
  const dispatch = useAppDispatch()
  const [index, setIndex] = useState<any>(0)
  const [currentPage, setCurrentPage] = useState(0)

  // const [width, setWidth] = useState<any>(0)

  const children_elements = useAppSelector(
    ({ pdfPage }) => pdfPage.childrenElement
  )

  const ref = useRef<any>(null)

  const indexes = [
    {
      name: 'Section A: Description of Project Activity',
      func: (val: number) => {
        dispatch(setSectionA(val))
      },
    },
    {
      name: 'Section B: Implementation of the project activity',
      func: (val: number) => {
        dispatch(setSectionB(val))
      },
    },
    {
      name: 'Section C: Description of Monitoring Activity',
      func: (val: number) => {
        dispatch(setSectionC(val))
      },
    },
    {
      name: 'Section D: Data and parameters',
      func: (val: number) => {
        dispatch(setSectionD(val))
      },
    },
    {
      name: 'Section E: Calculation of emission reductions or GHG removals by sinks',
      func: (val: number) => {
        dispatch(setSectionE(val))
      },
    },
  ]

  useEffect(() => {
    setIndex(Math.random)
    // handleWindowSizeChange()

    // window.addEventListener('resize', handleWindowSizeChange)
    // return () => {
    //   window.removeEventListener('resize', handleWindowSizeChange)
    // }
  }, [])

  // const handleWindowSizeChange = () => {
  //   setWidth(ref?.current?.clientWidth)
  // }

  const getPageIndex = () => {
    if (index) {
      const child: any = document.getElementById(
        `my_element${index}`
      )?.nextElementSibling
      if (child?.parentElement?.children) {
        const element_ids: any = [
          ...Array(child?.parentElement?.children?.length),
        ]?.map((item: any, index: number) => {
          return child?.parentElement?.children[index]?.id
        })

        dispatch(setChildrenElement([...element_ids]))
      }
    }
  }

  const getPageNumber = () => {
    const pages_no = children_elements?.indexOf(`my_element${index}`)

    setCurrentPage(pages_no)

    if (heading && !dynamic_heading) {
      indexes?.forEach((item) => {
        if (item?.name === heading) item?.func(pages_no - 1 || 0)
      })
    }
  }

  useEffect(() => {
    getPageNumber()
  }, [children_elements, index, children])

  useEffect(() => {
    getPageIndex()
  }, [index, children])

  return (
    <div
      ref={ref}
      style={{ width: '100%' }}
      id={`my_element${index}`}
      className="pdf-page"
    >
      <Box
        // ref={renderCount}
        sx={{
          size: 'A4',
          // width: width || '21cm',
          // height: width * 1.5 || '29.7cm',
          width: '794px',
          height: '1123px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          background: 'white',
        }}
      >
        {/* header starts */}
        <>
          <Box
            sx={{
              position: 'relative',
              pt: 2,
              pb: 1,
              px: 4,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <img src={IcrLogo} alt="icr" />
              </Box>
              <Box>
                <Typography
                  sx={{ color: '#006B5E', fontSize: 12, fontWeight: 500 }}
                >
                  {heading}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                position: 'absolute',
                height: '5px',
                width: '92%',
                right: 0,
                bottom: 0,
                background: '#BBF7ED',
                borderRadius: '40px 0px 0px 40px',
              }}
            ></Box>
          </Box>
          <Box>
            {heading && (
              <Typography
                sx={{
                  pb: 2.5,
                  fontSize: 24,
                  fontWeight: 600,
                  color: '#006B5E',
                  px: 4,
                  pt:4
                }}
              >
                {heading}
              </Typography>
            )}
          </Box>
        </>
         {/* header starts */}
        <Box sx={{ flexGrow: '1', pt: 2, }}>
          <Box
            sx={{ position: 'relative', overflow: 'hidden', height: '100%' }}
          >
            <Box
              sx={{
                // border: '1px solid green',
                height: '100%',
              }}
              ref={parent_ref}
            >
              <Box
                sx={{
                  width: '100%',
                  position: 'absolute',
                  height: '100%',
                }}
                ref={child_ref}
              >
                <Box
                  sx={{
                    px: 4,
                    height: page_dynamic
                      ? 'auto'
                      : child_ref?.current?.clientHeight,
                  }}
                >
                  {children}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Footer starts */}
        <Box sx={{ width: '100%', position: 'relative' }}>
          <img
            src={FooterImage}
            alt="footer image"
            style={{ width: '100%', position: 'relative', left: 10 }}
          />
          {currentPage && currentPage !== 1 ? (
            <Box
              sx={{
                position: 'absolute',
                bottom: 15,
                left: 0,
                right: 0,
                flexDirection: 'column',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#00201B',
                  //  transform: 'translateX(-50%)',
                  height: 24,
                  width: 24,
                  background: '#BBF7ED',
                  textAlign: 'center',
                  borderRadius: '50%',
                }}
              >
                {currentPage ? currentPage - 1 : 0}
              </Box>
            </Box>
          ) : null}
        </Box>
        {/* Footer ends */}
      </Box>
    </div>
  )
}

export default LayoutTwo
