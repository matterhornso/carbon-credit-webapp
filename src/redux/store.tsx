import { combineReducers, configureStore } from '@reduxjs/toolkit'
import reducers from './Slices'

import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  whitelist: ["reducers.caching"],
  blacklist: ["reducers.auth"],
  storage,
}

// export const store = configureStore({
//     reducer: reducers,
// })

const rootReducer = combineReducers({
  ...reducers,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  //   reducer: reducers,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
