import { marketplaceCalls } from '../../api/marketplaceCalls.api'
import {
  setMarketDepthData,
  setMarketDepthDataLoading,
} from '../../redux/Slices/Marketplace/marketDepthSlice'
import { store } from '../../redux/store'

export async function getMarketplaceDepthData() {
  try {
    store.dispatch(setMarketDepthDataLoading(true))
    const sellOrderRes = await marketplaceCalls.getSellOrder()
    if (sellOrderRes.success && sellOrderRes.data.length) {
      const rowValues = sellOrderRes.data.reverse().map((row: any) => {
        const quantity = row?._offerAmount
        const unitPrice = Math.round(row?._wantAmount * 1000) / 1000
        return { price: unitPrice, quantity }
      })
      // setRows(rowValues)
      store.dispatch(setMarketDepthData(rowValues))
    }
  } catch (err) {
    console.log('Error in marketplaceCalls.getSellOrder api : ', err)
  } finally {
    store.dispatch(setMarketDepthDataLoading(false))
  }
}
