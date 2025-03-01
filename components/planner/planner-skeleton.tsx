import { Skeleton } from "@/components/ui/skeleton"

export default function PlannerSkeleton() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header skeleton */}
      <header className="bg-white border-b p-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <Skeleton className="h-10 w-10 rounded-full mr-2" />
            <Skeleton className="h-8 w-64" />
          </div>
          <Skeleton className="h-10 w-full max-w-md" />
        </div>
      </header>

      {/* Tabs skeleton */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="h-14 flex space-x-2 p-2">
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 h-full">
          <div className="md:col-span-1 border-r p-4 space-y-4">
            <Skeleton className="h-8 w-40 mb-6" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>

          <div className="md:col-span-2 h-full">
            <Skeleton className="h-full w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

