import { ethers } from 'ethers'
import Web3 from 'web3'
import { marketplaceCalls } from '../api/marketplaceCalls.api'
import { transactionCalls } from '../api/transactionCalls.api'
import BlockchainCalls from '../blockchain/Blockchain'
import {
  LOCAL_STORAGE_VARS,
  MARKETPLACE_CALL_TYPES,
  TOKEN_TYPES,
} from '../config/constants.config'
import {
  INR_USD_TOKEN_ADDRESS,
  TOKEN_CONTRACT_ADDRESS,
} from '../config/token.config'
import {
  setBuyOrderPayloadAmountsToTake,
  setBuyOrderPayloadOfferHashes,
  setBuyOrderPayloadUUID,
  setBuyQuantityForBuyOrder,
  setBuyQuantityForDeposit,
  setBuyUnitPrice,
  setOnGoingDepositTxIdReduxBuyFlow,
  setTotalAmountForBuying,
} from '../redux/Slices/Marketplace/marketplaceBuyFlowSlice'
import {
  setSellQuantityForDeposit,
  setSellQuantityForSellOrder,
  setSellUnitPriceForSellOrder,
} from '../redux/Slices/Marketplace/marketplaceSellFlowSlice'
import {
  setMarketplaceModalMessage,
  setShowMarketplaceMsgModal,
} from '../redux/Slices/Marketplace/marketplaceSlice'
import { setWithdrawQuantity } from '../redux/Slices/Marketplace/marketplaceWithdrawFlowSlice'
// import { store } from '../redux/store'
import { removeItem, setLocalItem } from '../utils/Storage'
import { useMarketDepth } from './useMarketDepth'
// import {
//   getApprovedTokensBalanceBuyFlow,
//   getBalanceOnExchangeBuyFlow,
//   getBuyOrdersListData,
//   getWalletBalanceBuyFlow,
// } from './marketplaceBuyFlow.util'
// import {
//   getApprovedTokensBalance,
//   getBalanceOnExchange,
//   getSellOrdersListData,
//   getWalletBalance,
// } from './marketplaceSellFlow.util'
import { useAppDispatch, useAppSelector } from './reduxHooks'
import { useMarketplaceBuy } from './useMarketPlaceBuy'
import { useMarketPlaceSell } from './useMarketPlaceSell'

declare let window: any

const provider =
  window.ethereum != null
    ? new ethers.providers.Web3Provider(window.ethereum)
    : ethers.getDefaultProvider()

export const useMarketPlace = ()=>{
    const dispatch = useAppDispatch()
    const {getMarketplaceDepthData} = useMarketDepth()
    const {
          getApprovedTokensBalanceBuyFlow,
          getBalanceOnExchangeBuyFlow,
          getBuyOrdersListData,
          getWalletBalanceBuyFlow,
        } = useMarketplaceBuy()
    const  {
        getApprovedTokensBalance,
        getBalanceOnExchange,
        getSellOrdersListData,
        getWalletBalance,
      } = useMarketPlaceSell()
    const accountAddress = useAppSelector(({wallet})=>wallet?.accountAddress)

    const sellQuantityForSellOrder = useAppSelector(({marketplaceSellFlow})=>marketplaceSellFlow?.sellQuantityForSellOrder)
    const sellUnitPriceForSellOrderCopy:any = useAppSelector(({marketplaceSellFlow})=>marketplaceSellFlow?.sellUnitPriceForSellOrder)
    const withdrawQuantity:any = useAppSelector(({marketplaceWithdrawFlow})=>marketplaceWithdrawFlow?.withdrawQuantity)
    const withdrawTokenType:any = useAppSelector(({marketplaceWithdrawFlow})=>marketplaceWithdrawFlow?.withdrawTokenType)
    const buyOrderPayloadOfferHashes:any = useAppSelector(({marketplaceBuyFlow})=>marketplaceBuyFlow?.buyOrderPayloadOfferHashes)
    const buyOrderPayloadAmountsToTake:any = useAppSelector(({marketplaceBuyFlow})=>marketplaceBuyFlow?.buyOrderPayloadAmountsToTake)
    const totalAmountForBuying:any = useAppSelector(({marketplaceBuyFlow})=>marketplaceBuyFlow?.totalAmountForBuying)
 
     const getTransaction = async (txId: string) => {
        if (txId) {
          try {
            const res: any = await provider.getTransaction(txId)
            if (res) {
              let success = false
              if (res?.blockHash) {
                success = true
              }
              return { res, success }
            }
          } catch (error) {
            console.log(
              'Error in transactionCalls.getTransactionByUser api : ',
              error
            )
          }
        }
      }
      
       function checkBlockchainTransactionComplete(
        txId: string,
        callType: string,
        setOngoingTransaction: any
      ) {
        if (txId && callType && setOngoingTransaction) {
          const intervalId = setInterval(() => {
            getTransactionsAPI(txId, callType, setOngoingTransaction, intervalId)
          }, 3000)
          checkForPendingTransactions(
            txId,
            callType,
            setOngoingTransaction,
            intervalId
          )
        }
      }
      
      const checkForPendingTransactions = async (
        txId: string,
        callType: string,
        setOngoingTransaction: any,
        intervalId: any
      ) => {
        console.log('Web3 check started', txId)
        try {
          const receipt: any = await getTransaction(txId)
          if (receipt) {
            //This means approve call is done and put in blockchain
            const newReceipt: any = await receipt?.res.wait()
            if (newReceipt?.blockHash && txId) {
              console.log('web3 tx complete')
              callsToMakeAfterBlockchainSuccess(
                callType,
                setOngoingTransaction,
                intervalId
              )
            } else {
              dispatch(setOngoingTransaction({ txId, complete: false }))
            }
            getApprovedTokensBalance()
          }
        } catch (err) {
          console.log('Error ', err)
        }
      }
      
      const getTransactionsAPI = async (
        txId: string,
        callType: string,
        setOngoingTransaction: any,
        intervalId: any
      ) => {
        if (txId) {
          try {
            const res = await transactionCalls.getTransactionById(txId)
            if (res?.success) {
              dispatch(
                setOngoingTransaction({
                  txId,
                  complete: res?.data?.confirm ? true : false,
                })
              )
              if (res?.data?.confirm && txId) {
                callsToMakeAfterBlockchainSuccess(
                  callType,
                  setOngoingTransaction,
                  intervalId
                )
              } else {
                dispatch(setOngoingTransaction({ txId, complete: false }))
              }
            }
          } catch (err) {
            console.log('Error ', err)
          }
        }
      }
      
      const callsToMakeAfterBlockchainSuccess = (
        callType: string,
        setOngoingTransaction: any,
      
        intervalId: any
      ) => {
        switch (callType) {
          case MARKETPLACE_CALL_TYPES.DEPOSIT_SELL_FLOW: {
            clearInterval(intervalId)
      
            dispatch(setOngoingTransaction(null))
            dispatch(setSellQuantityForDeposit(0))
      
            getWalletBalance()
            getApprovedTokensBalance()
            getBalanceOnExchange()
      
            removeItem(LOCAL_STORAGE_VARS.ON_GOING_DEPOSIT_TX_ID_SELL_FLOW)
            removeItem(LOCAL_STORAGE_VARS.SELL_QUANTITY_FOR_DEPOSIT)
      
            return
          }
          case MARKETPLACE_CALL_TYPES.DEPOSIT_BUY_FLOW: {
            clearInterval(intervalId)
      
            dispatch(setBuyQuantityForDeposit(0))
            dispatch(setOnGoingDepositTxIdReduxBuyFlow(null))
      
            removeItem(LOCAL_STORAGE_VARS.ON_GOING_DEPOSIT_TX_ID_BUY_FLOW)
            removeItem(LOCAL_STORAGE_VARS.BUY_QUANTITY_FOR_DEPOSIT)
      
            getWalletBalanceBuyFlow()
            getApprovedTokensBalanceBuyFlow()
            getBalanceOnExchangeBuyFlow()
      
            return
          }
          case MARKETPLACE_CALL_TYPES.CREATE_BUY_ORDER: {
            clearInterval(intervalId)
      
            dispatch(setBuyQuantityForBuyOrder(0))
            dispatch(setOngoingTransaction(null))
            //reseting fulfil values
            dispatch(setTotalAmountForBuying(0))
            dispatch(setBuyUnitPrice(0))
            dispatch(setBuyOrderPayloadOfferHashes(null))
            dispatch(setBuyOrderPayloadAmountsToTake(null))
            dispatch(setBuyOrderPayloadUUID(null))
      
            getWalletBalanceBuyFlow()
            getApprovedTokensBalanceBuyFlow()
            getBalanceOnExchangeBuyFlow()
      
            getBuyOrdersListData()
      
            setLocalItem(LOCAL_STORAGE_VARS.ON_GOING_BUY_ORDER_TX_ID, null)
      
            return
          }
          case MARKETPLACE_CALL_TYPES.CREATE_SELL_ORDER: {
            clearInterval(intervalId)
      
            dispatch(setOngoingTransaction(null))
            dispatch(setSellQuantityForSellOrder(0))
            dispatch(setSellUnitPriceForSellOrder(0))
      
            getWalletBalance()
            getApprovedTokensBalance()
            getBalanceOnExchange()
      
            getMarketplaceDepthData()
            getSellOrdersListData()
      
            setLocalItem(LOCAL_STORAGE_VARS.ON_GOING_SELL_ORDER_TX_ID, null)
      
            return
          }
          case MARKETPLACE_CALL_TYPES.WITHDRAW_ORDER: {
            clearInterval(intervalId)
      
            dispatch(setOngoingTransaction(null))
            dispatch(setWithdrawQuantity(0))
      
            getWalletBalance()
            getApprovedTokensBalance()
            getBalanceOnExchange()
      
            getWalletBalanceBuyFlow()
            getApprovedTokensBalanceBuyFlow()
            getBalanceOnExchangeBuyFlow()
      
            setLocalItem(LOCAL_STORAGE_VARS.ON_GOING_WITHDRAW_ORDER_TX_ID, null)
      
            return
          }
        }
      }
      
       async function getHashAndVRS(type: string, randomNumber: any) {
        try {
          let hash: any
        //   const accountAddress = getState()?.wallet?.accountAddress
          if (type === 'sell') {
            // const sellQuantityForSellOrder =
            //   getState()?.marketplaceSellFlow?.sellQuantityForSellOrder
            // const sellUnitPriceForSellOrderCopy: any =
            //   getState()?.marketplaceSellFlow?.sellUnitPriceForSellOrder
      
            const nonce: any = await provider.getTransactionCount(accountAddress)
            //Explicitly needed to make them any since typescript was giving type errors when assigining these values to "value" key in "hash" generation(SoliditySHA3 fn)
            const feeAmount: any = 1
            const sellQuantityForSellOrderCopy: any = Number(sellQuantityForSellOrder)
            // const sellUnitPriceCopy: any = Number(sellUnitPrice)
            hash = new Web3().utils.soliditySha3(
              { type: 'string', value: 'makeOffer' },
              { type: 'address', value: accountAddress },
              { type: 'address', value: TOKEN_CONTRACT_ADDRESS },
              { type: 'address', value: INR_USD_TOKEN_ADDRESS },
              { type: 'uint256', value: sellQuantityForSellOrderCopy },
              { type: 'uint256', value: sellUnitPriceForSellOrderCopy },
              { type: 'address', value: TOKEN_CONTRACT_ADDRESS },
              { type: 'uint256', value: feeAmount },
              // { type: 'uint64', value: nonce }
              { type: 'uint64', value: randomNumber }
            )
            // console.log('hashPayload', {
            //   '': { type: 'string', value: 'makeOffer' },
            //   'data._maker': { type: 'address', value: accountAddress },
            //   'data._offerAsset': { type: 'address', value: TOKEN_CONTRACT_ADDRESS },
            //   'data._wantAsset': { type: 'address', value: INR_USD_TOKEN_ADDRESS },
            //   'data._offerAmount': { type: 'uint256', value: sellQuantityCopy },
            //   'data._wantAmount': { type: 'uint256', value: sellUnitPriceForSellOrderCopyß },
            //   'data._feeAsset': { type: 'address', value: TOKEN_CONTRACT_ADDRESS },
            //   'data._feeAmount': { type: 'uint256', value: feeAmount },
            //   'data._nonce': { type: 'uint64', value: nonce },
            // })
          } else if (type === 'withdraw') {
            // const withdrawQuantity =
            //   getState()?.marketplaceWithdrawFlow?.withdrawQuantity
            // const withdrawTokenType =
            //   getState()?.marketplaceWithdrawFlow?.withdrawTokenType
      
            const contractAddress =
              withdrawTokenType === TOKEN_TYPES.VCOT
                ? TOKEN_CONTRACT_ADDRESS
                : INR_USD_TOKEN_ADDRESS
      
            const nonce: any = await provider.getTransactionCount(accountAddress)
            //Explicitly needed to make them any since typescript was giving type errors when assigining these values to "value" key in "hash" generation(SoliditySHA3 fn)
            const feeAmount: any = 1
            const withdrawQuantityCopy: any = Number(withdrawQuantity)
            // const sellUnitPriceCopy: any = Number(sellUnitPrice)
            hash = new Web3().utils.soliditySha3(
              { type: 'string', value: 'withdraw' },
              { type: 'address', value: accountAddress },
              { type: 'address', value: contractAddress },
              { type: 'uint256', value: withdrawQuantityCopy },
              { type: 'address', value: contractAddress },
              { type: 'uint256', value: feeAmount },
              { type: 'uint64', value: randomNumber }
            )
            // console.log('wthdrawhashPayload', {
            //   '': { type: 'string', value: 'withdraw' },
            //   'data._withdrawer': { type: 'address', value: accountAddress },
            //   'data._token': { type: 'address', value: TOKEN_CONTRACT_ADDRESS },
            //   'data._amount': { type: 'uint256', value: withdrawQuantityCopy },
            //   'data._feeAsset': { type: 'address', value: TOKEN_CONTRACT_ADDRESS },
            //   'data._feeAmount': { type: 'uint256', value: feeAmount },
            //   'data._nonce': { type: 'uint64', value: randomNumber },
            // })
          } else if (type === 'cancel') {
            const feeAmount: any = 1
            hash = new Web3().utils.soliditySha3(
              { type: 'string', value: 'cancel' },
              { type: 'bytes', value: randomNumber },
              { type: 'address', value: TOKEN_CONTRACT_ADDRESS },
              { type: 'uint256', value: feeAmount }
            )
          } else {
            //for buy order
            // const buyOrderPayloadOfferHashes =
            //   getState()?.marketplaceBuyFlow?.buyOrderPayloadOfferHashes
            // const buyOrderPayloadAmountsToTake =
            //   getState()?.marketplaceBuyFlow?.buyOrderPayloadAmountsToTake
            // const totalAmountForBuying: any =
            //   getState()?.marketplaceBuyFlow?.totalAmountForBuying
      
            //Explicitly needed to make them "any" since typescript was giving type errors when assigining these values to "value" key in "hash" generation(SoliditySHA3 fn)
            const nonce: any = await provider.getTransactionCount(accountAddress)
            const feeAmount: any = 1
            const totalAmountForBuyingCopy: any = Number(totalAmountForBuying)
      
            hash = new Web3().utils.soliditySha3(
              { type: 'string', value: 'fillOffers' },
              { type: 'address', value: accountAddress },
              { type: 'bytes32[]', value: buyOrderPayloadOfferHashes }, //!todo
              { type: 'uint256[]', value: buyOrderPayloadAmountsToTake },
              { type: 'address', value: INR_USD_TOKEN_ADDRESS },
              { type: 'uint256', value: totalAmountForBuyingCopy },
              { type: 'uint64', value: randomNumber }
            )
          }
      
          if (!hash) throw new Error('No hash generated')
          const toPassParam = [accountAddress, hash]
          const signature = await BlockchainCalls.requestMethodCalls(
            'personal_sign',
            toPassParam
          )
          const sig = signature.slice(2)
          const v = new Web3().utils.toDecimal(`0x${sig.slice(128, 130)}`)
          const r = `0x${sig.slice(0, 64)}`
          const s = `0x${sig.slice(64, 128)}`
          return { v, r, s, hash }
        } catch (e) {
          console.log(e)
        }
      }
      
       const cancelOrder = async (payload: any) => {
        const hashAndVRS = await getHashAndVRS('cancel', payload?._offerHash)
        if (hashAndVRS) {
          const { hash, v, r, s } = hashAndVRS
          const payload2 = {
            ...payload,
            hash: hash,
            _v: v,
            _r: r,
            _s: s,
          }
          const cancelOrderRes = await marketplaceCalls.cancelOrder(payload2)
          if (cancelOrderRes.success) {
            dispatch(
              setMarketplaceModalMessage(
                'Sell order Cancelled. Cancelled Token Amount will reflect in your "Balance on Exchange" amount.'
              )
            )
           dispatch(setShowMarketplaceMsgModal(true))
          }
        }
      }
      

    return {getTransaction,
        checkBlockchainTransactionComplete,
        checkForPendingTransactions,
        getTransactionsAPI,
        callsToMakeAfterBlockchainSuccess,
        getHashAndVRS,
        cancelOrder}
}