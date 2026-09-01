import {
  Alert,
  Box,
  Grid,
  InputAdornment,
  Paper,
  Skeleton,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import React, { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
// import tokenRetirement from '../../assets/Images/illustrations/tokenRetirement.png'
import BackHeader from '../../atoms/BackHeader/BackHeader'
import CCButton from '../../atoms/CCButton'
import CCInputField from '../../atoms/CCInputField'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'
import Spinner from '../../atoms/Spinner'
import BlockchainCalls from '../../blockchain/Blockchain'
import { TOKEN_CONTRACT_ADDRESS } from '../../config/token.config'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { pathNames } from '../../routes/pathNames'
import { Colors, Images } from '../../theme'
import { RetireTokensProps } from './RetireTokens.interface'
// import Web3 from 'web3'
import { shallowEqual } from 'react-redux'
// import { ethers } from 'ethers'
// import { getApprovedTokensBalance } from '../../utils/tokenRetire.utils'
import { buyerCalls } from '../../api/buyerCalls.api'
import { eventsCalls } from '../../api/eventsCalls.api'
import BalanceCheckModal from '../../atoms/BalanceCheckModal/BalanceCheckModal'
import MessageModal from '../../atoms/MessageModal/MessageModal'
import PreBlockchainCallModal from '../../atoms/PreBlockchainCallModal/PreBlockchainCallModal'
import { useMarket } from '../../hooks/useMarket'
import { useTokenRetire } from '../../hooks/useTokenRetire'
import { convertToInternationalCurrencySystem } from '../../utils/commonFunctions'
import { getLocalItem } from '../../utils/Storage'
import LoderOverlay from '../LoderOverlay'
import {
  setBlockchainCallStatus,
  setOpenBlockchainStatusModal,
  setPrimaryText,
  setRetryFunction,
  setSecondaryText,
} from '../../redux/Slices/blockchainStatusModalSlice'
import { BLOCKCHAIN_STATUS } from '../../config/constants.config'
import { handleApiError } from '../../utils/errorHandler'

// declare let window: any

// const provider =
//   window.ethereum != null
//     ? new ethers.providers.Web3Provider(window.ethereum)
//     : ethers.getDefaultProvider()

const RetireTokens = (props: RetireTokensProps) => {
  const navigate = useNavigate()
  const location: any = useLocation()
  const dispatch = useAppDispatch()

  const userName = getLocalItem('userDetails2')?.fullName || ''
  const userID = getLocalItem('userDetails')?.user_id || ''

  const tokenDetails = location?.state?.tokenDetails
  const projectID = location?.state?.projectID
  const projectUUID = location?.state?.projectUUID

  const accountAddress = useAppSelector(
    ({ wallet }) => wallet.accountAddress,
    shallowEqual
  )
  // const tokensApprovedForRetiring = useAppSelector(
  //   ({ tokenRetire }) => tokenRetire.tokensApprovedForRetiring,
  //   shallowEqual
  // )

  const [showTip, setShowTip] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [balanceToRetire, setBalanceToRetire] = useState<number | string>(0)
  const [tokenBalanceLoading, setTokenBalanceLoading] = useState(false)
  const [projectTokensLoading, setProjectTokensLoading] = useState(false)
  const [retiring, setRetiring] = useState('')
  const [explain, setExplain] = useState('')
  const [loading, setLoading] = useState(false)
  const [tokenAddress, setTokenAddress] = useState(false)
  const [tokenSymbol, setTokenSymbol] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarErrorMsg, setSnackbarErrorMsg] = useState('')

  const { getApprovedTokensBalance } = useTokenRetire()
  const { getTokenBalances } = useMarket()

  useEffect(() => {
    if (projectUUID) {
      getProjectsTokenDetails(projectUUID)
    }
  }, [projectUUID])

  useEffect(() => {
    if (accountAddress) {
      getApprovedTokensBalance()
    }
  }, [accountAddress])

  const getProjectsTokenDetails = async (projectUUID: string) => {
    try {
      setProjectTokensLoading(true)
      const res = await eventsCalls.getTokenByProjectUUID(
        `?project_id=${projectUUID}`
      )
      if (res?.success) {
        setTokenAddress(res?.data?.token_address)
        setTokenSymbol(res?.data?.token_symbol)

        setTokenBalanceLoading(true)
        const tokenBalances = await getTokenBalances(
          userID,
          res?.data?.token_address
        )
        if (tokenBalances?.success) {
          const bal = convertToInternationalCurrencySystem(
            Number(tokenBalances?.data?.totalBalances)
          )
          setBalanceToRetire(bal)
        }
        setTokenBalanceLoading(false)
      }
    } catch (err) {
      handleApiError(err, { action: 'eventsCalls.getTokenByProjectUUID' })
    } finally {
      setProjectTokensLoading(false)
    }
  }

  // async function getHashAndVRS() {
  //   try {
  //     // const sellUnitPriceCopy: any = Number(sellUnitPrice)
  //     const hash = new Web3().utils.soliditySha3(
  //       { type: 'string', value: 'burn' },
  //       { type: 'address', value: TOKEN_CONTRACT_ADDRESS },
  //       { type: 'address', value: accountAddress },
  //       { type: 'uint256', value: retiring }
  //     )

  //     if (!hash) throw new Error('No hash generated')
  //     const toPassParam = [accountAddress, hash]
  //     const signature = await BlockchainCalls.requestMethodCalls(
  //       'personal_sign',
  //       toPassParam
  //     )
  //     const sig = signature.slice(2)
  //     const v = new Web3().utils.toDecimal(`0x${sig.slice(128, 130)}`)
  //     const r = `0x${sig.slice(0, 64)}`
  //     const s = `0x${sig.slice(64, 128)}`
  //     return { v, r, s, hash }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
  // const retireTokens = async () => {
  //   if (Number(retiring) > Number(tokensApprovedForRetiring)) {
  //     setShowSecondModal(true)
  //     return
  //   }
  //   setLoading(true)
  //   const hashAnd = await getHashAndVRS()

  //   if (hashAnd) {
  //     const { r = '', s = '', v = '' } = hashAnd
  //     const payload = {
  //       // uuid: getLocalItem('userDetails').uuid,
  //       token_quantity: Number(retiring),
  //       beneficialOwner: accountAddress,
  //       retiring: Number(retiring),
  //       reason: explain,
  //       user: accountAddress,
  //       asset: TOKEN_CONTRACT_ADDRESS,
  //       _r: r,
  //       _s: s,
  //       _v: v,
  //       signer: accountAddress,
  //     }

  //     buyerCalls
  //       .retireToken(payload)
  //       .then((response) => {
  //         getApprovedTokensBalance()
  //         navigate(pathNames.TOKENS_RETIREMENT, { replace: true })
  //         setLoading(false)
  //       })
  //       .catch((e) => {
  //         setLoading(false)
  //       })
  //   }
  // }

  const retireTokensCall = async () => {
    if (Number(balanceToRetire) < Number(retiring)) {
      setRetiring('')
      setExplain('')
      setSnackbarErrorMsg('Not enough tokens to retire')
      setOpenSnackbar(true)
      return
    }

    dispatch(setRetryFunction(retireTokens))

    retireTokens()
  }

  const retireTokens = async () => {
    //setting blockchain modal values
    dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.PENDING))
    dispatch(setPrimaryText('In Progress'))
    dispatch(setSecondaryText('Retring Tokens, Waiting For Confirmation'))
    dispatch(setOpenBlockchainStatusModal(true))
    const payload = {
      reason: explain,
      asset: tokenAddress,
      beneficialOwner: userName,
      token_quantity: Number(retiring),
      retiring: Number(retiring),
      projectId: projectID,
    }

    try {
      //setLoading(true)
      const res: any = await buyerCalls.retireToken(payload)
      console.log('res', res)
      if (res?.data?.success) {
        dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.COMPLETED))
        dispatch(setPrimaryText('Completed'))
        dispatch(setSecondaryText('Tokens Retired Successfully.'))
        //setShowModal(true)
      } else {
        if (res?.data?.error) {
          //setSnackbarErrorMsg('Something went wrong in retiring the tokens.')
          //setOpenSnackbar(true)
          //alert(res?.data?.error)
          dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
          dispatch(setPrimaryText('Failed'))
          dispatch(
            setSecondaryText(
              `${
                res?.data?.error
                  ? res?.data?.error
                  : 'Something went wrong in retiring the tokens.'
              }`
            )
          )
        }
      }
    } catch (e) {
      dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
      dispatch(setPrimaryText('Failed'))
      dispatch(setSecondaryText('Something went wrong in retiring the tokens.'))
      console.log('Error in buyerCalls.retireToken api ~ ', e)
    } finally {
      setRetiring('')
      setExplain('')
      //setLoading(false)
    }
  }

  const isDisabled = () => {
    let shouldDisable = true
    if (retiring && explain && !projectTokensLoading) {
      shouldDisable = false
    }
    return shouldDisable
  }

  const handleClose = () => {
    setSnackbarErrorMsg('')
    setOpenSnackbar(false)
  }

  return (
    // loading ? (
    //   <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 450 }}>
    //     <Spinner />
    //   </Stack>
    // ) : (
    <>
      {loading ? <LoderOverlay /> : null}
      <Box sx={{ p: 0 }}>
        <Grid
          container
          xs={12}
          sx={{ p: 0, border: '0px solid' }}
          justifyContent={'space-between'}
        >
          <Grid item xs={12} sx={{ pr: 1 }}>
            <Paper
              sx={{
                width: '100%',
                borderRadius: '8px',
                backgroundColor: Colors.white,
                px: 2,
                pt: 2,
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <BackHeader
                  title="Retire Tokens"
                  onClick={() => navigate(pathNames.TOKENS_RETIREMENT)}
                />
                <Grid
                  item
                  xs={6}
                  sx={{ display: 'flex', justifyContent: 'end' }}
                >
                  <CCButton
                    sx={{
                      backgroundColor: Colors.darkPrimary1,
                      padding: '8px 24px',
                      minWidth: '50px',
                      color: '#fff',
                      borderRadius: 10,
                      fontSize: 14,
                      mr: 1,
                    }}
                    onClick={() => {
                      console.log({ retiring, explain })
                      retireTokensCall()
                    }}
                    disabled={isDisabled()}
                    variant="contained"
                  >
                    Retire
                  </CCButton>
                </Grid>
              </Box>

              <Typography
                sx={{ fontSize: 14, fontWeight: 500, mt: 1, color: '#141D1B' }}
              >
                Go carbon neutral by retiring carbon tokens and claiming the
                underlying environmental benefit of the carbon offset.
              </Typography>
              {projectTokensLoading || tokenBalanceLoading ? (
                <Box sx={{ mt: 1 }}>
                  <Skeleton
                    sx={{
                      fontSize: '1.5rem',
                      bgcolor: '#CCE8E1',
                      maxWidth: '400px',
                    }}
                    variant="text"
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    mt: 1,
                    color: Colors.darkPrimary1,
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box>No. of Tokens that can be retired</Box>
                  <InfoOutlinedIcon
                    sx={{ ml: 1, fontSize: 20, cursor: 'pointer' }}
                    onClick={() => setShowTip((showTip) => !showTip)}
                  />
                  <Box sx={{ mx: 1 }}>:</Box>
                  <Box>{balanceToRetire ? balanceToRetire : 0}</Box>
                </Box>
              )}
              {showTip ? (
                <Box
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: Colors.lightPrimary1,
                  }}
                >
                  Withdraw Carbon tokens if any to increase the balance!
                </Box>
              ) : null}
              <Box sx={{ mt: 3 }}>
                <CardRow
                  title="Total token retiring :"
                  value={
                    <CCInputField
                      placeholder="Quantity"
                      value={retiring}
                      onChange={(e: any) => {
                        //Allow only no.s
                        const regexp = /^\d+(\d{0})?$/
                        if (
                          regexp.test(e?.target?.value) ||
                          e?.target?.value === ''
                        ) {
                          setRetiring(e?.target?.value)
                        }
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {tokenSymbol}
                          </InputAdornment>
                        ),
                      }}
                      sx={{ maxWidth: '200px' }}
                    />
                  }
                />
                <CardRow
                  title="Total carbon offset :"
                  value={retiring || '-'}
                />
                <CardRow title="Beneficial owner :" value={userName} />
              </Box>

              <Typography sx={{ fontSize: 14, fontWeight: 500, mt: 2, mb: 2 }}>
                What is your reason for retirement ?
              </Typography>
              <CCMultilineTextArea
                label="Explain"
                placeholder="Explain it here"
                value={explain}
                onChange={(event) => setExplain(event.target.value)}
              />
              <Box
                sx={{
                  mt: 5,
                  display: 'flex',
                  justifyContent: 'end',
                }}
              >
                <img src={Images.RetireTokens} width="50%" />
              </Box>
            </Paper>
          </Grid>
        </Grid>
        {/* <PreBlockchainCallModal
        btn1OnClick={() => {
          setShowModal(false)
          retireTokens()
        }}
        btn2OnClick={() => setShowModal(false)}
        showModal={showModal}
        setShowModal={setShowModal}
      /> */}
        {/* <BalanceCheckModal
        msg1="Retiring more tokens than Approved. Please lessen the retiring token quantity."
        msg2="Approved Tokens for Retiring"
        tokenBal={tokensApprovedForRetiring}
        btn1OnClick={() => {
          setRetiring('')
          setShowSecondModal(false)
        }}
        showModal={showSecondModal}
        setShowModal={setShowSecondModal}
      /> */}
        <MessageModal
          message={
            <Typography
              sx={{ fontSize: 20, fontWeight: 500, color: Colors.darkPrimary1 }}
            >
              Tokens Retired Sucessfully!!!
            </Typography>
          }
          btn1Text="Okay"
          btn1OnClick={() => {
            setShowModal(false)
            navigate(pathNames?.TOKENS_RETIREMENT)
          }}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{
            width: '100%',
            // border: `1px solid ${Colors.darkPrimary1}`
          }}
        >
          {snackbarErrorMsg}
        </Alert>
      </Snackbar>
    </>
  )
}

export default RetireTokens

interface CardRowProps {
  title: string
  value: any
}
const CardRow: FC<CardRowProps> = ({ title, value }) => {
  return (
    <Grid container sx={{ mt: 2, display: 'flex', alignItems: 'center', wordBreak:'break-word' }}>
      <Grid
        item
        xs={12}
        md={4}
        sx={{ color: Colors.lightPrimary1, fontWeight: 500 }}
      >
        {title}
      </Grid>
      <Grid item xs={12} md={8} sx={{ color: '#141D1B' }}>
        {value}
      </Grid>
    </Grid>
  )
}
