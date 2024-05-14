'use client'

import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import LoadingSpinner from "@/components/LoadingSpinner"
import { getTask } from "@/client/tasks"
import TaskTable from "../../TaskTable"
import CostBreakdown from "../CostBreakdown.tsx"


const Dashboard = () => {
  const { toast } = useToast()
  const[tasks, setTasks] = useState<TaskContext[]>([])
  const [isLoading, setLoading] = useState<boolean>(true)

  const getTasksFailureToast = (description: string) => {
    return toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description,
    })
  }

  const getTasks = async () => {
    const tasksResp = await getTask()
    if(tasksResp.ok) {
      const body = await tasksResp.json()
      setTasks(body.tasks)
    } else {
      getTasksFailureToast("Unable to get your tasks right now.")
    }

    setLoading(false)
  }

  useEffect(() => {
    getTasks()
  }, [])
  return (
    <>
    {isLoading ? (
      <LoadingSpinner />
    ) : (
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start md:gap-8 lg:col-span-2">
          <TaskTable tasks={tasks} />
        </div>
        <CostBreakdown />
      </div>
    )}
    </>
  )
}

export default Dashboard