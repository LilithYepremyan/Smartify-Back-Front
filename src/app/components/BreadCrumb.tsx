import { Breadcrumbs, Typography, Link } from "@mui/material"
import { useAppSelector } from "../hooks"
import { useTheme } from "@mui/material/styles"
import { Link as RouterLink } from "react-router-dom"

export default function Breadcrumb({ product }) {
  const theme = useTheme()
  const selectedCategory = useAppSelector(
    state => state.categories.selectedCategory,
  )
  const selectedBrand = useAppSelector(state => state.categories.selectedBrand)
  const selectedColor = useAppSelector(state => state.categories.selectedColor)

  if (!product) return null

//   const params = new URLSearchParams(location.search)

  const category = selectedCategory || product.category
  const brand = selectedBrand || product.brand

  const getSearchParams = (include: {
    category?: boolean
    brand?: boolean
    color?: boolean
  }) => {
    console.log(include, "include")
    const params = new URLSearchParams()

    if (include.category && category  && category !=="null") params.set("category", category)
    if (include.brand && brand && brand !=="null") params.set("brand", brand)
    if (include.color && selectedColor ) params.set("color", selectedColor)
    console.log(params, "params")
    return params.toString()
  }

  return (
    <Breadcrumbs sx={{ mt: 2 }} aria-label="breadcrumb" separator=">">
      <Link
        component={RouterLink}
        underline="hover"
        color="inherit"
        to={`/`}
        sx={{ cursor: "pointer" }}
      >
        Home
      </Link>

      {category && (
        <Link
          component={RouterLink}
          underline="hover"
          color="inherit"
          to={`/?${getSearchParams({ category: true })}`}
          sx={{ cursor: "pointer" }}
        >
          {category}
        </Link>
      )}

      {brand && (
        <Link
          underline="hover"
          color="inherit"
          component={RouterLink}
          to={`/?${getSearchParams({ category: true, brand: true })}`}
          sx={{ cursor: "pointer" }}
        >
          {brand}
        </Link>
      )}

      <Typography
        sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
      >
        {product.title}
      </Typography>
    </Breadcrumbs>
  )
}
