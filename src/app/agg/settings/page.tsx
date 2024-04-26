'use client'

import PageFoundation from "@/components/Agg/PageFoundation"
import { aggRouteName } from "@/constants/routes"

const SettingsPage = () => {
  return (
    <PageFoundation routeName={aggRouteName.SETTINGS}>
      Settings page!
    </PageFoundation>
  )
}

export default SettingsPage