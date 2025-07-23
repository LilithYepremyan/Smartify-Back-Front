import { IconButton } from "@mui/material"
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import YouTube from "@mui/icons-material/YouTube"

const socialLinks: { icon: React.ReactNode; href: string; label: string }[] = [
  {
    icon: <FacebookIcon />,
    href: "https://www.facebook.com",
    label: "Facebook",
  },
  {
    icon: <InstagramIcon />,
    href: "https://www.instagram.com",
    label: "Instagram",
  },
  {
    icon: <LinkedInIcon />,
    href: "https://www.linkedin.com",
    label: "LinkedIn",
  },
  {
    icon: <YouTube />,
    href: "https://www.youtube.com",
    label: "YouTube",
  },
]

const SocialLinks = () => {
  return (
    <>
      {socialLinks.map(({ icon, href, label }) => (
        <IconButton
          component="a"
          href={href}
          target="_blank"
          rel="noopener"
          key={label}
          color="inherit"
          size="large"
        >
          {icon}
        </IconButton>
      ))}
    </>
  )
}

export default SocialLinks
