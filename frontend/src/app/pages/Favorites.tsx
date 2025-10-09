import { Box, Typography } from "@mui/material"
import FavoriteCard from "../components/FavoriteCard"
import { useAppDispatch, useAppSelector } from "../hooks"
import { useEffect } from "react"
import { getAllFavorites } from "../slices/favoritesSlice"
import { useTranslation } from "react-i18next"

const Favorites = () => {
  const { t } = useTranslation()
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
      <Typography variant="h4">{t("favorites")}</Typography>
      {favorites.length === 0 && <p>{t("noFavorites")}</p>}
      {favorites.map(favorite => {
        return <FavoriteCard key={favorite.id} favorite={favorite} />
      })}
    </Box>
  )
}

export default Favorites
