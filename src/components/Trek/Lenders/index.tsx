'use client';

import { useState, useEffect } from "react";
import { UseFormReturn, useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import FindLenders from './FindLenders';
import ShowLenders from "./ShowLenders";
import { useAppContext } from "@/context";
import { trekRouteName, trekRoutes } from "@/constants/routes";
import SubHeader from "@/components/Trek/SubHeader.tsx";

const FormSchema = z.object({
  potentialDownPayment: z.string().refine((val) => {
    const int = parseInt(val, 10)
    return !Number.isNaN(int) && int >= 10000
  }, {
    message: "Down payment is required and needs to be at least $10,000"
  }),
  potentialHomePrice: z.string().refine((val) => {
    const int = parseInt(val, 10)
    return !Number.isNaN(int) && int >= 50000
  }, {
    message: "Home Price is required and needs to be at least $50,000"
  }),
  name: z.string().min(5, { 
    message: "Name is required",
   }),
  state: z.string().min(2, { 
    message: "State is required",
   }),
})

export type FindLendersProps = {
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
  form: UseFormReturn<{
    name?: string;
    state?: string;
    potentialDownPayment?: string;
    potentialHomePrice?: string;
  }, any, undefined>;
}

const Lenders = () => {
  const {
    userContext,
    setUserContext,
    homeClosingContext,
    setHomeClosingContext,
    setRouteContext,
  } = useAppContext()
  const [isNewUser, setNewUser] = useState<boolean>(!userContext?.id || !homeClosingContext.lenders);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      state: "",
      potentialDownPayment: "",
      potentialHomePrice: "",
    },
});

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const { name, state, potentialDownPayment, potentialHomePrice } = data
    setUserContext({
      ...userContext,
      name,
      state
    })
    setHomeClosingContext({
      ...homeClosingContext,
      lenders: {
        ...homeClosingContext.lenders,
        potentialDownPayment,
        potentialHomePrice,
      }
    })
    setNewUser(false)
  }
  
  useEffect(() => setRouteContext(trekRouteName.LENDERS), [])

  return (
    <div>
      <SubHeader
        subHeaderContent={"Find the best lenders in your area"}
        showPreviousButton={false}
        previousButtonContent={""}
        previousButtonHref={""}
        nextButtonContent={"Next: Inspections"}
        nextButtonHref={trekRoutes[trekRouteName.INSPECTIONS].route}
      />
      {isNewUser ? (
        <FindLenders form={form} onSubmit={onSubmit} />
      ) : (
        <ShowLenders />  
      )}
    </div>
  )
}

export default Lenders;