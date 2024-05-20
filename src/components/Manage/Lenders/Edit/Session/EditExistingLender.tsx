'use client'

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"
import TaskDetails from "../../../Edit/TaskDetails";
import LenderDetails from "../LenderDetails";
import EditSubheader from "../../../Edit/EditSubHeader";
import { createLender, deleteLender, getLender, updateLender } from "@/client/lenders";
import { getTask, updateTask } from "@/client/tasks";
import ConnectExistingMortgage from "../ConnectExistingMortgage";
import { getPlaidLiabilities } from "@/client/plaid";
import LoadingSpinner from "@/components/LoadingSpinner";
import { mapMortgageDetails } from "@/lib/utils";
import { manageRouteName, manageRoutes } from "@/constants/routes";
import { useAppContext } from "@/context";

const TaskFormSchema = z.object({
  task: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
})

const EditExistingLender = () => {
  const router = useRouter()
  const { toast } = useToast()
  
  const { homeClosingContext, setHomeClosingContext } = useAppContext()
  const [existingTask, setExistingTask] = useState<TaskContext>(null)
  const [isLoading, setLoading] = useState<boolean>(true)
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
  //   const taskResponse = await updateTask(editedTask)
  //   if (taskResponse.ok) {
  //     successToast("Successfully updated your lender information!", "Redirecting you back to the previous page.")
  //     router.back()
  //   }
  //   else {
  //     failureToast("Oh no! There was an issue updating your lender", taskResponse.statusText)
  //   }
  // }

  const deleteExistingLender = async () => {
    const response = await deleteLender(homeClosingContext?.lenders?.id ?? "")
    if (response.ok) {
      const editedTask = {
        ...existingTask,
        status: "todo",
      }
      await updateTask(editedTask)
      successToast("Successfully deleted your lender!", "Redirecting you back to the dashboard.")
      router.push(manageRoutes[manageRouteName.DASHBOARD].route)
    }
    else {
      failureToast("Oh no! There was an issue deleting your lender", response.statusText)
    }
  }

  const onConnectionSuccess = async (accessToken: string) => {
    const getPlaidLiabilitiesResp = await getPlaidLiabilities(accessToken)
    if(getPlaidLiabilitiesResp.ok) {
      const { liabilities: { mortgage }} = await getPlaidLiabilitiesResp.json()

      let apiResp;
      const requestBody = {
        hasOwnLender: true,
        // TODO @arecesj: How do I want to hash this token?
        plaidAccessToken: accessToken,
        mortgageDetails: mapMortgageDetails(mortgage[0])
      } 

      if(!!homeClosingContext?.lenders?.id) {
        apiResp = await updateLender({
          id: homeClosingContext?.lenders?.id,
          ...requestBody,
        })
      } else {
        apiResp = await createLender(requestBody)
      }
      
      if(apiResp.ok) {
        const respBody = await apiResp.json()
        setHomeClosingContext({
          ...homeClosingContext,
          lenders: {
            ...respBody.lenders
          }
        })
        successToast("Successfully connected your account.", "Updating the page now!")
        setConnected(true)
      } else {
        failureToast("Uh oh! Something went wrong.", "Unable to update lender information right now")
      }
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
    
    const editedTask = {
      ...existingTask,
      task: !!task?.length ? task : existingTask.task,
      status: !!status?.length ? status : existingTask.status,
      priority: !!priority?.length ? priority: existingTask.priority
    }
    const taskResponse = await updateTask(editedTask)
    if (taskResponse.ok) {

      // TODO @arecesj: This seems lazy and will probably introduce some sort of bug.
      // Keep an eye on it
      // Why I did it: So the side nav triggers :shrug:
      setHomeClosingContext({
        ...homeClosingContext,
        tasks: existingTask,
      })
      successToast("Successfully updated your task!", "")
      setUpdateTaskDisabled(true)
    }
    else {
      failureToast("Oh no! There was an issue updating your lender", taskResponse.statusText)
    }
  }

  const getDetails = async () => {
    const [lenderResp, taskResp] = await Promise.all([getLender(), getTask()])
    const [lenderBody, tasksBody] = await Promise.all([lenderResp.json(), taskResp.json()])
    const existingTask = tasksBody.tasks?.find(t => t.category === "lenders") ?? {} as TaskContext
    
    setHomeClosingContext({
      ...homeClosingContext,
      lenders: {
        ...lenderBody.lenders
      }
    })
    setExistingTask(existingTask)
  }
  
  useEffect(() => {
    if(!homeClosingContext?.lenders || !existingTask) getDetails()
    
    setLoading(!homeClosingContext?.lenders && !existingTask)
  }, [homeClosingContext?.lenders, existingTask])
  
  return(
    <div>
      <EditSubheader
        subHeaderContent="Edit your existing lender details"
        onDelete={() => deleteExistingLender()}
        onDeleteText="Disconnect lender"
        onCancel={() => router.push(manageRoutes[manageRouteName.DASHBOARD].route)}
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start md:gap-8 lg:col-span-2">
            {(!!homeClosingContext?.lenders?.hasOwnLender && !!homeClosingContext?.lenders?.mortgageDetails) ? (
              <LenderDetails
                existingLenderDetails={homeClosingContext?.lenders}
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
      )}
    </div>
  )
}

export default EditExistingLender