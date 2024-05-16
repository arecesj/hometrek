'use client'

import ClosingDayEdit from "@/components/Manage/ClosingDay/Edit"
import PageFoundation from "@/components/Manage/PageFoundation"
import { manageRouteName } from "@/constants/routes"

const ClosingDayEditPage = () => {
  return(
    <PageFoundation routeName={manageRouteName.CLOSINGDAY_EDIT}>
      <ClosingDayEdit />
    </PageFoundation>
  )
}

export default ClosingDayEditPage