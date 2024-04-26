'use client'

import PageFoundation from "@/components/Agg/PageFoundation"
import { aggRouteName } from "@/constants/routes"

const InspectionsPage = () => {
  return (
    <PageFoundation routeName={aggRouteName.INSPECTIONS}>
      Inspections page!
    </PageFoundation>
  )
}

export default InspectionsPage