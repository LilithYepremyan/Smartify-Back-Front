import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async () => {
    const response = await fetch("http://localhost:3004/categories")
    const data = await response.json()
    return data
  },
)

export const getAllBrands = createAsyncThunk(
  "category/getAllBrands",
  async () => {
    const response = await fetch("http://localhost:3004/brands")
    const data = await response.json()
    return data
  },
)

const CategoriesSlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    brands: [],
    priceRange: [50000, 1000000],
    selectedCategory: null,
    selectedBrand: null,
    selectedColor: null,
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    setSelectedBrand: (state, action) => {
      state.selectedBrand = action.payload
    },
    setSelectedColor: (state, action) => {
      state.selectedColor = action.payload
    },
    resetBrand: state => {
      state.selectedBrand = null
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload
    },
    filterByPrice: state => {
      const [min, max] = state.priceRange
      state.filteredProducts = state.products.filter(
        product => product.price >= min && product.price <= max,
      )
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload
    })
    builder.addCase(getAllBrands.fulfilled, (state, action) => {
      state.brands = action.payload
    })
  },
})

export const categoriesReducer = CategoriesSlice.reducer

export const {
  setSelectedCategory,
  setSelectedBrand,
  setSelectedColor,
  resetBrand,
  setPriceRange,
  filterByPrice,
} = CategoriesSlice.actions
