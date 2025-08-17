import axios from "axios"

export const baseAPI = axios.create({
    baseURL:"https://books-library-management-app-backend.onrender.com"
})