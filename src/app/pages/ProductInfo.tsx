import { useLocation, useParams } from "react-router-dom"
import { Box, Typography, Chip, Card, CardMedia, Stack } from "@mui/material"
import ColorDot from "../components/ColorDot"
import { useAppDispatch, useAppSelector } from "../hooks"
import { useTranslation } from "react-i18next"
import theme from "../theme/theme"
import Breadcrumb from "../components/BreadCrumb"
import { useEffect } from "react"
import { setSelectedBrand, setSelectedCategory } from "../slices/categorySlice"
import type { Product } from "../components/ProductCard"
import { Height, OpenInFull, WidthNormal } from "@mui/icons-material"

const ProductPage = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const products = useAppSelector(state => state.products.products)

  const location = useLocation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const category = params.get("category")
    const brand = params.get("brand")

    if (category && category !== "null") dispatch(setSelectedCategory(category))//string
    if (brand && brand !== "null") dispatch(setSelectedBrand(brand))
  }, [location.search, dispatch])

  const product: Product = products.find(
    product => Number(product.id) === Number(id),
  )

  if (!product)
    return <Typography sx={{ mt: 2 }}>{t("productNotFound")}</Typography>

  return (
    <>
      <Breadcrumb product={product} />

      <Box
        sx={{
          p: { xs: 0, md: 4 },
          display: "flex",
          gap: { xs: 1, md: 4 },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card sx={{ width: 300, mb: 2 }}>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.title}
            sx={{ objectFit: "contain", height: 300 }}
          />
        </Card>

        <Box
          sx={{
            textAlign: "left",
            display: "flex",
            alignItems: "start",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{ fontSize: { xs: 16, md: 34 }, fontWeight: "bold" }}
            gutterBottom
          >
            {product.title}
          </Typography>

          <Typography sx={{ mb: 1, fontSize: { xs: 14, md: 16 } }}>
            {`${t("price")}:`} {product.price} {product.currency}
          </Typography>

          {product.inStock ? (
            <Chip
              label={t("inStock")}
              sx={{
                backgroundColor: theme.palette.success.light,
                color: theme.palette.common.white,
                mb: 2,
              }}
            />
          ) : (
            <Chip
              label={t("outOfStock")}
              sx={{
                backgroundColor: theme.palette.error.light,
                color: theme.palette.common.white,
                mb: 2,
              }}
            />
          )}

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Typography variant="body1">{`${t("color")}:`}</Typography>
            {product.colors.map(c => (
              <ColorDot key={c.id} color={c.color} />
            ))}
          </Box>
        </Box>
      </Box>
      <Box>
        <Stack>
          {Object.entries(product.parameters).map(([key, value]) => (
            <Stack
              sx={{ py: 2 }}
              direction={"row"}
              justifyContent={"space-between"}
              borderBottom={1}
              borderColor={"divider"}
              key={key}
            >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {key.toUpperCase()}
              </Typography>
              <Box
                maxWidth={400}
                sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}
              >
                {typeof value === "object" &&
                !Array.isArray(value) &&
                value !== null
                  ? Object.entries(value).map(([key, value]) => (
                      <Chip
                        key={key}
                        label={value}
                        icon={
                          key == "depth" ? (
                            <OpenInFull />
                          ) : key == "width" ? (
                            <WidthNormal />
                          ) : key == "height" ? (
                            <Height />
                          ) : undefined
                        }
                      />
                    ))
                  : value}
              </Box>
            </Stack>
          ))}
        </Stack>
      </Box>
    </>
  )
}

export default ProductPage
