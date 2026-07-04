import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import Layout from '../Layout'

const PdfV2GridLayout = ({ gridData, headingWidth = 4 }: any) => {
  console.log()
  return (
    //<Layout>
    <Box sx={{ mt: 3 }}>
      <Grid container>
        {gridData?.flat().map((i: any, index: number) => (
          <Grid
            item
            key={index}
            xs={index % 2 === 0 ? headingWidth : 12 - headingWidth}
            sx={{
              border: '1px solid #fff',
              px: 2,
              py: '16px',
              background: index % 2 === 0 ? '#8BD3DC' : '#E6F5F7',
              borderTopLeftRadius: index === 0 ? '10px' : 'none',
              borderTopRightRadius: index === 1 ? '10px' : 'none',
              borderBottomRightRadius:
                index + 1 === gridData.flat().length ? '10px' : 'none',
              borderBottomLeftRadius:
                index + 2 === gridData.flat().length ? '10px' : 'none',
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: index % 2 === 0 ? 700 : 500,
              }}
            >
              {i}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
    //</Layout>
  )
}

export default PdfV2GridLayout
