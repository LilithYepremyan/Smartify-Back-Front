import { Box } from "@mui/material"
import CategorySelect from "./CategorySelect"
import CategoryAccordion from "./CategoryAccordion"
import ColorFilter from "./ColorFilter"
import BrandFilter from "./BrandFilter"
import RangeSlider from "./RangeSlider"
import useIsMobile from "../hooks/useIsMobile"
import { useAppDispatch, useAppSelector } from "../hooks"
import {
  setSelectedBrand,
  setSelectedCategory,
  setSelectedColor,
} from "../slices/categorySlice"
import { useNavigate } from "react-router-dom"

const SideBar = () => {
  const isMobile = useIsMobile()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const selectedCategory = useAppSelector(
    state => state.categories.selectedCategory,
  )
  const selectedColor = useAppSelector(state => state.categories.selectedColor)
  const selectedBrand = useAppSelector(state => state.categories.selectedBrand)

  const showProductList = (
    categoryName: string,
    brandName: string,
    color: string,
  ) => {
    const params = new URLSearchParams()

    if (categoryName) {
      dispatch(setSelectedCategory(categoryName))
      params.set("category", categoryName)
    }
    if (brandName) {
      dispatch(setSelectedBrand(brandName))
      params.set("brand", brandName)
    }
    if (color) {
      dispatch(setSelectedColor(color))
      params.set("color", color)
    }
    void navigate({ search: params.toString() })
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "30%",
        display: "flex",
        flexDirection: "column",
        gap: { xs: 1, md: 2 },
        p: { xs: 1, md: 2 },
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      {!isMobile ? (
        <CategorySelect
          onBrandClick={(
            categoryName: string,
            brandName: string,
            color: string,
          ) => {
            showProductList(categoryName, brandName, color)
          }}
        />
      ) : (
        <CategoryAccordion
          onBrandClick={(
            categoryName: string,
            brandName: string,
            color: string,
          ) => {
            showProductList(categoryName, brandName, color)
          }}
        />
      )}

      <ColorFilter
        onColorClick={(colorName: string) => {
          showProductList(selectedCategory, selectedBrand, colorName)
        }}
      />
      <BrandFilter
        onBrandClick={(brandName: string) => {
          showProductList(selectedCategory, brandName, selectedColor)
        }}
      />
      <RangeSlider />
    </Box>
  )
}

export default SideBar
