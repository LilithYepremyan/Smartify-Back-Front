import { Box } from "@mui/material"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import { getComparableProducts } from "../slices/compareSlice"
import { useTranslation } from "react-i18next"
import CompareCard from "../components/CompareCard"

const CompareProducts = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const comparableProducts = useAppSelector(
    state => state.compare.comparableProducts,
  )

  useEffect(() => {
    void dispatch(getComparableProducts())
  }, [])

  return (
    <>
      {comparableProducts.length === 0 && <p>{t("noComparable")}</p>}
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2, py: 2 }}>
        {comparableProducts.map(product => {
          return <CompareCard key={product.id} product={product} />
        })}
      </Box>
    </>
  )
}
export default CompareProducts
