import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { quotesApiSlice } from "../features/quotes/quotesApiSlice"
import { categoriesReducer } from "./slices/categorySlice"
import { productsReducer } from "./slices/productsSlice"

const rootReducer = combineSlices({
  categories: categoriesReducer,
  products: productsReducer,
})
export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,

    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(quotesApiSlice.middleware)
    },
    preloadedState,
  })

  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
