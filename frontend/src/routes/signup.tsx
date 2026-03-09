import { createFileRoute } from '@tanstack/react-router'
import { SignupForm } from '@/features/auth/components/signup-form'

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <SignupForm className="w-[400px]" />
    </div>
  )
}
