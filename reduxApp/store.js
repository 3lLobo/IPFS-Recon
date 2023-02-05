import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { bridgeApi } from './bridgeApi'
import ipfsReduxReducer from './ipfsReduxSlice'
import themeSliceReducer from './themeSlice'
import cortxReducer from './cortxSlice'
import { enableMapSet } from 'immer'

import { vtApi } from './vtApi'

export const store = configureStore({
  reducer: {
    ipfsRedux: ipfsReduxReducer,
    cortx: cortxReducer,
    theme: themeSliceReducer,
    [bridgeApi.reducerPath]: bridgeApi.reducer,
    [vtApi.reducerPath]: vtApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(bridgeApi.middleware, vtApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
enableMapSet()
