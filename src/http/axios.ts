import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})


api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${Cookies.get('token')}`
    return config
})

export default api