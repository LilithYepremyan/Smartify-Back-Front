import { TextField, InputAdornment } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"

const SearchInput = () => {
  const [value, setValue] = useState("")
  const [searchParams, setSearchParams] = useSearchParams()
  const { t } = useTranslation()

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams)
    if (value.trim()) {
      params.set("search", value)
    } else {
      params.delete("search")
    }
    setSearchParams(params)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSearch()
    }
  }

  return (
    <TextField
      variant="outlined"
      size="small"
      placeholder={t("search")}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      fullWidth
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={handleSearch}
              sx={{ cursor: "pointer" }}
            >
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  )
}

export default SearchInput
