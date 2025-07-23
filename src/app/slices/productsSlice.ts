import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async () => {
    const response = await fetch("http://localhost:3004/products")
    return response.json()
  },
)

const ProductsSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllProducts.pending, (state) => {
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
