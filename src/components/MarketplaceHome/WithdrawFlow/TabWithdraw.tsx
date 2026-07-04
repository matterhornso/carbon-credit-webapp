import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { shallowEqual } from 'react-redux'
import CCButton from '../../../atoms/CCButton'
import LabelInput from '../../../atoms/LabelInput/LabelInput'
import { TOKEN_TYPES } from '../../../config/constants.config'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { useMarketPlaceWithdraw } from '../../../hooks/useMarketPlaceWithdraw'
import {
  setWithdrawQuantity,
  setWithdrawTokenType,
} from '../../../redux/Slices/Marketplace/marketplaceWithdrawFlowSlice'
import { Colors } from '../../../theme'
// import { createWithdrawOrder } from '../../../utils/Marketplace/marketplaceWithdraw.util'

const TabWithdraw = () => {
  const dispatch = useAppDispatch()
  const { createWithdrawOrder } = useMarketPlaceWithdraw()

  const withdrawQuantity = useAppSelector(
    ({ marketplaceWithdrawFlow }) => marketplaceWithdrawFlow.withdrawQuantity,
    shallowEqual
  )
  const withdrawTokenType = useAppSelector(
    ({ marketplaceWithdrawFlow }) => marketplaceWithdrawFlow.withdrawTokenType,
    shallowEqual
  )
  const onGoingApproveReduxBuyFlow = useAppSelector(
    ({ marketplaceBuyFlow }) => marketplaceBuyFlow.onGoingApproveReduxBuyFlow,
    shallowEqual
  )

  const isThereApproveObject = () => {
    return onGoingApproveReduxBuyFlow ? true : false
  }

  return (
    <Grid container xs={12} justifyContent="center">
      <Grid item xs={12}>
        <Box sx={{ mt: 2 }}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel
              sx={{
                color: '#006B5E',
              }}
            >
              Token Type
            </InputLabel>
            <Select
              value={withdrawTokenType}
              onChange={(e) => {
                dispatch(setWithdrawTokenType(e.target.value))
              }}
              input={
                <OutlinedInput
                  sx={{
                    color: '#006B5E',
                  }}
                  label="Token Type"
                />
              }
              sx={{
                color: '#006B5E',
                borderRadius: '4px 4px 0 0',
              }}
            >
              <MenuItem key={TOKEN_TYPES.VCOT} value={TOKEN_TYPES.VCOT}>
                VCOT
              </MenuItem>
              <MenuItem key={TOKEN_TYPES.INR} value={TOKEN_TYPES.INR}>
                INR
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ position: 'relative', pt: 1 }}>
          <Box>
            <LabelInput
              label="Quantity "
              sx={{ width: '100%' }}
              value={withdrawQuantity}
              setValue={(e: any) => {
                //Allow only no.s upto 3 decimal places
                const regexp = /^\d+(\.\d{0,3})?$/
                if (regexp.test(e?.target?.value) || e?.target?.value === '') {
                  dispatch(setWithdrawQuantity(e?.target?.value))
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
            {withdrawTokenType}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <CCButton
            sx={{
              mt: 3,
              alignSelf: 'end',
              bgcolor: Colors.darkPrimary1,
              color: Colors.white,
              padding: '8px 24px',
              borderRadius: '30px',
              fontSize: 14,
              minWidth: '120px',
            }}
            onClick={createWithdrawOrder}
            // disabled={isThereApproveObject() || !buyQuantityForApprove}
            disabled={!withdrawQuantity}
            variant="contained"
          >
            Withdraw
          </CCButton>
        </Box>
      </Grid>
    </Grid>
  )
}

export default TabWithdraw
