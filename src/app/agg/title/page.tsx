'use client'

import PageFoundation from "@/components/Agg/PageFoundation"
import { aggRouteName } from "@/constants/routes"

const TitlePage = () => {
  return (
    <PageFoundation routeName={aggRouteName.TITLE}>
      Title page!
    </PageFoundation>
  )
}

export default TitlePage