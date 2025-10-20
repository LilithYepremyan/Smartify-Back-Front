import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { Product } from "../components/ProductCard"
import api from "../../api/api"

export const getAllFavorites = createAsyncThunk<Product[]>(
  "favorites/getAllFavorites",
  async () => {
    const response = await api.get<Product[]>("/favorites")
    console.log(response.data, "favorites")
    return response.data
  },
)

export const addToFavorites = createAsyncThunk(
  "favorites/addFavorite",
  async (product: Product) => {
    const response = await api.post<Product>("/favorites", product)
    return response.data
  },
)

export const removeFromFavorites = createAsyncThunk(
  "favorites/removeFavorite",
  async (id: number) => {
    const response = await api.delete<Product>(`/favorites/${id}`)
    console.log(response.data, "removed from favorites")
    return id
  },
)

type FavoritesState = {
  favorites: Product[]
  loading: boolean
  error: string | null
}

const initialState: FavoritesState = {
  favorites: [],
  loading: false,
  error: null,
}

const FavoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload
    })
    builder.addCase(getAllFavorites.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? "Failed to load favorites"
    })
    builder.addCase(addToFavorites.fulfilled, (state, action) => {
      const exists = state.favorites.some(
        favorite => favorite.id === action.payload.id,
      )
      if (!exists) state.favorites.push({ isFavorite: true, ...action.payload })
    })
    builder.addCase(addToFavorites.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? "Failed to add to favorites"
    })
    builder.addCase(removeFromFavorites.fulfilled, (state, action) => {
      state.favorites = state.favorites.filter(
        favorite => favorite.id !== action.payload,
      )
    })
    builder.addCase(removeFromFavorites.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? "Failed to remove from favorites"
    })
  },
})

export const favoritesReducer = FavoritesSlice.reducer
