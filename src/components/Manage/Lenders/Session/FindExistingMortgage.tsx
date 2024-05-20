'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { manageRouteName, manageRoutes } from '@/constants/routes'
import { createLender } from "@/client/lenders"
import ConnectMortgage from "../ConnectMortgage"
import { getPlaidLiabilities } from "@/client/plaid"
import { mapMortgageDetails } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { useAppContext } from "@/context"


const FindExistingMortgage = () => {
  const [isDisabled, setDisabled] = useState<boolean>(false)
  const [isConnected, setConnected] = useState<boolean>(false)

  const { homeClosingContext, setHomeClosingContext } = useAppContext()
  const router = useRouter();
  const { toast } = useToast();

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

  const onConnectionSuccess = async (accessToken: string) => {
    const getPlaidLiabilitiesResp = await getPlaidLiabilities(accessToken)
    if(getPlaidLiabilitiesResp.ok) {
      const { liabilities: { mortgage }} = await getPlaidLiabilitiesResp.json()
      const requestBody = {
        hasOwnLender: true,
        // TODO @arecesj: How do I want to hash this token?
        plaidAccessToken: accessToken,
        mortgageDetails: mapMortgageDetails(mortgage[0])
      } 

      const apiResp = await createLender(requestBody)
      
      if(apiResp.ok) {
        const respBody = await apiResp.json()
        setHomeClosingContext({
          ...homeClosingContext,
          lenders: {
            ...respBody.lenders
          }
        })
        setConnected(true)
        successToast("Successfully connected your account.", "Moving on to Inspections.")
        router.push(manageRoutes[manageRouteName.INSPECTIONS].route)
      } else {
        failureToast("Uh oh! Something went wrong.", "Unable to update lender information right now")
      }
    } else {
      failureToast("Uh oh! Something went wrong.", "Unable to connect to Plaid right now")
    }
  }

  const onNext = async () => {
    if(isDisabled) {
      const lenders = {
        hasOwnLender: true,
      }
      const resp = await createLender(lenders)
      if(resp.ok) {
        router.push(manageRoutes[manageRouteName.INSPECTIONS].route)
        return;
      }
    }
    
    router.push(manageRoutes[manageRouteName.INSPECTIONS].route)
  }

  const onSkip = async () => {
    const resp = await createLender({hasOwnLender: false})
    if(resp.ok) {
      router.push(manageRoutes[manageRouteName.INSPECTIONS].route)
    }
  }

  
  return (
    <div className="flex justify-center">
      <ConnectMortgage
        isDisabled={isDisabled}
        isConnected={isConnected}
        setDisabled={setDisabled}
        onConnectionSuccess={onConnectionSuccess}
        onNext={onNext}
        onSkip={onSkip}
      />
    </div>
    )
}

export default FindExistingMortgage;