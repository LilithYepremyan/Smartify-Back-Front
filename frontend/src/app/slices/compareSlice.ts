import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api/api"
import type { Product } from "../components/ProductCard"

export const getComparableProducts = createAsyncThunk(
  "compare/getComparableProducts",
  async () => {
    const response = await api.get<Product[]>("/comparableProducts")
    return response.data
  },
)

export const addToCompare = createAsyncThunk(
  "compare/addCompareProduct",
  async (product: Product) => {
    const response = await api.post<Product>("/comparableProducts", product)
    return response.data
  },
)

export const removeCompareProduct = createAsyncThunk(
  "compare/removeFromCompare",
  async (id: number) => {
    await api.delete<Product>(`/comparableProducts/${id}`)
    return id
  },
)

const CompareSlice = createSlice({
  name: "compareProducts",
  initialState: {
    comparableProducts: [] as Product[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getComparableProducts.pending, state => {
      state.error = null
    })
    builder.addCase(getComparableProducts.fulfilled, (state, action) => {
      state.comparableProducts = action.payload
    })
    builder.addCase(getComparableProducts.rejected, (state, action) => {
      state.loading = false
      console.error("Failed to load comparable products:", action.error.message)
    })
    builder.addCase(addToCompare.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(addToCompare.fulfilled, (state, action) => {
      const exists = state.comparableProducts.some(
        product => product.id === action.payload.id,
      )
      if (!exists)
        state.comparableProducts.push({ isCompared: true, ...action.payload })
    })
    builder.addCase(addToCompare.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? "Failed to add product to compare"
      console.error("Failed to add product to compare:", action.error.message)
    })

    builder.addCase(removeCompareProduct.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(removeCompareProduct.fulfilled, (state, action) => {
      state.comparableProducts = state.comparableProducts.filter(
        product => product.id !== action.payload,
      )
    })
    builder.addCase(removeCompareProduct.rejected, (state, action) => {
      state.loading = false
      state.error =
        action.error.message ?? "Failed to remove product from compare"
      console.error(
        "Failed to remove product from compare:",
        action.error.message,
      )
    })
  },
})

export const compareReducers = CompareSlice.reducer
