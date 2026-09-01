import { Grid, Skeleton } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { verifierCalls } from '../../api/verifierCalls.api'
import { ROLES } from '../../config/constants.config'
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll'
import { Colors } from '../../theme'
import { capitaliseFirstLetter } from '../../utils/commonFunctions'
import { getLocalItem } from '../../utils/Storage'
import './Projects.css'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { useLocation } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import { buyerCalls } from '../../api/buyerCalls.api'
// import { getTokensBalance } from '../../utils/tokenRetire.utils'
import { registryCalls } from '../../api/registry.api'
import { useTokenRetire } from '../../hooks/useTokenRetire'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import {
  setCachedAdminStats,
  setCachedIssuerStats,
} from '../../redux/Slices/cachingSlice'
import { shallowEqual } from 'react-redux'

import { Images } from '../../theme/Images'
import { ProjectDraftCalls } from '../../api/projectDraftCalls.api'
import { handleApiError } from '../../utils/errorHandler'

const ProjectsStats = () => {
  const dispatch = useAppDispatch()

  let the_slider: any

  const settings = {
    // className: 'slider variable-width',
    className: '',
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    variableWidth: true,
    initialSlide: 0,
    adaptiveHeight: true,
    pauseOnHover: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow iconClassName="fa fa-chevron-left" />,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  }

  const scrollRef = useHorizontalScroll()
  const location = useLocation()
  const role = getLocalItem('userDetails')?.type
  const { getTokensBalance } = useTokenRetire()

  // const accountAddress = useAppSelector(({ wallet }) => wallet.accountAddress)
  const accountAddress = getLocalItem('userDetails2')?.eth_active_pub_key
  const verifierStatsReload = useAppSelector(
    ({ verifier }) => verifier.verifierStatsReload
  )
  const cachedIssuerStats = useAppSelector(
    ({ caching }) => caching.cachedIssuerStats,
    shallowEqual
  )
  const cachedAdminStats = useAppSelector(
    ({ caching }) => caching.cachedAdminStats,
    shallowEqual
  )
  const { type: userType, email, user_id } = getLocalItem('userDetails')
  const [stats, setStats] = useState<any[] | null>(null)
  //Raw data from api
  const [rawStatsData, setRawStatsData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    verifierStatsReload && getStats()
  }, [verifierStatsReload, accountAddress])

  useEffect(() => {
    if (rawStatsData && Object.keys(rawStatsData).length) {
      structureDataForStats()
    }
  }, [rawStatsData])

  useEffect(() => {
    if (
      role === ROLES.ISSUER &&
      (!cachedIssuerStats || !cachedIssuerStats?.length)
    ) {
      setRawStatsData(cachedIssuerStats)
    }
  }, [cachedIssuerStats])

  useEffect(() => {
    if (
      role === ROLES.ADMIN &&
      (!cachedAdminStats || !cachedAdminStats?.length)
    ) {
      setRawStatsData(cachedAdminStats)
    }
  }, [cachedAdminStats])

  console.log(
    'location.pathname === pathNames.TOKENS_RETIREMENT',
    location.pathname === pathNames.TOKENS_RETIREMENT
  )
  console.log('accountAddress', accountAddress)

  const getStats = async () => {
    try {
      if (!cachedIssuerStats || cachedIssuerStats?.length) {
        setLoading(true)
      }
      let res
      if (userType === ROLES.VERIFIER) {
        res = await verifierCalls.getVerifierProjectDashboardStats(user_id)
        if (res?.success) {
          // setRawStatsData(res)
          dispatch(setCachedIssuerStats(res))
          setLoading(false)
        }
      } else if (userType === ROLES.REGISTRY) {
        // get registry stats code
        res = await registryCalls.getRegistryDashboardStats(user_id)
        if (res?.success) {
          // setRawStatsData(res)
          dispatch(setCachedIssuerStats(res))
          setLoading(false)
        }
      } else if (userType === ROLES.BUYER) {
        if (location.pathname === pathNames.DASHBOARD) {
          res = await buyerCalls.getBuyerStats()
          if (res?.success) {
            const obj = {
              data: {
                carbon_credits_bought: res?.data.totalPurchase,
                carbon_credits_sold: res?.data.total_sale,
                carbon_credits_retired: res?.data.totalRetire,
              },
            }
            setRawStatsData(obj)
            setLoading(false)
          }
        }
      } else if (userType === ROLES.ISSUER) {
        if (location.pathname === pathNames.DASHBOARD) {
          const res = await ProjectDraftCalls.getStats()
          if (res?.success) {
            dispatch(setCachedIssuerStats(res))
            // setRawStatsData(res)
            setLoading(false)
          }
        }
      } else if (userType === ROLES.ADMIN) {
        if (location.pathname === pathNames.DASHBOARD) {
          const res = await ProjectDraftCalls.getStats()
          if (res?.success) {
            dispatch(setCachedAdminStats(res))
            setLoading(false)
          }
        }
      }
      //using this for token and contract stats
      else if (location.pathname === pathNames.TOKEN_CONTRACT) {
        res = await dataCollectionCalls.getStats()
        if (res?.success) {
          const obj = {
            data: {
              report_count: res?.data.report_count,
              total_VCOT_Quantity: res?.data?.total_Quantity,
              total_VCOT_Quantity_For_Sale: res?.data.total_Quantity_For_Sale,
              total_VCOT_Quantity_On_Sale: res?.data.total_Quantity_On_Sale,
              total_VCOT_Quantity_Sold: res?.data.total_Quantity_Sold,
            },
          }
          // setRawStatsData(obj)
          dispatch(setCachedIssuerStats(obj))
          setLoading(false)
        }
      } else if (location.pathname === pathNames.TOKENS_RETIREMENT) {
        if (!accountAddress) {
          return
        }
        getStatsForTokenRetirement()
      }
      // else {
      // res = await dataCollectionCalls.getIssuerProjectDashboardStats(email)
      // if (res?.success) {
      //   dispatch(setCachedIssuerStats(res))
      //   // setRawStatsData(res)
      //   setLoading(false)
      // }
      // }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const structureDataForStats = () => {
    //Making dynamic stats objects from rawStatsDataponse
    const keys = Object.keys(rawStatsData.data)
    const values = Object.values(rawStatsData.data)
    const statsObj = keys.map((key, index) => {
      return {
        title: capitaliseFirstLetter(key.replaceAll('_', ' ')),
        value: values[index],
      }
    })
    setStats(statsObj)
  }

  const getStatsForTokenRetirement = async () => {
    // let bal
    // let data
    let apiData
    const bal = await getTokensBalance()
    try {
      const res = await buyerCalls.getStats({
        address: accountAddress,
      })
      if (res?.success) {
        apiData = res?.data
      }
    } catch (err) {
      handleApiError(err, { action: 'buyerCalls.getStats' })
    } finally {
      setLoading(false)
    }
    let burnTokenCount
    if (apiData?.burn_token_count && apiData?.burn_token_count.length) {
      burnTokenCount = apiData?.burn_token_count?.reduce(
        (prev: any, curr: any) => {
          return (prev += curr?.total)
        },
        0
      )
    }
    const data = {
      data: {
        Total_active_VCOT: bal,
        Total_retired_VCOT: burnTokenCount,
        Total_VCOT_purchased_so_far: apiData?.purchased_token_count,
        Total_footprint_offset: burnTokenCount,
      },
      success: true,
    }

    // setRawStatsData(data)
    dispatch(setCachedIssuerStats(data))
  }

  const getColoredDivColor = (index: number) => {
    // For dynamic color for colored div in stats
    const num = index % 4
    switch (num) {
      case 0:
        return Colors.lightPinkBackground
      case 1:
        return '#D6E5F3'
      case 2:
        return '#E1EEE8'
      case 3:
        return '#B9E7E0'
    }
  }
  // for showing the icons present inside the colored box.
  const ImagesArray = [Images.pen, Images.dollar, Images.search, Images.check]

  const renderSkeleton = () => {
    const temp = new Array(4).fill(1)
    return (
      <Box
        ref={scrollRef}
        sx={{
          // mt: 3,
          paddingBottom: 2,
        }}
        style={{
          marginLeft: -10,
          //  marginRight: -10
        }}
        className="stats-row"
        id="stats-row"
      >
        {temp.map((i, index) => (
          <Box key={index} className="stats-container">
            <Box className="content-container">
              <Box className="stats-title">
                <Skeleton
                  sx={{ fontSize: '1rem', bgcolor: '#CCE8E1' }}
                  variant="text"
                />
              </Box>
              <Box className="stats-value">
                <Skeleton
                  sx={{ bgcolor: '#CCE8E1' }}
                  variant="rectangular"
                  height={50}
                />
              </Box>
            </Box>
            <Box>
              <Skeleton
                sx={{ bgcolor: '#CCE8E1' }}
                variant="rectangular"
                height={70}
                width={70}
              />
            </Box>
          </Box>
        ))}
      </Box>
    )
  }

  return (
    <Grid sx={{ margin: 0 }}>
      <Grid
        container
        // direction="column"
        // xs={12}
      >
        <div style={{ width: '100%', maxWidth: 'calc(100vw - 260px)' }}>
          {loading ? (
            renderSkeleton()
          ) : (
            <Slider
              {...settings}
              className="slider"
              ref={(slider) => (the_slider = slider)}
            >
              {stats?.map((stat, index) => (
                <div key={index.toString()}>
                  <Box
                    className="stats-container"
                    style={{ height: '120px', width: '282px', marginRight: 24 }}
                  >
                    <Box className="content-container">
                      <Box className="stats-title">{stat?.title}</Box>
                      <Box className="stats-value">
                        {stat?.value
                          ? stat?.value
                          : stat?.value === 0
                          ? 0
                          : '-'}
                      </Box>
                    </Box>
                    <Box
                      className="colored-div"
                      sx={{
                        bgcolor: getColoredDivColor(index),
                        position: 'relative',
                      }}
                    >
                      <img
                        src={ImagesArray[index]}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                    </Box>
                  </Box>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </Grid>
    </Grid>

    // <Grid>
    //               <SliderTest />

    //   {loading === true ? (
    //     renderSkeleton()
    //   ) : (
    //     <>
    //       <Box
    //         ref={scrollRef}
    //         sx={{
    //           mt: 3,
    //           paddingBottom: 2,
    //         }}
    //         style={{ marginLeft: -10 }}
    //         className="stats-row"
    //         id="stats-row"
    //       >
    //         {stats &&
    //           stats.length &&
    //           stats?.map((stat, index) => (
    //             <Box key={index} className="stats-container">
    //               <Box className="content-container">
    //                 <Box className="stats-title">{stat?.title}</Box>
    //                 <Box className="stats-value">
    //                   {stat?.value ? stat?.value : stat?.value === 0 ? 0 : '-'}
    //                 </Box>
    //               </Box>
    //               <Box
    //                 className="colored-div"
    //                 sx={{ bgcolor: getColoredDivColor(index) }}
    //               ></Box>
    //             </Box>
    //           ))}
    //       </Box>
    //     </>
    //   )}
    // </Grid>
  )
}

export default ProjectsStats

const SampleNextArrow = (props: any) => {
  const {
    className,
    style,
    onClick,
    iconClassName = 'fa fa-chevron-right',
  } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        display: onClick ? 'flex' : 'none',
        right: '-5px',
        background: '#DAE5E1',
        borderRadius: '50%',
        boxShadow: '0 4px 10px 0 #eddfd5',
        height: 32,
        width: 32,
        justifyContent: 'center',
        alignItems: 'center',
        filter: 'drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.161))',
      }}
      onClick={onClick}
    >
      <PlayArrowIcon sx={{ color: '#006B5E' }} />
    </div>
  )
}
const SamplePrevArrow = (props: any) => {
  const {
    className,
    style,
    onClick,
    iconClassName = 'fa fa-chevron-left',
  } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        display: onClick ? 'flex' : 'none',
        // left: "-5px",
        background: '#DAE5E1',
        borderRadius: '50%',
        boxShadow: '0 4px 10px 0 #eddfd5',
        height: 32,
        width: 32,
        justifyContent: 'center',
        alignItems: 'center',
        filter: 'drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.161))',
      }}
      onClick={onClick}
    >
      <PlayArrowIcon sx={{ color: '#006B5E', transform: 'rotate(180deg)' }} />
    </div>
  )
}
