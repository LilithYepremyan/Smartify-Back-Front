import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import type { Product } from "../components/ProductCard"
import type { PayloadAction } from "@reduxjs/toolkit"

export const getAllProducts = createAsyncThunk<Product[]>(
  "product/getAllProducts",
  async () => {
    const response = await axios.get<Product[]>(
      "http://localhost:3004/products",
    )
    return response.data
  },
)

type ProductState = {
  products: Product[]
  loading: boolean
  error: string | null
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
}

const ProductsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllProducts.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(
      getAllProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.loading = false
        state.products = action.payload
      },
    )
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? "Failed to load products"
    })
  },
})

export const productsReducer = ProductsSlice.reducer
