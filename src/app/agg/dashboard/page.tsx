'use client'

import PageFoundation from "@/components/Agg/PageFoundation"
import { aggRouteName } from "@/constants/routes"

const DashboardPage = () => {
  return (
    <PageFoundation routeName={aggRouteName.DASHBOARD}>
      Dashboard page!
    </PageFoundation>
  )
}

export default DashboardPage