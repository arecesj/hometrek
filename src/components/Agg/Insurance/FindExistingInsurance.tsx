'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { aggRouteName, aggRoutes } from '@/constants/routes'
import { useAppContext } from '@/context'
import CanopyButton from '@/components/CanopyButton'
import { Checkbox } from "@/components/ui/checkbox"


const FindExistingInsurance = () => {
  const [isDisabled, setDisabled] = useState<boolean>(false)
  const [isConnected, setConnected] = useState<boolean>(false)
  const { aggContext, aggContext: { insurance } , setAggContext } = useAppContext()
  const router = useRouter();

  const onConnectionSuccess = (accessToken: string) => {
    setAggContext({
      ...aggContext,
      insurance: {
        ...insurance,
        hasInsurance: true,
        insuranceDetails: {},
      }
    })
    // router.push(aggRoutes[aggRouteName.TITLE].route)
    setConnected(true)
  }

  const onNext = () => {
    if(isDisabled) {
      setAggContext({
        ...aggContext,
        insurance: {
          ...insurance,
          hasInsurance: true
        }
      })
    }
    router.push(aggRoutes[aggRouteName.TITLE].route)
  }

  const onSkip = () => {
    setAggContext({
      ...aggContext,
      insurance: {
        ...insurance,
        hasInsurance: false
      }
    })
    router.push(aggRoutes[aggRouteName.TITLE].route)
  }

  
  return (
    <div className="flex justify-center">
      <Card className="w-[850px]">
        <CardHeader className="px-7 bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              Connect your home insurance lender
            </CardTitle>
          </div>
          <CardDescription>
            {"Let's aggregate your insurance information"}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-7">
          <div className="flex items-center justify-center space-x-2 py-4 px-6">
            <CanopyButton
              className="w-[275px] h-[80px]"
              isDisabled={isDisabled}
              isConnected={isConnected}
            />
          </div>
          <div className="pl-1 flex justify-center space-x-2">
            <Checkbox id="track" onClick={() => {
              setDisabled(!isDisabled)
            }} />
              <label
                htmlFor="track"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {"I won't need HomeTrek to track this"}
              </label>
          </div>
        </CardContent>
          <CardFooter className="flex justify-end">  
            <div className="space-x-2">
              <Button
                type="submit"
                className="w-[116px] self-end"
                onClick={() => onNext()}
              >
                Next
              </Button>
              <Button
                type="submit"
                variant="outline"
                className="w-[116px] self-end"
                disabled={isDisabled}
                onClick={() => onSkip()}
              >
                Skip, for now
              </Button>
              </div>
          </CardFooter>
      </Card>
    </div>
    )
}

export default FindExistingInsurance;