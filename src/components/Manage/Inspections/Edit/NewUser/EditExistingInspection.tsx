'use client'

import {  useState } from "react"
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
  const existingTask = !!homeClosingContext.tasks ? homeClosingContext?.tasks?.find(t => t?.category === "inspections") : {} as TaskContext
  const [isUpdateInspectionDisabled, setUpdateInspectionDisabled] = useState<boolean>(true)
  const [isUpdateTaskDisabled, setUpdateTaskDisabled] = useState<boolean>(true)

  const successToast = (title: string, description: string) => {
    return toast({
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
    let i: InspectionsContext
    if((name || date || cost)) {
      i = {
        hasInspector: true,
        hasInspected: !!date && date < new Date(),
        inspectionDetails: {
          name: !!name?.length ? name : homeClosingContext.inspections?.inspectionDetails?.name,
          date: !!date ?  date : homeClosingContext.inspections?.inspectionDetails?.date,
          cost: !!cost?.length ? cost : homeClosingContext.inspections?.inspectionDetails?.cost,
        }
      }
    } else {
      i = {
        hasInspector: false,
        hasInspected: false,
        inspectionDetails: null
      }
    }

    setHomeClosingContext({
      ...homeClosingContext,
      inspections: {
        ...homeClosingContext.inspections,
        ...i
      },
    })
    successToast("Successfully saved your inspection information!", "")
    setUpdateInspectionDisabled(true)
  }

  const deleteExistingInspection = async () => {
    const updatedTasks = !!homeClosingContext.tasks && homeClosingContext.tasks.map(task => {
      if(!!task && task?.id === existingTask.id) {
        task.status = "todo"
      }
      return task; 
    })
    setHomeClosingContext({
      ...homeClosingContext,
      inspections: null,
      tasks: updatedTasks,
    })
    successToast("Successfully deleted your inspection details!", "Redirecting you back to the previous page.")
    router.back()
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
      tasks: updatedTasks
    })

    successToast("Successfully updated your task!", "")
    setUpdateTaskDisabled(true)
  }
  
  return(
    <div>
      <EditSubheader
        subHeaderContent="Edit your existing inspection details"
        onDelete={() => deleteExistingInspection()}
        onDeleteText="Delete details"
        onCancel={() => router.push(manageRoutes[manageRouteName.DASHBOARD].route)}
      />
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
    </div>
  )
}

export default EditExistingInspection