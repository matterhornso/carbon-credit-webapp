import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TOKEN_TYPES } from '../../../config/constants.config'

interface SellFlowReducerInterface {
  withdrawQuantity: number
  withdrawTokenType: string
  ongoingWithdrawOrderTransaction: any
}
const initialState: SellFlowReducerInterface = {
  withdrawQuantity: 0,
  withdrawTokenType: TOKEN_TYPES.VCOT,
  ongoingWithdrawOrderTransaction: null,
}
const marketplaceWithdrawFlow = createSlice({
  name: 'marketplaceWithdrawFlow',
  initialState,
  reducers: {
    setWithdrawQuantity: (state, action: PayloadAction<any>) => {
      state.withdrawQuantity = action.payload
    },
    setWithdrawTokenType: (state, action: PayloadAction<any>) => {
      state.withdrawTokenType = action.payload
    },
    setOngoingWithdrawOrderTransaction: (state, action: PayloadAction<any>) => {
      state.ongoingWithdrawOrderTransaction = action.payload
    },
  },
})

export const {
  setWithdrawQuantity,
  setOngoingWithdrawOrderTransaction,
  setWithdrawTokenType,
} = marketplaceWithdrawFlow.actions

export default marketplaceWithdrawFlow.reducer
