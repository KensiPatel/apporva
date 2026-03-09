import { FileQuestion } from 'lucide-react'

export function NotFound() {
  return (
    <div className="flex min-h-[80vh] w-full flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center space-y-6 text-center">
        <div className="rounded-full bg-muted p-6">
          <FileQuestion className="h-16 w-16 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            404
          </h1>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Page Not Found
          </h2>
          <p className="max-w-[500px] text-muted-foreground md:text-lg">
            Sorry, we couldn't find the page you're looking for. The link might
            be broken, or the page may have been removed.
          </p>
        </div>
      </div>
    </div>
  )
}
