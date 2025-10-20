import { Box, Container, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { Link as RouterLink } from "react-router-dom"
import theme from "../theme/theme"

const Footer = () => {
  const { t } = useTranslation()
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Container sx={{ color: theme.palette.primary.contrastText }}>
        <Typography variant="body1">
          {t("address")} : {t("location")}
        </Typography>
        <Typography variant="body1">{t("contact")} : +374 99 99 99</Typography>
        <Typography
          component={RouterLink}
          to="/about"
          sx={{
            textDecoration: "none",
            color: theme.palette.primary.contrastText,
            ":hover": { color: theme.palette.secondary.main },
          }}
          variant="body1"
        >
          {t("about")}
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
