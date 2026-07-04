import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Button, Grid, Menu, Skeleton } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { shallowEqual } from 'react-redux'
import CardRow from '../../atoms/CardRow/CardRow'
import { useAppSelector } from '../../hooks/reduxHooks'
import { Colors } from '../../theme'
import { convertToInternationalCurrencySystem } from '../../utils/commonFunctions'

const BuyTokenPriceDetails = (props: any) => {
  const buyUnitPrice = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.buyUnitPrice,
    shallowEqual
  )
  const totalAmountForBuying = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.totalAmountForBuying,
    shallowEqual
  )
  const checkFulfilLoading = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.checkFulfilLoading,
    shallowEqual
  )

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          boxShadow: 'none',
          '.MuiMenu-paper': {
            boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.12)',
            borderRadius: '16px',
            py: 1,
            px: 1,
          },
        }}
      >
        <Box
          sx={{
            borderRadius: '16px',
            fontSize: 14,
          }}
        >
          Respective Token Price(s)
          <Grid
            container
            sx={{
              mt: 1,
              p: 1,
              borderRadius: '8px',
              bgcolor: '#CCE8E1',
              fontWeight: 500,
            }}
          >
            <Grid item xs={6}>
              Quantity
            </Grid>
            <Grid item xs={6}>
              Unit Price
            </Grid>
          </Grid>
          {props?.tokenAndUnitPriceList &&
            props?.tokenAndUnitPriceList.length > 0 &&
            props?.tokenAndUnitPriceList.map((item: any, index: number) => (
              <Grid
                container
                key={index}
                sx={{
                  p: 1,
                  borderRadius: '8px',
                  background: index % 2 == 0 ? '#fff' : '#e1eee8',
                  fontWeight: 500,
                }}
              >
                <Grid item xs={6}>
                  {item?.tokenQuantity}
                </Grid>
                <Grid item xs={6}>
                  {item?.rate}
                </Grid>
              </Grid>
            ))}
        </Box>
      </Menu>
      {checkFulfilLoading ? (
        <Box sx={{ mt: 1 }}>
          <Skeleton
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
          />
        </Box>
      ) : (
        <Box sx={{ mt: 2 }}>
          <CardRow
            title="Unit Price :"
            value={`${
              convertToInternationalCurrencySystem(buyUnitPrice) || 0
            } USD`}
          />
          <Grid container justifyContent={'space-between'} mt={1}>
            <Grid item xs={9}>
              <Box
                sx={{
                  color: Colors.darkPrimary1,
                  fontWeight: 500,
                  fontSize: 16,
                  display: 'flex',
                  alignItems: 'end',
                }}
              >
                <Box>Total amount to be paid</Box>
                <Button
                  sx={{
                    p: 0,
                    minWidth: 0,
                    margin: '0 4px 2px',
                  }}
                  onClick={handleClick}
                >
                  <InfoOutlinedIcon sx={{ fontSize: 20 }} />
                </Button>
                <Box sx={{}}>:</Box>
                {/* <Box
                  sx={
                    {
                      // display: 'flex',
                      // alignItems: 'center',
                      // justifyContent: 'flex-start',
                    }
                  }
                >
                  Total amount to be paid{' '}
                  <InfoOutlinedIcon sx={{ fontSize: 20 }} /> :
                </Box> */}
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  textAlign: 'right',
                }}
              >
                {/* {`${Math.round(totalAmountForBuying * 100) / 100 || 0} USD`} */}
                {`${convertToInternationalCurrencySystem(
                  totalAmountForBuying
                )} USD`}
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  )
}

export default BuyTokenPriceDetails
