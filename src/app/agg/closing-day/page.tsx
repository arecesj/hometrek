'use client'

import PageFoundation from "@/components/Agg/PageFoundation"
import { aggRouteName } from "@/constants/routes"

const ClosingDayPage = () => {
  return (
    <PageFoundation routeName={aggRouteName.CLOSINGDAY}>
      Closing Day page!
    </PageFoundation>
  )
}

export default ClosingDayPage