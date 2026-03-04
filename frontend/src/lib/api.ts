const BASE_URL = "http://localhost:8080"

export async function signinUser(data: {
  email: string
  password: string
}) {
  const response = await fetch(`${BASE_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Login failed")
  }

  return response.json()
}

export async function getMe() {
  const response = await fetch(`${BASE_URL}/me`, {
    credentials: "include",
  })
  if (!response.ok) {
    throw new Error("Not authenticated")
  }
  return response.json()
}

export async function logoutUser() {
  const response = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  })
  if (!response.ok) {
    throw new Error("Logout failed")
  }
  return response.json()
}

export async function signupUser(data: {
  fullName: string
  email: string
  password: string
}) {
  const response = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Signup failed")
  }

  return response.json()
}