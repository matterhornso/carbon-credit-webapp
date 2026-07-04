import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MaketplaceSellFlowReducerInterface {
  sellQuantityForApprove: number
  sellQuantityForDeposit: number
  sellQuantityForSellOrder: number
  sellUnitPriceForSellOrder: number
  onGoingApproveRedux: any
  onGoingDepositTxIdReduxSellFlow: any
  onGoingSellOrderTxIdRedux: any
  dataToMakeDepositCall: any
  dataToMakeCreateSellOrderCall: any
  walletBal: any
  exchangeBal: any
  approvedTokensBal: any
  ongoingApproveTransactionSellFlow: any
  ongoingDepositTransactionSellFlow: any
  ongoingSellOrderTransaction: any
  sellOrdersList: any
  sellOrdersLoading: boolean
}
const initialState: MaketplaceSellFlowReducerInterface = {
  sellQuantityForApprove: 0,
  sellQuantityForDeposit: 0,
  sellQuantityForSellOrder: 0,
  sellUnitPriceForSellOrder: 0,
  onGoingApproveRedux: null,
  onGoingDepositTxIdReduxSellFlow: null,
  onGoingSellOrderTxIdRedux: null,
  dataToMakeDepositCall: null,
  dataToMakeCreateSellOrderCall: null,
  walletBal: null,
  exchangeBal: null,
  approvedTokensBal: null,
  ongoingApproveTransactionSellFlow: null,
  ongoingDepositTransactionSellFlow: null,
  ongoingSellOrderTransaction: null,
  sellOrdersList: null,
  sellOrdersLoading: false,
}
const marketplaceSellFlow = createSlice({
  name: 'marketplaceSellFlow',
  initialState,
  reducers: {
    setSellQuantityForApprove: (state, action: PayloadAction<any>) => {
      state.sellQuantityForApprove = action.payload
    },
    setSellQuantityForDeposit: (state, action: PayloadAction<any>) => {
      state.sellQuantityForDeposit = action.payload
    },
    setSellQuantityForSellOrder: (state, action: PayloadAction<any>) => {
      state.sellQuantityForSellOrder = action.payload
    },
    setSellUnitPriceForSellOrder: (state, action: PayloadAction<any>) => {
      state.sellUnitPriceForSellOrder = action.payload
    },
    setOnGoingApproveRedux: (state, action: PayloadAction<any>) => {
      state.onGoingApproveRedux = action.payload
    },
    setOnGoingDepositTxIdReduxSellFlow: (state, action: PayloadAction<any>) => {
      state.onGoingDepositTxIdReduxSellFlow = action.payload
    },
    setOnGoingSellOrderTxIdRedux: (state, action: PayloadAction<any>) => {
      state.onGoingSellOrderTxIdRedux = action.payload
    },
    setDataToMakeDepositCall: (state, action: PayloadAction<any>) => {
      state.dataToMakeDepositCall = action.payload
    },
    setDataToMakeCreateSellOrderCall: (state, action: PayloadAction<any>) => {
      state.dataToMakeCreateSellOrderCall = action.payload
    },

    setWalletBal: (state, action: PayloadAction<any>) => {
      state.walletBal = action.payload
    },
    setExchangeBal: (state, action: PayloadAction<any>) => {
      state.exchangeBal = action.payload
    },
    setApprovedTokensBal: (state, action: PayloadAction<any>) => {
      state.approvedTokensBal = action.payload
    },
    setOngoingApproveTransactionSellFlow: (
      state,
      action: PayloadAction<any>
    ) => {
      state.ongoingApproveTransactionSellFlow = action.payload
    },
    setOngoingDepositTransactionSellFlow: (
      state,
      action: PayloadAction<any>
    ) => {
      state.ongoingDepositTransactionSellFlow = action.payload
    },
    setOngoingSellOrderTransaction: (state, action: PayloadAction<any>) => {
      state.ongoingSellOrderTransaction = action.payload
    },
    setSellOrdersList: (state, action: PayloadAction<any>) => {
      state.sellOrdersList = action.payload
    },
    setSellOrdersLoading: (state, action: PayloadAction<any>) => {
      state.sellOrdersLoading = action.payload
    },
  },
})

export const {
  setSellQuantityForApprove,
  setSellQuantityForDeposit,
  setSellQuantityForSellOrder,
  setSellUnitPriceForSellOrder,
  setOnGoingApproveRedux,
  setOnGoingDepositTxIdReduxSellFlow,
  setOnGoingSellOrderTxIdRedux,
  setDataToMakeDepositCall,
  setWalletBal,
  setExchangeBal,
  setApprovedTokensBal,
  setDataToMakeCreateSellOrderCall,
  setOngoingApproveTransactionSellFlow,
  setOngoingDepositTransactionSellFlow,
  setOngoingSellOrderTransaction,
  setSellOrdersList,
  setSellOrdersLoading,
} = marketplaceSellFlow.actions

export default marketplaceSellFlow.reducer
