import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material"
import { useAppDispatch } from "../hooks"
import CloseIcon from "@mui/icons-material/Close"
import { useNavigate } from "react-router-dom"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import { useTranslation } from "react-i18next"
import { removeCompareProduct } from "../slices/compareSlice"
import type { Product } from "./ProductCard"

const CompareCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleRemove = (id: number) => {
    void dispatch(removeCompareProduct(id))
  }

  return (
    <Card
      key={product.id}
      sx={{
        width: 300,
        marginBottom: 2,
        gap: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CardActions>
        <Button
          onClick={() => {
            handleRemove(product.id)
          }}
          endIcon={<CloseIcon />}
        >
          {t("remove")}
        </Button>
      </CardActions>
      <CardActionArea
        onClick={() => {
          void navigate(`/product/${product.id}`)
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{
            objectFit: "contain",
            height: 200,
          }}
        ></CardMedia>
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            sx={{ fontSize: 16 }}
            component="div"
          >
            {product.title}
          </Typography>
          <Typography>
            {product.price} {product.currency}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            {product.inStock ? (
              <>
                <CheckCircleOutlineIcon color="success" />
                <Typography sx={{ fontWeight: "bold" }}>
                  {t("inStock")}
                </Typography>
              </>
            ) : (
              <>
                <HighlightOffIcon color="error" />
                <Typography sx={{ fontWeight: "bold" }}>
                  {t("outOfStock")}
                </Typography>
              </>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CompareCard
