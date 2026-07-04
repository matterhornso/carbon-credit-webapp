import { eventsCalls } from '../api/eventsCalls.api'
import { getLocalItem } from './Storage'

export const updateWalletBalance = async () => {
  const publicKey = getLocalItem('userDetails2')?.eth_active_pub_key
  if (publicKey) {
    try {
      const res = await eventsCalls.updateWalletBalance(publicKey)
    } catch (e) {
      console.log('Error in eventsCalls.updateWalletBalance api ~ ', e)
    }
  }
}
