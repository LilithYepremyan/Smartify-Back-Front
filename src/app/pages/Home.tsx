import CategorySelect from "../components/CategorySelect"
import ColorFilter from "../components/ColorFilter"
import { Box, CircularProgress, Typography } from "@mui/material"
import { useEffect, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import { getAllProducts } from "../slices/productsSlice"
import {
  setSelectedBrand,
  setSelectedCategory,
  setSelectedColor,
} from "../slices/categorySlice"
import { useTranslation } from "react-i18next"
import ProductCard from "../components/ProductCard"
import useIsMobile from "../hooks/useIsMobile"
import CategoryAccordion from "../components/CategoryAccordion"
import { useNavigate, useSearchParams } from "react-router-dom"
import Breadcrumb from "../components/BreadCrumb"

export default function Home() {
  const { t } = useTranslation()

  const products = useAppSelector(state => state.products.products)
  const selectedCategory = useAppSelector(
    state => state.categories.selectedCategory,
  )
  const selectedBrand = useAppSelector(state => state.categories.selectedBrand)
  const selectedColor = useAppSelector(state => state.categories.selectedColor)
  const loading = useAppSelector(state => state.products.loading)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

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
    navigate({ search: params.toString() })
  }

  const isMobile = useIsMobile()

  useEffect(() => {
    dispatch(getAllProducts())

    const categoryFromURL = searchParams.get("category")
    const brandFromURL = searchParams.get("brand")
    const colorFromURL = searchParams.get("color")

    const noParams = !categoryFromURL && !brandFromURL && !colorFromURL

    if (noParams) {
      dispatch(setSelectedCategory(""))
      dispatch(setSelectedBrand(""))
      dispatch(setSelectedColor(""))
      return
    }

    if (categoryFromURL) dispatch(setSelectedCategory(categoryFromURL))
    if (brandFromURL) dispatch(setSelectedBrand(brandFromURL))
    if (colorFromURL) dispatch(setSelectedColor(colorFromURL))
  }, [dispatch, searchParams])

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchCategory = selectedCategory
        ? product.category === selectedCategory
        : true
      const matchBrand = selectedBrand ? product.brand === selectedBrand : true
      const matchColor = selectedColor
        ? product.colors.some(c => c.color.toLowerCase() === selectedColor)
        : true
      return matchCategory && matchBrand && matchColor
    })
  }, [products,selectedCategory, selectedBrand, selectedColor])

  return (
    <Box
      sx={{
        display: "flex",
        gap: { xs: 0, md: 2 },
        my: { xs: 2, md: 4 },
      }}
    >
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
            ) => showProductList(categoryName, brandName, color)}
          />
        ) : (
          <CategoryAccordion
            onBrandClick={(
              categoryName: string,
              brandName: string,
              color: string,
            ) => showProductList(categoryName, brandName, color)}
          />
        )}
        {/* <CategorySelect
          onBrandClick={(
            categoryName: string,
            brandName: string,
            color: string,
          ) => showProductList(categoryName, brandName, color)}
        /> */}
        <ColorFilter
          onColorClick={(colorName: string) => {
            // dispatch(setSelectedColor(colorName))4
            showProductList(selectedCategory, selectedBrand, colorName)
          }}
        />
      </Box>

      <Box
        sx={{
          width: "70%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", md: "space-between" },
          backgroundColor: "#fff",
          borderRadius: 2,
          p: { xs: 1, md: 2 },
          boxShadow: 2,
          gap: { xs: 1, md: 2 },
        }}
      >
        {/* <Breadcrumb product={products} /> */}
        {loading ? (
          <CircularProgress />
        ) : filteredProducts.length === 0 ? (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", width: "100%", mt: 2 }}
          >
            {t("noProducts")}
          </Typography>
        ) : (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </Box>
    </Box>
  )
}
