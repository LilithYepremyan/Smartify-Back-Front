import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material"
import type { Product } from "./ProductCard"
import DeleteIcon from "@mui/icons-material/Delete"
import theme from "../theme/theme"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { removeFromFavorites } from "../slices/favoritesSlice"
import { useAppDispatch } from "../hooks"

const FavoriteCard = ({ favorite }: { favorite: Product }) => {
  const dispatch = useAppDispatch()

  const handleDeleteFavorite = (id: string) => {
    dispatch(removeFromFavorites(id))
  }

  const handleBuyFavorite = () => {
    alert("Are you sure you want to buy this product?")
  }

  return (
    <Card>
      <CardContent sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          image={favorite.image}
          alt={favorite.brand}
          sx={{ objectFit: "contain", width: "150px" }}
        ></CardMedia>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "left",
          }}
        >
          <Typography>{favorite.brand} </Typography>
          <Typography>{favorite.title} </Typography>
          <Typography>
            {favorite.price} {favorite.currency}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              sx={{
                color: "primary",
                "&:hover": {
                  color: theme.palette.primary.light,
                  transition: "all 0.3s ease-in-out",
                },
              }}
              startIcon={<DeleteIcon />}
              onClick={() => handleDeleteFavorite(favorite.id)}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.light,
                "&:hover": {
                  transition: "all 0.3s ease-in-out",
                },
              }}
              startIcon={<ShoppingCartIcon />}
              onClick={() => handleBuyFavorite(favorite.id)}
            >
              Buy
            </Button>
          </Box>
        </CardContent>
      </CardContent>
    </Card>
  )
}

export default FavoriteCard
