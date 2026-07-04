import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AdminDraftEditInterface {
  adminDraftUpdates: any
  adminUpdatedSubSections: any
}
const initialState: AdminDraftEditInterface = {
  adminDraftUpdates: {},
  adminUpdatedSubSections: null,
}
const adminDraftEdit = createSlice({
  name: 'adminDraftEdit',
  initialState,
  reducers: {
    setAdminDraftEditPayload: (state, action: PayloadAction<any>) => {
      state.adminDraftUpdates = action.payload
    },
    setAdminUpdatedSubSections: (state, action: PayloadAction<any>) => {
      state.adminUpdatedSubSections = action.payload
    },
  },
})

export const { setAdminDraftEditPayload, setAdminUpdatedSubSections } =
  adminDraftEdit.actions

export default adminDraftEdit.reducer
