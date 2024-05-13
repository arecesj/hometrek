'use client'

import PageFoundation from "@/components/Manage/PageFoundation"
import { manageRouteName } from "@/constants/routes"
import LendersEdit from "@/components/Manage/Lenders/Edit"

const LendersEditPage = () => {
  return(
    <PageFoundation routeName={manageRouteName.LENDERS_EDIT}>
      <LendersEdit />
    </PageFoundation>
  )
}

export default LendersEditPage