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