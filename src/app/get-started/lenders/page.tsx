import { Suspense } from "react"
import ShowLenders from "@/components/ShowLenders"

const LendersPage = () => {
  return (
    <Suspense>
      <ShowLenders />
    </Suspense>
  )
}

export default LendersPage