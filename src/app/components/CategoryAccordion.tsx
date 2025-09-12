import Accordion from "@mui/material/Accordion"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useAppDispatch, useAppSelector } from "../hooks"
import { useEffect, useState } from "react"
import { getAllCategories, setSelectedCategory } from "../slices/categorySlice"
import { AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import type { Brand, Category } from "./CategorySelect"
import theme from "../theme/theme"

type Props = {
  onBrandClick: (categoryName: string, brand: string, color: string) => void
}
export default function CategoryAccordion({ onBrandClick }: Props) {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(state => state.categories.categories)

  const [open, setOpen] = useState(false)
  const { t } = useTranslation()

  const handleClick = () => {
    setOpen(prev => !prev)
  }

  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])

  return (
    <div>
      <Typography
        onClick={handleClick}
        sx={{
          cursor: "pointer",
          width: "100%",
          display: "inline-block",
          padding: "8px ",
          borderRadius: "4px",
          fontSize: { xs: 13, sm: 14, md: 16, lg: 18, xl: 20 },
          border: `1px solid ${theme.palette.primary.main}`,
          fontWeight: 500,
          textAlign: "center",
          transition: "background-color 0.3s ease",
          "&:hover": {
            border: `1px solid ${theme.palette.secondary.dark}`,
          },
        }}
        gutterBottom
      >
        {t("category")}
      </Typography>

      {open &&
        categories.map((category: Category) => (
          <Accordion key={category.name}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography
                component="span"
                onClick={() => dispatch(setSelectedCategory(category))}
                sx={{
                  cursor: "pointer",
                  fontSize: { xs: 13, sm: 14, md: 16, lg: 18, xl: 20 },
                }}
              >
                {category.name}
              </Typography>
            </AccordionSummary>
            {category.brands.length > 0 && (
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",  
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 0.5,
                  margin: 0,
                  padding: 0,
                }}
              >
                {category.brands.map((brand: Brand) => (
                  <Typography
                    sx={{
                      minWidth: 80,
                      boxShadow: "2px 2px 2px 2px whitesmoke",
                      borderRadius: 1,
                      fontSize: { xs: 13, sm: 14, md: 16, lg: 18, xl: 20 },

                      cursor: "pointer",
                    }}
                    key={brand.name}
                    component="span"
                    onClick={() => {
                      onBrandClick(category.name, brand.name, brand.color)
                    }}
                  >
                    {brand.name}
                  </Typography>
                ))}
              </AccordionDetails>
            )}
          </Accordion>
        ))}
    </div>
  )
}
