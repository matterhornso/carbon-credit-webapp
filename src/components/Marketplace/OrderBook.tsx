import { Box, Grid, Skeleton, Typography } from '@mui/material'
import React, { FC } from 'react'
import { shallowEqual } from 'react-redux'
import CCPaper from '../../atoms/CCPaper'
import { useAppSelector } from '../../hooks/reduxHooks'
import { Colors, Images } from '../../theme'

const headings = ['Unit Price', 'Quantity', 'Total']

const OrderBook = () => {
  const sellOrdersList = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.sellOrdersList,
    shallowEqual
  )
  const sellOrdersLoading = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.sellOrdersLoading,
    shallowEqual
  )

  return (
    <CCPaper
      customSX={{
        height: '100%',
      }}
    >
      {sellOrdersList && sellOrdersList.length > 0 && (
        <Typography sx={{ fontSize: 18, color: Colors.darkPrimary1 }}>
          Order Book
        </Typography>
      )}
      {sellOrdersLoading ? (
        <Box>
          {[1, 2, 3, 4, 5].map((item: any, index: number) => (
            <Skeleton
              data-testid={'cc-table-skeleton-row'}
              key={index.toString()}
              variant="rectangular"
              height={40}
              sx={{
                background: index % 2 == 0 ? '#fff' : '#e1eee8',
                borderRadius: '8px',
              }}
            />
          ))}
        </Box>
      ) : sellOrdersList && sellOrdersList.length ? (
        <Box>
          <Row isHeading rows={headings} />
          <Box
            sx={{ overflowY: 'scroll', overflowX: 'hidden', maxHeight: 250 }}
          >
            {sellOrdersList.map((sellOrder: any, index: number) => (
              <Row key={index} rows={sellOrder} />
            ))}
          </Box>
        </Box>
      ) : (
        // <Typography sx={{ color: Colors.darkPrimary1, fontSize: 14 }}>
        //   No Orders yet
        // </Typography>
        <Box sx={{ background: Colors.lightGreenBackground, height: '100%' }}>
          <Box
            sx={{
              height: '20%',
              display: 'flex',
              alignItems: 'end',
              justifyContent: 'center',
            }}
          >
            <Box sx={{ mb: 1, textAlign: 'center' }}>
              Order book will show here
            </Box>
          </Box>
          <Box
            sx={{
              textAlign: 'center',
            }}
          >
            <img src={Images.Orders} alt="" />
          </Box>
        </Box>
      )}
    </CCPaper>
  )
}

export default OrderBook

interface RowProps {
  isHeading?: boolean
  rows: any
}
const Row: FC<RowProps> = ({ isHeading, rows }) => {
  return (
    <Grid
      container
      sx={{
        py: 1,
        px: 2,
        background: isHeading ? '#CCE8E1' : '',
        borderRadius: '8px',
      }}
    >
      {rows.length > 0 &&
        rows.map((row: string, index: number) => (
          <Grid
            item
            xs={4}
            key={index}
            sx={{
              color: '141D1B',
              fontSize: isHeading ? 12 : 14,
              fontWeight: 500,
            }}
          >
            {row}
          </Grid>
        ))}
    </Grid>
  )
}
