import { Modal, Paper } from '@mui/material'
import { Box } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import CCButton from '../../atoms/CCButton'
import { BLOCKCHAIN_STATUS } from '../../config/constants.config'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  resetblockchainStatusModalReducer,
  setOpenBlockchainStatusModal,
  setResetRetry,
  setRetryCount,
  setSecondaryText,
} from '../../redux/Slices/blockchainStatusModalSlice'
import { Images } from '../../theme'
import InProgressAnimation from './InProgressAnimation'
import './style.css'
import { useLocation } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'

const BlockchainStatusModal = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  const apiCallLocations = [
    pathNames.SELECT_VERIFIER,
    pathNames.SELECT_REGISTRY,
    pathNames.DASHBOARD,
  ]

  const openBlockchainStatusModal = useAppSelector(
    ({ blockchainStatusModal }) =>
      blockchainStatusModal.openBlockchainStatusModal,
    shallowEqual
  )
  const blockchainCallStatus = useAppSelector(
    ({ blockchainStatusModal }) => blockchainStatusModal.blockchainCallStatus,
    shallowEqual
  )
  const primaryText = useAppSelector(
    ({ blockchainStatusModal }) => blockchainStatusModal.primaryText,
    shallowEqual
  )
  const secondaryText = useAppSelector(
    ({ blockchainStatusModal }) => blockchainStatusModal.secondaryText,
    shallowEqual
  )
  const retryFunction = useAppSelector(
    ({ blockchainStatusModal }) => blockchainStatusModal.retryFunction,
    shallowEqual
  )
  const retryCount = useAppSelector(
    ({ blockchainStatusModal }) => blockchainStatusModal.retryCount,
    shallowEqual
  )
  const successFunction = useAppSelector(
    ({ blockchainStatusModal }) => blockchainStatusModal.successFunction,
    shallowEqual
  )

  useEffect(() => {
    if (!openBlockchainStatusModal) {
      dispatch(resetblockchainStatusModalReducer())
    }
  }, [openBlockchainStatusModal])

  const renderIcon = (status: number) => {
    switch (status) {
      case BLOCKCHAIN_STATUS.COMPLETED:
        return <img src={Images.check1} />
      case BLOCKCHAIN_STATUS.FAILED:
        return <img src={Images.Error} />
      case BLOCKCHAIN_STATUS.PENDING:
        return <InProgressAnimation />
    }
  }
  const renderButton = (status: number) => {
    let onClickFn, btnText
    switch (status) {
      case BLOCKCHAIN_STATUS.COMPLETED: {
        onClickFn = () => {
          if (successFunction) {
            successFunction()
          }
          dispatch(setOpenBlockchainStatusModal(false))
        }
        btnText = 'Okay'
        break
      }
      case BLOCKCHAIN_STATUS.FAILED:
        {
          //Allow api call only 3 times -> 1 original call + 2 retry's
          if (retryCount === 2) {
            dispatch(
              setSecondaryText('Please contact admin for further assistance!')
            )
            onClickFn = () => {
              dispatch(setOpenBlockchainStatusModal(false))
              dispatch(setResetRetry())
            }
            btnText = 'Okay'
          } else {
            onClickFn = () => {
              dispatch(setRetryCount(retryCount + 1))
              retryFunction()
            }
            btnText = 'Retry'
          }
        }
        break
      case BLOCKCHAIN_STATUS.PENDING:
        return null
    }

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
        {status === BLOCKCHAIN_STATUS.FAILED ? (
          <CCButton
            variant="contained"
            sx={{
              ml: 3,
              padding: '10px 30px',
              borderRadius: 10,
              minWidth: 0,
              fontSize: 14,
            }}
            onClick={() => dispatch(setOpenBlockchainStatusModal(false))}
          >
            {'Close'}
          </CCButton>
        ) : null}
        <CCButton
          variant="contained"
          sx={{
            ml: 3,
            padding: '10px 30px',
            borderRadius: 10,
            minWidth: 0,
            fontSize: 14,
          }}
          onClick={onClickFn}
        >
          {btnText}
        </CCButton>
      </Box>
    )
  }

  return (
    <Modal
      open={openBlockchainStatusModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableAutoFocus={true}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(56, 142, 129, 0.4)',
      }}
    >
      <>
        <Paper
          sx={{
            py: 4,
            px: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: '600px',
            maxWidth: '750px',
            borderRadius: '16px',
            textAlign: 'center',
          }}
        >
          {apiCallLocations.includes(location.pathname) ? (
            <CloseIcon
              sx={{
                position: 'relative',
                left: 270,
                top: '-20px',
                fontSize: 24,
                cursor: 'pointer',
              }}
              onClick={() => dispatch(setOpenBlockchainStatusModal(false))}
            />
          ) : null}
          {renderIcon(blockchainCallStatus)}
          {primaryText ? (
            <Box
              sx={{ color: '#2B2B2B', fontSize: 20, fontWeight: 500, mt: 3 }}
            >
              {primaryText}
            </Box>
          ) : null}
          {secondaryText ? (
            <Box sx={{ color: '#325743', mt: 2 }}>{secondaryText}</Box>
          ) : null}
          <Box sx={{ mt: 3 }}>{renderButton(blockchainCallStatus)}</Box>
        </Paper>
      </>
    </Modal>
  )
}

export default BlockchainStatusModal
