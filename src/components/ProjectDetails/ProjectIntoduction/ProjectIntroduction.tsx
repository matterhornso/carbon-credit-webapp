import { Grid, Typography, Box, Paper } from '@mui/material'

import React, { useEffect, useRef, useState } from 'react'

import { Images } from '../../../theme'

import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import BuyToken from './BuyToken'
import { fileUploadCalls } from '../../../api/fileUpload.api'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import { handleApiError } from '../../../utils/errorHandler'
interface ProjectIntroductionProps {
  projectDetailsData?: any
  projectData?: any
  showBuyToken?: boolean
  projectImg?: any
}
const ProjectIntroduction = (props: ProjectIntroductionProps) => {
  const navigate = useNavigate()
  const onWebApp = useAppSelector(({ app }) => !app.throughIFrame, shallowEqual)
  //  const onWebApp = 1

  const { projectDetailsData, showBuyToken, projectData, projectImg } = props
  const prevScrollY = useRef(0)

  const [goingUp, setGoingUp] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY < 550) {
        setGoingUp(false)
      }
      if (currentScrollY > 600) {
        setGoingUp(true)
      }

      prevScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [goingUp])

  const [bannerImage, setBannerImage] = useState<any>(false)
  // console.log("🚀 ~ file: ProjectIntroduction.tsx ~ line 93 ~ ProjectIntroduction ~ bannerImage", bannerImage)

  // useEffect(() => {
  //   return
  //   const data = projectData ? projectData : projectDetailsData
  //   fileUploadCalls
  //     .getFile(data?.banner_image[0])
  //     .then((res) => setBannerImage(URL.createObjectURL(res)))
  // }, [projectData, projectDetailsData])

  const getFile = async () => {
    if (!projectDetailsData?.projectImg) {
      return
    }
    try {
      const res = await fileUploadCalls.getFile(projectDetailsData?.projectImg)
      setBannerImage(URL.createObjectURL(res))
    } catch (e) {
      handleApiError(e, { action: 'ProjectIntroduction.getFile' })
    }
  }

  useEffect(() => {
    if (projectDetailsData?.projectImg) {
      getFile()
    }
  }, [projectDetailsData])

  return (
    <Grid
      container
      sx={{
        backgroundImage: `url(${
          !bannerImage ? Images.ProjectDetails : bannerImage
        })`,
        // pb: 8,
        width: '100%',
        height: 'fit-content',
        borderRadius: '16px',
        minHeight: '372px',
        position: 'relative',
        justifyContent: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      xs={12}
    >
      <Grid
        xs={12}
        container
        justifyContent={'space-between'}
        alignItems={'flex-start'}
        flexDirection="row"
        sx={{
          backgroundColor: 'rgba(0, 107, 94, 0.72)',
          borderRadius: '16px',
          // m: 10,
          p: 3,
          pb: 2,
        }}
      >
        <Grid
          item
          justifyContent={'space-between'}
          alignItems={'flex-start'}
          flexDirection="column"
          display={'flex'}
          flex={1}
          // width={'50%'}

          sx={{
            maxWidth: '80%',
            minWidth: '80%',
            minHeight: '330px',
          }}
        >
          <Typography
            sx={{
              color: 'white',
              fontSize: 12,
              fontWeight: 500,
              flex: 1,
              lineHeight: '16px',
              letterSpacing: '0.5px',
              fontStyle: 'normal',
            }}
          >
            {'Project ID:' + projectDetailsData?.uuid}
            {/* Project ID: 5435678 */}
          </Typography>
          <Typography
            sx={{
              color: 'white',
              fontSize: 57,
              fontWeight: 500,
              whiteSpace: 'nowrap',
              // wordWrap: 'break-word',
              flex: 6,
              textAlign: 'start',
              width: '90%',
              lineHeight: '80px',
              letterSpacing: '-0.25px',
              fontStyle: 'normal',
            }}
          >
            {projectDetailsData?.company_name || projectData?.name}
            {/* Panama Reforestation Services ARR */}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'end',
              alignItems: 'center',
              mt: 1,
              flex: 1,
            }}
          >
            <LocationOnOutlinedIcon style={{ color: '#FFFFFF' }} />
            <Typography
              sx={{
                color: 'white',
                fontSize: 11,
                fontWeight: 500,
                lineHeight: '16px',
                letterSpacing: '0.5px',
                fontStyle: 'normal',
              }}
            >
              {projectDetailsData?.location
                ? projectDetailsData?.location
                : '-'}
              {' | '}
              {projectDetailsData?.area
                ? projectDetailsData?.area + ' Sq.Km.'
                : '-'}
              {/* Beijing, China | 53.4 hectares */}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      {showBuyToken && projectDetailsData?.token_detail?.balance ? (
        <BuyToken
          goingUp={goingUp}
          projectData={projectData}
          projectDetailsData={projectDetailsData}
        />
      ) : null}
    </Grid>
  )
}
export default ProjectIntroduction
