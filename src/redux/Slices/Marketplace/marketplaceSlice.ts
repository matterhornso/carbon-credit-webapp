import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MarketplaceReducerInterface {
  setIntervalId: any
  intervalTime: number
  ongoingTransaction: any
  marketplaceModalMessage: string
  showMarketplaceMsgModal: boolean
  marketplaceLoading: boolean
}
const initialState: MarketplaceReducerInterface = {
  setIntervalId: null,
  intervalTime: 4,
  ongoingTransaction: null,
  marketplaceModalMessage: '',
  showMarketplaceMsgModal: false,
  marketplaceLoading: false,
}
const marketplace = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
    setSetIntervalId: (state, action: PayloadAction<any>) => {
      state.setIntervalId = action.payload
    },
    setIntervalTime: (state, action: PayloadAction<any>) => {
      state.intervalTime = action.payload
    },
    setOngoingTransaction: (state, action: PayloadAction<any>) => {
      state.ongoingTransaction = action.payload
    },
    setMarketplaceModalMessage: (state, action: PayloadAction<any>) => {
      state.marketplaceModalMessage = action.payload
    },
    setShowMarketplaceMsgModal: (state, action: PayloadAction<any>) => {
      state.showMarketplaceMsgModal = action.payload
    },
    setMarketplaceLoading: (state, action: PayloadAction<any>) => {
      state.marketplaceLoading = action.payload
    },
  },
})

export const {
  setOngoingTransaction,
  setMarketplaceModalMessage,
  setShowMarketplaceMsgModal,
  setMarketplaceLoading,
} = marketplace.actions

export default marketplace.reducer
