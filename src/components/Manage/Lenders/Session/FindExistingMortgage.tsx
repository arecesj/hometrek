'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { manageRouteName, manageRoutes } from '@/constants/routes'
import { createLender } from "@/client/lenders"
import ConnectMortgage from "../ConnectMortgage"


const SessionFindExistingMortgage = () => {
  const [plaidAccessToken, setPlaidAccessToken] = useState<string>("")
  const [isDisabled, setDisabled] = useState<boolean>(false)
  const [isConnected, setConnected] = useState<boolean>(false)

  const router = useRouter();

  // TODO: Update with API call, duh
  const onConnectionSuccess = (accessToken: string) => {
    setPlaidAccessToken(accessToken)
    setConnected(true)
  }

  const onNext = async () => {
    let lenders;
    if(isDisabled) {
      lenders = {
        hasOwnLender: true,
      }
    } else {
      lenders = {
        hasOwnLender: true,
        plaidAccessToken,
      }
    }
    const resp = await createLender(lenders)
    if(resp.ok) {
      router.push(manageRoutes[manageRouteName.INSPECTIONS].route)
    }
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

export default SessionFindExistingMortgage;