import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { shallowEqual } from 'react-redux'
import { marketplaceCalls } from '../../api/marketplaceCalls.api'
import CardRow from '../../atoms/CardRow/CardRow'
import CCButton from '../../atoms/CCButton'
import LabelInput from '../../atoms/LabelInput/LabelInput'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setBuyQuantity,
  setCheckFulfilLoading,
  setBuyUnitPrice,
  setTotalAmountForBuying,
  setBuyOrderPayloadOfferHashes,
  setBuyOrderPayloadAmountsToTake,
  setBuyOrderPayloadUUID,
  setOpenSnackbar,
  setSnackbarErrorMsg,
} from '../../redux/Slices/newMarketplaceSlice'
import { useMarket } from '../../hooks/useMarket'
import { Colors } from '../../theme'
// import { createBuyOrder } from '../../utils/newMarketplace.utils'
import BuyTokenPriceDetails from './BuyTokenPriceDetails'
import { convertToInternationalCurrencySystem } from '../../utils/commonFunctions'
import { setRetryFunction } from '../../redux/Slices/blockchainStatusModalSlice'

const BuyComp = () => {
  const dispatch = useAppDispatch()

  const { createBuyOrder } = useMarket()

  const carbonTokenAddress = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.carbonTokenAddress,
    shallowEqual
  )
  const inrTokenBalances = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.inrTokenBalances,
    shallowEqual
  )
  const carbonTokenSymbol = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.carbonTokenSymbol,
    shallowEqual
  )
  const buyQuantity = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.buyQuantity,
    shallowEqual
  )
  const buyUnitPrice = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.buyUnitPrice,
    shallowEqual
  )
  const totalAmountForBuying = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.totalAmountForBuying,
    shallowEqual
  )
  const buyOrderPayloadOfferHashes = useAppSelector(
    ({ newMarketplaceReducer }) =>
      newMarketplaceReducer.buyOrderPayloadOfferHashes,
    shallowEqual
  )
  const buyOrderPayloadAmountsToTake = useAppSelector(
    ({ newMarketplaceReducer }) =>
      newMarketplaceReducer.buyOrderPayloadAmountsToTake,
    shallowEqual
  )
  const buyOrderPayloadUUID = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.buyOrderPayloadUUID,
    shallowEqual
  )

  const checkFulfilLoading = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.checkFulfilLoading,
    shallowEqual
  )
  const [tokenAndUnitPriceList, setTokenAndUnitPriceList] = useState<any>(null)

  const isDisabled = () => {
    if (
      !buyUnitPrice ||
      !totalAmountForBuying ||
      !totalAmountForBuying ||
      !buyOrderPayloadAmountsToTake ||
      !buyOrderPayloadOfferHashes ||
      !buyOrderPayloadUUID ||
      checkFulfilLoading
    ) {
      return true
    }
    return false
  }

  const checkForFullFillOrder = async () => {
    try {
      dispatch(setCheckFulfilLoading(true))
      const res = await marketplaceCalls.checkForFullFillOrder(
        buyQuantity,
        carbonTokenAddress
      )
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
          Math.round((total / Number(buyQuantity)) * 1000) / 1000
        dispatch(setTotalAmountForBuying(total))
        dispatch(setBuyUnitPrice(unitPriceLocal))
        dispatch(setBuyOrderPayloadOfferHashes(offerHashes))
        dispatch(setBuyOrderPayloadAmountsToTake(amountsToTake))
        dispatch(setBuyOrderPayloadUUID(uuid))

        setTokenAndUnitPriceList(tokenAndUnitPrice)
      } else {
        const errMsg = res?.data?.error
          ? res?.data?.error
          : 'Error in fetching token data to buy'
        dispatch(setOpenSnackbar(true))
        dispatch(setSnackbarErrorMsg(errMsg))
        dispatch(setBuyQuantity(0))
      }
    } catch (err) {
      console.log('Error in marketplaceCalls.checkForFullFillOrder api :', err)
    } finally {
      dispatch(setCheckFulfilLoading(false))
    }
  }

  const createBuyOrderCall = () => {
    dispatch(setRetryFunction(createBuyOrder))
    createBuyOrder()
  }

  return (
    <Grid item sm={12} md={10}>
      <CardRow
        title="Balance :"
        // value={`${Math.round(inrTokenBalances?.totalBalances) || 0} USD`}
        value={`${
          convertToInternationalCurrencySystem(
            inrTokenBalances?.totalBalances
          ) || 0
        } USD`}
        titleStyle={{ color: '#4A635E' }}
        partitionBasis={6}
      />
      {/* <CardRow
        title="Approved Token(INR/USD) Balance :"
        value={`${Math.round(inrTokenBalances?.allowanceBalance) || 0} USD`}
        titleStyle={{ color: Colors.lightPrimary1 }}
      />
      <CardRow
        title="Balance on Exchange :"
        value={`${Math.round(inrTokenBalances?.assetsBalance) || 0} USD`}
        titleStyle={{ color: Colors.lightPrimary1 }}
      /> */}
      <Box sx={{ position: 'relative', pt: 1 }}>
        <Box>
          <LabelInput
            label="Quantity"
            sx={{ width: '100%' }}
            value={buyQuantity}
            setValue={(e: any) => {
              //Allow only no.s
              const regexp = /^\d+?$/
              if (regexp.test(e?.target?.value) || e?.target?.value === '') {
                dispatch(setBuyQuantity(e?.target?.value))
              }
            }}
            onBlur={() => {
              if (buyQuantity && carbonTokenAddress) checkForFullFillOrder()
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
          {carbonTokenSymbol}
        </Box>
      </Box>
      <BuyTokenPriceDetails tokenAndUnitPriceList={tokenAndUnitPriceList} />
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'end' }}>
        <CCButton
          sx={{
            mt: 3,
            alignSelf: 'end',
            bgcolor: Colors.textColorLightGreen,
            color: Colors.white,
            padding: '8px 40px',
            borderRadius: '30px',
            fontSize: 14,
            minWidth: 0,
          }}
          onClick={createBuyOrderCall}
          disabled={isDisabled()}
          variant="contained"
        >
          Buy
        </CCButton>
      </Box>
    </Grid>
  )
}

export default BuyComp
