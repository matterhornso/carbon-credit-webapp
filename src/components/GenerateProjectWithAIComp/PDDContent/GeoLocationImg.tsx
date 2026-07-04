import React, { useState, useEffect } from 'react'
import { geoLocationService } from '../../../api/geoLocation.api'
import { setShowLoader } from '../../../redux/Slices/generateProjectWithAISlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import gen_img from '../../../assets/Images/generate_map.png'

const GeoLocationImg = ({ dataUri, width = 300, height = 150 }: any) => {
  const imageStrBasedOnGeoLocation = useAppSelector(
    ({ GPTAssistanceConversationSlice }) =>
      GPTAssistanceConversationSlice.imageStrBasedOnGeoLocation
  )

  console.log('imageStrBasedOnGeoLocation', imageStrBasedOnGeoLocation)

  return (
    <>
      {dataUri ? (
        <img src={dataUri} alt="" width={width} height={height} />
      ) : (
        <></>
      )}
    </>
  )
}

export default GeoLocationImg
