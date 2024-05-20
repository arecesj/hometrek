'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { manageRouteName, manageRoutes } from '@/constants/routes'
import AddInspectorForm from "../AddInspectorForm";
import { createInspection } from "@/client/inspections";
import { useToast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  name: z.string().optional(),
  cost: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Cost has to be a number"
  }).optional(),
  date: z.date().optional(),
})

const AddExistingInspector = () => {
  const [isDisabled, setDisabled] = useState<boolean>(false)
  const router = useRouter();
  const { toast } = useToast()
  
  const createSuccessToast = () => {
    return toast({
      title: "Successfully saved your inspections information.",
      description: "Moving on to Appraisals.",
    })
  }

  const createFailureToast = () => {
    return toast({
      variant: "destructive",
      title: "Oh no! We're unable to update your inspection information right now.",
      description: "Let's try again later.",
    })
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const { name, date, cost } = data
    let i: InspectionsContext;

    if((name || date || cost) && !isDisabled) {
      i = {
        hasInspector: true,
        hasInspected: !!date && date < new Date(),
        inspectionDetails: {
          name,
          date,
          cost
        }
      }
    } else {
      i = {
        hasInspector: isDisabled,
        hasInspected: isDisabled,
        inspectionDetails: null
      }
    }

    const resp = await createInspection(i)
    if(resp.ok) {
      createSuccessToast()
      router.push(manageRoutes[manageRouteName.APPRAISALS].route)
    } else {
      createFailureToast()
    }
  }

  return (
    <AddInspectorForm
      form={form}
      onSubmit={onSubmit}
      isDisabled={isDisabled}
      setDisabled={setDisabled}
    />
  )
}

export default AddExistingInspector;