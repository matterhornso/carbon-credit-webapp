import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { removeAllItem, setLocalItem } from '../../utils/Storage'

interface RegistryReducerInterface {
  registryProjectDetails: any
  openRegistryActionModal: boolean
}
const initialState: RegistryReducerInterface = {
  registryProjectDetails: null,
  openRegistryActionModal: false,
}

const registry = createSlice({
  name: 'registry',
  initialState,
  reducers: {
    setRegistryProjectDetails: (state, action: PayloadAction<any>) => {
      state.registryProjectDetails = action.payload
    },
    setOpenRegistryActionModal: (state, action: PayloadAction<any>) => {
      state.openRegistryActionModal = action.payload
    },
  },
})

export const { setRegistryProjectDetails, setOpenRegistryActionModal } =
  registry.actions

export default registry.reducer
