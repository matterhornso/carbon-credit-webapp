import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import CCPaper from '../../atoms/CCPaper'
import { Colors } from '../../theme'
import BuySellComp from './BuySellComp'
import OrderBook from './OrderBook'
import Orders from './Orders'

const Trading = (props: any) => {
  return (
    <>
      <Box sx={{ mt: 3 }}>
        {/* <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={1}
      >
        <Grid item xs={6} sx={{ background: '#1D4B44' }}>
          <Box>Box1</Box>
          <Box>Box1</Box>
          <Box>Box1</Box>
          <Box>Box1</Box>
          <Box>Box1</Box>
          <Box>Box1</Box>
          <Box>Box1</Box>
          <Box>Box1</Box>
          <Box>Box1</Box>
          <Box>Box1</Box>
          <Box>Box1</Box>
          <Box>Box1</Box>
          <Box>Box1</Box>
        </Grid>
        <Grid item xs={6} sx={{ background: '#1d4B44' }}>
          Box2
        </Grid>
      </Grid> */}
        <Grid
          container
          spacing={{ md: 2 }}
          // alignItems="stretch"
          // sx={{ height: 'auto' }}
          sx={{ flexGrow: 1 }}
          direction="row"
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid
            item
            xs={12}
            md={9}
            // sx={{ flex: 1, height: '100%', display: 'flex' }}
          >
            <Box>
              <CCPaper>
                <Typography
                  sx={{
                    color: Colors.textColorLightGreen,
                    fontSize: 20,
                    fontWeight: 500,
                  }}
                >
                  {props?.projectName}
                </Typography>
                <BuySellComp />
              </CCPaper>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            // sx={{
            //   flex: 1,
            //   height: '100%',
            //   mt: { xs: 2, md: 0 },
            //   display: 'flex',
            // }}
          >
            {/* <Box> */}
            <OrderBook />
            {/* </Box> */}
          </Grid>
        </Grid>

        <Grid
          xs={12}
          item
          md={12}
          sx={{
            // mt: { xs: 2, md: 0 }
            mt: 2,
          }}
        >
          <Orders />
        </Grid>
      </Box>
    </>
  )
}

export default Trading
