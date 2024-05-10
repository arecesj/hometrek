'use client'

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { manageRouteName, manageRoutes } from '@/constants/routes'
import { createLender, getLender } from "@/client/lenders"
import LoadingSpinner from "@/components/LoadingSpinner"
import ConnectMortgage from "./ConnectMortgage"


const SessionFindExistingMortgage = () => {
  const [existingLenders, setExistingLenders] = useState(null)
  const [plaidAccessToken, setPlaidAccessToken] = useState<string>("")
  const [isLoading, setLoading] = useState(true)
  const [isDisabled, setDisabled] = useState<boolean>(false)
  const [isConnected, setConnected] = useState<boolean>(false)

  const router = useRouter();

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
    // setHomeClosingContext({
    //   ...homeClosingContext,
    //   lenders: {
    //     ...lenders,
    //     hasOwnLender: false
    //   }
    // })
    const resp = await createLender({hasOwnLender: false})
    if(resp.ok) {
      router.push(manageRoutes[manageRouteName.INSPECTIONS].route)
    }
  }

  useEffect(() => {
    getLender()
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA: ", data)
        setExistingLenders(data.lenders)
        setLoading(false)
      })
  }, [])

  
  return (
    <div className="flex justify-center">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        !!existingLenders ? (
          <div>I have data</div>
        ) : (
          <ConnectMortgage
            isDisabled={isDisabled}
            isConnected={isConnected}
            setDisabled={setDisabled}
            onConnectionSuccess={onConnectionSuccess}
            onNext={onNext}
            onSkip={onSkip}
          />
        )  
      )}
    </div>
    )
}

export default SessionFindExistingMortgage;