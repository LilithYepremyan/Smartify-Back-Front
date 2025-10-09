import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { Product } from "../components/ProductCard"
import type { PayloadAction } from "@reduxjs/toolkit"
import api from "../../api/api"

export const getAllProducts = createAsyncThunk<Product[]>(
  "product/getAllProducts",
  async () => {
    const response = await api.get<Product[]>(
      "/products",
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
