import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Badge,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "../hooks"
import { setSelectedColor } from "../slices/categorySlice"
import CloseIcon from "@mui/icons-material/Close"
import { useTranslation } from "react-i18next"

const colors = [
  { name: "Black", color: "black", hex: "#000000" },
  { name: "Blue", color: "blue", hex: "#22304D" },
  { name: "Green", color: "green", hex: "#224D30" },
  { name: "Pink", color: "pink", hex: "#ffdbfe" },
  { name: "White", color: "white", hex: "#ffffff" },
  { name: "Gold", color: "gold", hex: "#fae8a2" },
  { name: "Silver", color: "silver", hex: "#d4d2cd" },
]

export default function ColorFilter({
  onColorClick,
}: {
  onColorClick: (color: string) => void
}) {
  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  const selectedColor = useAppSelector(state => state.categories.selectedColor)

  return (
    <Box>
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
        {t("color")}
      </Typography>
      <List>
        {colors.map(({ name, color, hex }) => {
          const isSelected = color === selectedColor

          return (
            <ListItem
              key={name}
              disablePadding
              secondaryAction={
                <Badge
                  // badgeContent={55}
                  color={isSelected ? "primary" : "default"}
                />
              }
              sx={{ p: 0 }}
            >
              <ListItemButton
                selected={isSelected}
                onClick={() => {
                  dispatch(setSelectedColor(name))
                  onColorClick(color)
                }}
              >
                <Box
                  sx={{
                    width: { xs: 15, md: 20 },
                    height: { xs: 15, md: 20 },
                    minWidth: { xs: 15, md: 20 },
                    backgroundColor: hex,
                    borderRadius: "50%",
                    mr: 1,
                    border: "1px solid #000",
                    flexShrink: 0,
                  }}
                ></Box>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <Typography sx={{ fontSize: { xs: 13, md: 14 } }}>
                        {name}
                      </Typography>
                      {isSelected && (
                        <IconButton
                          size="small"
                          sx={{ p: 0.3 }}
                          onClick={e => {
                            e.stopPropagation()
                          }}
                        >
                          <CloseIcon
                            fontSize="small"
                            onClick={() => {
                              dispatch(setSelectedColor(""))
                            }}
                          />
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
