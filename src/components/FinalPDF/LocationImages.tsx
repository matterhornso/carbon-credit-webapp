import React from 'react'
import { Box } from '@mui/material'
import GeoLocationImg from './GeoLocationImg'
import { DUMMY_LOCATION_IMAGES } from '../../config/constants.config'

const LocationImages = () => {
  return (
    <>
      {!!DUMMY_LOCATION_IMAGES?.length && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            columnGap: 1,
          }}
        >
          {DUMMY_LOCATION_IMAGES?.map((imgString: string, index: number) => (
            <Box
              key={index}
              sx={{
                flex: 1,
                minWidth: '260px',
                maxWidth: '50%',
                // add padding to the element if its's the single element in a row
                paddingRight:
                  DUMMY_LOCATION_IMAGES?.length % 2 === 1 &&
                  index === DUMMY_LOCATION_IMAGES?.length - 1
                    ? '4px'
                    : '',
              }}
            >
              <GeoLocationImg
                dataUri={imgString}
                height={'150px'}
                width={'100%'}
              />
            </Box>
          ))}
        </Box>
      )}
    </>
  )
}

export default LocationImages
