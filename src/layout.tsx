import { Outlet } from "react-router-dom"
import { Box, Container } from "@mui/material"
import Header from "./app/components/Header"
import Footer from "./app/components/Footer"

export default function Layout() {
  return (
    <Box>
      <Header />
      <Container>
        <Box
          sx={{
            px: { xs: 0, md: 2 },
            py: 2,
            minHeight: "80vh",
          }}
        >
          <Outlet />
        </Box>
      </Container>
      <Footer />
    </Box>
  )
}
