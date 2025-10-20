import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api/api"
import type { Product } from "../components/ProductCard"

export const getComparableProducts = createAsyncThunk(
  "compare/getComparableProducts",
  async () => {
    const response = await api.get<Product[]>("/comparableProducts")
    console.log(response.data, "comparable products 1111111111111111")
    return response.data
  },
)

export const addToCompare = createAsyncThunk(
  "compare/addCompareProduct",
  async (product: Product) => {
    const response = await api.post<Product>("/comparableProducts", product)
    console.log(response.data, "comparable products adds")
    return response.data
  },
)

export const removeCompareProduct = createAsyncThunk(
  "compare/removeFromCompare",
  async (id: number) => {
    const response = await api.delete<Product>(`/comparableProducts/${id}`)
    console.log(response.data, "comparable products removes")
    return response.data
  },
)

const CompareSlice = createSlice({
  name: "compareProducts",
  initialState: {
    comparableProducts: [] as Product[],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getComparableProducts.pending, state => {
      console.log("pending")
      state.comparableProducts = []
    })
    builder.addCase(getComparableProducts.fulfilled, (state, action) => {
      state.comparableProducts = action.payload
      console.log("fulfilled")
      console.log(action.payload, "comparable products in slice")
    })
    builder.addCase(getComparableProducts.rejected, (state, action) => {
      state.comparableProducts = []
      console.log("rejected")
      console.error("Failed to load comparable products:", action.error.message)
    })
    builder.addCase(addToCompare.pending, state => {
      state.comparableProducts = []
    })
    builder.addCase(addToCompare.fulfilled, (state, action) => {
      const exists = state.comparableProducts.some(
        product => product.id === action.payload.id,
      )
      if (!exists)
        state.comparableProducts.push({ isCompared: true, ...action.payload })
    })
    builder.addCase(addToCompare.rejected, (state, action) => {
      state.comparableProducts = []
      console.error("Failed to add product to compare:", action.error.message)
    })

    builder.addCase(removeCompareProduct.pending, state => {
      state.comparableProducts = []
      //TODO
    })
    builder.addCase(removeCompareProduct.fulfilled, (state, action) => {
      state.comparableProducts = state.comparableProducts.filter(
        product => product.id !== action.payload.id,
      )
    })
    builder.addCase(removeCompareProduct.rejected, (state, action) => {
      state.comparableProducts = []
      console.error(
        "Failed to remove product from compare:",
        action.error.message,
      )
    })
  },
})

export const compareReducers = CompareSlice.reducer
