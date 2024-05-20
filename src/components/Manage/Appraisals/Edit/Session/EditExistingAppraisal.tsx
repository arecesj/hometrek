'use client'

import {  useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"
import TaskDetails from "../../../Edit/TaskDetails";
import EditSubheader from "../../../Edit/EditSubHeader";
import { useAppContext } from "@/context";
import { manageRouteName, manageRoutes } from "@/constants/routes";
import AppraisalDetails from "../AppraisalDetails";
import { getTask, updateTask } from "@/client/tasks";
import LoadingSpinner from "@/components/LoadingSpinner";
import { createAppraisal, deleteAppraisal, updateAppraisal } from "@/client/appraisals";

const AppraisalsFormSchema = z.object({
  name: z.string().optional(),
  cost: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Cost has to be a number"
  }).optional(),
  date: z.date().optional(),
})

const TaskFormSchema = z.object({
  task: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
})

const EditExistingAppraisal = () => {
  const router = useRouter()
  const { toast } = useToast()
  
  const { homeClosingContext, setHomeClosingContext } = useAppContext()
  const [existingTask, setExistingTask] = useState<TaskContext>(null)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isUpdateAppraisalDisabled, setUpdateAppraisalDisabled] = useState<boolean>(true)
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

  // APPRAISALS FORM
  // APPRAISALS FORM
  // APPRAISALS FORM
  const appraisalsForm = useForm<z.infer<typeof AppraisalsFormSchema>>({
    resolver: zodResolver(AppraisalsFormSchema),
  });

  const updateExistingAppraisal = async (data: z.infer<typeof AppraisalsFormSchema>) => {
    const { name, date, cost } = data
    const updatedAppraisal = {
      hasAppraiser: true,
      hasAppraised: !!date && date < new Date(),
      appraisalDetails: {
        name: !!name?.length ? name : homeClosingContext.appraisals?.appraisalDetails?.name,
        date: !!date ?  date : homeClosingContext.appraisals?.appraisalDetails?.date,
        cost: !!cost?.length ? cost : homeClosingContext.appraisals?.appraisalDetails?.cost,
      }
    }
    
    let resp;
    if(!!homeClosingContext?.appraisals?.id) {
      resp = await updateAppraisal({
        id: homeClosingContext?.appraisals?.id,
        ...updatedAppraisal
      })
    } else {
      resp = await createAppraisal(updatedAppraisal)
    }

    if(resp.ok) {
      const respBody = await resp.json()
      setHomeClosingContext({
        ...homeClosingContext,
        appraisals: {
          ...homeClosingContext.appraisals,
          ...respBody.appraisals
        },
      })
      successToast("Successfully saved your appraisal information!", "")
      setUpdateAppraisalDisabled(true)
    } else {
      failureToast("Uh oh! Something went wrong.", "Unable to update appraisal information right now")
    }
  }

  const deleteExistingAppraisal = async () => {
    const resetTaskAndRedirect = async () => {
      const editedTask = {
        ...existingTask,
        status: "todo",
      }
      await updateTask(editedTask)
      successToast("Successfully deleted your appraisal!", "Redirecting you back to the dashboard.")
      router.push(manageRoutes[manageRouteName.DASHBOARD].route)
    }
    
    if(!!homeClosingContext?.appraisals?.id) {
      const response = await deleteAppraisal(homeClosingContext?.appraisals?.id)
      if (response.ok) {
        await resetTaskAndRedirect()
      }
      else {
        failureToast("Oh no! There was an issue deleting your appraisal", response.statusText)
      }
    } else {
      await resetTaskAndRedirect()
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
    const [appraisalResp, taskResp] = await Promise.all([getAppraisals(), getTask()])
    const [appraisalBody, tasksBody] = await Promise.all([appraisalResp.json(), taskResp.json()])
    const existingTask = tasksBody.tasks?.find(t => t.category === "appraisals") ?? {} as TaskContext
    
    setHomeClosingContext({
      ...homeClosingContext,
      appraisals: {
        ...appraisalBody.appraisals
      }
    })
    setExistingTask(existingTask)
  }

  useEffect(() => {
    if(!homeClosingContext?.appraisals || !existingTask) getDetails()
    
    setLoading(!homeClosingContext?.appraisals && !existingTask)
  }, [homeClosingContext?.appraisals, existingTask])
  
  return(
    <div>
      <EditSubheader
        subHeaderContent="Edit your existing appraisal details"
        onDelete={() => deleteExistingAppraisal()}
        onDeleteText="Delete details"
        onCancel={() => router.push(manageRoutes[manageRouteName.DASHBOARD].route)}
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="lg:col-span-2 xl:col-span-2">
            <AppraisalDetails
              appraisalDetails={homeClosingContext.appraisals?.appraisalDetails}
              isUpdateAppraisalDisabled={isUpdateAppraisalDisabled}
              setUpdateAppraisalDisabled={setUpdateAppraisalDisabled}
              form={appraisalsForm}
              onSubmit={updateExistingAppraisal}
            />
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

export default EditExistingAppraisal

function getAppraisals(): any {
  throw new Error("Function not implemented.");
}
