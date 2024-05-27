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
import CanopyButton from '@/components/CanopyButton'
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"


const FindExistingInsurance = () => {
  const [isDisabled, setDisabled] = useState<boolean>(false)
  const [isConnected, setConnected] = useState<boolean>(false)
  const { homeClosingContext, homeClosingContext: { insurance } , setHomeClosingContext } = useAppContext()
  const router = useRouter()
  const { toast } = useToast()

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

  const onConnectionSuccess = (pullId: string) => {
    setHomeClosingContext({
      ...homeClosingContext,
        insurance: {
          ...insurance,
          hasInsurance: true,
          canopyPullId: pullId,
        }
    })
    successToast("Successfully grabbed your insurance information!", "")
    router.push(manageRoutes[manageRouteName.TITLE].route)
  }

  const onNext = () => {
    if(isDisabled) {
      setHomeClosingContext({
        ...homeClosingContext,
        insurance: {
          ...insurance,
          hasInsurance: true
        }
      })
    }
    router.push(manageRoutes[manageRouteName.TITLE].route)
  }

  const onSkip = () => {
    setHomeClosingContext({
      ...homeClosingContext,
      insurance: {
        ...insurance,
        hasInsurance: false
      }
    })
    router.push(manageRoutes[manageRouteName.TITLE].route)
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
            {"Let's get your insurance information"}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-7">
          <div className="flex items-center justify-center space-x-2 py-4 px-6">
            <CanopyButton
              className="w-[275px] h-[80px]"
              isDisabled={isDisabled}
              isConnected={isConnected}
              setConnected={setConnected}
              onConnectionSuccess={onConnectionSuccess}
              failureToast={failureToast}
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