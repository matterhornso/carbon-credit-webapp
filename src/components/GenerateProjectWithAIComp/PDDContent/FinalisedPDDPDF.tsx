import { Box, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import expand_pdf_icon from '../../../assets/Images/Icons/expand_pdf_icon.svg'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import Empty_finalised_output_illustration from '../../../assets/Images/illustrations/Empty_finalised_output_illustration.svg'
import OnBoardingIllustration from '../../../assets/Images/illustrations/OnBoardingIllustration.svg'
import {
  setExpandFinalisedPDD,
  setLoaderForStoringAsstIds,
  setShowLoader,
} from '../../../redux/Slices/generateProjectWithAISlice'
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess'
import GeoLocationImg from './GeoLocationImg'
import { geoLocationService } from '../../../api/geoLocation.api'
import { setImageStrBasedOnGeoLocation } from '../../../redux/Slices/GPTAssistanceConversationSlice'
import gen_img from '../../../assets/Images/generate_map.png'
import ChatLoader from '../../../atoms/ChatLoader/ChatLoader'
import { DUMMY_LOCATION_IMAGES } from '../../../config/constants.config'

const FinalisedPDDPDF = () => {
  const dispatch = useAppDispatch()

  const targetRef = useRef()

  const expandFinalisedPDD = useAppSelector(
    ({ generateProjectWithAISlice }) =>
      generateProjectWithAISlice.expandFinalisedPDD
  )
  const selectedSectionForGenerateProjectWithAI = useAppSelector(
    ({ generateProjectWithAISlice }) =>
      generateProjectWithAISlice.selectedSectionForGenerateProjectWithAI
  )
  const imageStrBasedOnGeoLocation = useAppSelector(
    ({ GPTAssistanceConversationSlice }) =>
      GPTAssistanceConversationSlice.imageStrBasedOnGeoLocation
  )
  const finalPDDContenLoader = useAppSelector(
    ({ generateProjectWithAISlice }) =>
      generateProjectWithAISlice.finalPDDContenLoader
  )
  const updatedCompiledDataByUser = useAppSelector(
    ({ generateProjectWithAISlice }) =>
      generateProjectWithAISlice.updatedCompiledDataByUser
  )

  // const [showGeoLocationSkeleton, setShowGeoLocationSkeleton] =
  //   useState<boolean>(false)

  // useEffect(() => {
  //   return
  //   selectedSectionForGenerateProjectWithAI?.label === '1.13' &&
  //     updatedCompiledDataByUser?.length &&
  //     fetchGeoLocationImage()
  // }, [selectedSectionForGenerateProjectWithAI, updatedCompiledDataByUser])

  // const fetchGeoLocationImage = async () => {
  //   try {
  //     setShowGeoLocationSkeleton(true)
  //     const payload = { tile_type: 'False', zoom: 13 }
  //     const res = await geoLocationService.getMultipleGeoLocationImgs(payload)
  //     if (res?.data) {
  //       dispatch(setImageStrBasedOnGeoLocation(res?.data))
  //     }
  //   } catch (error) {
  //     console.error('Error fetching image:', error)
  //     dispatch(setImageStrBasedOnGeoLocation([gen_img]))
  //   } finally {
  //     setShowGeoLocationSkeleton(false)
  //   }
  // }

  return (
    <Box sx={{ height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          columnGap: 2,
        }}
      >
        <Typography
          sx={{ fontSize: 16, fontWeight: 500, color: '#000000', flexGrow: 1 }}
        >
          Final PDD Output
        </Typography>

        {expandFinalisedPDD ? (
          <UnfoldLessIcon
            onClick={() => dispatch(setExpandFinalisedPDD(false))}
            sx={{ color: '#029FB3', transform: 'rotate(40deg)', mb: 2 }}
          />
        ) : (
          <Box
            component={'img'}
            src={expand_pdf_icon}
            onClick={() => dispatch(setExpandFinalisedPDD(true))}
            sx={{ cursor: 'pointer' }}
          />
        )}
      </Box>
      <Box
        sx={{
          overflowY: 'auto',
          height: { sm: '90vh', md: '75vh' },
          pt: 3,
          pb: 6,
        }}
      >
        <>
          {!updatedCompiledDataByUser?.length ? (
            <EmptyFinalisedPDDPDF />
          ) : (
            <>
              <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
                {selectedSectionForGenerateProjectWithAI?.value}
              </Typography>
              <Box ref={targetRef} sx={{ p: 2, pb: 5 }}>
                {/* {showGeoLocationSkeleton && <> <ChatLoader rowCount={6} /></>} */}
                {updatedCompiledDataByUser?.map((i: any, idx: number) => (
                  <div
                    key={idx}
                    dangerouslySetInnerHTML={{ __html: i }}
                    style={{ outline: 'none', fontWeight: 500, fontSize: 14 }}
                  />
                ))}
                {selectedSectionForGenerateProjectWithAI?.label === '1.13' &&
                  DUMMY_LOCATION_IMAGES?.length !== 0 &&
                  updatedCompiledDataByUser?.length !== 0 && (
                    <Grid container sx={{}}>
                      {DUMMY_LOCATION_IMAGES?.map(
                        (imgString: string, index: number) => (
                          <Grid item key={index} xs={12} md={6}>
                            <GeoLocationImg dataUri={imgString} />
                          </Grid>
                        )
                      )}
                    </Grid>
                  )}
              </Box>
            </>
          )}
        </>
      </Box>
    </Box>
  )
}

export default FinalisedPDDPDF

const EmptyFinalisedPDDPDF = () => {
  return (
    <Stack
      alignItems={'center'}
      justifyContent={'center'}
      sx={{ height: '100%' }}
    >
      <Box component={'img'} src={Empty_finalised_output_illustration} />
      <Typography
        sx={{
          color: '#6E7976',
          fontSize: 18,
          fontWeight: 400,
          textAlign: 'center',
          pt: 2,
        }}
      >
        Finalised PDD content will appear here.
      </Typography>
    </Stack>
  )
}

const locationLoader = () => {
  return
}
