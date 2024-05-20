'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { useAppContext } from '@/context'
import { getPlaidLiabilities } from "@/client/plaid";
import { manageRouteName, manageRoutes } from '@/constants/routes'
import { useToast } from "@/components/ui/use-toast"
import ConnectMortgage from "../ConnectMortgage"
import { mapMortgageDetails } from "@/lib/utils";


const FindExistingMortgage = () => {
  const { homeClosingContext, homeClosingContext: { lenders } , setHomeClosingContext } = useAppContext()
  const [isDisabled, setDisabled] = useState<boolean>(homeClosingContext?.lenders?.hasOwnLender)
  const [isConnected, setConnected] = useState<boolean>(!!homeClosingContext?.lenders?.plaidAccessToken)
  const router = useRouter()
  const { toast } = useToast()

  const onConnectionSuccess = async (accessToken: string) => {
    const response = await getPlaidLiabilities(accessToken)
    if(response.ok) {
      const { liabilities: { mortgage }} = await response.json()
      setHomeClosingContext({
        ...homeClosingContext,
        lenders: {
          ...lenders,
          hasOwnLender: true,
          plaidAccessToken: accessToken,
          mortgage: mapMortgageDetails(mortgage[0]),
        },
      })
      setConnected(true)
    } else {
      return toast({
        variant: "destructive",
        title: "Oh no! We're unable to grab your mortgage right now.",
        description: "Let's try again later.",
      })
    }
    router.push(manageRoutes[manageRouteName.INSPECTIONS].route)
  }

  const onNext = () => {
    if(isDisabled) {
      setHomeClosingContext({
        ...homeClosingContext,
        lenders: {
          ...lenders,
          hasOwnLender: true,
        }
      })
      router.push(manageRoutes[manageRouteName.INSPECTIONS].route)
    }
  }

  const onSkip = () => {
    setHomeClosingContext({
      ...homeClosingContext,
      lenders: {
        ...lenders,
        hasOwnLender: false
      }
    })
    router.push(manageRoutes[manageRouteName.INSPECTIONS].route)
  }

  
  return (
    <div className="flex justify-center">
      <ConnectMortgage
        isDisabled={isDisabled}
        setDisabled={setDisabled}
        isConnected={isConnected}
        onConnectionSuccess={onConnectionSuccess}
        onNext={onNext}
        onSkip={onSkip}
      />
    </div>
    )
}

export default FindExistingMortgage;