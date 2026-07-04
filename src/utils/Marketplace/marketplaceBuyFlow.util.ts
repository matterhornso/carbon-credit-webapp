import { ethers } from 'ethers'
import { marketplaceCalls } from '../../api/marketplaceCalls.api'
import BlockchainCalls from '../../blockchain/Blockchain'
import {
  LOCAL_STORAGE_VARS,
  MARKETPLACE_CALL_TYPES,
} from '../../config/constants.config'
import { EXCHANGE_CONTRACT_ADDRESS } from '../../config/exchange.config'
import { INR_USD_TOKEN_ADDRESS } from '../../config/token.config'
import {
  setApprovedTokensBalBuyFlow,
  setBuyOrderPayloadAmountsToTake,
  setBuyOrderPayloadOfferHashes,
  setBuyOrderPayloadUUID,
  setBuyOrdersListData,
  setBuyOrdersListDataLoading,
  setBuyQuantityForApprove,
  setBuyQuantityForDeposit,
  setExchangeBalBuyFlow,
  setOnGoingApproveReduxBuyFlow,
  setOngoingBuyOrderTransaction,
  setOnGoingBuyOrderTxIdRedux,
  setOngoingDepositTransactionBuyFlow,
  setOnGoingDepositTxIdReduxBuyFlow,
  setWalletBalBuyFlow,
} from '../../redux/Slices/Marketplace/marketplaceBuyFlowSlice'
import {
  setMarketplaceLoading,
  setMarketplaceModalMessage,
  setShowMarketplaceMsgModal,
} from '../../redux/Slices/Marketplace/marketplaceSlice'
import { store } from '../../redux/store'
import { setLocalItem } from '../Storage'
import {
  checkBlockchainTransactionComplete,
  getHashAndVRS,
} from './marketplace.util'

export async function getWalletBalanceBuyFlow() {
  const accountAddress = store.getState()?.wallet?.accountAddress
  if (accountAddress) {
    try {
      const tokenContractFunctions =
        await BlockchainCalls.inr_usd_token_caller()
      const balanceCallRes = await tokenContractFunctions.balanceOf(
        accountAddress
      )
      if (balanceCallRes) {
        const bigNumExchangeBal = ethers.BigNumber.from(balanceCallRes)
        // store.dispatch(
        // setWalletBalBuyFlow(bigNumExchangeBal.toNumber() * 10 ** -18)
        // )
        // console.log('bigNumExchangeBal1', bigNumExchangeBal)
        // console.log('bigNumExchangeBal2', bigNumExchangeBal.toBigInt())
        // console.log('bigNumExchangeBal3', bigNumExchangeBal.toNumber())
        const bigNumValInString = bigNumExchangeBal.toString()
        store.dispatch(
          setWalletBalBuyFlow(
            bigNumValInString.slice(0, bigNumValInString.length - 18)
          )
        )
      }

      // const tokenAddress = 'REPLACE_WITH_ERC20_TOKEN_ADDRESS'
      // const walletAddress = 'REPLACE_WITH_WALLET_ADDRESS'

      // // The minimum ABI to get ERC20 Token balance
      // const minABI = [
      //   // balanceOf
      //   {
      //     constant: true,
      //     inputs: [{ name: '_owner', type: 'address' }],
      //     name: 'balanceOf',
      //     outputs: [{ name: 'balance', type: 'uint256' }],
      //     type: 'function',
      //   },
      //   // decimals
      //   {
      //     constant: true,
      //     inputs: [],
      //     name: 'decimals',
      //     outputs: [{ name: '', type: 'uint8' }],
      //     type: 'function',
      //   },
      // ]

      // // Get ERC20 Token contract instance
      // const contract = new Web3.eth.contract(minABI).at(tokenAddress);

      // // Call balanceOf function
      // contract.balanceOf(walletAddress, (error, balance) => {
      //   // Get decimals
      //   contract.decimals((error, decimals) => {
      //     // calculate a balance
      //     balance = balance.div(10**decimals);
      //     console.log(balance.toString());
      //   });
      // });
    } catch (err) {
      console.log(err)
    }
  }
}

export async function getBalanceOnExchangeBuyFlow() {
  const accountAddress = store.getState()?.wallet?.accountAddress
  if (accountAddress) {
    try {
      const exchangeContractFunctions = await BlockchainCalls.exchange_caller()
      const exchangeBal = await exchangeContractFunctions.balances(
        accountAddress,
        INR_USD_TOKEN_ADDRESS
      )
      const bigNumExchangeBal = ethers.BigNumber.from(exchangeBal)
      store.dispatch(setExchangeBalBuyFlow(bigNumExchangeBal.toNumber()))
    } catch (err) {
      console.log(err)
    }
  }
}

export async function getApprovedTokensBalanceBuyFlow() {
  const accountAddress = store.getState()?.wallet?.accountAddress
  try {
    const tokenContractFunctions = await BlockchainCalls.inr_usd_token_caller()
    const approvedTokensBalRes = await tokenContractFunctions.allowance(
      accountAddress,
      EXCHANGE_CONTRACT_ADDRESS
    )
    if (approvedTokensBalRes) {
      const bigNumExchangeBal = ethers.BigNumber.from(approvedTokensBalRes)
      store.dispatch(setApprovedTokensBalBuyFlow(bigNumExchangeBal.toNumber()))
    }
  } catch (err) {
    console.log(err)
  }
}

export async function requestApprovalForTokenBuy() {
  const buyQuantityForApprove =
    store.getState()?.marketplaceBuyFlow?.buyQuantityForApprove

  try {
    store.dispatch(setMarketplaceLoading(true))
    // store.dispatch(setOnGoingApproveRedux(null))
    setLocalItem(LOCAL_STORAGE_VARS?.ON_GOING_APPROVE_DATA_BUY_FLOW, null)
    setLocalItem(LOCAL_STORAGE_VARS?.BUY_QUANTITY_FOR_APPROVE, null)
    const inrContractFunctions = await BlockchainCalls.inr_usd_token_caller()
    const approveFnRes = await inrContractFunctions.approve(
      EXCHANGE_CONTRACT_ADDRESS, // exchangeAddress
      Number(buyQuantityForApprove)
    )
    if (approveFnRes) {
      setLocalItem(
        LOCAL_STORAGE_VARS?.ON_GOING_APPROVE_DATA_BUY_FLOW,
        approveFnRes
      )
      setLocalItem(
        LOCAL_STORAGE_VARS?.BUY_QUANTITY_FOR_APPROVE,
        buyQuantityForApprove
      )
      store.dispatch(setOnGoingApproveReduxBuyFlow(approveFnRes))
      store.dispatch(setBuyQuantityForApprove(0))

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

export async function depositERC20BuyFlow() {
  const accountAddress = store.getState()?.wallet?.accountAddress
  const buyQuantityForDeposit =
    store.getState()?.marketplaceBuyFlow?.buyQuantityForDeposit

  const payload = {
    _user: accountAddress,
    _token: INR_USD_TOKEN_ADDRESS,
    _amount: Number(buyQuantityForDeposit),
    _expectedAmount: Number(buyQuantityForDeposit),
  }
  try {
    store.dispatch(setMarketplaceLoading(true))
    const depositERC20Res = await marketplaceCalls.depositERC20(payload)
    if (depositERC20Res.success) {
      const txId = depositERC20Res?.data?.transactionId

      getApprovedTokensBalanceBuyFlow()
      getBalanceOnExchangeBuyFlow()
      store.dispatch(setBuyQuantityForDeposit(0))
      store.dispatch(setOnGoingDepositTxIdReduxBuyFlow(txId))
      setLocalItem(LOCAL_STORAGE_VARS.ON_GOING_DEPOSIT_TX_ID_BUY_FLOW, txId)
      setLocalItem(
        LOCAL_STORAGE_VARS.BUY_QUANTITY_FOR_DEPOSIT,
        buyQuantityForDeposit
      )
      checkBlockchainTransactionComplete(
        txId,
        MARKETPLACE_CALL_TYPES.DEPOSIT_BUY_FLOW,
        setOngoingDepositTransactionBuyFlow
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

export async function createBuyOrder() {
  try {
    store.dispatch(setMarketplaceLoading(true))
    const accountAddress = store.getState()?.wallet?.accountAddress
    const buyOrderPayloadOfferHashes =
      store.getState()?.marketplaceBuyFlow?.buyOrderPayloadOfferHashes
    const buyOrderPayloadAmountsToTake =
      store.getState()?.marketplaceBuyFlow?.buyOrderPayloadAmountsToTake
    const buyOrderPayloadUUID =
      store.getState()?.marketplaceBuyFlow?.buyOrderPayloadUUID
    const totalAmountForBuying =
      store.getState()?.marketplaceBuyFlow?.totalAmountForBuying
    const temp = parseInt(totalAmountForBuying.toString())

    // const nonce = await provider.getTransactionCount(accountAddress)
    const randomNumber = new Date().getTime()
    const hashAndVRS = await getHashAndVRS('buy', randomNumber)

    if (hashAndVRS) {
      const { hash, v, r, s } = hashAndVRS
      const payload = {
        uuid: buyOrderPayloadUUID, //!todo
        filler: accountAddress, //!todo
        _offerHashes: buyOrderPayloadOfferHashes,
        _amountsToTake: buyOrderPayloadAmountsToTake,
        _feeAsset: INR_USD_TOKEN_ADDRESS, //inr_usd token address
        // _feeAmount: Number(totalAmountForBuying),
        _feeAmount: temp,
        _nonce: randomNumber, //like in submit see getnonce()
        hash: hash,
        _v: v,
        _r: r,
        _s: s,
      }
      const createOrderRes = await marketplaceCalls.fillOrder(payload)
      if (createOrderRes.success) {
        // store.dispatch(setIntervalTime(4))`

        getBalanceOnExchangeBuyFlow()
        getApprovedTokensBalanceBuyFlow()

        store.dispatch(setBuyOrderPayloadOfferHashes(null))
        store.dispatch(setBuyOrderPayloadAmountsToTake(null))

        const txId = createOrderRes?.data?.transactionHash
        const totalBuyQuantity = buyOrderPayloadAmountsToTake.reduce(
          (prev: any, curr: any) => {
            return (prev += curr)
          },
          0
        )
        store.dispatch(setBuyOrderPayloadUUID(null))
        store.dispatch(setBuyOrderPayloadOfferHashes(null))
        store.dispatch(setBuyOrderPayloadAmountsToTake(null))
        store.dispatch(setOnGoingBuyOrderTxIdRedux(txId))
        setLocalItem(LOCAL_STORAGE_VARS.ON_GOING_BUY_ORDER_TX_ID, txId || '')
        setLocalItem(
          LOCAL_STORAGE_VARS.BUY_QUANTITY_FOR_BUY_ORDER,
          totalBuyQuantity
        )
        checkBlockchainTransactionComplete(
          txId,
          MARKETPLACE_CALL_TYPES.CREATE_BUY_ORDER,
          setOngoingBuyOrderTransaction
        )
        // alert('Buy order created')

        store.dispatch(
          setMarketplaceModalMessage(
            'Buy order created. Please check once blockchain call is completed from Ongoing Buy Order tab.'
          )
        )
        store.dispatch(setShowMarketplaceMsgModal(true))
      } else {
        alert(createOrderRes.error)
      }
    }
  } catch (err) {
    console.log('Error in marketplaceCalls.createOrder api : ' + err)
  } finally {
    store.dispatch(setMarketplaceLoading(false))
  }
}

export async function getBuyOrdersListData() {
  const accountAddress = store.getState()?.wallet?.accountAddress
  try {
    store.dispatch(setBuyOrdersListDataLoading(true))
    const buyOrderRes = await marketplaceCalls.getBuyOrder(accountAddress)
    if (buyOrderRes.success && buyOrderRes.data.length) {
      store.dispatch(setBuyOrdersListData(buyOrderRes))
    }
  } catch (err) {
    console.log('Error in marketplaceCalls.getBuyOrder api : ', err)
  } finally {
    store.dispatch(setBuyOrdersListDataLoading(false))
  }
}
