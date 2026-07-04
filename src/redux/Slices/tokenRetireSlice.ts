import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TokenRetireReducerInterface {
  ongoingApproveTokenRetirement: any
  buyerTokenBalance: number
  tokensToRetire: number
  tokensApprovedForRetiring: number
}
const initialState: TokenRetireReducerInterface = {
  ongoingApproveTokenRetirement: null,
  tokensToRetire: 0,
  tokensApprovedForRetiring: 0,
  buyerTokenBalance: 0,
}
const tokenRetire = createSlice({
  name: 'tokenRetire',
  initialState,
  reducers: {
    setBuyerTokenBalance: (state, action: PayloadAction<any>) => {
      state.buyerTokenBalance = action.payload
    },
    setTokensApprovedForRetiring: (state, action: PayloadAction<any>) => {
      state.tokensApprovedForRetiring = action.payload
    },
    setTokensToRetire: (state, action: PayloadAction<any>) => {
      state.tokensToRetire = action.payload
    },
    setOngoingApproveTokenRetirement: (state, action: PayloadAction<any>) => {
      state.ongoingApproveTokenRetirement = action.payload
    },
  },
})

export const {
  setBuyerTokenBalance,
  setOngoingApproveTokenRetirement,
  setTokensToRetire,
  setTokensApprovedForRetiring,
} = tokenRetire.actions

export default tokenRetire.reducer
