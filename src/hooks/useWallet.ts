import { useAppDispatch } from './reduxHooks'
import { getLocalItem } from '../utils/Storage'
import { eventsCalls } from '../api/eventsCalls.api'
import {
  setUpdateWalletLoading,
  setWalletUpdated,
} from '../redux/Slices/walletSlice'
import { handleApiError } from '../utils/errorHandler'

export function useWallet() {
  const dispatch = useAppDispatch()

  async function updateWalletBalance(fromWalletPage = false) {
    const publicKey = getLocalItem('userDetails2')?.eth_active_pub_key
    if (publicKey) {
      dispatch(setUpdateWalletLoading(true))
      try {
        const res = await eventsCalls.updateWalletBalance(publicKey)
        dispatch(setWalletUpdated(true))
      } catch (e) {
        handleApiError(e, { action: 'eventsCalls.updateWalletBalance', silent: true })
      } finally {
        dispatch(setUpdateWalletLoading(false))
      }
    }
  }
  return { updateWalletBalance }
}
