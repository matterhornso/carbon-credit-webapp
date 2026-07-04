import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { shallowEqual } from 'react-redux'
import BalanceCheckModal from '../../../atoms/BalanceCheckModal/BalanceCheckModal'
import CCButton from '../../../atoms/CCButton'
import LabelInput from '../../../atoms/LabelInput/LabelInput'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { setBuyQuantityForApprove } from '../../../redux/Slices/Marketplace/marketplaceBuyFlowSlice'
import { Colors } from '../../../theme'
// import { requestApprovalForTokenBuy } from '../../../utils/Marketplace/marketplaceBuyFlow.util'
import { useMarketplaceBuy } from '../../../hooks/useMarketPlaceBuy'

const TabBuyApprove = () => {
  const dispatch = useAppDispatch()
  const [showModal, setShowModal] = useState(false)
  const [showSecondModal, setShowSecondModal] = useState(false)
  const { requestApprovalForTokenBuy } = useMarketplaceBuy()
  const walletBalBuyFlow = useAppSelector(
    ({ marketplaceBuyFlow }) => marketplaceBuyFlow.walletBalBuyFlow,
    shallowEqual
  )
  const buyQuantityForApprove = useAppSelector(
    ({ marketplaceBuyFlow }) => marketplaceBuyFlow.buyQuantityForApprove,
    shallowEqual
  )
  const onGoingApproveReduxBuyFlow = useAppSelector(
    ({ marketplaceBuyFlow }) => marketplaceBuyFlow.onGoingApproveReduxBuyFlow,
    shallowEqual
  )

  const isThereApproveObject = () => {
    return onGoingApproveReduxBuyFlow ? true : false
  }

  const onApproveToken = () => {
    if (Number(buyQuantityForApprove) >= Number(walletBalBuyFlow)) {
      setShowSecondModal(true)
      return
    }
    requestApprovalForTokenBuy()
  }

  return (
    <Grid container xs={12} justifyContent="center">
      <Grid item xs={12}>
        <Box sx={{ position: 'relative', pt: 1 }}>
          <Box>
            <LabelInput
              label="Quantity "
              sx={{ width: '100%' }}
              value={buyQuantityForApprove}
              setValue={(e: any) => {
                //Allow only no.s upto 3 decimal places
                const regexp = /^\d+(\.\d{0,3})?$/
                if (regexp.test(e?.target?.value) || e?.target?.value === '') {
                  dispatch(setBuyQuantityForApprove(e?.target?.value))
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
            INR
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
            onClick={onApproveToken}
            disabled={isThereApproveObject() || !buyQuantityForApprove}
            variant="contained"
          >
            Approve
          </CCButton>
        </Box>
      </Grid>
      <BalanceCheckModal
        msg1="Requesting approval for more tokens than you actually have. Please lessen the approval token quantity"
        msg2="Available Tokens"
        tokenBal={walletBalBuyFlow}
        btn1OnClick={() => {
          setShowSecondModal(false)
        }}
        showModal={showSecondModal}
        setShowModal={setShowSecondModal}
      />
    </Grid>
  )
}

export default TabBuyApprove
