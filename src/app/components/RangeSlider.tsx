import { Box, Button, Slider, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { setPriceRange } from "../slices/categorySlice"
import { useAppDispatch, useAppSelector } from "../hooks"
import { useState } from "react"

const RangeSlider = () => {
  const priceRange = useAppSelector(state => state.products.priceRange)
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const [value, setValue] = useState(priceRange)

  const handleChange = (e: Event, newValue: number | number[]) => {
    setValue(newValue as [number, number])
  }

  const handleFilterClick = () => {
    dispatch(setPriceRange(value as [number, number]))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <Box sx={{ width: "100%", textAlign: "left" }}>
      <Typography>{t("price")}</Typography>
      <Slider
        getAriaLabel={() => "By price"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={50000}
        max={1000000}
        getAriaValueText={value => `${value} AMD`}
        step={1000}
      ></Slider>
      <Typography>{`${t("price")}: ${value[0]} AMD - ${value[1]} AMD`}</Typography>
      <Button sx={{ mt: 2 }} variant="outlined" onClick={handleFilterClick}>
        {t("filter")}
      </Button>
    </Box>
  )
}

export default RangeSlider
