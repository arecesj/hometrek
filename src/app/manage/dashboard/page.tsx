'use client'

import Dashboard from "@/components/Manage/Dashboard"
import PageFoundation from "@/components/Manage/PageFoundation"
import { manageRouteName } from "@/constants/routes"

const DashboardPage = () => {
  return (
    <PageFoundation routeName={manageRouteName.DASHBOARD}>
      <Dashboard />
    </PageFoundation>
  )
}

export default DashboardPage