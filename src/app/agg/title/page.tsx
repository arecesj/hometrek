'use client'

import PageFoundation from "@/components/Agg/PageFoundation"
import Title from "@/components/Agg/Title"
import { aggRouteName } from "@/constants/routes"

const TitlePage = () => {
  return (
    <PageFoundation routeName={aggRouteName.TITLE}>
      <Title />
    </PageFoundation>
  )
}

export default TitlePage