'use client'

import PageFoundation from "@/components/Agg/PageFoundation"
import { aggRouteName } from "@/constants/routes"

const LendersPage = () => {
  return (
    <PageFoundation routeName={aggRouteName.LENDERS}>
      Hello World!
    </PageFoundation>
  )
}

export default LendersPage