import React from "react"
import { MenuItem, Select, Box } from "@mui/material"
import type { SelectChangeEvent } from "@mui/material/Select"
import PublicIcon from "@mui/icons-material/Public"
import { useTranslation } from "react-i18next"
import theme from "../theme/theme"

const languages = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
  { code: "am", label: "Հայերեն" },
]

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const [lang, setLang] = React.useState(i18n.language)

  const handleChange = (event: SelectChangeEvent) => {
    const newLang = event.target.value
    setLang(newLang)
    i18n.changeLanguage(newLang)
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        ml: 2,
        ":hover": { color: theme.palette.secondary.main },
      }}
    >
      <PublicIcon sx={{ mr: 1 }} />
      <Select
        value={lang}
        onChange={handleChange}
        variant="standard"
        disableUnderline
        sx={{
          color: "white",
          fontWeight: 500,
          ":hover": { color: theme.palette.secondary.main },
        }}
      >
        {languages.map(({ code, label }) => (
          <MenuItem key={code} value={code}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}

export default LanguageSwitcher
