import { Button } from '@/components/ui/button'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useUser, useLogout } from '@/features/auth/hooks/use-auth'
import { Loader2 } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { isLoading, isError } = useUser()
  const { mutate, isPending } = useLogout()

  useEffect(() => {
    if (isError) {
      navigate({ to: '/signin' })
    }
  }, [isError, navigate])

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-10 h-screen w-screen items-center justify-center">
      <h1>Approva</h1>

      <Button onClick={() => mutate()} disabled={isPending}>
        {isPending ? 'Logging out...' : 'Logout'}
      </Button>
    </div>
  )
}
