import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldError,
} from '@/components/ui/field'
import { z } from 'zod'
import { useSignin } from '../hooks/use-auth'

const signinSchema = z.object({
  email: z.string().email('Invalid email').endsWith('@projectapprova.com', {
    message: 'Must be a @projectapprova.com email',
  }),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export default function SigninForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({})

  const { mutate, isPending, isError, error } = useSignin()

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()

    const result = signinSchema.safeParse({ email, password })
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors)
      return
    }

    setErrors({})
    mutate({ email, password })
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
                placeholder="name@projectapprova.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FieldError
                errors={errors.email?.map((msg) => ({ message: msg }))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Password</Label>

              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10"
                />

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 px-3 py-2 text-muted-foreground hover:bg-transparent hover:text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>
              <FieldError
                errors={errors.password?.map((msg) => ({ message: msg }))}
              />
            </div>
            {isError && <p className="text-sm text-red-500">{error.message}</p>}

            <FieldGroup>
              <Field>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? 'Signing in...' : 'Sign In'}
                </Button>
                <FieldDescription className="px-6 text-center">
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
