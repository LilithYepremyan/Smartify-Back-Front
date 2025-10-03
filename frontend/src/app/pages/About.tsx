import { Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import theme from "../theme/theme"

export default function About() {
  const { t } = useTranslation()
  return (
    <>
      <Typography variant="h4" sx={{fontWeight: "bold", my: 2, color: theme.palette.secondary.main }}>
        {t("about")}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "justify" }}>
        {t("aboutUs")}
      </Typography>
    </>
  )
}
