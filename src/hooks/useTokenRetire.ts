import { useAppDispatch, useAppSelector } from "./reduxHooks"
import { ethers } from 'ethers'
import BlockchainCalls from '../blockchain/Blockchain'
import {
    setBuyerTokenBalance,
    setTokensApprovedForRetiring,
  } from '../redux/Slices/tokenRetireSlice'

export function useTokenRetire(){

    const dispatch = useAppDispatch()
    const accountAddress = useAppSelector(({wallet})=>wallet?.accountAddress)

    const getTokensBalance = async () =>{
        // const accountAddress = store.getState()?.wallet?.accountAddress
        try {
          if (accountAddress) {
            const tokenContractFunctions = await BlockchainCalls.token_caller()
            const balanceRes = await tokenContractFunctions.balanceOf(accountAddress)
      
            if (balanceRes) {
              const bal =
                Math.round(Number(balanceRes?.toString()) * 10 ** -18 * 1000) / 1000
              dispatch(setBuyerTokenBalance(bal))
              return bal
            }
          }
        } catch (err) {
          console.log('error', err)
        }
      }

      const getApprovedTokensBalance= async ()=> {
        // const accountAddress = store.getState()?.wallet?.accountAddress
        if (accountAddress) {
          try {
            const tokenContractFunctions = await BlockchainCalls.token_caller()
            const approvedTokensBalRes = await tokenContractFunctions.allowance(
              accountAddress,
              '0x92e8DA2ca27997e0FC6286e7B252cb9175d2BD37' //Exchange address for retirement
            )
            if (approvedTokensBalRes) {
              const bigNumExchangeBal = ethers.BigNumber.from(approvedTokensBalRes)
              dispatch(
                setTokensApprovedForRetiring(bigNumExchangeBal.toNumber())
              )
            }
          } catch (err) {
            console.log('Error in getting buyer allowance :', err)
          }
        }
      }

    return{getTokensBalance,
        getApprovedTokensBalance}
}