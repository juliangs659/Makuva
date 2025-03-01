import { Suspense } from "react"
import PlannerContent from "@/components/planner/planner-content"
import PlannerSkeleton from "@/components/planner/planner-skeleton"

export default function PlannerPage({
  searchParams,
}: {
  searchParams: { destination?: string }
}) {
  const destination = searchParams.destination || ""

  return (
    <main className="min-h-screen">
      <Suspense fallback={<PlannerSkeleton />}>
        <PlannerContent destination={destination} />
      </Suspense>
    </main>
  )
}

