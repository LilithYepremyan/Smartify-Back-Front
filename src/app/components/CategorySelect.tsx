import { useState, useRef, useEffect } from "react"
import {
  Box,
  Typography,
  List,
  ListItemButton,
  Paper,
  Popper,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "../hooks"
import { getAllCategories, setSelectedCategory } from "../slices/categorySlice"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { handleBrandClick } from "../../utils/onBrandClick"
import { useTranslation } from "react-i18next"

type Props = {
  onBrandClick: (categoryName: string, brand: string, color: string) => void
}

export type Category = {
  id: string
  name: string
  brands: Brand[]
}

export type Brand = {
  id: number
  name: string
  icon: string
}

const CategorySelect = ({ onBrandClick }: Props) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const categories = useAppSelector(state => state.categories.categories)
  const selectedCategory = useAppSelector(
    state => state.categories.selectedCategory,
  )

  const selectedColor = useAppSelector(state => state.categories.selectedColor)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [showAllCategories, setShowAllCategories] = useState(false)

  useEffect(() => {
    dispatch(getAllCategories()).catch((error: unknown) => {
      console.log(error)
    })
  }, [dispatch])

  const handleCategoryEnter = (
    event: React.MouseEvent<HTMLElement>,
    category: string,
  ) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setAnchorEl(event.currentTarget)
    dispatch(setSelectedCategory(category))
    setOpen(true)
  }

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false)
      dispatch(setSelectedCategory(null))
    }, 300)
  }

  const handlePopoverEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }

  const handlePopoverLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false)
      dispatch(setSelectedCategory(null))
      setShowAllCategories(false)
    }, 300)
  }

  const showCategories = () => {
    setShowAllCategories(true)
  }

  const hideCategories = () => {
    timeoutRef.current = setTimeout(() => {
      setShowAllCategories(false)
    }, 200)
  }

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Box
        onMouseEnter={showCategories}
        onMouseLeave={hideCategories}
        sx={{
          cursor: "pointer",
          backgroundColor: "#f5f5f5",
          borderRadius: "5px",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography>{t("category")}</Typography>
        <KeyboardArrowDownIcon
          sx={{
            transition: "transform 0.3s ease",
            transform: showAllCategories ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </Box>
      {showAllCategories && (
        <Paper>
          <List>
            {categories.map((category: Category) => (
              <ListItemButton
                key={category.name}
                onMouseEnter={e => handleCategoryEnter(e, category)}
                onMouseLeave={handleLeave}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {category.name}
                <KeyboardArrowDownIcon
                  sx={{
                    transition: "transform 0.3s ease",
                    transform: "rotate(-90deg)",
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      )}
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="right-start"
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 0],
            },
          },
        ]}
        disablePortal
        onMouseEnter={handlePopoverEnter}
        onMouseLeave={handlePopoverLeave}
      >
        {selectedCategory?.brands?.length > 0 && (
          <Paper sx={{ mt: 0.5, p: 1, width: 200 }}>
            <List>
              {selectedCategory.brands.map((brand: Brand) => (
                <ListItemButton
                  onClick={() => {
                    handleBrandClick(
                      dispatch,
                      selectedCategory.name,
                      brand.name,
                      selectedColor,
                      onBrandClick,
                    )
                  }}
                  key={brand.id}
                >
                  {brand.name}
                </ListItemButton>
              ))}
            </List>
          </Paper>
        )}
      </Popper>
    </Box>
  )
}

export default CategorySelect
