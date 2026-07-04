import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { shallowEqual } from 'react-redux'
import BalanceCheckModal from '../../../atoms/BalanceCheckModal/BalanceCheckModal'
import CCButton from '../../../atoms/CCButton'
import LabelInput from '../../../atoms/LabelInput/LabelInput'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { useMarketPlaceSell } from '../../../hooks/useMarketPlaceSell'
import { setSellQuantityForDeposit } from '../../../redux/Slices/Marketplace/marketplaceSellFlowSlice'
import { Colors } from '../../../theme'
// import { depositERC20 } from '../../../utils/Marketplace/marketplaceSellFlow.util'

const TabSellDeposit = () => {
  const dispatch = useAppDispatch()
  const { depositERC20 } = useMarketPlaceSell()
  const [showSecondModal, setShowSecondModal] = useState(false)
  const sellQuantityForDeposit = useAppSelector(
    ({ marketplaceSellFlow }) => marketplaceSellFlow.sellQuantityForDeposit,
    shallowEqual
  )
  const onGoingApproveRedux = useAppSelector(
    ({ marketplaceSellFlow }) => marketplaceSellFlow.onGoingApproveRedux,
    shallowEqual
  )

  const approvedTokensBal = useAppSelector(
    ({ marketplaceSellFlow }) => marketplaceSellFlow.approvedTokensBal,
    shallowEqual
  )

  const onDepositToken = () => {
    if (Number(sellQuantityForDeposit) > Number(approvedTokensBal)) {
      setShowSecondModal(true)
      return
    }
    depositERC20()
  }

  return (
    <Grid container xs={12} justifyContent="center">
      <Grid item xs={12}>
        <Box sx={{ position: 'relative', pt: 1 }}>
          <Box>
            <LabelInput
              label="Quantity"
              value={sellQuantityForDeposit}
              setValue={(e: any) => {
                //Allow only no.s upto 3 decimal places
                const regexp = /^\d+(\.\d{0,3})?$/
                if (regexp.test(e?.target?.value) || e?.target?.value === '') {
                  dispatch(setSellQuantityForDeposit(e?.target?.value))
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
            onClick={onDepositToken}
            disabled={onGoingApproveRedux || !sellQuantityForDeposit}
          >
            Deposit
          </CCButton>
        </Box>
      </Grid>
      <BalanceCheckModal
        msg1="Requesting deposit for more tokens than you actually have."
        msg2="Approved Token(Carbon) Balance "
        tokenBal={approvedTokensBal}
        btn1OnClick={() => {
          setShowSecondModal(false)
        }}
        showModal={showSecondModal}
        setShowModal={setShowSecondModal}
      />
    </Grid>
  )
}

export default TabSellDeposit
