import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MarketDepthReducerInterface {
  marketDepthData: any
  marketDepthDataLoading: any
}
const initialState: MarketDepthReducerInterface = {
  marketDepthData: null,
  marketDepthDataLoading: null,
}
const marketDepth = createSlice({
  name: 'marketDepth',
  initialState,
  reducers: {
    setMarketDepthData: (state, action: PayloadAction<any>) => {
      state.marketDepthData = action.payload
    },
    setMarketDepthDataLoading: (state, action: PayloadAction<any>) => {
      state.marketDepthDataLoading = action.payload
    },
  },
})

export const { setMarketDepthData, setMarketDepthDataLoading } =
  marketDepth.actions

export default marketDepth.reducer
