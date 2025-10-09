import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { Brand, Category } from "../components/CategorySelect"
import type { Product } from "../components/ProductCard"
import api from "../../api/api"

export const getAllCategories = createAsyncThunk<Category[]>(
  "category/getAllCategories",
  async () => {
    const response = await api.get<Category[]>("/categories")
    console.log(response.data, "categories")
    return response.data
  },
)

export const getAllBrands = createAsyncThunk<Brand[]>(
  "category/getAllBrands",
  async () => {
    const response = await api.get<Brand[]>("/brands")
    return response.data
  },
)

const CategoriesSlice = createSlice({
  name: "category",
  initialState: {
    categories: [] as Category[],
    brands: [] as Brand[],
    priceRange: [50000, 1000000],
    selectedCategory: null as Category | string | null,
    selectedBrand: null as string | null,
    selectedColor: "",
    filteredProducts: [] as Product[],
    products: [] as Product[],
  },
  reducers: {
    setSelectedCategory: (
      state,
      action: PayloadAction<Category | null | string>,
    ) => {
      state.selectedCategory = action.payload
      console.log("Selected Category in Slice:", state.selectedCategory)
    },
    setSelectedBrand: (state, action: PayloadAction<string | null>) => {
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
