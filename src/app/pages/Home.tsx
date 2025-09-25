import {
  Badge,
  Box,
  CircularProgress,
  Pagination,
  Typography,
} from "@mui/material"
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
import { useNavigate, useSearchParams } from "react-router-dom"
import SearchInput from "../components/SearchInput"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import SideBar from "../components/SideBar"

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

  const favoritesCount = useAppSelector(
    state => state.favorites.favorites.length,
  )

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const searchQuery = searchParams.get("search")?.toLowerCase() || ""

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getAllBrands())

    const categoryFromURL = searchParams.get("category")
    const brandFromURL = searchParams.get("brand")
    const colorFromURL = searchParams.get("color")
    console.log("categoryFromURL", categoryFromURL)

    const noParams = !categoryFromURL && !brandFromURL && !colorFromURL

    if (noParams) {
      dispatch(setSelectedCategory(null))
      dispatch(setSelectedBrand(""))
      dispatch(setSelectedColor(""))
      return
    }

    if (categoryFromURL) dispatch(setSelectedCategory(categoryFromURL))//string
    if (brandFromURL) dispatch(setSelectedBrand(brandFromURL))
    if (colorFromURL) dispatch(setSelectedColor(colorFromURL))
  }, [dispatch])

  const filteredProducts = useMemo(() => {
    console.log(products, " products")
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
      <SideBar />
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
        <Box sx={{ width: "100%" }}>
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <SearchInput />
                <Badge
                  badgeContent={favoritesCount}
                  color="primary"
                  sx={{ "&:hover": { opacity: 0.8 } }}
                  onClick={() => {void navigate("/favorites"); }}
                >
                  <FavoriteBorderIcon
                    sx={{ fontSize: 32, cursor: "pointer" }}
                  />
                </Badge>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: { xs: "center", md: "space-between" },
                  gap: { xs: 1, md: 4 },
                  mt: 2,
                }}
              >
                {paginatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </Box>
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
