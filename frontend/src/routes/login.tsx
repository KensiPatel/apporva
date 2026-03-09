import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { signinUser } from "@/lib/api"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"
import { Eye, EyeOff } from "lucide-react"

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const [showPassword, setShowPassword] = useState(false)
  const[email,setEmail]= useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const mutation = useMutation({
  mutationFn: signinUser,
  onSuccess: () => {
    navigate({ to: "/" })
  },
  onError: (error: any) => {
    toast.error(error.message)
  },
})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({ email, password })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="abc@projectapprova.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Password</Label>

            <div className="relative">
              <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pr-10"
              />
              
              <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
          </div>
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
  </div>
  )
}
