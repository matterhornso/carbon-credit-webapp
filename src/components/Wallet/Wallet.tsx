import React from 'react'
import { Grid, Typography, Container, Skeleton, Box } from '@mui/material'
import { Colors } from '../../theme'
import { useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import WalletTab from './WalletTab'
import TokenList from './TokenList'
import WalletCred from './WalletCred'
import WithdrawModal from '../Marketplace/WithdrawModal'

const Wallet = () => {
  const balance = useAppSelector(({ wallet }) => wallet.balance, shallowEqual)
  const balanceINR = useAppSelector(
    ({ wallet }) => wallet.balanceINR,
    shallowEqual
  )

  const balanceLoader = useAppSelector(({ wallet }) => wallet.balanceLoader)
  const renderSkeleton = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: { xs: 'start', md: 'center' },
          flexWrap: 'wrap',
        }}
      >
        <Typography sx={{ fontSize: 22, fontWeight: 400, color: '#C12902' }}>
          USD{' '}
        </Typography>
        <Skeleton
          //key={index}
          variant="text"
          height={30}
          sx={{
            background:
              'linear-gradient(90deg, #EBF0F0 -24.18%, #E5F2ED 115.93%)',
            marginBottom: 1,
            borderRadius: '6px',
            width: '70px',
            mx: 1,
            mt: 1,
            //...sx,
          }}
          animation="wave"
        />
        <Typography sx={{ fontSize: 22, fontWeight: 400, color: '#C12902' }}>
          | MATIC
        </Typography>
        <Skeleton
          //key={index}
          variant="text"
          height={30}
          sx={{
            background:
              'linear-gradient(90deg, #EBF0F0 -24.18%, #E5F2ED 115.93%)',
            marginBottom: 1,
            borderRadius: '6px',
            width: '70px',
            ml: 1,
            mr: 2,
            mt: 1,
            //...sx,
          }}
          animation="wave"
        />
      </Box>
    )
  }

  return (
    <Container maxWidth="xl" disableGutters>
      <Typography
        sx={{
          fontSize: 28,
          fontWeight: 400,
          color: Colors.tertiary,
          my: 2,
        }}
      >
        Wallet
      </Typography>
      <Grid
        container
        xs={12}
        md={12}
        lg={12}
        xl={12}
        justifyContent={'space-between'}
        alignItems={'stretch'}
        display="flex"
        flexDirection={'row'}
        spacing={3}
      >
        <Grid item xs={12} md={12} lg={8} xl={8}>
          <Grid container>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              xl={12}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                borderRadius: '8px',
                py: 3,
                boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.12)',
              }}
            >
              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                  mt: 1,
                  ml: 4,
                }}
              >
                Wallet Balance
              </Typography>
              {balanceLoader ? (
                renderSkeleton()
              ) : (
                <Typography
                  sx={{
                    fontSize: 22,
                    fontWeight: 400,
                    color: '#C12902',
                    mt: 1,
                    ml: 2,
                    mr: 1,
                    display: 'flex',
                  }}
                >
                  {`USD ${balanceINR}` +
                    ' | ' +
                    `MATIC ${Math.round(Number(balance) * 1000) / 1000}`}
                </Typography>
              )}
            </Grid>
            <TokenList />
            <Grid item xs={12} md={12} lg={12} xl={12} mt={2}>
              <WalletCred />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={12} lg={4} xl={4}>
          <WalletTab />
        </Grid>
      </Grid>
      <WithdrawModal fromWalletPage />
    </Container>
  )
}

export default Wallet
