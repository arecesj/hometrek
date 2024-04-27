'use client'

import Dashboard from "@/components/Agg/Dashboard"
import PageFoundation from "@/components/Agg/PageFoundation"
import { aggRouteName } from "@/constants/routes"

const DashboardPage = () => {
  return (
    <PageFoundation routeName={aggRouteName.DASHBOARD}>
      <Dashboard />
    </PageFoundation>
  )
}

export default DashboardPage