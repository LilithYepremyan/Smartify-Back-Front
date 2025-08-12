import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Badge,
  ListItemAvatar,
  Avatar,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "../hooks"
import CloseIcon from "@mui/icons-material/Close"
import { useTranslation } from "react-i18next"
import { setSelectedBrand } from "../slices/categorySlice"

export default function BrandFilter({
  onBrandClick,
}: {
  onBrandClick: (brand: string) => void
}) {
  const dispatch = useAppDispatch()

  const { t } = useTranslation()
  const products = useAppSelector(state => state.products.products)
  const selectedBrand = useAppSelector(state => state.categories.selectedBrand)
  const brands = useAppSelector(state => state.categories.brands)

  function countProductsByBrand(brand: string) {
    return products.filter(product => product.brand === brand).length
  }

  return (
    <Box sx={{ borderBottom: "1px solid rgb(79, 84, 94)", pb: 2 }}>
      <Typography
        sx={{
          cursor: "pointer",
          display: "inline-block",
          width: "100%",
          padding: "8px",
          fontSize: { xs: 13, sm: 14, md: 16, lg: 16, xl: 16 },
          borderBottom: "1px solid rgb(79, 84, 94)",
          textAlign: "left",
        }}
      >
        {t("brands")}
      </Typography>
      <List sx={{ maxHeight: 300, overflow: "auto" }}>
        {brands.map(({ name, icon }) => {
          const isSelected = name === selectedBrand

          return (
            <ListItem
              key={name}
              disablePadding
              secondaryAction={
                <Badge
                  badgeContent={countProductsByBrand(name)}
                  color={isSelected ? "primary" : "default"}
                />
              }
              sx={{ p: 0 }}
            >
              <ListItemButton
                selected={isSelected}
                onClick={() => {
                  dispatch(setSelectedBrand(name))
                  onBrandClick(name)
                }}
                sx={{
                  ":hover": { opacity: 0.7 },
                }}
              >
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <ListItemAvatar>
                        <Avatar
                          src={icon}
                          alt={name}
                          variant="square"
                          sx={{
                            width: 50,
                            height: 30,
                            "& img": { objectFit: "contain" },
                          }}
                        ></Avatar>
                      </ListItemAvatar>
                      <Typography sx={{ fontSize: { xs: 13, md: 14 } }}>
                        {name}
                      </Typography>
                      {isSelected && (
                        <IconButton
                          size="small"
                          sx={{ p: 0.3 }}
                          onClick={e => {
                            e.stopPropagation()
                            dispatch(setSelectedBrand(""))
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  }
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}
