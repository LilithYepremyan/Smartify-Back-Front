import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async () => {
    const response = await axios.get("http://localhost:3004/products")
    return response.data
  },
)

interface initialState {
  products: []
  loading: boolean
  error: string | null
}

const ProductsSlice: initialState = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllProducts.pending, state => {
      state.loading = true
    })
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false
      state.products = action.payload
    })
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  },
})

export const productsReducer = ProductsSlice.reducer
