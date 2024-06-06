'use client'

import {  useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"
import TaskDetails from "../../../Edit/TaskDetails"
import EditSubheader from "../../../Edit/EditSubHeader"
import { getPlaidLiabilities } from "@/client/plaid"
import { useAppContext } from "@/context"
import { manageRouteName, manageRoutes } from "@/constants/routes"

const TaskFormSchema = z.object({
  task: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
})

const EditExistingInsurance = () => {
  const router = useRouter()
  const { toast } = useToast()
  
  const { homeClosingContext, setHomeClosingContext } = useAppContext()
  const existingTask = !!homeClosingContext.tasks ? homeClosingContext?.tasks?.find(t => t?.category === "insurance") : {} as TaskContext
  const [isConnected, setConnected] = useState<boolean>(false)
  const [isUpdateTaskDisabled, setUpdateTaskDisabled] = useState<boolean>(true)

  const successToast = (title: string, description: string) => {
    return toast({
      title,
      description,
    })
  }

  const failureToast = (title: string, description: string) => {
    return toast({
      variant: "destructive",
      title,
      description,
    })
  }

  // INSURANCE
  // INSURANCE
  // INSURANCE

  const deleteExistingInsurer = async () => {
    const updatedTasks = !!homeClosingContext.tasks && homeClosingContext.tasks.map(task => {
      if(!!task && task?.id === existingTask.id) {
        task.status = "todo"
      }
      return task; 
    })
    setHomeClosingContext({
      ...homeClosingContext,
      insurance: null,
      tasks: updatedTasks,
    })
    successToast("Successfully deleted your insurer!", "Redirecting you back to the dashboard.")
    setConnected(false)
    router.push(manageRoutes[manageRouteName.DASHBOARD].route)
  }


  // TASK FORM
  // TASK FORM
  // TASK FORM
  const taskForm = useForm<z.infer<typeof TaskFormSchema>>({
    resolver: zodResolver(TaskFormSchema),
  });

  const updateExistingTask = async (data: z.infer<typeof TaskFormSchema>) => {
    const { task, status, priority } = data
    const updatedTasks = homeClosingContext.tasks.map(t => {
      if(t.category === existingTask.category) {
        return {
          ...existingTask,
          task: !!task?.length ? task : existingTask.task,
          status: !!status?.length ? status : existingTask.status,
          priority: !!priority?.length ? priority: existingTask.priority
        }
      }
      return t
    })

    setHomeClosingContext({
      ...homeClosingContext,
      tasks: updatedTasks,
    })

    successToast("Successfully updated your task!", "")
    setUpdateTaskDisabled(true)
  }

  return (
    <div>
      <EditSubheader
        subHeaderContent="Edit your existing insurance details"
        onDelete={() => deleteExistingInsurer()}
        onDeleteText="Disconnect insurer"
        onCancel={() => router.push(manageRoutes[manageRouteName.DASHBOARD].route)}
      />
    </div>
  )
}

export default EditExistingInsurance
