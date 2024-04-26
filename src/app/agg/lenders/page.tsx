'use client'

import Lenders from "@/components/Agg/Lenders"
import PageFoundation from "@/components/Agg/PageFoundation"
import { aggRouteName } from "@/constants/routes"

const LendersPage = () => {
  return (
    <PageFoundation routeName={aggRouteName.LENDERS}>
      <Lenders />
    </PageFoundation>
  )
}

export default LendersPage