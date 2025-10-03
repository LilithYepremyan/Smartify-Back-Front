import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Layout from "../../layout"
import ProductInfo from "../pages/ProductInfo"
import Favorites from "../pages/Favorites"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="product/:id" element={<ProductInfo />} />
        <Route path="favorites" element={<Favorites />} />

        {/* <Route path="*" element={<NotFound/>} /> */}
      </Route>
    </Routes>
  )
}
