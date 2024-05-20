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
import InspectionDetails from "../InspectionDetails";
import { manageRouteName, manageRoutes } from "@/constants/routes";
import { getTask, updateTask } from "@/client/tasks";
import { createInspection, deleteInspection, getInspection, updateInspection } from "@/client/inspections";
import LoadingSpinner from "@/components/LoadingSpinner";

const InspectionsFormSchema = z.object({
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

const EditExistingInspection = () => {
  const router = useRouter()
  const { toast } = useToast()
  
  const { homeClosingContext, setHomeClosingContext } = useAppContext()
  const [existingTask, setExistingTask] = useState<TaskContext>(null)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isUpdateInspectionDisabled, setUpdateInspectionDisabled] = useState<boolean>(true)
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

  // INSPECTIONS FORM
  // INSPECTIONS FORM
  // INSPECTIONS FORM
  const inspectionsForm = useForm<z.infer<typeof InspectionsFormSchema>>({
    resolver: zodResolver(InspectionsFormSchema),
  });

  const updateExistingInspection = async (data: z.infer<typeof InspectionsFormSchema>) => {
    const { name, date, cost } = data
    const updatedInspection = {
      hasInspector: true,
      hasInspected: !!date && date < new Date(),
      inspectionDetails: {
        name: !!name?.length ? name : homeClosingContext.inspections?.inspectionDetails?.name,
        date: !!date ?  date : homeClosingContext.inspections?.inspectionDetails?.date,
        cost: !!cost?.length ? cost : homeClosingContext.inspections?.inspectionDetails?.cost,
      }
    }

    let resp;
    if(!!homeClosingContext?.inspections?.id) {
      resp = await updateInspection({
        id: homeClosingContext?.inspections?.id,
        ...updatedInspection
      })
    } else {
      resp = await createInspection(updatedInspection)
    }
    

    if(resp.ok) {
      const respBody = await resp.json()
      setHomeClosingContext({
        ...homeClosingContext,
        inspections: {
          ...homeClosingContext.inspections,
          ...respBody.inspections
        },
      })
      successToast("Successfully saved your inspection information!", "")
      setUpdateInspectionDisabled(true)
    } else {
      failureToast("Uh oh! Something went wrong.", "Unable to update inspection information right now")
    }
  }

  const deleteExistingInspection = async () => {
    const resetTaskAndRedirect = async () => {
      const editedTask = {
        ...existingTask,
        status: "todo",
      }
      await updateTask(editedTask)
      successToast("Successfully deleted your inspection!", "Redirecting you back to the dashboard.")
      router.push(manageRoutes[manageRouteName.DASHBOARD].route)
    }
    if(!!homeClosingContext?.inspections?.id) {
      const response = await deleteInspection(homeClosingContext?.inspections?.id ?? "")
      if (response.ok) {
        await resetTaskAndRedirect()
        
      }
      else {
        failureToast("Oh no! There was an issue deleting your inspection", response.statusText)
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
    const [inspectionResp, taskResp] = await Promise.all([getInspection(), getTask()])
    const [inspectionBody, tasksBody] = await Promise.all([inspectionResp.json(), taskResp.json()])
    const existingTask = tasksBody.tasks?.find(t => t.category === "inspections") ?? {} as TaskContext
    
    setHomeClosingContext({
      ...homeClosingContext,
      inspections: {
        ...inspectionBody.inspections
      }
    })
    setExistingTask(existingTask)
  }

  useEffect(() => {
    if(!homeClosingContext?.inspections || !existingTask) getDetails()
    
    setLoading(!homeClosingContext?.inspections && !existingTask)
  }, [homeClosingContext?.inspections, existingTask])
  
  return(
    <div>
      <EditSubheader
        subHeaderContent="Edit your existing inspection details"
        onDelete={() => deleteExistingInspection()}
        onDeleteText="Delete details"
        onCancel={() => router.push(manageRoutes[manageRouteName.DASHBOARD].route)}
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="lg:col-span-2 xl:col-span-2">
            <InspectionDetails
              inspectionDetails={homeClosingContext.inspections?.inspectionDetails}
              isUpdateInspectionDisabled={isUpdateInspectionDisabled}
              setUpdateInspectionDisabled={setUpdateInspectionDisabled}
              form={inspectionsForm}
              onSubmit={updateExistingInspection}
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

export default EditExistingInspection