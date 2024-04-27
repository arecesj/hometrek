'use client'

import Inpsections from "@/components/Agg/Inspections"
import PageFoundation from "@/components/Agg/PageFoundation"
import { aggRouteName } from "@/constants/routes"


const InpsectionsPage = () => {
  return (
    <PageFoundation routeName={aggRouteName.INSPECTIONS}>
      <Inpsections />
    </PageFoundation>
  )
}

export default InpsectionsPage