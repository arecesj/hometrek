import PageFoundation from "@/components/PageFoundation"
import Lenders from "@/components/Lenders"
import { routeNames } from "@/constants/routes"

const LendersPage = () => {
  return (
    <PageFoundation routeName={routeNames.LENDERS}>
      <Lenders />
    </PageFoundation>
  )
}

export default LendersPage