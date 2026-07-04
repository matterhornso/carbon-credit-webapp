import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface cachingReducerInterface {
  cachedMarketplaceProject: any
  cacheBannerImages:any
}
const initialState: cachingReducerInterface = {
  cachedMarketplaceProject: [],
  cacheBannerImages:{},
}
const marketplaceCaching = createSlice({
  name: 'marketplaceCaching',
  initialState,
  reducers: {
    setCachedMarketplaceProject: (state, action: PayloadAction<any>) => {
      state.cachedMarketplaceProject = action.payload
    },
    setCacheBannerImages: (state, action: PayloadAction<any>) => {
      state.cacheBannerImages = {...state.cacheBannerImages,...action.payload}
    },
  },
})

export const { setCachedMarketplaceProject,setCacheBannerImages } = marketplaceCaching.actions

export default marketplaceCaching.reducer
