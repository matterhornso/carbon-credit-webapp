import { marketplaceCalls } from '../api/marketplaceCalls.api'
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
  setMarketplaceLoading,
  setMarketplaceModalMessage,
  setShowMarketplaceMsgModal,
} from '../redux/Slices/Marketplace/marketplaceSlice'
import { setOngoingWithdrawOrderTransaction } from '../redux/Slices/Marketplace/marketplaceWithdrawFlowSlice'
// import { store } from '../redux/store'
import { setLocalItem } from '../utils/Storage'
// import {
//   checkBlockchainTransactionComplete,
//   getHashAndVRS,
// } from './marketplace.util'
import { useAppDispatch, useAppSelector } from './reduxHooks'
import { useMarketPlace } from './useMarketPlace'

export const useMarketPlaceWithdraw = ()=>{
    const dispatch = useAppDispatch()
    const {
        checkBlockchainTransactionComplete,
        getHashAndVRS,
    } = useMarketPlace()

    const accountAddress = useAppSelector(({wallet})=>wallet?.accountAddress)
    const withdrawQuantity = useAppSelector(({marketplaceWithdrawFlow})=>marketplaceWithdrawFlow?.withdrawQuantity)
    const withdrawTokenType = useAppSelector(({marketplaceWithdrawFlow})=>marketplaceWithdrawFlow?.withdrawTokenType)

      async function createWithdrawOrder() {
        try {
          dispatch(setMarketplaceLoading(true))
      
        //   const accountAddress = getState()?.wallet?.accountAddress
        //   const withdrawQuantity =
        //     getState()?.marketplaceWithdrawFlow?.withdrawQuantity
        //   const withdrawTokenType =
        //     getState()?.marketplaceWithdrawFlow?.withdrawTokenType
      
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
              dispatch(
                setMarketplaceModalMessage(
                  'Withdraw order created. Please check once blockchain call is completed from Ongoing Withdraw Order tab.'
                )
              )
              dispatch(setShowMarketplaceMsgModal(true))
            } else {
              alert(withdrawOrderRes?.error)
            }
          }
        } catch (err) {
          console.log('Error in marketplaceCalls.withdraw api : ' + err)
        } finally {
          dispatch(setMarketplaceLoading(false))
        }
      }
      


    return {createWithdrawOrder}
}