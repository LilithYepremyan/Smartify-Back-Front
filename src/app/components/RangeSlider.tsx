import { Box, Button, Slider, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { setPriceRange } from "../slices/categorySlice"
import { useAppDispatch, useAppSelector } from "../hooks"
import { useState } from "react"

const RangeSlider = () => {
  const priceRange = useAppSelector(state => state.categories.priceRange)  
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const [value, setValue] = useState(priceRange as [number, number])

  const handleChange = (e: Event, newValue: number | number[]) => {
    setValue(newValue as [number, number])
  }

  const handleFilterClick = () => {
    dispatch(setPriceRange(value))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <Box sx={{ width: "100%", textAlign: "left" }}>
      <Typography sx={{ fontSize: "14px" }}>{t("price")}</Typography>
      <Slider
        getAriaLabel={() => "By price"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={50000}
        max={1000000}
        getAriaValueText={value => `${String(value)} AMD` }
        step={1000}
      ></Slider>
      <Typography sx={{ fontSize: "14px" }}>{`${t("price")}: ${String(value[0])} AMD - ${String(value[1])} AMD`}</Typography>
      <Button sx={{ mt: 2, fontSize: "14px" }} variant="outlined" onClick={handleFilterClick}>
        {t("filter")}
      </Button>
    </Box>
  )
}

export default RangeSlider
