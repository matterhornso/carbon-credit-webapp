import { Typography } from '@mui/material'
import React, { FC } from 'react'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '../../hooks/reduxHooks'
import { Colors } from '../../theme'
import MessageModal from '../MessageModal/MessageModal'

interface PreBlockchainCallModalProps {
  showModal: any
  setShowModal: any
  btn1OnClick: any
  btn2OnClick: any
}

const PreBlockchainCallModal: FC<PreBlockchainCallModalProps> = ({
  showModal,
  setShowModal,
  btn1OnClick,
  btn2OnClick,
}) => {
  const accountAddress = useAppSelector(
    ({ wallet }) => wallet.accountAddress,
    shallowEqual
  )
  const accountBalance = useAppSelector(
    ({ wallet }) => wallet.accountBalance,
    shallowEqual
  )

  return (
    <MessageModal
      message={
        <>
          <Typography sx={{ fontSize: 20, fontWeight: 500 }}>
            Next step involves making calls with Blockchain. Do you want to
            continue with{' '}
            <span style={{ color: Colors.lightPrimary1, fontSize: 18 }}>
              {accountAddress}
            </span>{' '}
            wallet address?
          </Typography>
          <Typography sx={{ mt: 2, fontSize: 18, fontWeight: 500, pb: 2 }}>
            Wallet Balance :{' '}
            <span style={{ color: Colors.lightPrimary1, fontSize: 18 }}>
              {accountBalance}
            </span>{' '}
          </Typography>
        </>
      }
      btn1Text="Continue"
      btn1OnClick={btn1OnClick}
      btn2OnClick={btn2OnClick}
      btn2Text="Cancel"
      showModal={showModal}
      setShowModal={setShowModal}
    />
  )
}

export default PreBlockchainCallModal
