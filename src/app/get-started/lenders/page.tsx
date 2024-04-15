import ShowLenders from "@/components/ShowLenders"
import { Suspense } from "react"

const LendersPage = () => {
  return (
    <Suspense>
      <ShowLenders />
    </Suspense>
  )
}

export default LendersPage