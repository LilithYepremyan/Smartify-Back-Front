import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { categoriesReducer } from "./slices/categorySlice"
import { productsReducer } from "./slices/productsSlice"
import { favoritesReducer } from "./slices/favoritesSlice"
import { compareReducers } from "./slices/compareSlice"

const rootReducer = combineSlices({
  categories: categoriesReducer,
  products: productsReducer,
  favorites: favoritesReducer,
  compare: compareReducers,
})

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
  })

  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
