import { BrowserRouter } from "react-router-dom"
import "./App.css"
import AppRoutes from "./app/routes/AppRoutes"
import { ThemeProvider } from "@emotion/react"
import theme from "./app/theme/theme"

export const App = () => (
  <div className="App">
    <BrowserRouter>
      <ThemeProvider theme={theme}>
          <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  </div>
)
