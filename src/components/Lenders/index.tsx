'use client';

import { useState, useEffect } from "react";
import { UseFormReturn, useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import FindLenders from './FindLenders';
import ShowLenders from "./ShowLenders";
import { useAppContext } from "@/context";
import { routeNames } from "@/constants/routes";

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
    name: string;
    state: string;
    potentialDownPayment: string;
    potentialHomePrice: string;
  }, any, undefined>;
}

const Lenders = () => {
  const { context, setContext } = useAppContext()
  const [isNewUser, setNewUser] = useState<boolean>(!context.user || !context.lenders);

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
    setContext({
      ...context,
      user: {
        ...context.user,
        name,
        state,
        date: new Date().toDateString()
      },
      lenders: {
        ...context.lenders,
        potentialDownPayment,
        potentialHomePrice,
      }
    })
    setNewUser(false)
  }

  useEffect(() => setContext({ ...context, route: routeNames.LENDERS }), [])

  return (
    <>
      {isNewUser ? (
        <FindLenders form={form} onSubmit={onSubmit} />
      ) : (
        <ShowLenders />  
      )}
    </>
  )
}

export default Lenders;