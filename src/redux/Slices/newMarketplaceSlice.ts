import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NewMarketplaceReducerInterface {
  currentProjectUUID: string
  carbonTokenSymbol: string
  carbonTokenAddress: string
  carbonTokenBalances: any
  inrTokenAddress: string
  inrTokenBalances: any
  sellQuantity: number
  sellWantAmount: number
  sellOrdersList: any
  sellOrdersLoading: boolean
  buyQuantity: number
  buyUnitPrice: number
  totalAmountForBuying: number
  buyOrderPayloadOfferHashes: any
  buyOrderPayloadAmountsToTake: any
  buyOrderPayloadUUID: any
  tokenBalanceLoading: boolean
  projectsTokenLoading: boolean
  createSellOrderLoading: boolean
  createBuyOrderLoading: boolean
  openOrders: any
  checkFulfilLoading: boolean
  closedOrders: any
  buyOrders: any
  openOrdersLoading: boolean
  buyOrdersLoading: boolean
  cancelOrderLoading: boolean
  ordersTabIndex: number
  openWithdrawModal: boolean
  withdrawTokenType: string
  withdrawTokenAddress: string
  withdrawAmount: number
  withdrawToken: string
  withdrawLoading: boolean
  openSnackbar: boolean
  snackbarErrorMsg: string
}
const initialState: NewMarketplaceReducerInterface = {
  currentProjectUUID: '',
  carbonTokenSymbol: '',
  carbonTokenAddress: '',
  carbonTokenBalances: null,
  inrTokenAddress: '',
  inrTokenBalances: null,
  sellQuantity: 0,
  sellWantAmount: 0,
  sellOrdersList: null,
  sellOrdersLoading: false,
  buyQuantity: 0,
  buyUnitPrice: 0,
  totalAmountForBuying: 0,
  buyOrderPayloadOfferHashes: null,
  buyOrderPayloadAmountsToTake: null,
  buyOrderPayloadUUID: null,
  tokenBalanceLoading: false,
  projectsTokenLoading: false,
  createSellOrderLoading: false,
  createBuyOrderLoading: false,
  checkFulfilLoading: false,
  openOrders: [],
  closedOrders: [],
  buyOrders: [],
  openOrdersLoading: false,
  buyOrdersLoading: false,
  cancelOrderLoading: false,
  ordersTabIndex: 1,
  openWithdrawModal: false,
  withdrawTokenType: '',
  withdrawTokenAddress: '',
  withdrawAmount: 0,
  withdrawToken: '',
  withdrawLoading: false,
  openSnackbar: false,
  snackbarErrorMsg: '',
}

const newMarketplaceReducer = createSlice({
  name: 'newMarketplaceReducer',
  initialState,
  reducers: {
    setCurrentProjectUUID: (state, action: PayloadAction<any>) => {
      state.currentProjectUUID = action.payload
    },
    setCarbonTokenSymbol: (state, action: PayloadAction<any>) => {
      state.carbonTokenSymbol = action.payload
    },
    setCarbonTokenAddress: (state, action: PayloadAction<any>) => {
      state.carbonTokenAddress = action.payload
    },
    setCarbonTokenBalances: (state, action: PayloadAction<any>) => {
      state.carbonTokenBalances = action.payload
    },
    setINRTokenAddress: (state, action: PayloadAction<any>) => {
      state.inrTokenAddress = action.payload
    },
    setINRTokenBalances: (state, action: PayloadAction<any>) => {
      state.inrTokenBalances = action.payload
    },
    setSellQuantity: (state, action: PayloadAction<any>) => {
      state.sellQuantity = action.payload
    },
    setSellWantAmount: (state, action: PayloadAction<any>) => {
      state.sellWantAmount = action.payload
    },
    setBuyQuantity: (state, action: PayloadAction<any>) => {
      state.buyQuantity = action.payload
    },
    setSellOrdersList: (state, action: PayloadAction<any>) => {
      state.sellOrdersList = action.payload
    },
    setSellOrdersLoading: (state, action: PayloadAction<any>) => {
      state.sellOrdersLoading = action.payload
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
    setProjectsTokenLoading: (state, action: PayloadAction<any>) => {
      state.projectsTokenLoading = action.payload
    },
    setTokenBalanceLoading: (state, action: PayloadAction<any>) => {
      state.tokenBalanceLoading = action.payload
    },
    setCreateSellOrderLoading: (state, action: PayloadAction<any>) => {
      state.createSellOrderLoading = action.payload
    },
    setCreateBuyOrderLoading: (state, action: PayloadAction<any>) => {
      state.createBuyOrderLoading = action.payload
    },
    setCheckFulfilLoading: (state, action: PayloadAction<any>) => {
      state.checkFulfilLoading = action.payload
    },
    setOpenOrders: (state, action: PayloadAction<any>) => {
      state.openOrders = action.payload
    },
    setClosedOrders: (state, action: PayloadAction<any>) => {
      state.closedOrders = action.payload
    },
    setBuyOrders: (state, action: PayloadAction<any>) => {
      state.buyOrders = action.payload
    },
    setOpenOrdersLoading: (state, action: PayloadAction<any>) => {
      state.openOrdersLoading = action.payload
    },
    setBuyOrdersLoading: (state, action: PayloadAction<any>) => {
      state.buyOrdersLoading = action.payload
    },
    setCancelOrderLoading: (state, action: PayloadAction<any>) => {
      state.cancelOrderLoading = action.payload
    },
    setOrdersTabIndex: (state, action: PayloadAction<any>) => {
      state.ordersTabIndex = action.payload
    },
    setWithdrawTokenType: (state, action: PayloadAction<any>) => {
      state.withdrawTokenType = action.payload
    },
    setOpenWithdrawModal: (state, action: PayloadAction<any>) => {
      state.openWithdrawModal = action.payload
    },
    setWithdrawTokenAddress: (state, action: PayloadAction<any>) => {
      state.withdrawTokenAddress = action.payload
    },
    setWithdrawAmount: (state, action: PayloadAction<any>) => {
      state.withdrawAmount = action.payload
    },
    setWithdrawToken: (state, action: PayloadAction<any>) => {
      state.withdrawToken = action.payload
    },
    setWithdrawLoading: (state, action: PayloadAction<any>) => {
      state.withdrawLoading = action.payload
    },
    setOpenSnackbar: (state, action: PayloadAction<any>) => {
      state.openSnackbar = action.payload
    },
    setSnackbarErrorMsg: (state, action: PayloadAction<any>) => {
      state.snackbarErrorMsg = action.payload
    },
    resetNewMarketplaceReducer: () => initialState,
  },
})

export const {
  setCurrentProjectUUID,
  setCarbonTokenSymbol,
  setCarbonTokenAddress,
  setCarbonTokenBalances,
  setINRTokenAddress,
  setINRTokenBalances,
  setSellQuantity,
  setSellWantAmount,
  setBuyQuantity,
  setSellOrdersList,
  setSellOrdersLoading,
  setBuyUnitPrice,
  setTotalAmountForBuying,
  setBuyOrderPayloadOfferHashes,
  setBuyOrderPayloadAmountsToTake,
  setBuyOrderPayloadUUID,
  setTokenBalanceLoading,
  setProjectsTokenLoading,
  setCreateSellOrderLoading,
  setCreateBuyOrderLoading,
  setCheckFulfilLoading,
  setOpenOrders,
  setClosedOrders,
  setBuyOrders,
  setOpenOrdersLoading,
  setBuyOrdersLoading,
  setCancelOrderLoading,
  setOrdersTabIndex,
  setOpenWithdrawModal,
  setWithdrawTokenType,
  setWithdrawTokenAddress,
  setWithdrawAmount,
  setWithdrawToken,
  setWithdrawLoading,
  setOpenSnackbar,
  setSnackbarErrorMsg,
  resetNewMarketplaceReducer,
} = newMarketplaceReducer.actions

export default newMarketplaceReducer.reducer
