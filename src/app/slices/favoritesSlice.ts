import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import type { Product } from "../components/ProductCard"

export const getAllFavorites = createAsyncThunk(
  "favorites/getAllFavorites",
  async () => {
    const response = await axios.get("http://localhost:3004/favorites")
    return response.data
  },
)

export const addToFavorites = createAsyncThunk(
  "favorites/addFavorite",
  async (product: Product) => {
    const response = await axios.post(
      "http://localhost:3004/favorites",
      product,
    )
    return response.data
  },
)

export const removeFromFavorites = createAsyncThunk(
  "favorites/removeFavorite",
  async (id: number) => {
    const response = await axios.delete(`http://localhost:3004/favorites/${id}`)
    return response.data
  },
)

const FavoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload
    })
    builder.addCase(getAllFavorites.rejected, (state, action) => {})
    builder.addCase(addToFavorites.fulfilled, (state, action) => {
      const exists = state.favorites.some(
        favorite => favorite.id === action.payload.id,
      )
      if (!exists) state.favorites.push({ isFavorite: true, ...action.payload })
    })
    builder.addCase(addToFavorites.rejected, (state, action) => {})
    builder.addCase(removeFromFavorites.fulfilled, (state, action) => {
      state.favorites = state.favorites.filter(
        favorite => favorite.id !== action.payload.id,
      )
    })
    builder.addCase(removeFromFavorites.rejected, (state, action) => {})
  },
})

export const favoritesReducer = FavoritesSlice.reducer
