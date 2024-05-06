'use client'

import Insurance from "@/components/Manage/Insurance"
import PageFoundation from "@/components/Manage/PageFoundation"
import { manageRouteName } from "@/constants/routes"

const InsurancePage = () => {
  return (
    <PageFoundation routeName={manageRouteName.INSURANCE}>
      <Insurance />
    </PageFoundation>
  )
}

export default InsurancePage