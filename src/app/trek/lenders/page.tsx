import PageFoundation from "@/components/PageFoundation"
import Lenders from "@/components/Trek/Lenders"
import { trekRouteName } from "@/constants/routes"

const LendersPage = () => {
  return (
    <PageFoundation routeName={trekRouteName.LENDERS}>
      <Lenders />
    </PageFoundation>
  )
}

export default LendersPage