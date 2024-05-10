'use client'

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useAppContext } from "@/context"
import SubHeader from "../Subheader"
import { manageRouteName } from "@/constants/routes"
import AddExistingTitleAgent from "./AddExistingTitleAgent"
import { isUserAuthenticated } from "@/lib/utils"
// import FindExistingTitle from "./FindExistingTitle"

const Title = () => {
  const { data: session, status } = useSession()
  const { setRouteContext } = useAppContext()

  useEffect(() => setRouteContext(manageRouteName.TITLE), [])
  return (
    <div>
      <SubHeader
        subHeaderContent={"Let's keep track of your home title"}
        showPreviousButton={false}
        previousButtonContent={""}
        previousButtonHref={""}
        showCreateProfileButton={!isUserAuthenticated(status)}
      />
      {/* <FindExistingTitle /> */}
      <AddExistingTitleAgent />
    </div>
  )
}

export default Title