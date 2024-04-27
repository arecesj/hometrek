'use client'

import Insurance from "@/components/Agg/Insurance"
import PageFoundation from "@/components/Agg/PageFoundation"
import { aggRouteName } from "@/constants/routes"

const InsurancePage = () => {
  return (
    <PageFoundation routeName={aggRouteName.INSURANCE}>
      <Insurance />
    </PageFoundation>
  )
}

export default InsurancePage