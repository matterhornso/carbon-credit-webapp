import React, { FC, useEffect } from 'react'
import { Box, Grid, Paper, Skeleton, Typography } from '@mui/material'
import { Colors } from '../../theme'
// import { getMarketplaceDepthData } from '../../utils/Marketplace/marketDepth.util'
import { useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { useMarketDepth } from '../../hooks/useMarketDepth'

interface MarketDepthProps {}

const MarketDepth: FC<MarketDepthProps> = (props) => {
  const marketDepthData = useAppSelector(
    ({ marketDepth }) => marketDepth.marketDepthData,
    shallowEqual
  )
  const marketDepthDataLoading = useAppSelector(
    ({ marketDepth }) => marketDepth.marketDepthDataLoading,
    shallowEqual
  )

  const {getMarketplaceDepthData} = useMarketDepth()

  useEffect(() => {
    getMarketplaceDepthData()
  }, [])

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Paper
        sx={{
          p: 2,
          width: '100%',
          borderRadius: '12px',
        }}
      >
        <Typography sx={{ fontSize: 18, color: Colors.darkPrimary1 }}>
          Market Sell Orders
        </Typography>
        <Grid
          container
          sx={{
            fontSize: 14,
            fontWeight: 500,
            bgcolor: '#CCE8E1',
            borderRadius: 2,
            px: 1,
            mt: 2,
          }}
        >
          <Grid item xs={6}>
            Price <br />
            (INR)
          </Grid>
          <Grid item xs={6}>
            Quantity <br />
            (VCOT)
          </Grid>
        </Grid>
        {marketDepthDataLoading ? (
          <Box>
            {[1, 2, 3, 4, 5].map((item: any, index: number) => (
              <Skeleton
                data-testid={'cc-table-skeleton-row'}
                key={index.toString()}
                variant="rectangular"
                height={50}
                sx={{
                  background: index % 2 == 0 ? '#fff' : '#e1eee8',
                  borderRadius: '8px',
                }}
              />
            ))}
          </Box>
        ) : marketDepthData && marketDepthData.length ? (
          <Box sx={{ maxHeight: '70vh', overflow: 'auto' }}>
            {marketDepthData?.map(
              ({ price = '', quantity = '' }, index: number) => (
                <Row
                  key={index}
                  index={index}
                  price={price}
                  quantity={quantity}
                />
              )
            )}
          </Box>
        ) : (
          <Box
            sx={{
              mt: 1,
              p: 1,
              fontSize: 14,
              background: '#e1eee8',
              borderRadius: '8px',
            }}
          >
            No Sell orders made yet
          </Box>
        )}
      </Paper>
    </Box>
  )
}

interface RowProps {
  price: string
  quantity: string
  index: number
}
const Row: FC<RowProps> = ({ price = '', quantity = '', index }) => {
  return (
    <Grid
      container
      sx={{
        background:
          index % 2 === 0
            ? Colors.white
            : 'linear-gradient(0deg, rgba(0, 107, 94, 0.05), rgba(0, 107, 94, 0.05)), #FAFDFA',
        fontSize: 14,
        fontWeight: 500,
        px: 1,
        py: 2,
        borderRadius: 2,
      }}
    >
      <Grid item xs={6}>
        {price}
      </Grid>
      <Grid item xs={6}>
        {quantity}
      </Grid>
    </Grid>
  )
}

export default MarketDepth
