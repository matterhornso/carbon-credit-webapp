import { Box, Grid, Input } from '@mui/material'
import React from 'react'
import { AttachMoreProps } from './AttachMore.interface'

const AttachMore: React.FC<AttachMoreProps> = (props) => {
  const { imagedata, addMoreImageUpload } = props
  return (
    <Grid container height={'40%'}>
      {imagedata.length > 0 &&
        imagedata.map((item, index: number) => {
          console.log('item', item)
          return (
            <Box
              key={item.key}
              sx={{
                display: {
                  sm: 'flex',
                  md: 'flex',
                  xs: 'flex',
                  lg: 'flex',
                  xl: 'flex',
                },
                width: '40%',
                height: '90%',
                marginTop: '30px',
              }}
            >
              <img
                src={item.imageUrl}
                alt="bg iamges"
                style={{ height: '250px', width: '98%' }}
              />
            </Box>
          )
        })}
      <Box
        sx={{
          display: {
            sm: 'flex',
            md: 'flex',
            xs: 'flex',
            lg: 'flex',
            xl: 'flex',
          },
          height: '90%',
          width: '40%',
          marginTop: '30px',
        }}
      >
        <Input
          type="file"
          // name="myImage"
          sx={{
            height: '250px',
            width: '98%',
            border: '2px dashed #667080',
            backgroundColor: 'white',
          }}
          onChange={(event: any) => {
            addMoreImageUpload(event)
          }}
        />
      </Box>
      {/* <Box
          sx={{
            display: {
              sm: 'flex',
              md: 'flex',
              xs: 'flex',
              lg: 'flex',
              xl: 'flex',
            },
            height: '90%',
            width: '40%',
            marginTop: '30px',
          }}
        >
          <Button
            onClick={() => addMoreImageUpload()}
            style={{
              height: '250px',
              width: '98%',
              border: '2px dashed #667080',
              backgroundColor: 'white',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AddIcon
              style={{
                width: '100px',
                height: '110px',
              }}
            />
            <Typography sx={{ fontSize: '14px', color: '#667080' }}>
              Attach More
            </Typography>
          </Button>
        </Box> */}
    </Grid>
  )
}

export default AttachMore
