import { Box, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import theme from "../theme/theme"
import MapBlock from "../components/MapBlock"
import SocialLinks from "../components/SocialLinks"

export default function Contact() {
  const { t } = useTranslation()
  const contacts = [
    {
      title: t("phone"),
      value: "+374 99 99 99",
    },
    {
      title: t("email"),
      value: "smartify@gmail.com",
    },
    {
      title: t("address"),
      value: t("location"),
    },
    {
      title: t("workingHours"),
      value: "10:00 - 20:00",
      note: t("everyday"),
    },
  ]

  return (
    <>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", my: 2, color: theme.palette.secondary.main }}
      >
        {t("contact")}
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          gap: 5,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            width: { xs: "100%", md: "40%" },
          }}
        >
          {contacts.map(({ title, value, note }) => (
            <Box
              key={title}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              <Typography
                sx={{ fontWeight: "bold", textAlign: "left" }}
                variant="body1"
              >
                {title}:
              </Typography>
              <Typography variant="body1" textAlign={"right"}>
                {note ? `${note}: ${value}` : value}
              </Typography>
            </Box>
          ))}
          <Box sx={{ display: "flex", gap: 2  , justifyContent:"space-between"}}>
            <SocialLinks />
          </Box>
        </Box>
        <Box sx={{ width: { xs: "100%", md: "60%" } }}>
          <MapBlock />
        </Box>
      </Box>
    </>
  )
}
