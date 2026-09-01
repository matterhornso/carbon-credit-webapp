import { eventsCalls } from '../api/eventsCalls.api'
import { getLocalItem } from './Storage'
import { handleApiError } from './errorHandler'

export const updateWalletBalance = async () => {
  const publicKey = getLocalItem('userDetails2')?.eth_active_pub_key
  if (publicKey) {
    try {
      const res = await eventsCalls.updateWalletBalance(publicKey)
    } catch (e) {
      handleApiError(e, { action: 'eventsCalls.updateWalletBalance', silent: true })
    }
  }
}
