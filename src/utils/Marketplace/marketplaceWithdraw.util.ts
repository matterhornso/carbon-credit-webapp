import { marketplaceCalls } from '../../api/marketplaceCalls.api'
import {
  LOCAL_STORAGE_VARS,
  MARKETPLACE_CALL_TYPES,
  TOKEN_TYPES,
} from '../../config/constants.config'
import {
  INR_USD_TOKEN_ADDRESS,
  TOKEN_CONTRACT_ADDRESS,
} from '../../config/token.config'
import {
  setMarketplaceLoading,
  setMarketplaceModalMessage,
  setShowMarketplaceMsgModal,
} from '../../redux/Slices/Marketplace/marketplaceSlice'
import { setOngoingWithdrawOrderTransaction } from '../../redux/Slices/Marketplace/marketplaceWithdrawFlowSlice'
import { store } from '../../redux/store'
import { setLocalItem } from '../Storage'
import {
  checkBlockchainTransactionComplete,
  getHashAndVRS,
} from './marketplace.util'

export async function createWithdrawOrder() {
  try {
    store.dispatch(setMarketplaceLoading(true))

    const accountAddress = store.getState()?.wallet?.accountAddress
    const withdrawQuantity =
      store.getState()?.marketplaceWithdrawFlow?.withdrawQuantity
    const withdrawTokenType =
      store.getState()?.marketplaceWithdrawFlow?.withdrawTokenType

    //pseudo nonce
    const randomNumber = new Date().getTime()
    const hashAndVRS = await getHashAndVRS('withdraw', randomNumber)
    if (hashAndVRS) {
      const { hash, v, r, s } = hashAndVRS

      const contractAddress =
        withdrawTokenType === TOKEN_TYPES.VCOT
          ? TOKEN_CONTRACT_ADDRESS
          : INR_USD_TOKEN_ADDRESS

      const payload = {
        hash,
        _withdrawer: accountAddress,
        _token: contractAddress,
        _amount: Number(withdrawQuantity),
        _feeAsset: contractAddress,
        _feeAmount: 1,
        _nonce: randomNumber,
        _v: v,
        _r: r,
        _s: s,
      }

      const withdrawOrderRes = await marketplaceCalls.withdraw(payload)
      if (withdrawOrderRes.success) {
        const txId =
          withdrawOrderRes?.data?.transactions?.withdraw[0]?.transactionHash
        // getBalanceOnExchange()
        // getApprovedTokensBalance()

        setLocalItem(LOCAL_STORAGE_VARS.WITHDRAW_QUANTITY, withdrawQuantity)
        setLocalItem(LOCAL_STORAGE_VARS.ON_GOING_WITHDRAW_ORDER_TX_ID, txId)
        checkBlockchainTransactionComplete(
          txId,
          MARKETPLACE_CALL_TYPES.WITHDRAW_ORDER,
          setOngoingWithdrawOrderTransaction
        )
        // alert('Withdraw order created')
        store.dispatch(
          setMarketplaceModalMessage(
            'Withdraw order created. Please check once blockchain call is completed from Ongoing Withdraw Order tab.'
          )
        )
        store.dispatch(setShowMarketplaceMsgModal(true))
      } else {
        alert(withdrawOrderRes?.error)
      }
    }
  } catch (err) {
    console.log('Error in marketplaceCalls.withdraw api : ' + err)
  } finally {
    store.dispatch(setMarketplaceLoading(false))
  }
}
