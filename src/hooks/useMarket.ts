import { eventsCalls } from '../api/eventsCalls.api'
import { marketplaceCalls } from '../api/marketplaceCalls.api'
import { transactionCalls } from '../api/transactionCalls.api'
import { useAppDispatch, useAppSelector } from './reduxHooks'
import { BLOCKCHAIN_STATUS, TOKEN_TYPES } from '../config/constants.config'
import {
  setMessageModalText,
  setShowMessageModal,
} from '../redux/Slices/appSlice'
import {
  setBuyOrderPayloadAmountsToTake,
  setBuyOrderPayloadOfferHashes,
  setBuyOrderPayloadUUID,
  setBuyOrders,
  setBuyOrdersLoading,
  setBuyQuantity,
  setBuyUnitPrice,
  setCancelOrderLoading,
  setCarbonTokenAddress,
  setCarbonTokenSymbol,
  setClosedOrders,
  setCreateBuyOrderLoading,
  setCreateSellOrderLoading,
  setINRTokenAddress,
  setOpenOrders,
  setOpenOrdersLoading,
  setOpenSnackbar,
  setOpenWithdrawModal,
  setProjectsTokenLoading,
  setSellOrdersList,
  setSellOrdersLoading,
  setSellQuantity,
  setSellWantAmount,
  setSnackbarErrorMsg,
  setTokenBalanceLoading,
  setTotalAmountForBuying,
  setWithdrawAmount,
  setWithdrawLoading,
} from '../redux/Slices/newMarketplaceSlice'
import { useWallet } from './useWallet'
import {
  setBlockchainCallStatus,
  setOpenBlockchainStatusModal,
  setPrimaryText,
  setRetryFunction,
  setSecondaryText,
  setSuccessFunction,
} from '../redux/Slices/blockchainStatusModalSlice'

export function useMarket() {
  const dispatch = useAppDispatch()

  const { updateWalletBalance } = useWallet()

  const sellQuantity = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer?.sellQuantity
  )
  const sellWantAmount = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer?.sellWantAmount
  )

  const carbonTokenAddress = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer?.carbonTokenAddress
  )
  const inrTokenAddress = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer?.inrTokenAddress
  )
  const currentProjectUUID = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer?.currentProjectUUID
  )
  const buyOrderPayloadOfferHashes = useAppSelector(
    ({ newMarketplaceReducer }) =>
      newMarketplaceReducer?.buyOrderPayloadOfferHashes
  )
  const buyOrderPayloadAmountsToTake = useAppSelector(
    ({ newMarketplaceReducer }) =>
      newMarketplaceReducer?.buyOrderPayloadAmountsToTake
  )
  const buyOrderPayloadUUID = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer?.buyOrderPayloadUUID
  )
  const carbonTokenSymbol = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer?.carbonTokenSymbol
  )

  const carbonTokenBalances = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer?.carbonTokenBalances
  )
  const withdrawToken = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer?.withdrawToken
  )
  const withdrawTokenType = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer?.withdrawTokenType
  )
  const inrTokenBalances = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer?.inrTokenBalances
  )
  const totalAmountForBuying = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer?.totalAmountForBuying
  )
  const accountAddress = useAppSelector(({ wallet }) => wallet.accountAddress)
  const withdrawTokenAddress = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.withdrawTokenAddress
  )
  const withdrawAmount = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.withdrawAmount
  )

  const getProjectsTokenDetails = async (projectUUID: string) => {
    try {
      dispatch(setProjectsTokenLoading(true))
      const res = await eventsCalls.getTokenByProjectUUID(
        `?project_id=${projectUUID}`
      )
      if (res?.success) {
        dispatch(setCarbonTokenSymbol(res?.data?.token_symbol))
        dispatch(setCarbonTokenAddress(res?.data?.token_address))
        dispatch(setINRTokenAddress(res?.data?.INR_token_address))
      }
    } catch (err) {
      console.log('Error in eventsCalls.getTokenByProjectUUID api ~ ', err)
    } finally {
      dispatch(setProjectsTokenLoading(false))
    }
  }

  const getTokenBalances = async (userID: string, assetID: string) => {
    try {
      dispatch(setTokenBalanceLoading(true))
      const payload = {
        user_id: userID,
        asset_id: assetID,
      }
      const res = await transactionCalls.getAccountAndExchangeDetails(payload)
      if (res?.success) {
        return res
      }
    } catch (err) {
      console.log(
        'Error in transactionCalls.getAccountAndExchangeDetails api ~ ',
        err
      )
    } finally {
      dispatch(setTokenBalanceLoading(false))
    }
  }

  async function getSellOrdersListData(token_address?: string) {
    try {
      console.log(
        'token_address',
        token_address,
        'carbonTokenAddress: ',
        carbonTokenAddress
      )
      dispatch(setSellOrdersLoading(true))
      const sellOrderRes = await marketplaceCalls.getSellOrder(token_address)
      if (sellOrderRes.success) {
        if (sellOrderRes.data.length === 0) {
          dispatch(setSellOrdersList(null))
          return
        }
        const ordersList = sellOrderRes?.data?.reverse().map((order: any) => {
          return [
            Math.round((order?._wantAmount / order?._offerAmount) * 100) / 100,
            order?._offerAmount,
            order?._wantAmount,
          ]
        })
        dispatch(setSellOrdersList(ordersList))
      }
    } catch (err) {
      console.log('Error in marketplaceCalls.getSellOrder api : ', err)
    } finally {
      dispatch(setSellOrdersLoading(false))
    }
  }

  const createSellOrder = async () => {
    // const carbonTokenAddress =
    //   getState()?.newMarketplaceReducer?.carbonTokenAddress
    // const carbonTokenSymbol =
    //   getState()?.newMarketplaceReducer?.carbonTokenSymbol
    // const carbonTokenBalances =
    //   getState()?.newMarketplaceReducer?.carbonTokenBalances
    // const inrTokenAddress =
    //   getState()?.newMarketplaceReducer?.inrTokenAddress
    // const sellQuantity = getState()?.newMarketplaceReducer?.sellQuantity
    // const sellWantAmount = getState()?.newMarketplaceReducer?.sellWantAmount
    // const currentProjectUUID =
    //   getState()?.newMarketplaceReducer?.currentProjectUUID

    const pseudoNonce = new Date().getTime()

    const balToCheck = parseInt(
      carbonTokenBalances?.totalBalances +
        Number(carbonTokenBalances?.assetsBalance)
    )
    if (sellQuantity > balToCheck) {
      dispatch(setOpenSnackbar(true))
      dispatch(setSnackbarErrorMsg('Not enough balance to Sell'))

      dispatch(setWithdrawAmount(0))
      dispatch(setOpenWithdrawModal(false))

      return
    }

    try {
      dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.PENDING))
      dispatch(setPrimaryText('In Progress'))
      dispatch(
        setSecondaryText('Creating Sell Order, Waiting For Confirmation')
      )
      dispatch(setOpenBlockchainStatusModal(true))

      dispatch(setCreateSellOrderLoading(true))
      const payload = {
        _offerAsset: carbonTokenAddress,
        _wantAsset: inrTokenAddress,
        _offerAmount: Number(sellQuantity),
        _wantAmount: Number(sellWantAmount),
        _feeAsset: carbonTokenAddress,
        _feeAmount: 0,
        _nonce: pseudoNonce,
        _offerAssetName: carbonTokenSymbol,
        _wantAssetName: 'USD',
      }

      const createOrderRes = await marketplaceCalls.createOrder(payload)
      if (createOrderRes?.success) {
        dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.COMPLETED))
        dispatch(setPrimaryText('Completed'))
        dispatch(
          setSecondaryText(
            'Sell Order created successfully. You can check the status of blockchain transaction from the orders table!!!'
          )
        )
        dispatch(
          setSuccessFunction(() => {
            getSellOrdersListData(carbonTokenAddress)
            getOpenOrders()
            getProjectsTokenDetails(currentProjectUUID)
            dispatch(setSellQuantity(0))
            dispatch(setSellWantAmount(0))

            //resetting token addresses
            dispatch(setCarbonTokenSymbol(''))
            dispatch(setCarbonTokenAddress(''))
            dispatch(setINRTokenAddress(''))
          })
        )
        //getSellOrdersListData(carbonTokenAddress)
        //getOpenOrders()
        //getProjectsTokenDetails(currentProjectUUID)
        //dispatch(setSellQuantity(0))
        //dispatch(setSellWantAmount(0))

        ////resetting token addresses
        //dispatch(setCarbonTokenSymbol(''))
        //dispatch(setCarbonTokenAddress(''))
        //dispatch(setINRTokenAddress(''))

        //dispatch(setShowMessageModal(true))
        //dispatch(
        //  setMessageModalText(
        //    'Sell Order created successfully. You can check the status of blockchain transaction from the orders table!!!'
        //  )
        //)
      } else {
        console.log('withdraw else block: failed block')

        dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
        dispatch(setPrimaryText('Failed'))
        dispatch(setSecondaryText('Something went wrong. Please try again.'))
      }
    } catch (err) {
      console.log('Error in marketplaceCalls.createOrder api ~ ', err)
      console.log('withdraw else block: failed block')

      dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
      dispatch(setPrimaryText('Failed'))
      dispatch(setSecondaryText('Something went wrong. Please try again.'))
    } finally {
      dispatch(setCreateSellOrderLoading(false))
    }
  }

  const createBuyOrder = async () => {
    // const carbonTokenAddress =
    //   getState()?.newMarketplaceReducer?.carbonTokenAddress
    // const inrTokenAddress =
    //   getState()?.newMarketplaceReducer?.inrTokenAddress
    // const inrTokenBalances =
    //   getState()?.newMarketplaceReducer?.inrTokenBalances
    // const totalAmountForBuying =
    //   getState()?.newMarketplaceReducer?.totalAmountForBuying
    // const buyOrderPayloadOfferHashes =
    //   getState()?.newMarketplaceReducer?.buyOrderPayloadOfferHashes
    // const buyOrderPayloadAmountsToTake =
    //   getState()?.newMarketplaceReducer?.buyOrderPayloadAmountsToTake
    // const buyOrderPayloadUUID =
    //   getState()?.newMarketplaceReducer?.buyOrderPayloadUUID
    // const currentProjectUUID =
    //   getState()?.newMarketplaceReducer?.currentProjectUUID

    const pseudoNonce = new Date().getTime()

    const balToCheck = parseInt(inrTokenBalances?.totalBalances)

    if (Number(totalAmountForBuying) > balToCheck) {
      dispatch(setOpenSnackbar(true))
      dispatch(setSnackbarErrorMsg('Not enough balance to Buy'))

      dispatch(setWithdrawAmount(0))
      dispatch(setOpenWithdrawModal(false))

      return
    }
    dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.PENDING))
    dispatch(setPrimaryText('In Progress'))
    dispatch(setSecondaryText('Creating Buy Order, Waiting For Confirmation'))
    dispatch(setOpenBlockchainStatusModal(true))

    const payload = {
      uuid: buyOrderPayloadUUID,
      _offerHashes: buyOrderPayloadOfferHashes,
      _amountsToTake: buyOrderPayloadAmountsToTake,
      _feeAsset: inrTokenAddress,
      _feeAmount: 0,
      _nonce: pseudoNonce,
      token_address: carbonTokenAddress,
    }

    try {
      dispatch(setCreateBuyOrderLoading(true))

      const createOrderRes = await marketplaceCalls.fillOrder(payload)
      if (createOrderRes?.success) {
        dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.COMPLETED))
        dispatch(setPrimaryText('Completed'))
        dispatch(
          setSecondaryText(
            'Buy Order created successfully. You can check the status of blockchain transaction from the orders table!!!'
          )
        )
        dispatch(
          setSuccessFunction(() => {
            dispatch(setBuyUnitPrice(0))
            dispatch(setTotalAmountForBuying(0))
            dispatch(setBuyOrderPayloadUUID(null))
            dispatch(setBuyOrderPayloadOfferHashes(null))
            dispatch(setBuyOrderPayloadAmountsToTake(null))
            dispatch(setBuyQuantity(0))

            getSellOrdersListData(carbonTokenAddress)
            getBuyOrders()
            getProjectsTokenDetails(currentProjectUUID)

            //resetting token addresses
            dispatch(setCarbonTokenSymbol(''))
            dispatch(setCarbonTokenAddress(''))
            dispatch(setINRTokenAddress(''))
          })
        )

        //dispatch(setBuyUnitPrice(0))
        //dispatch(setTotalAmountForBuying(0))
        //dispatch(setBuyOrderPayloadUUID(null))
        //dispatch(setBuyOrderPayloadOfferHashes(null))
        //dispatch(setBuyOrderPayloadAmountsToTake(null))
        //dispatch(setBuyQuantity(0))

        //getSellOrdersListData(carbonTokenAddress)
        //getBuyOrders()
        //getProjectsTokenDetails(currentProjectUUID)

        ////resetting token addresses
        //dispatch(setCarbonTokenSymbol(''))
        //dispatch(setCarbonTokenAddress(''))
        //dispatch(setINRTokenAddress(''))

        //dispatch(setShowMessageModal(true))
        //dispatch(
        //  setMessageModalText(
        //    'Buy Order created successfully. You can check the status of blockchain transaction from the orders table!!!'
        //  )
        //)
      } else {
        console.log('buyOrder else block: failed block')

        dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
        dispatch(setPrimaryText('Failed'))
        dispatch(setSecondaryText('Something went wrong. Please try again.'))
      }
    } catch (err) {
      console.log('Error in marketplaceCalls.fillOrder api ~ ', err)
      console.log('withdraw else block: failed block')

      dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
      dispatch(setPrimaryText('Failed'))
      dispatch(setSecondaryText('Something went wrong. Please try again.'))
    } finally {
      dispatch(setCreateBuyOrderLoading(false))
    }
  }

  const getOpenOrders = async () => {
    try {
      dispatch(setOpenOrdersLoading(true))
      const res = await marketplaceCalls.getOpenOrder(carbonTokenAddress)
      if (res?.success) {
        if (res?.data?.openOrder && res?.data?.openOrder.length) {
          dispatch(setOpenOrders(res?.data?.openOrder))
        }
        if (res?.data?.closeOrder && res?.data?.closeOrder.length) {
          dispatch(setClosedOrders(res?.data?.closeOrder))
        }
      }
    } catch (err) {
      console.log('Error in marketplaceCalls.getOpenOrder api ~ ', err)
    } finally {
      dispatch(setOpenOrdersLoading(false))
    }
  }

  async function getBuyOrders() {
    // const accountAddress = getState()?.wallet?.accountAddress
    try {
      dispatch(setBuyOrdersLoading(true))
      const buyOrderRes = await marketplaceCalls.getBuyOrder(accountAddress)
      if (buyOrderRes.success && buyOrderRes?.data?.buyOrder?.length) {
        dispatch(setBuyOrders(buyOrderRes?.data?.buyOrder))
      }
    } catch (err) {
      console.log('Error in marketplaceCalls.getBuyOrder api : ', err)
    } finally {
      dispatch(setBuyOrdersLoading(false))
    }
  }

  const cancelOrder = async (payload: any) => {
    // const currentProjectUUID =
    //   getState()?.newMarketplaceReducer?.currentProjectUUID

    try {
      dispatch(setOpenBlockchainStatusModal(true))
      dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.PENDING))
      dispatch(setPrimaryText('In Progress'))
      dispatch(setSecondaryText('Canceling order, Waiting For Confirmation'))
      dispatch(setCancelOrderLoading(true))
      const cancelOrderRes = await marketplaceCalls.cancelOrder(payload)
      if (cancelOrderRes.success) {
        dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.COMPLETED))
        dispatch(setPrimaryText('Completed'))
        dispatch(setSecondaryText('Order Canceled Successfully.'))
        dispatch(
          setSuccessFunction(() => {
            dispatch(setOpenOrders([]))

            getOpenOrders()
            getProjectsTokenDetails(currentProjectUUID)

            //resetting token addresses
            dispatch(setCarbonTokenSymbol(''))
            dispatch(setCarbonTokenAddress(''))
            dispatch(setINRTokenAddress(''))
          })
        )
        //dispatch(
        //  setMessageModalText(
        //    'Sell order Cancelled. Cancelled Token Amount will reflect in "Balance on Exchange" amount.'
        //  )
        //)
        //dispatch(setShowMessageModal(true))

        //dispatch(setOpenOrders([]))

        //getOpenOrders()
        //getProjectsTokenDetails(currentProjectUUID)

        ////resetting token addresses
        //dispatch(setCarbonTokenSymbol(''))
        //dispatch(setCarbonTokenAddress(''))
        //dispatch(setINRTokenAddress(''))
      } else {
        dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
        dispatch(setPrimaryText('Failed'))
        dispatch(setSecondaryText('Something went wrong. Please try again.'))
      }
    } catch (err) {
      console.log('Error in marketplaceCalls.cancelOrder api ~ ', err)

      dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
      dispatch(setPrimaryText('Failed'))
      dispatch(setSecondaryText('Something went wrong. Please try again.'))
    } finally {
      dispatch(setCancelOrderLoading(false))
    }
  }

  const withdraw = async () => {
    console.log('withdraw called')
    // const withdrawAmount = getState()?.newMarketplaceReducer?.withdrawAmount
    // const withdrawToken = getState()?.newMarketplaceReducer?.withdrawToken
    // const withdrawTokenAddress =
    //   getState()?.newMarketplaceReducer?.withdrawTokenAddress
    // const carbonTokenBalances =
    //   getState()?.newMarketplaceReducer?.carbonTokenBalances
    // const inrTokenBalances =
    //   getState()?.newMarketplaceReducer?.inrTokenBalances
    // const currentProjectUUID =
    //   getState()?.newMarketplaceReducer?.currentProjectUUID

    const pseudoNonce = new Date().getTime()

    const balToCheck =
      withdrawTokenType === TOKEN_TYPES.CARBON
        ? parseInt(carbonTokenBalances?.assetsBalance)
        : parseInt(inrTokenBalances?.assetsBalance)
    if (!balToCheck || balToCheck < Number(withdrawAmount)) {
      dispatch(setOpenSnackbar(true))
      dispatch(setSnackbarErrorMsg('Not enough balance to Withdraw'))

      dispatch(setWithdrawAmount(0))
      //dispatch(setOpenWithdrawModal(false))

      return
    }

    const payload = {
      _token: withdrawTokenAddress,
      _amount: withdrawAmount,
      _feeAsset: withdrawTokenAddress,
      _feeAmount: 0,
      _nonce: pseudoNonce,
    }

    try {
      dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.PENDING))
      dispatch(setPrimaryText('In Progress'))
      dispatch(setSecondaryText('Withdrawing Amount, Waiting For Confirmation'))
      dispatch(setOpenBlockchainStatusModal(true))

      dispatch(setWithdrawLoading(true))

      const withdrawRes = await marketplaceCalls.withdraw(payload)
      console.log('withdrawRes: ', withdrawRes)
      if (withdrawRes.success) {
        dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.COMPLETED))
        dispatch(setPrimaryText('Completed'))
        dispatch(
          setSecondaryText(
            'Withdraw Successfull. Withdrawn Amount will reflect in your Wallet.'
          )
        )
        dispatch(
          setSuccessFunction(() => {
            getProjectsTokenDetails(currentProjectUUID)
            //resetting token addresses

            dispatch(setCarbonTokenSymbol(''))
            dispatch(setCarbonTokenAddress(''))
            dispatch(setINRTokenAddress(''))
            //Update Project Token table - Wallet Page
            updateWalletBalance()
          })
        )

        //dispatch(
        //  setMessageModalText(
        //    'Withdraw Successfull. Withdrawn Amount will reflect in your Wallet.'
        //  )
        //)
        //dispatch(setShowMessageModal(true))

        //getProjectsTokenDetails(currentProjectUUID)

        ////resetting token addresses
        //dispatch(setCarbonTokenSymbol(''))
        //dispatch(setCarbonTokenAddress(''))
        //dispatch(setINRTokenAddress(''))

        //Update Project Token table - Wallet Page
        //updateWalletBalance()
      } else {
        console.log('withdraw else block: failed block')

        dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
        dispatch(setPrimaryText('Failed'))
        dispatch(setSecondaryText('Something went wrong. Please try again.'))
      }
    } catch (err) {
      console.log('withdraw else block: catch block')

      dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
      dispatch(setPrimaryText('Failed'))
      dispatch(setSecondaryText('Something went wrong. Please try again.'))
      console.log('Error in marketplaceCalls.withdraw api ~ ', err)
    } finally {
      dispatch(setOpenWithdrawModal(false))
      dispatch(setWithdrawLoading(false))
    }
  }

  return {
    getProjectsTokenDetails,
    getTokenBalances,
    getSellOrdersListData,
    createSellOrder,
    createBuyOrder,
    getOpenOrders,
    getBuyOrders,
    cancelOrder,
    withdraw,
  }
}
