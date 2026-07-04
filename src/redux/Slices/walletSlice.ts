import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WalletReducerInterface {
  loadWallet: boolean
  haveMetamask: boolean
  isConnected: boolean
  accountAddress: string
  accountBalance: string
  alertMessage: string
  walletNetwork: any
  guideOpen: boolean
  loadWalletAlert: boolean
  accountAddressToConnectWith: string
  showAddMetaMaskAccountModal: boolean
  walletAdded: boolean
  updateWalletLoading: boolean
  balance: number
  balanceINR: number
  balanceLoader: boolean
  walletUpdated: boolean
}
const initialState: WalletReducerInterface = {
  loadWallet: false,
  haveMetamask: false,
  isConnected: false,
  accountAddress: '',
  accountBalance: '',
  guideOpen: false,
  loadWalletAlert: false,
  walletNetwork: '',
  alertMessage: '',
  accountAddressToConnectWith: '',
  showAddMetaMaskAccountModal: false,
  walletAdded: false,
  updateWalletLoading: false,
  balance: 0,
  balanceINR: 0,
  balanceLoader: false,
  walletUpdated: false,
}
const wallet = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setLoadWallet: (state, action: PayloadAction<any>) => {
      state.loadWallet = action.payload
    },
    setMetamask: (state, action: PayloadAction<any>) => {
      state.haveMetamask = action.payload
    },

    setConnected: (state, action: PayloadAction<any>) => {
      state.isConnected = action.payload
    },
    setAccountAddress: (state, action: PayloadAction<any>) => {
      state.accountAddress = action.payload
    },
    setAccountBalance: (state, action: PayloadAction<any>) => {
      state.accountBalance = action.payload
    },
    setAlertMessage: (state, action: PayloadAction<any>) => {
      state.alertMessage = action.payload
    },
    setWalletNetwork: (state, action: PayloadAction<any>) => {
      state.walletNetwork = action.payload
    },
    setGuide: (state, action: PayloadAction<any>) => {
      state.guideOpen = action.payload
    },
    setLoadWalletAlert: (state, action: PayloadAction<any>) => {
      state.loadWalletAlert = action.payload
    },
    setAccountAddressToConnectWith: (state, action: PayloadAction<any>) => {
      state.accountAddressToConnectWith = action.payload
    },
    setShowAddMetaMaskAccountModal: (state, action: PayloadAction<any>) => {
      state.showAddMetaMaskAccountModal = action.payload
    },
    setWalletAdded: (state, action: PayloadAction<any>) => {
      state.walletAdded = action.payload
    },
    setUpdateWalletLoading: (state, action: PayloadAction<any>) => {
      state.updateWalletLoading = action.payload
    },
    setbalance: (state, action: PayloadAction<any>) => {
      state.balance = action.payload
    },
    setbalanceINR: (state, action: PayloadAction<any>) => {
      state.balanceINR = action.payload
    },
    setBalanceLoader: (state, action: PayloadAction<any>) => {
      state.balanceLoader = action.payload
    },
    setWalletUpdated: (state, action: PayloadAction<any>) => {
      state.walletUpdated = action.payload
    },
    resetWallet: (state) => {
      state = initialState
    },
  },
})

export const {
  setLoadWallet,
  setMetamask,
  setConnected,
  setAccountAddress,
  setAccountBalance,
  setWalletNetwork,
  setAlertMessage,
  setLoadWalletAlert,
  resetWallet,
  setGuide,
  setAccountAddressToConnectWith,
  setShowAddMetaMaskAccountModal,
  setWalletAdded,
  setUpdateWalletLoading,
  setbalance,
  setbalanceINR,
  setBalanceLoader,
  setWalletUpdated,
} = wallet.actions

export default wallet.reducer
