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
import type { Brand } from "./CategorySelect"

type BrandFilterProps = {
  onBrandClick: (brand: string) => void
}

export default function BrandFilter({ onBrandClick }: BrandFilterProps) {
  const dispatch = useAppDispatch()

  const { t } = useTranslation()
  const products = useAppSelector(state => state.products.products)
  const selectedBrand = useAppSelector(state => state.categories.selectedBrand)
  const brands = useAppSelector(state => state.categories.brands)

  function countProductsByBrand(brand: string): number {
    return products.filter(product => product.brand === brand).length
  }

//   const productCounts = useMemo(() => {
//   return products.reduce<Record<string, number>>((acc, product) => {
//     acc[product.brand] = (acc[product.brand] || 0) + 1
//     return acc
//   }, {})
// }, [products])


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
        {brands.map(({ name, icon }: Brand) => {
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
                            dispatch(setSelectedBrand(null))
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
