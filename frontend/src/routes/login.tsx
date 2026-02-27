import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { signinUser } from "@/lib/api"
import { useNavigate } from "@tanstack/react-router"

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const[email,setEmail]= useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const mutation = useMutation({
  mutationFn: signinUser,
  onSuccess: () => {
    navigate({ to: "/" }) // redirect after login
  },
  onError: (error: any) => {
    console.error("Login failed:", error.message)
  },
})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({ email, password })
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="abc@projectapprova.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />            
          </div>
          {mutation.isError && (
            <p className="text-sm text-red-500">
              {(mutation.error as any)?.message}
              </p>
          )}


          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending ? "Signing in...":"Sign In"}
          </Button>

        </form>
      </CardContent>
    </Card>
  )
}
