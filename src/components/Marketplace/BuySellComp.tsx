import { Grid, Skeleton } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '../../hooks/reduxHooks'
import BuyComp from './BuyComp'
import SellComp from './SellComp'

const BuySellComp = () => {
  const tokenBalanceLoading = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.tokenBalanceLoading,
    shallowEqual
  )
  const projectsTokenLoading = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.projectsTokenLoading,
    shallowEqual
  )
  const createSellOrderLoading = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.createSellOrderLoading,
    shallowEqual
  )
  const createBuyOrderLoading = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.createBuyOrderLoading,
    shallowEqual
  )
  const withdrawLoading = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.withdrawLoading,
    shallowEqual
  )

  return (
    <Grid container xs={12} sx={{ mt: 3, pr: { xs: '', md: 5 } }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ borderRight: { sm: '', md: '1px solid #CCE8E1' } }}
      >
        {tokenBalanceLoading ||
        projectsTokenLoading ||
        createBuyOrderLoading ||
        withdrawLoading ? (
          <LoadingComp />
        ) : (
          <BuyComp />
        )}
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          justifyContent: { sm: 'flex-start', md: 'flex-end' },
        }}
      >
        {tokenBalanceLoading ||
        projectsTokenLoading ||
        createSellOrderLoading ||
        withdrawLoading ? (
          <LoadingComp />
        ) : (
          <SellComp />
        )}
      </Grid>
    </Grid>
  )
}

export default BuySellComp

const LoadingComp = () => {
  return (
    <Grid item sm={12} md={10}>
      {/* <Skeleton
        sx={{
          fontSize: '1.5rem',
          bgcolor: '#CCE8E1',
        }}
        variant="text"
      />
      <Skeleton
        sx={{
          fontSize: '1.5rem',
          bgcolor: '#CCE8E1',
        }}
        variant="text"
      /> */}
      <Skeleton
        sx={{
          fontSize: '1.5rem',
          bgcolor: '#CCE8E1',
        }}
        variant="text"
      />
      <Skeleton
        variant="rectangular"
        height={80}
        sx={{ bgcolor: '#CCE8E1', mt: 3 }}
      />
      <Skeleton
        variant="rectangular"
        height={80}
        sx={{ bgcolor: '#CCE8E1', mt: 2 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Skeleton
          variant="rectangular"
          height={40}
          width={100}
          sx={{ bgcolor: '#CCE8E1', mt: 2, borderRadius: '32px' }}
        />
      </Box>
    </Grid>
  )
}
