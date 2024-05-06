'use client'

import PageFoundation from "@/components/Manage/PageFoundation"
import { manageRouteName } from "@/constants/routes"

const ClosingDayPage = () => {
  return (
    <PageFoundation routeName={manageRouteName.CLOSINGDAY}>
      Closing Day page!
    </PageFoundation>
  )
}

export default ClosingDayPage