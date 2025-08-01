import { TextField, InputAdornment } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { useState } from "react"
import { useTranslation } from "react-i18next"

const SearchInput = ({ onSearch }: { onSearch: (value: string) => void }) => {
  const [value, setValue] = useState("")
  const { t } = useTranslation()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    onSearch(newValue)
  }

  return (
    <TextField
      variant="outlined"
      size="small"
      placeholder={t("search")}
      value={value}
      onChange={handleChange}
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  )
}

export default SearchInput
