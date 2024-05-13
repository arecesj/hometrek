'use client'

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useAppContext } from "@/context"
import SubHeader from "../Subheader"
import { manageRouteName } from "@/constants/routes"
import { useEffect } from "react"
import CostBreakdown from "./CostBreakdown.tsx"
import TaskTable from "../TaskTable"
import { generateNewUserTasks } from "@/constants/newUserTasks"
import { isUserAuthenticated } from "@/lib/utils"
import LoadingSpinner from "@/components/LoadingSpinner"

const Dashboard = () => {
  const { data: session, status } = useSession()
  const { homeClosingContext, setHomeClosingContext, setRouteContext } = useAppContext()
  const [isLoading, setLoading] = useState<boolean>(true)
  console.log("HC: ", homeClosingContext)
  useEffect(() => {
    setRouteContext(manageRouteName.DASHBOARD)
    
    if(!homeClosingContext.tasks?.length) {
      const tasks = generateNewUserTasks(homeClosingContext);
      
      setHomeClosingContext({
        ...homeClosingContext,
        tasks
      })
    }

    setLoading(false)
  }, [])
  
  return (
    <div>
      <SubHeader
        subHeaderContent={"Where we track it all"}
        showPreviousButton={false}
        previousButtonContent={""}
        previousButtonHref={""}
        showCreateProfileButton={!isUserAuthenticated(status)}
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start md:gap-8 lg:col-span-2">
          <TaskTable tasks={homeClosingContext.tasks} />
        </div>
        <CostBreakdown />
      </div>
      )}
      
    </div>
  )
}

export default Dashboard