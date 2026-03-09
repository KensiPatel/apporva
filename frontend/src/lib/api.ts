import axios from "axios"
const BASE_URL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
})

export async function signinUser(data: {
  email: string
  password: string
}) {
  try {
    const response = await api.post("/auth/signin", data)
    return response.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Invalid email or password"
    )
  }
}

export async function getMe() {
  const response = await api.get("/user")
  return response.data
}

export async function logoutUser() {
  const response = await api.post("/auth/logout")
  return response.data
}

export async function signupUser(data: {
  fullName: string
  email: string
  password: string
})  {
  try {
    const response = await api.post("/auth/signin", data)
    return response.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Signup failed"
    )
  }
}