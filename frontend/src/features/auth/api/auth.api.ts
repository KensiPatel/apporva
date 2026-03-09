import { BASE_URL } from '@/env'
import { apiClient } from '@/lib/api-client'

export async function signinUser(data: { email: string; password: string }) {
  try {
    const response = await apiClient.post('/auth/signin', data)
    return response.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Invalid email or password',
    )
  }
}

export async function getMe() {
  const response = await fetch(`${BASE_URL}/user`, {
    credentials: 'include',
  })
  if (!response.ok) {
    throw new Error('Not authenticated')
  }
  return response.json()
}

export async function logoutUser() {
  const response = await apiClient.post('/auth/logout')
  return response.data
}

export async function signupUser(data: {
  fullName: string
  email: string
  password: string
}) {
  try {
    const response = await apiClient.post('/auth/signup', data)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Signup failed')
  }
}
