import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material"
import { useTranslation } from "react-i18next"
import { useNavigate, useSearchParams } from "react-router-dom"
import SearchIcon from "@mui/icons-material/Search"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import theme from "../theme/theme"

type ProductParameters = {
  core?: string
  ram?: string
  memory?: string
  display?: string
  sim?: string
  camera?: string
  frontCamera?: string
  os?: string
  battery?: string
  weight?: string
  sensor?: string
  video?: string
  lens?: string
  isoRange?: string
  connectivity?: string
  chip?: string
  storage?: string
  features?: string[]
  cpu?: string
  gpu?: string
  resolution?: string
  frameRate?: string
  opticalDrive?: string
  type?: string
  model?: string
  batteryLife?: string
  power?: string
  suctionPower?: string
  binVolume?: string
  filter?: string
  warranty?: string
  coolingCapacity?: string
  energyEfficiency?: string
  noiseLevel?: string
  powerConsumption?: string
  capacity?: string
  speed?: string
  energyRating?: string
  programs?: string[]
  dimensions?:
    | string
    | {
        width: string
        height: string
        depth: string
      }
  coolingSystem?: string
  processor?: string
  graphicsCard?: string
  ports?: string[]
  powerSupply?: string
  operatingSystem?: string
  graphics?: string
  motherboard?: string
  cooling?: string
  screenSize?: string
  refreshRate?: string
  responseTime?: string
  panelType?: string
  smartFeatures?: string[]
  speakers?: string
  audioTechnology?: string
  frequencyResponse?: string
  impedance?: string
  sensitivity?: string
  cableLength?: string
  powerOutput?: string
  includedComponents?: string[]
  fieldOfView?: string
  material?: string
  compatibility?: string[]
  supportedResolutions?: string
  layout?: string
  dpi?: string
  connection?: string
}

type Product = {
  id: number
  title: string
  price: number
  currency: string
  image: string
  inStock: boolean
  colors: { id: number; color: string; hex: string }[]
  parameters: ProductParameters
}

const ProductCard = ({ product }: { product: Product }) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const handleClick = () => {
    const category = searchParams.get("category")
    const brand = searchParams.get("brand")

    const params = new URLSearchParams()
    if (category && category !== "null") params.set("category", category)
    if (brand && brand !== "null") params.set("brand", brand)

    const queryString = params.toString()
    const url = queryString
      ? `/product/${product.id}?${queryString}`
      : `/product/${product.id}`

    navigate(url)
  }

  return (
    <Card
      sx={{
        marginBottom: 2,
        width: 200,
        maxHeight: 400,
        cursor: "pointer",
        "&:hover": { transform: "scale(1.05)" },
        "&:hover .icons": { opacity: 1, visibility: "visible" },
        transition: "transform 0.3s ease-in-out",
        position: "relative",
        zIndex: 1,
      }}
    >
      <CardContent
        onClick={handleClick}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          padding: "16px 12px 0px 16px",
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{ height: 200, width: 200, objectFit: "contain" }}
        />
        <Typography variant="h6" sx={{ fontSize: "14px" }}>
          {product.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: theme.palette.secondary.dark, fontWeight: 600 }}
        >
          {product.price} {product.currency}
        </Typography>
      </CardContent>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          className="icons"
          sx={{
            display: "flex",
            gap: 3,
            padding: 1,
            opacity: 0,
            visibility: "hidden",
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <FavoriteBorderIcon
            sx={{ "&:hover": { color: theme.palette.secondary.dark } }}
            onClick={() => {
              console.log("clicked")
            }}
          />
          <SearchIcon
            sx={{ "&:hover": { color: theme.palette.secondary.dark } }}
            onClick={() => {
              console.log("clicked search")
            }}
          />
        </Box>
      </Box>
      {product.inStock && (
        <Box
          sx={{
            position: "absolute",
            top: "20px",
            right: "-60px",
            width: "100%",
            height: "25px",
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.primary.contrastText,
            transform: "rotate(45deg)",
          }}
        >
          {t("inStock")}
        </Box>
      )}
    </Card>
  )
}

export default ProductCard
