'use client'

import { useEffect, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import FindInspections from "./FindInspections";
import ShowInspections from "./ShowInspections";
import { useAppContext } from "@/context";
import { routeNames, routes } from "@/constants/routes";
import { yelpHomeInspectors } from "@/constants/yelpBusinesses";
import SubHeader from "../SubHeader.tsx";

const FormSchema = z.object({
  zipCode: z.string().refine((val) => {
    const int = parseInt(val, 10)
    return !Number.isNaN(int) && val.length === 5
  }, {
    message: "Zip code is required and needs to be five (5) digits"
  }),
})

export type FindInspectionsProps = {
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
  form: UseFormReturn<{
    zipCode: string;
  }, any, undefined>;
}

const Inspections = () => {
  const { context, setContext } = useAppContext()
  const [isNewUser, setNewUser] = useState<boolean>(!context.user || !context.inspections);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      zipCode: "",
    },
  });


  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setContext({
      ...context,
      user: {
        ...context.user,
        zipCode: data.zipCode
    },
      inspections: {
        offeredInspectors: yelpHomeInspectors
      }
    })
    
    setNewUser(false)
    // fetch("/api/inspections", {
    //   method: "POST",
    //   headers: {
    //     'Content-type': 'application/json',
    //   },
    //   body: JSON.stringify(data)
    // })
    // .then((response) => response.json())
    // .then((body) => {
    //   const yelpBusinesses: YelpBusinesses = body.businesses
    //   setBusinesses(yelpBusinesses)
    //   setUserData({...data})
    //   setNewUser(false)
    // })
    // .catch((error) => {
    //   console.error("There was an error processing the API call: ", error)
    // });
  }
  
  useEffect(() => setContext({ ...context, route: routeNames.INSPECTIONS }), [])
  return (
    <>
      <SubHeader
        subHeaderContent={"Find the best inspectors in your area"}
        showPreviousButton={true}
        previousButtonContent={"Back to Lenders"}
        previousButtonHref={routes[routeNames.LENDERS].route}
        nextButtonContent={"Next: Find Appraiser"}
        nextButtonHref={routes[routeNames.APPRAISALS].route}
      />
      {isNewUser ? (
        <FindInspections form={form} onSubmit={onSubmit}/>
      ) : (
        <ShowInspections />
      )}
    </>
  )
}

export default Inspections;