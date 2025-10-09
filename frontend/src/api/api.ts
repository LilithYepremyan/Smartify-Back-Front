import axios from "axios"

console.log("API base URL:", import.meta.env.VITE_API_URL)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
})

export default api
