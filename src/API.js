import axios from 'axios'
export const baseURL = 'https://service-api-bilyi.azurewebsites.net/'

const headers = {
  'Content-Type': 'application/json'
}
const API = axios.create({
  baseURL,
  headers
})
const onRequestSuccess = async (config) => {
  if (config?.headers) {
    config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`
  }
  return config
}

API.interceptors.request.use(onRequestSuccess)
export default API
