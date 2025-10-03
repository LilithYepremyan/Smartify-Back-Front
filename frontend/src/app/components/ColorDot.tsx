import { Box } from "@mui/material"
import theme from "../theme/theme"

function ColorDot({ color }: { color: string }) {
  return (
    <Box
      sx={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        backgroundColor: color,
        border: "1px solid",
        borderColor: theme.palette.primary.main,
        cursor: "pointer",
      }}
    />
  )
}

export default ColorDot
