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
import { manageRouteName, manageRoutes } from "@/constants/routes";
import AppraisalDetails from "../AppraisalDetails";

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
  const existingTask = !!homeClosingContext.tasks ? homeClosingContext?.tasks?.find(t => t?.category === "appraisals") : {} as TaskContext
  const [isUpdateAppraisalDisabled, setUpdateAppraisalDisabled] = useState<boolean>(true)
  const [isUpdateTaskDisabled, setUpdateTaskDisabled] = useState<boolean>(true)

  const successToast = (title: string, description: string) => {
    return toast({
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
    let i: AppraisalsContext
    if((name || date || cost)) {
      i = {
        hasAppraiser: true,
        hasAppraised: !!date && date < new Date(),
        appraisalDetails: {
          name: !!name?.length ? name : homeClosingContext.appraisals?.appraisalDetails?.name,
          date: !!date ?  date : homeClosingContext.appraisals?.appraisalDetails?.date,
          cost: !!cost?.length ? cost : homeClosingContext.appraisals?.appraisalDetails?.cost,
        }
      }
    } else {
      i = {
        hasAppraiser: false,
        hasAppraised: false,
        appraisalDetails: null
      }
    }

    setHomeClosingContext({
      ...homeClosingContext,
      appraisals: {
        ...homeClosingContext.appraisals,
        ...i
      },
    })
    successToast("Successfully saved your appraisal information!", "")
    setUpdateAppraisalDisabled(true)
  }

  const deleteExistingAppraisal = async () => {
    const updatedTasks = !!homeClosingContext.tasks && homeClosingContext.tasks.map(task => {
      if(!!task && task?.id === existingTask.id) {
        task.status = "todo"
      }
      return task; 
    })
    setHomeClosingContext({
      ...homeClosingContext,
      appraisals: null,
      tasks: updatedTasks,
    })
    successToast("Successfully deleted your appraisal details!", "Redirecting you back to the previous page.")
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

  console.log("HC: ", homeClosingContext)
  
  return(
    <div>
      <EditSubheader
        subHeaderContent="Edit your existing appraisal details"
        onDelete={() => deleteExistingAppraisal()}
        onDeleteText="Delete details"
        onCancel={() => router.push(manageRoutes[manageRouteName.DASHBOARD].route)}
      />
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
    </div>
  )
}

export default EditExistingAppraisal