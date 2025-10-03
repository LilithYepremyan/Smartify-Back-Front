import { Box, Typography } from "@mui/material"
import FavoriteCard from "../components/FavoriteCard"
import { useAppDispatch, useAppSelector } from "../hooks"
import { useEffect } from "react"
import { getAllFavorites } from "../slices/favoritesSlice"

const Favorites = () => {
  const favorites = useAppSelector(state => state.favorites.favorites)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllFavorites())
  }, [])

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        py: 2,
        gap: 1,
      }}
    >
      <Typography variant="h4">Favorites</Typography>
      {favorites.length === 0 && <p>No favorites yet</p>}
      {favorites.map(favorite => {
        return <FavoriteCard key={favorite.id} favorite={favorite} />
      })}
    </Box>
  )
}

export default Favorites
