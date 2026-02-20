import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col space-y-10 h-screen w-screen items-center justify-center">
      <h1>Approva</h1>
      <Button>Click me</Button>
    </div>
  )
}
