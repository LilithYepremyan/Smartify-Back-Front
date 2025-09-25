import { setSelectedCategory } from "../app/slices/categorySlice"
import type { AppDispatch } from "../app/store"

export const handleBrandClick = (
  dispatch: AppDispatch,
  category: string,
  brand: string,
  color: string,
  callback: (category: string, brand: string, color: string) => void,
) => {
  dispatch(setSelectedCategory(category))//string
  callback(category, brand, color)
}
