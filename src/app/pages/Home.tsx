import CategorySelect from "../components/CategorySelect"
import ColorFilter from "../components/ColorFilter"
import { Box, CircularProgress, Pagination, Typography } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import { getAllProducts } from "../slices/productsSlice"
import {
  getAllBrands,
  setSelectedBrand,
  setSelectedCategory,
  setSelectedColor,
} from "../slices/categorySlice"
import { useTranslation } from "react-i18next"
import ProductCard from "../components/ProductCard"
import useIsMobile from "../hooks/useIsMobile"
import CategoryAccordion from "../components/CategoryAccordion"
import { useNavigate, useSearchParams } from "react-router-dom"
import BrandFilter from "../components/BrandFilter"
import RangeSlider from "../components/RangeSlider"
import SearchInput from "../components/SearchInput"

export default function Home() {
  const { t } = useTranslation()

  const products = useAppSelector(state => state.products.products)
  const selectedCategory = useAppSelector(
    state => state.categories.selectedCategory,
  )
  const selectedBrand = useAppSelector(state => state.categories.selectedBrand)
  const selectedColor = useAppSelector(state => state.categories.selectedColor)
  const loading = useAppSelector(state => state.products.loading)
  const priceRange = useAppSelector(state => state.categories.priceRange)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const searchQuery = searchParams.get("search")?.toLowerCase() || ""

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

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
    dispatch(getAllBrands())

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
      const matchPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1]

      const matchSearch = product.title.toLowerCase().includes(searchQuery)

      return (
        matchCategory && matchBrand && matchColor && matchPrice && matchSearch
      )
    })
  }, [
    products,
    selectedCategory,
    selectedBrand,
    selectedColor,
    priceRange,
    searchQuery,
  ])

  const itemsPerPage = 12
  const totalPages = useMemo(() => {
    return Math.ceil(filteredProducts.length / itemsPerPage)
  }, [filteredProducts])

  const [currentPage, setCurrentPage] = useState(1)

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const handleChange = (_, value: number) => {
    setCurrentPage(value)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

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

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 2,
          width: "100%",
          p: { xs: 1, md: 2 },
          boxShadow: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: { xs: "center", md: "space-between" },
            gap: { xs: 1, md: 4 },
          }}
        >
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
            <>
              <SearchInput />

              {paginatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </>
          )}
        </Box>
        <Pagination
          count={totalPages || 1}
          variant="outlined"
          shape="rounded"
          page={currentPage}
          onChange={handleChange}
        />
      </Box>
    </Box>
  )
}
