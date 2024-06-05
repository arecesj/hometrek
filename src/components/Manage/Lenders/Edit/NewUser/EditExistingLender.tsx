'use client'

import {  useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"
import TaskDetails from "../../../Edit/TaskDetails";
import LenderDetails from "../LenderDetails";
import EditSubheader from "../../../Edit/EditSubHeader";
import { getPlaidLiabilities } from "@/client/plaid";
import ConnectExistingMortgage from "../ConnectExistingMortgage";
import { useAppContext } from "@/context";
import { manageRouteName, manageRoutes } from "@/constants/routes";
import { mapMortgageDetails } from "@/lib/utils";

const TaskFormSchema = z.object({
  task: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
})

const EditExistingLender = () => {
  const router = useRouter()
  const { toast } = useToast()
  
  const { homeClosingContext, setHomeClosingContext } = useAppContext()
  const existingTask = !!homeClosingContext.tasks ? homeClosingContext?.tasks?.find(t => t?.category === "lenders") : {} as TaskContext
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

  // const updateExistingLender = async () => {
  //   const updatedTasks = homeClosingContext.tasks.map(task => {
  //     if(task.id === existingTask.id) {
  //       task = editedTask
  //     }
  //     return task;
  //   })    
  //   setHomeClosingContext({
  //     ...homeClosingContext,
  //     lenders: {
  //       ...homeClosingContext.lenders,
  //       ...editedLenderDetails
  //     },
  //     tasks: updatedTasks,
  //   })
  //   successToast("Successfully updated your lender information!", "Redirecting you back to the previous page.")
  //   router.push(manageRoutes[manageRouteName.DASHBOARD].route)
  // }

  const deleteExistingLender = async () => {
    const updatedTasks = !!homeClosingContext.tasks && homeClosingContext.tasks.map(task => {
      if(!!task && task?.id === existingTask.id) {
        task.status = "todo"
      }
      return task; 
    })
    setHomeClosingContext({
      ...homeClosingContext,
      lenders: null,
      tasks: updatedTasks,
    })
    successToast("Successfully deleted your lender!", "Redirecting you back to the dashboard.")
    setConnected(false)
    router.push(manageRoutes[manageRouteName.DASHBOARD].route)
  }

  const onConnectionSuccess = async (accessToken: string) => {
    const getPlaidLiabilitiesResp = await getPlaidLiabilities(accessToken)
    if(getPlaidLiabilitiesResp.ok) {
      const { liabilities: { mortgage }} = await getPlaidLiabilitiesResp.json()
      setHomeClosingContext({
        ...homeClosingContext,
        lenders: {
          ...homeClosingContext.lenders,
          hasOwnLender: true,
          plaidAccessToken: accessToken,
          mortgageDetails: mapMortgageDetails(mortgage[0]),
        }
      })
      successToast("Successfully connected your account.", "Updating the page now!")
      setConnected(true)
    } else {
      failureToast("Uh oh! Something went wrong.", "Unable to connect to Plaid right now")
    }
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
  
  return(
    <div>
      <EditSubheader
        subHeaderContent="Edit your existing lender details"
        onDelete={() => deleteExistingLender()}
        onDeleteText="Disconnect lender"
        onCancel={() => router.push(manageRoutes[manageRouteName.DASHBOARD].route)}
      />
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start md:gap-8 lg:col-span-2">
          {!!homeClosingContext.lenders?.hasOwnLender ? (
            <LenderDetails
              existingLenderDetails={homeClosingContext.lenders}
            />
          ) : (
            <ConnectExistingMortgage
              onConnectionSuccess={onConnectionSuccess}
              isConnected={isConnected}
            />
          )}
        </div>
        <TaskDetails
          existingTask={existingTask}
          isUpdateTaskDisabled={isUpdateTaskDisabled}
          setUpdateTaskDisabled={setUpdateTaskDisabled}
          form={taskForm}
          onSubmit={updateExistingTask}
        />
      </div>
    </div>
  )
}

export default EditExistingLender