import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BuyFlowReducerInterface {
  buyQuantityForApprove: number
  buyQuantityForDeposit: number
  buyQuantityForBuyOrder: number
  buyUnitPrice: number
  totalAmountForBuying: number
  buyOrderPayloadOfferHashes: any
  buyOrderPayloadAmountsToTake: any
  buyOrderPayloadUUID: any
  onGoingDepositTxIdReduxBuyFlow: any
  onGoingApproveReduxBuyFlow: any
  onGoingBuyOrderTxIdRedux: any
  dataToMakeBuyCall: any
  dataToMakeDepositCallBuyFlow: any
  dataToMakeCreateBuyOrderCall: any
  walletBalBuyFlow: any
  exchangeBalBuyFlow: any
  approvedTokensBalBuyFlow: any
  ongoingApproveTransactionBuyFlow: any
  ongoingDepositTransactionBuyFlow: any
  ongoingBuyOrderTransaction: any
  buyOrdersListData: any
  buyOrdersListDataLoading: boolean
}
const initialState: BuyFlowReducerInterface = {
  buyQuantityForApprove: 0,
  buyQuantityForDeposit: 0,
  buyQuantityForBuyOrder: 0,
  buyUnitPrice: 0,
  totalAmountForBuying: 0,
  buyOrderPayloadOfferHashes: null,
  buyOrderPayloadAmountsToTake: null,
  buyOrderPayloadUUID: null,
  onGoingApproveReduxBuyFlow: null,
  onGoingDepositTxIdReduxBuyFlow: null,
  onGoingBuyOrderTxIdRedux: null,
  dataToMakeBuyCall: null,
  dataToMakeDepositCallBuyFlow: null,
  dataToMakeCreateBuyOrderCall: null,
  walletBalBuyFlow: null,
  exchangeBalBuyFlow: null,
  approvedTokensBalBuyFlow: null,
  ongoingApproveTransactionBuyFlow: null,
  ongoingDepositTransactionBuyFlow: null,
  ongoingBuyOrderTransaction: null,
  buyOrdersListData: null,
  buyOrdersListDataLoading: false,
}
const marketplaceBuyFlow = createSlice({
  name: 'marketplaceBuyFlow',
  initialState,
  reducers: {
    setBuyQuantityForApprove: (state, action: PayloadAction<any>) => {
      state.buyQuantityForApprove = action.payload
    },
    setBuyQuantityForDeposit: (state, action: PayloadAction<any>) => {
      state.buyQuantityForDeposit = action.payload
    },
    setBuyQuantityForBuyOrder: (state, action: PayloadAction<any>) => {
      state.buyQuantityForBuyOrder = action.payload
    },
    setBuyUnitPrice: (state, action: PayloadAction<any>) => {
      state.buyUnitPrice = action.payload
    },
    setTotalAmountForBuying: (state, action: PayloadAction<any>) => {
      state.totalAmountForBuying = action.payload
    },
    setBuyOrderPayloadOfferHashes: (state, action: PayloadAction<any>) => {
      state.buyOrderPayloadOfferHashes = action.payload
    },
    setBuyOrderPayloadAmountsToTake: (state, action: PayloadAction<any>) => {
      state.buyOrderPayloadAmountsToTake = action.payload
    },
    setBuyOrderPayloadUUID: (state, action: PayloadAction<any>) => {
      state.buyOrderPayloadUUID = action.payload
    },
    setOnGoingApproveReduxBuyFlow: (state, action: PayloadAction<any>) => {
      state.onGoingApproveReduxBuyFlow = action.payload
    },
    setOnGoingDepositTxIdReduxBuyFlow: (state, action: PayloadAction<any>) => {
      state.onGoingDepositTxIdReduxBuyFlow = action.payload
    },
    setOnGoingBuyOrderTxIdRedux: (state, action: PayloadAction<any>) => {
      state.onGoingBuyOrderTxIdRedux = action.payload
    },
    setDataToMakeDepositCallBuyFlow: (state, action: PayloadAction<any>) => {
      state.dataToMakeDepositCallBuyFlow = action.payload
    },
    setDataToMakeCreateBuyOrderCall: (state, action: PayloadAction<any>) => {
      state.dataToMakeCreateBuyOrderCall = action.payload
    },
    setWalletBalBuyFlow: (state, action: PayloadAction<any>) => {
      state.walletBalBuyFlow = action.payload
    },
    setExchangeBalBuyFlow: (state, action: PayloadAction<any>) => {
      state.exchangeBalBuyFlow = action.payload
    },
    setApprovedTokensBalBuyFlow: (state, action: PayloadAction<any>) => {
      state.approvedTokensBalBuyFlow = action.payload
    },
    setOngoingApproveTransactionBuyFlow: (
      state,
      action: PayloadAction<any>
    ) => {
      state.ongoingApproveTransactionBuyFlow = action.payload
    },
    setOngoingDepositTransactionBuyFlow: (
      state,
      action: PayloadAction<any>
    ) => {
      state.ongoingDepositTransactionBuyFlow = action.payload
    },
    setOngoingBuyOrderTransaction: (state, action: PayloadAction<any>) => {
      state.ongoingBuyOrderTransaction = action.payload
    },
    setBuyOrdersListData: (state, action: PayloadAction<any>) => {
      state.buyOrdersListData = action.payload
    },
    setBuyOrdersListDataLoading: (state, action: PayloadAction<any>) => {
      state.buyOrdersListDataLoading = action.payload
    },
  },
})

export const {
  setBuyQuantityForApprove,
  setBuyQuantityForDeposit,
  setBuyQuantityForBuyOrder,
  setBuyUnitPrice,
  setTotalAmountForBuying,
  setBuyOrderPayloadOfferHashes,
  setBuyOrderPayloadAmountsToTake,
  setBuyOrderPayloadUUID,
  setOnGoingApproveReduxBuyFlow,
  setOnGoingDepositTxIdReduxBuyFlow,
  setOnGoingBuyOrderTxIdRedux,
  setDataToMakeDepositCallBuyFlow,
  setWalletBalBuyFlow,
  setExchangeBalBuyFlow,
  setApprovedTokensBalBuyFlow,
  setDataToMakeCreateBuyOrderCall,
  setOngoingApproveTransactionBuyFlow,
  setOngoingDepositTransactionBuyFlow,
  setOngoingBuyOrderTransaction,
  setBuyOrdersListData,
  setBuyOrdersListDataLoading,
} = marketplaceBuyFlow.actions

export default marketplaceBuyFlow.reducer
