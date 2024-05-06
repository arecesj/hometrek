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
import { manageRouteName, manageRoutes } from '@/constants/routes'
import { useAppContext } from '@/context'
import PlaidButton from '@/components/PlaidButton'
import { Checkbox } from '@/components/ui/checkbox'


const FindExistingMortgage = () => {
  const [isDisabled, setDisabled] = useState<boolean>(false)
  const [isConnected, setConnected] = useState<boolean>(false)
  const { homeClosingContext, homeClosingContext: { lenders } , setHomeClosingContext } = useAppContext()
  const router = useRouter();

  const onConnectionSuccess = (accessToken: string) => {
    setHomeClosingContext({
      ...homeClosingContext,
      lenders: {
        ...lenders,
        hasLender: true,
        accessToken,
      }
    })
    setConnected(true)
  }

  const onNext = () => {
    if(isDisabled) {
      setHomeClosingContext({
        ...homeClosingContext,
        lenders: {
          ...lenders,
          hasLender: true,
        }
      })
    }
    router.push(manageRoutes[manageRouteName.INSPECTIONS].route)
  }

  const onSkip = () => {
    setHomeClosingContext({
      ...homeClosingContext,
      lenders: {
        ...lenders,
        hasLender: false
      }
    })
    router.push(manageRoutes[manageRouteName.INSPECTIONS].route)
  }

  
  return (
    <div className="flex justify-center">
      <Card className="w-[850px]">
        <CardHeader className="px-7 bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              Connect your mortgage lender
            </CardTitle>
          </div>
          <CardDescription>
            {"Let's get your mortgage information"}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-7">
          <div className="flex items-center justify-center space-x-2 py-4 px-6">
            <PlaidButton
              className="w-[250px] h-[80px]"
              onConnectionSuccess={onConnectionSuccess}
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
        <CardFooter className="flex justify-end ">  
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

export default FindExistingMortgage;