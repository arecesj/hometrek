'use client'

import { useState, useEffect } from "react"
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

const EditExistingLender = () => {
  const router = useRouter()
  const { toast } = useToast()
  
  const [existingLenders, setExistingLenders] = useState<LendersContext>(null)
  const [existingTask, setExistingTask] = useState<TaskContext>(null)
  const [editedTask, setEditedTask] = useState<TaskContext>(existingTask)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isConnected, setConnected] = useState<boolean>(false)

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

  const updateExistingLender = async () => {
    const taskResponse = await updateTask(editedTask)
    if (taskResponse.ok) {
      successToast("Successfully updated your lender information!", "Redirecting you back to the previous page.")
      router.back()
    }
    else {
      failureToast("Oh no! There was an issue updating your lender", taskResponse.statusText)
    }
  }

  const deleteExistingLender = async () => {
    const response = await deleteLender(existingLenders.id ?? "")
    if (response.ok) {
      successToast("Successfully deleted your lender!", "Redirecting you back to the previous page.")
      router.back()
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
        // TODO: How do I want to hash this token?
        plaidAccessToken: accessToken,
        mortgageDetails: mapMortgageDetails(mortgage[0])
      } 

      if(!!existingLenders?.id) {
        apiResp = await updateLender({
          id: existingLenders?.id,
          ...requestBody,
        })
      } else {
        apiResp = await createLender(requestBody)
      }
      
      if(apiResp.ok) {
        successToast("Successfully connected your account.", "Updating the page now!")
        setConnected(true)
      } else {
        failureToast("Uh oh! Something went wrong.", "Unable to update lender information right now")
      }
    } else {
      failureToast("Uh oh! Something went wrong.", "Unable to connect to Plaid right now")
    }
  }

  const getDetails = async () => {
    const [lenderResp, taskResp] = await Promise.all([getLender(), getTask()])
    const [lenderBody, tasksBody] = await Promise.all([lenderResp.json(), taskResp.json()])
    const existingTask = tasksBody.tasks?.find(t => t.category === "lenders") ?? {} as TaskContext
    
    setExistingLenders(lenderBody.lenders)
    setExistingTask(existingTask)
    setEditedTask(existingTask)
  }
  useEffect(() => {
    if(!existingLenders && !existingTask) getDetails()
    
    setLoading(!existingLenders && !existingTask)
  }, [existingLenders, existingTask])
  
  return(
    <div>
      <EditSubheader
        subHeaderContent="Edit your existing lender details"
        onUpdate={() => updateExistingLender()}
        onDelete={() => deleteExistingLender()}
        onDeleteText="Disconnect lender"
        onCancel={() => router.back()}
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start md:gap-8 lg:col-span-2">
          {!!existingLenders?.hasOwnLender ? (
            <LenderDetails
              existingLenderDetails={existingLenders}
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
          editedTask={editedTask}
          setEditedTask={setEditedTask}
        />
      </div>
      )}
    </div>
  )
}

export default EditExistingLender