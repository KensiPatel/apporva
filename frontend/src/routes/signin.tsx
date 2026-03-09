import LoginForm from '@/features/auth/components/signin-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  return <LoginForm />
}
