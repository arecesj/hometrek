'use client'

import PageFoundation from "@/components/Manage/PageFoundation"
import { manageRouteName } from "@/constants/routes"

const SettingsPage = () => {
  return (
    <PageFoundation routeName={manageRouteName.SETTINGS}>
      Settings page!
    </PageFoundation>
  )
}

export default SettingsPage