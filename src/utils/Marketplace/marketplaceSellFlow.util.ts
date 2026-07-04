import { ethers } from 'ethers'
import { marketplaceCalls } from '../../api/marketplaceCalls.api'
import BlockchainCalls from '../../blockchain/Blockchain'
import {
  LOCAL_STORAGE_VARS,
  MARKETPLACE_CALL_TYPES,
} from '../../config/constants.config'
import { EXCHANGE_CONTRACT_ADDRESS } from '../../config/exchange.config'
import {
  INR_USD_TOKEN_ADDRESS,
  TOKEN_CONTRACT_ADDRESS,
} from '../../config/token.config'
import {
  setSellOrdersList,
  setSellOrdersLoading,
} from '../../redux/Slices/Marketplace/marketplaceSellFlowSlice'
import {
  setApprovedTokensBal,
  setExchangeBal,
  setOnGoingApproveRedux,
  setOngoingDepositTransactionSellFlow,
  setOnGoingDepositTxIdReduxSellFlow,
  setOngoingSellOrderTransaction,
  setSellQuantityForApprove,
  setSellQuantityForDeposit,
  setWalletBal,
} from '../../redux/Slices/Marketplace/marketplaceSellFlowSlice'
import {
  setMarketplaceLoading,
  setMarketplaceModalMessage,
  setShowMarketplaceMsgModal,
} from '../../redux/Slices/Marketplace/marketplaceSlice'
import { store } from '../../redux/store'
import { roundUp } from '../commonFunctions'
import { setLocalItem } from '../Storage'
import {
  checkBlockchainTransactionComplete,
  getHashAndVRS,
} from './marketplace.util'

export async function getWalletBalance() {
  const accountAddress = store.getState()?.wallet?.accountAddress
  if (accountAddress) {
    try {
      const tokenContractFunctions = await BlockchainCalls.token_caller()
      const balanceCallRes = await tokenContractFunctions.balanceOf(
        accountAddress
      )
      if (balanceCallRes) {
        const bal =
          Math.round(Number(balanceCallRes.toString()) * 10 ** -18 * 1000) /
          1000
        store.dispatch(setWalletBal(bal))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export async function getBalanceOnExchange() {
  const accountAddress = store.getState()?.wallet?.accountAddress
  if (accountAddress) {
    try {
      const exchangeContractFunctions = await BlockchainCalls.exchange_caller()
      const exchangeBal = await exchangeContractFunctions.balances(
        accountAddress,
        TOKEN_CONTRACT_ADDRESS
      )
      const bigNumExchangeBal = ethers.BigNumber.from(exchangeBal)
      store.dispatch(setExchangeBal(bigNumExchangeBal.toNumber()))
    } catch (err) {
      console.log(err)
    }
  }
}

export async function getApprovedTokensBalance() {
  console.log('getApprovedTokensBalance called')
  const accountAddress = store.getState()?.wallet?.accountAddress
  if (accountAddress) {
    try {
      const tokenContractFunctions = await BlockchainCalls.token_caller()
      const approvedTokensBalRes = await tokenContractFunctions.allowance(
        accountAddress,
        EXCHANGE_CONTRACT_ADDRESS
      )
      if (approvedTokensBalRes) {
        const bigNumExchangeBal = ethers.BigNumber.from(approvedTokensBalRes)
        store.dispatch(setApprovedTokensBal(bigNumExchangeBal.toNumber()))
        console.log('bigNumExchangeBal', bigNumExchangeBal.toNumber())
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export async function requestApprovalForTokenSelling() {
  const sellQuantityForApprove =
    store.getState()?.marketplaceSellFlow?.sellQuantityForApprove

  try {
    store.dispatch(setMarketplaceLoading(true))
    store.dispatch(setOnGoingApproveRedux(null))
    setLocalItem(LOCAL_STORAGE_VARS?.ON_GOING_APPROVE_DATA_SELL_FLOW, null)
    setLocalItem(LOCAL_STORAGE_VARS?.SELL_QUANTITY_FOR_APPROVE, null)

    const tokenContractFunctions = await BlockchainCalls.token_caller()
    const approveFnRes = await tokenContractFunctions.approve(
      EXCHANGE_CONTRACT_ADDRESS, // exchangeAddress
      Number(sellQuantityForApprove)
    )
    if (approveFnRes) {
      setLocalItem(
        LOCAL_STORAGE_VARS?.ON_GOING_APPROVE_DATA_SELL_FLOW,
        approveFnRes
      )
      setLocalItem(
        LOCAL_STORAGE_VARS?.SELL_QUANTITY_FOR_APPROVE,
        sellQuantityForApprove
      )
      store.dispatch(setOnGoingApproveRedux(approveFnRes))
      store.dispatch(setSellQuantityForApprove(0))

      store.dispatch(
        setMarketplaceModalMessage(
          'Request sent for token approval. Please check once blockchain call is completed from Ongoing Approve tab.'
        )
      )
      store.dispatch(setShowMarketplaceMsgModal(true))
    }
  } catch (err) {
    // show proper error message
    console.log('Error: ' + JSON.stringify(err))
    // alert("JSON.stringify(err)")
  } finally {
    store.dispatch(setMarketplaceLoading(false))
  }
}

export async function depositERC20() {
  const accountAddress = store.getState()?.wallet?.accountAddress
  const sellQuantityForDeposit =
    store.getState()?.marketplaceSellFlow?.sellQuantityForDeposit

  const payload = {
    _user: accountAddress,
    _token: TOKEN_CONTRACT_ADDRESS,
    _amount: Number(sellQuantityForDeposit),
    _expectedAmount: Number(sellQuantityForDeposit),
  }
  try {
    store.dispatch(setMarketplaceLoading(true))
    const depositERC20Res = await marketplaceCalls.depositERC20(payload)
    console.log('depositERC20Res', depositERC20Res)

    if (depositERC20Res.success) {
      // return
      const txId = depositERC20Res?.data?.transactionId
      getApprovedTokensBalance()
      getBalanceOnExchange()
      store.dispatch(setOnGoingDepositTxIdReduxSellFlow(txId))
      store.dispatch(setSellQuantityForDeposit(0))
      setLocalItem(LOCAL_STORAGE_VARS.ON_GOING_DEPOSIT_TX_ID_SELL_FLOW, txId)
      setLocalItem(
        LOCAL_STORAGE_VARS.SELL_QUANTITY_FOR_DEPOSIT,
        sellQuantityForDeposit
      )
      checkBlockchainTransactionComplete(
        txId,
        MARKETPLACE_CALL_TYPES.DEPOSIT_SELL_FLOW,
        setOngoingDepositTransactionSellFlow
      )
      // alert('amount deposited')

      store.dispatch(
        setMarketplaceModalMessage(
          'Request sent to deposit token. Please check once blockchain call is completed from Ongoing Deposit tab.'
        )
      )
      store.dispatch(setShowMarketplaceMsgModal(true))
    } else {
      alert(depositERC20Res?.error)
    }
  } catch (err) {
    console.log('Error in marketplaceCalls.depositERC20 api : ' + err)
  } finally {
    store.dispatch(setMarketplaceLoading(false))
  }
}

export async function createSellOrder() {
  try {
    store.dispatch(setMarketplaceLoading(true))
    const sellQuantityForSellOrder =
      store.getState()?.marketplaceSellFlow?.sellQuantityForSellOrder
    const sellUnitPriceForSellOrder: any =
      store.getState()?.marketplaceSellFlow?.sellUnitPriceForSellOrder
    const accountAddress = store.getState()?.wallet?.accountAddress

    // const nonce = await provider.getTransactionCount(accountAddress)
    const randomNumber = new Date().getTime()
    const hashAndVRS = await getHashAndVRS('sell', randomNumber)
    if (hashAndVRS) {
      const { hash, v, r, s } = hashAndVRS

      const payload = {
        _maker: accountAddress, //wallet address
        _offerAsset: TOKEN_CONTRACT_ADDRESS, // Carbon Token address
        _wantAsset: INR_USD_TOKEN_ADDRESS, // INR/USD Token address
        _offerAmount: Number(sellQuantityForSellOrder), //quantity
        _wantAmount: Number(sellUnitPriceForSellOrder), //unit
        _feeAsset: TOKEN_CONTRACT_ADDRESS, //carbon token address
        _feeAmount: 1, //1
        // _nonce: nonce, //like in submit see getnonce()
        _nonce: randomNumber, //like in submit see getnonce()
        hash: hash,
        _v: v,
        _r: r,
        _s: s,
      }

      const createOrderRes = await marketplaceCalls.createOrder(payload)

      if (createOrderRes.success) {
        const txId =
          createOrderRes?.data?.transactions?.create[0]?.transactionHash
        getBalanceOnExchange()
        getApprovedTokensBalance()

        // setLocalItem(
        //   LOCAL_STORAGE_VARS.SELL_QUANTITY_FOR_DEPOSIT,
        //   sellQuantityForSellOrder
        // )
        setLocalItem(
          LOCAL_STORAGE_VARS.SELL_QUANTITY_FOR_SELL_ORDER,
          sellQuantityForSellOrder
        )
        setLocalItem(LOCAL_STORAGE_VARS.ON_GOING_SELL_ORDER_TX_ID, txId)
        checkBlockchainTransactionComplete(
          txId,
          MARKETPLACE_CALL_TYPES.CREATE_SELL_ORDER,
          setOngoingSellOrderTransaction
        )
        // alert('Sell order created')

        store.dispatch(
          setMarketplaceModalMessage(
            'Sell order created. Please check once blockchain call is completed from Ongoing Sell Order tab.'
          )
        )
        store.dispatch(setShowMarketplaceMsgModal(true))
      } else {
        alert(createOrderRes?.error)
      }
    }
  } catch (err) {
    console.log('Error in marketplaceCalls.createOrder api : ' + err)
  } finally {
    store.dispatch(setMarketplaceLoading(false))
  }
}

export async function getSellOrdersListData() {
  try {
    store.dispatch(setSellOrdersLoading(true))
    const sellOrderRes = await marketplaceCalls.getSellOrder()
    if (sellOrderRes.success && sellOrderRes.data.length) {
      // const rowValues = sellOrderRes.data.map((row: any) => {
      //   const orderId = row?.uuid
      //   const quantity = row?._offerAmount
      //   const totalAmount = row?._wantAmount
      //   const unitPrice = roundUp(totalAmount / quantity, 3)
      //   return [orderId, '-', '-', quantity, unitPrice, totalAmount, '-', '-']
      //   // return [
      //   //   orderId,
      //   //   'Date',
      //   //   'Time',
      //   //   quantity,
      //   //   unitPrice,
      //   //   totalAmount,
      //   //   'Qty Left',
      //   //   'Action',
      //   // ]
      // })
      // store.dispatch(setSellOrdersList(rowValues))
      store.dispatch(setSellOrdersList(sellOrderRes?.data?.reverse()))
    }
  } catch (err) {
    console.log('Error in marketplaceCalls.getSellOrder api : ', err)
  } finally {
    store.dispatch(setSellOrdersLoading(false))
  }
}
