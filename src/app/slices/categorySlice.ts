import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { Brand, Category } from "../components/CategorySelect"
import axios from "axios"

export const getAllCategories = createAsyncThunk<Category[]>(
  "category/getAllCategories",
  async () => {
    const response = await axios.get("http://localhost:3004/categories")
    return response.data
  },
)

export const getAllBrands = createAsyncThunk<Brand[]>(
  "category/getAllBrands",
  async () => {
    const response = await axios.get("http://localhost:3004/brands")
    return response.data
  },
)

const CategoriesSlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    brands: [],
    priceRange: [50000, 1000000],
    selectedCategory: "",
    selectedBrand: "",
    selectedColor: "",
  },
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<Category>) => {
      state.selectedCategory = action.payload
    },
    setSelectedBrand: (state, action: PayloadAction<Brand>) => {
      state.selectedBrand = action.payload
    },
    setSelectedColor: (state, action: PayloadAction<string>) => {
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
    builder.addCase(
      getAllCategories.fulfilled,
      (state, action: PayloadAction<Category[]>) => {
        state.categories = action.payload
      },
    )
    builder.addCase(
      getAllBrands.fulfilled,
      (state, action: PayloadAction<Brand[]>) => {
        state.brands = action.payload
      },
    )
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
