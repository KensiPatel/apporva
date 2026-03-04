import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation } from "@tanstack/react-query"
import { getMe, logoutUser } from "@/lib/api"
import { useNavigate } from "@tanstack/react-router"

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate=useNavigate()
  const{isLoading, isError}= useQuery({
    queryKey:["me"],
    queryFn: getMe,
    retry:false
})
const logoutMutation= useMutation({
  mutationFn: logoutUser,
  onSuccess: ()=> {
    navigate({to: "/login"})
  }
})
if (isLoading) return <div>Loading...</div>

  if (isError) {
    navigate({ to: "/login" })
    return null
  }
  return (
    <div className="flex flex-col space-y-10 h-screen w-screen items-center justify-center">
      <h1>Approva</h1>

      <Button
      onClick={() => logoutMutation.mutate()}
      disabled={logoutMutation.isPending}
      >
        {logoutMutation.isPending ? "Logging out..." : "Logout"}
      </Button>
    </div>
  )
}
