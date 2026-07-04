import { Button, Grid, Menu, Typography } from '@mui/material'
import { Box } from '@mui/system'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import React, { useState } from 'react'
import { shallowEqual } from 'react-redux'
import { marketplaceCalls } from '../../../api/marketplaceCalls.api'
import BalanceCheckModal from '../../../atoms/BalanceCheckModal/BalanceCheckModal'
import CCButton from '../../../atoms/CCButton'
import LabelInput from '../../../atoms/LabelInput/LabelInput'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { Colors } from '../../../theme'
import CardRow from '../../../atoms/CardRow/CardRow'
import {
  setBuyOrderPayloadAmountsToTake,
  setBuyOrderPayloadOfferHashes,
  setBuyOrderPayloadUUID,
  setBuyQuantityForBuyOrder,
  setBuyUnitPrice,
  setTotalAmountForBuying,
} from '../../../redux/Slices/Marketplace/marketplaceBuyFlowSlice'
// import { createBuyOrder } from '../../../utils/Marketplace/marketplaceBuyFlow.util'
import { useMarketplaceBuy } from '../../../hooks/useMarketPlaceBuy'

const TabBuyCreateBuyOrder = () => {
  const dispatch = useAppDispatch()
  const { createBuyOrder } = useMarketplaceBuy()
  const [showSecondModal, setShowSecondModal] = useState(false)
  const buyQuantityForBuyOrder = useAppSelector(
    ({ marketplaceBuyFlow }) => marketplaceBuyFlow.buyQuantityForBuyOrder,
    shallowEqual
  )
  const buyUnitPrice = useAppSelector(
    ({ marketplaceBuyFlow }) => marketplaceBuyFlow.buyUnitPrice,
    shallowEqual
  )
  const totalAmountForBuying = useAppSelector(
    ({ marketplaceBuyFlow }) => marketplaceBuyFlow.totalAmountForBuying,
    shallowEqual
  )
  const onGoingApproveReduxBuyFlow = useAppSelector(
    ({ marketplaceBuyFlow }) => marketplaceBuyFlow.onGoingApproveReduxBuyFlow,
    shallowEqual
  )
  const exchangeBalBuyFlow = useAppSelector(
    ({ marketplaceBuyFlow }) => marketplaceBuyFlow.exchangeBalBuyFlow,
    shallowEqual
  )

  const [tokenAndUnitPriceList, setTokenAndUnitPriceList] = useState<any>(null)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const checkForFullFillOrder = async () => {
    try {
      const res = await marketplaceCalls.checkForFullFillOrder(
        buyQuantityForBuyOrder
      )
      console.log('res', res)
      if (res?.success && res?.data && res?.data?.length) {
        const offerHashes: any = []
        const amountsToTake: any = []
        const uuid: any = []
        const tokenAndUnitPrice: any[] = []

        const total = res?.data.reduce((prev: any, curr: any) => {
          offerHashes.push(curr.hash)
          amountsToTake.push(curr.cab)
          uuid.push(curr.uuid)
          tokenAndUnitPrice.push({ tokenQuantity: curr?.cab, rate: curr?.rate })
          return (prev += curr.cab * curr.rate)
        }, 0)
        const unitPriceLocal =
          Math.round((total / Number(buyQuantityForBuyOrder)) * 1000) / 1000
        dispatch(setTotalAmountForBuying(total))
        dispatch(setBuyUnitPrice(unitPriceLocal))
        dispatch(setBuyOrderPayloadOfferHashes(offerHashes))
        dispatch(setBuyOrderPayloadAmountsToTake(amountsToTake))
        dispatch(setBuyOrderPayloadUUID(uuid))

        setTokenAndUnitPriceList(tokenAndUnitPrice)
      }
    } catch (err) {
      console.log('Error in marketplaceCalls.checkForFullFillOrder api :', err)
    }
  }

  const isDisabled = () => {
    console.log({
      onGoingApproveReduxBuyFlow,
      buyQuantityForBuyOrder,
      buyUnitPrice,
      totalAmountForBuying,
      exchangeBalBuyFlow,
    })
    if (
      onGoingApproveReduxBuyFlow ||
      !buyQuantityForBuyOrder ||
      !buyUnitPrice ||
      !totalAmountForBuying ||
      totalAmountForBuying > exchangeBalBuyFlow
    ) {
      return true
    }
    return false
  }

  const onCreateBuyOrder = () => {
    if (Number(buyQuantityForBuyOrder) >= Number(exchangeBalBuyFlow)) {
      setShowSecondModal(true)
      return
    }
    createBuyOrder()
  }

  return (
    <Grid container xs={12} justifyContent="center">
      <Grid item xs={12}>
        <Box sx={{ position: 'relative', pt: 1 }}>
          <Box>
            <LabelInput
              label="Quantity"
              value={buyQuantityForBuyOrder}
              setValue={(e: any) => {
                //Allow only no.s upto 3 decimal places
                const regexp = /^\d+(\.\d{0,3})?$/
                if (regexp.test(e?.target?.value) || e?.target?.value === '') {
                  dispatch(setBuyQuantityForBuyOrder(e?.target?.value))

                  //reseting fulfil values
                  dispatch(setTotalAmountForBuying(0))
                  dispatch(setBuyUnitPrice(0))
                  dispatch(setBuyOrderPayloadOfferHashes(null))
                  dispatch(setBuyOrderPayloadAmountsToTake(null))
                  dispatch(setBuyOrderPayloadUUID(null))
                }
              }}
            />
          </Box>
          <Box
            sx={{
              color: '#3F4946',
              position: 'absolute',
              top: '50%',
              right: 10,
            }}
          >
            VCOT
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            sx={{
              mt: 1,
              fontSize: 14,
              fontWeight: 500,
              color: buyQuantityForBuyOrder
                ? Colors.textColorLightGreen
                : Colors.lightGray,
              cursor: buyQuantityForBuyOrder ? 'pointer' : 'not-allowed',
              textDecoration: 'underline',
              width: 'fit-content',
            }}
            onClick={() => {
              if (buyQuantityForBuyOrder) {
                checkForFullFillOrder()
              }
            }}
          >
            Click to check for Token and Unit Price
          </Typography>
          <Button
            sx={{ mt: 1, p: 0, ml: 1, minWidth: 0 }}
            onClick={handleClick}
          >
            <InfoOutlinedIcon sx={{ fontSize: 20 }} />
          </Button>
        </Box>
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
            {tokenAndUnitPriceList &&
              tokenAndUnitPriceList.length > 0 &&
              tokenAndUnitPriceList.map((item: any, index: number) => (
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
        <CardRow title="Unit Price :" value={`${buyUnitPrice || 0} INR`} />
        <CardRow
          title="Total amount to be paid :"
          value={`${totalAmountForBuying.toFixed(3) || 0} INR`}
        />
        {totalAmountForBuying > exchangeBalBuyFlow && (
          <Typography sx={{ mt: 1, fontSize: 14, color: Colors.tertiary }}>
            You have less INR balance for buying {buyQuantityForBuyOrder} tokens
          </Typography>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <CCButton
            sx={{
              mt: 3,
              alignSelf: 'center',
              bgcolor: Colors.darkPrimary1,
              color: Colors.white,
              padding: '8px 24px',
              borderRadius: '30px',
              fontSize: 14,
              minWidth: '120px',
            }}
            variant="contained"
            onClick={createBuyOrder}
            disabled={isDisabled()}
          >
            Buy
          </CCButton>
        </Box>
      </Grid>
      <BalanceCheckModal
        msg1="Requesting buy token  for more tokens than you actually have"
        msg2="Balance on Exchange"
        tokenBal={exchangeBalBuyFlow}
        btn1OnClick={() => {
          setShowSecondModal(false)
        }}
        showModal={showSecondModal}
        setShowModal={setShowSecondModal}
      />
    </Grid>
  )
}

export default TabBuyCreateBuyOrder
