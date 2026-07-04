import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { shallowEqual } from 'react-redux'
import BalanceCheckModal from '../../atoms/BalanceCheckModal/BalanceCheckModal'
import CCButton from '../../atoms/CCButton'
import LabelInput from '../../atoms/LabelInput/LabelInput'
import PreBlockchainCallModal from '../../atoms/PreBlockchainCallModal/PreBlockchainCallModal'
import BlockchainCalls from '../../blockchain/Blockchain'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setOngoingApproveTokenRetirement } from '../../redux/Slices/tokenRetireSlice'
import { setLocalItem } from '../../utils/Storage'

const ApproveToken = () => {
  const dispatch = useAppDispatch()

  const buyerTokenBalance = useAppSelector(
    ({ tokenRetire }) => tokenRetire.buyerTokenBalance,
    shallowEqual
  )

  const [retiring, setRetiring] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showSecondModal, setShowSecondModal] = useState(false)

  const approveToken = async () => {
    if (Number(retiring) > Number(buyerTokenBalance)) {
      setShowSecondModal(true)
      return
    }
    const tokenContractFunctions = await BlockchainCalls.token_caller()
    const approveFnRes = await tokenContractFunctions.approve(
      '0x92e8DA2ca27997e0FC6286e7B252cb9175d2BD37', // exchangeAddress
      Number(retiring)
    )
    if (approveFnRes) {
      setLocalItem('OngoingApproveTokenRetirement', approveFnRes)
      dispatch(setOngoingApproveTokenRetirement(approveFnRes))
    }
  }

  const isDisabled = () => {
    return !retiring ? true : false
  }

  return (
    <Box sx={{ pl: 1, pr: 8 }}>
      <Typography sx={{ fontSize: 22 }}>Approve Tokens</Typography>
      <Typography sx={{ fontSize: 14, fontWeight: 500, mt: 1 }}>
        To retire tokens, you must first approve them for retirement.
      </Typography>
      <Box
        sx={{
          mt: 3,
        }}
      >
        <LabelInput
          label="Quantity"
          sx={{ width: '100%' }}
          value={retiring}
          setValue={(e: any) => {
            //Allow only no.s upto 3 decimal places
            const regexp = /^\d+(\.\d{0,3})?$/
            if (regexp.test(e?.target?.value) || e?.target?.value === '') {
              setRetiring(e?.target?.value)
            }
          }}
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'end' }}>
          <CCButton
            sx={{ padding: '8px 16px', fontSize: 14, borderRadius: '20px' }}
            onClick={() => setShowModal(true)}
            disabled={isDisabled()}
            variant="contained"
          >
            Approve Tokens
          </CCButton>
        </Box>
      </Box>
      <PreBlockchainCallModal
        btn1OnClick={() => {
          setShowModal(false)
          approveToken()
        }}
        btn2OnClick={() => setShowModal(false)}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <BalanceCheckModal
        msg1="Requesting approval for more tokens than you actually have. Please lessen the approval token quantity"
        msg2="Available Tokens"
        tokenBal={buyerTokenBalance}
        btn1OnClick={() => {
          setRetiring('')
          setShowSecondModal(false)
        }}
        showModal={showSecondModal}
        setShowModal={setShowSecondModal}
      />
    </Box>
  )
}

export default ApproveToken
