import { Box } from "@mui/material"

function ColorDot({ color }: { color: string }) {
  return (
    <Box
      sx={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        backgroundColor: color,
        border: "1px solid black",
        cursor: "pointer",
      }}
    />
  )
}

export default ColorDot
