'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { manageRouteName, manageRoutes } from '@/constants/routes'
import { useAppContext } from '@/context'
import AddAppraiserForm from "../AddAppraiserForm";
import { createAppraisal } from "@/client/appraisals";
import { useToast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  name: z.string().optional(),
  cost: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Cost has to be a number"
  }).optional(),
  date: z.date().optional(),
})

const AddExistingAppraiser = () => {
  const [isDisabled, setDisabled] = useState<boolean>(false)
  const { homeClosingContext , setHomeClosingContext } = useAppContext()
  const router = useRouter()
  const { toast } = useToast()

  const createSuccessToast = () => {
    return toast({
      title: "Successfully saved your appraisal information.",
      description: "Moving on to Insurance.",
    })
  }

  const createFailureToast = () => {
    return toast({
      variant: "destructive",
      title: "Oh no! We're unable to update your appraisal information right now.",
      description: "Let's try again later.",
    })
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const { name, date, cost } = data
    let i: AppraisalsContext;
    if((name || date || cost) && !isDisabled) {
      i = {
        hasAppraiser: true,
        hasAppraised: !!date && date < new Date(),
        appraisalDetails: {
          name,
          date,
          cost
        }
      }
    } else {
      i = {
        hasAppraiser: isDisabled,
        hasAppraised: isDisabled,
        appraisalDetails: null
      }
    }

    const resp = await createAppraisal(i)
    if(resp.ok) {
      setHomeClosingContext({
        ...homeClosingContext,
        appraisals: {
          ...homeClosingContext.appraisals,
          ...i
        }
      })
      createSuccessToast()
      router.push(manageRoutes[manageRouteName.INSURANCE].route)
    } else {
      createFailureToast()
    }
  }

  return (
    <AddAppraiserForm
      form={form}
      onSubmit={onSubmit}
      isDisabled={isDisabled}
      setDisabled={setDisabled}
    />
  )
}

export default AddExistingAppraiser;