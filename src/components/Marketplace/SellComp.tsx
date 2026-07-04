import { Box, Grid } from '@mui/material'
import React from 'react'
import { shallowEqual } from 'react-redux'
import CardRow from '../../atoms/CardRow/CardRow'
import CCButton from '../../atoms/CCButton'
import LabelInput from '../../atoms/LabelInput/LabelInput'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { useMarket } from '../../hooks/useMarket'
import {
  setSellQuantity,
  setSellWantAmount,
} from '../../redux/Slices/newMarketplaceSlice'
import { Colors } from '../../theme'
import {
  convertToInternationalCurrencySystem,
  formatNumberMinify,
} from '../../utils/commonFunctions'
import { setRetryFunction } from '../../redux/Slices/blockchainStatusModalSlice'
// import { createSellOrder } from '../../utils/newMarketplace.utils'

const SellComp = () => {
  const dispatch = useAppDispatch()
  const { createSellOrder } = useMarket()

  const carbonTokenBalances = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.carbonTokenBalances,
    shallowEqual
  )
  const carbonTokenSymbol = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.carbonTokenSymbol,
    shallowEqual
  )
  const sellQuantity = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.sellQuantity,
    shallowEqual
  )
  const sellWantAmount = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.sellWantAmount,
    shallowEqual
  )

  // console.log(
  //   'Max',
  //   convertToInternationalCurrencySystem(9007199254740991),
  //   formatNumberMinify(9007199254740991)
  // )
  // console.log(
  //   'Normal 1',
  //   convertToInternationalCurrencySystem(123),
  //   formatNumberMinify(123)
  // )
  // console.log(
  //   'Normal 2',
  //   convertToInternationalCurrencySystem(123123),
  //   formatNumberMinify(123123)
  // )
  // console.log(
  //   'Million',
  //   convertToInternationalCurrencySystem(12312312),
  //   formatNumberMinify(12312312)
  // )
  // console.log(
  //   'Billion',
  //   convertToInternationalCurrencySystem(12312312311),
  //   formatNumberMinify(12312312311)
  // )
  // console.log(
  //   'Million',
  //   convertToInternationalCurrencySystem(99999999),
  //   formatNumberMinify(99999999)
  // )
  // console.log(
  //   'Billion',
  //   convertToInternationalCurrencySystem(87657765767),
  //   formatNumberMinify(87657765767)
  // )
  // console.log(
  //   'Billion',
  //   convertToInternationalCurrencySystem(80000000000),
  //   formatNumberMinify(80000000000)
  // )
  // console.log(
  //   'Exp',
  //   convertToInternationalCurrencySystem(123123123123),
  //   formatNumberMinify(123123123123)
  // )

  const createSellOrderCall = () => {
    dispatch(setRetryFunction(createSellOrder))
    createSellOrder()
  }

  return (
    <Grid item xs={12} md={10}>
      <Box>
        <CardRow
          title="Balance :"
          value={`${
            carbonTokenBalances?.totalBalances ||
            carbonTokenBalances?.assetsBalance
              ? convertToInternationalCurrencySystem(
                  carbonTokenBalances?.totalBalances +
                    Number(carbonTokenBalances?.assetsBalance)
                )
              : 0
          } ${carbonTokenSymbol}`}
          titleStyle={{ color: '#4A635E' }}
          partitionBasis={6}
        />
        {/* <CardRow
          title={`Approved ${carbonTokenSymbol} Token Balance :`}
          value={`${
            Math.round(carbonTokenBalances?.allowanceBalance) || 0
          } ${carbonTokenSymbol}`}
          titleStyle={{ color: Colors.lightPrimary1 }}
        />
        <CardRow
          title="Balance on Exchange :"
          value={`${
            Math.round(carbonTokenBalances?.assetsBalance) || 0
          } ${carbonTokenSymbol}`}
          titleStyle={{ color: Colors.lightPrimary1 }}
        /> */}
        <Box sx={{ position: 'relative', pt: 1 }}>
          <Box>
            <LabelInput
              label="Quantity "
              sx={{ width: '100%' }}
              value={sellQuantity || ''}
              setValue={(e: any) => {
                //Allow only no.s
                const regexp = /^\d+?$/
                if (regexp.test(e?.target?.value) || e?.target?.value === '') {
                  dispatch(setSellQuantity(e?.target?.value))
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
            {carbonTokenSymbol}
          </Box>
        </Box>
        <Box sx={{ position: 'relative', pt: 1 }}>
          <Box>
            <LabelInput
              label="Unit Price"
              sx={{ width: '100%' }}
              value={sellWantAmount || ''}
              setValue={(e: any) => {
                //Allow only no.s upto 2 decimal places
                const regexp = /^\d+(\.\d{0,2})?$/
                if (regexp.test(e?.target?.value) || e?.target?.value === '') {
                  dispatch(setSellWantAmount(e?.target?.value))
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
            USD
          </Box>
        </Box>
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
            onClick={createSellOrderCall}
            disabled={!sellQuantity || !sellWantAmount}
            variant="contained"
          >
            Sell
          </CCButton>
        </Box>
      </Box>
    </Grid>
  )
}

export default SellComp
