import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import MenuIcon from "@mui/icons-material/Menu"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { Link as RouterLink } from "react-router-dom"
import logo from "../assets/logo-spotify.png"
import LanguageSwitcher from "./LanguageSwitcher"
import { useTranslation } from "react-i18next"

interface Props {
  window?: () => Window
}

const drawerWidth = 240
const navItems = [
  { label: "home", path: "/" },
  { label: "about", path: "/about" },
  { label: "contact", path: "/contact" },
]

export default function Header(props: Props) {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { t } = useTranslation()

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState)
  }

  const drawer = (
    <Box

      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", color: "white"}}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        Smartify
      </Typography>
      <Divider />
      <List>
        {navItems.map(({ label, path }) => (
          <ListItem key={label} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={path}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={t(label)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <LanguageSwitcher />
    </Box>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "#252b33" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            component={RouterLink}
            to={"/"}
            sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}
          >
            <Box
              component="img"
              src={logo}
              sx={{
                width: 60,
                height: 60,
                cursor: "pointer",
                ":hover": { transform: "scale(1.05)" },
                transition: "transform 0.3s ease-in-out",
              }}
            ></Box>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map(({ label, path }) => (
              <Button
                component={RouterLink}
                to={path}
                key={label}
                sx={{
                  color: "#fff",
                  transition: "all 0.15s",
                  ":hover": { color: "#34f1d3" },
                }}
              >
                {t(label)}
              </Button>
            ))}
          </Box>
          {/* {mobileOpen && <LanguageSwitcher />} */}
          {!mobileOpen && <LanguageSwitcher />}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#252b33",
              alignItems: "center",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}></Box>
    </Box>
  )
}
