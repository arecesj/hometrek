'use client'

import Lenders from "@/components/Manage/Lenders"
import PageFoundation from "@/components/Manage/PageFoundation"
import { manageRouteName } from "@/constants/routes"

const LendersPage = () => {
  return (
    <PageFoundation routeName={manageRouteName.LENDERS}>
      <Lenders />
    </PageFoundation>
  )
}

export default LendersPage