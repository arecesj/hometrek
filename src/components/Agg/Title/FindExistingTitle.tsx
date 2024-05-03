'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { aggRouteName, aggRoutes } from '@/constants/routes'
import { useAppContext } from '@/context'
import CanopyButton from '@/components/CanopyButton'


const FindExistingTitle = () => {
  const [isDisabled, setDisabled] = useState<boolean>(false)
  const [isConnected, setConnected] = useState<boolean>(false)
  const { homeClosingContext, homeClosingContext: { title } , setHomeClosingContext } = useAppContext()
  const router = useRouter();

  const onConnectionSuccess = (accessToken: string) => {
    setHomeClosingContext({
      ...homeClosingContext,
      title: {
        ...title,
        hasTitleAgent: true,
        hasTitleTransfer: true,
        titleDetails: {},
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
              Connect your title 
            </CardTitle>
          </div>
          <CardDescription>
            {"Let's aggregate your title information"}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-7">
          <div className="flex items-center justify-center space-x-2 py-4 px-6">
            <CanopyButton
              className="w-[275px] h-[80px]"
              isDisabled
              isConnected
            />
            <div>
              - OR -
            </div>
            <Button
              variant="outline"
              className="w-[275px] h-[80px]"
              onClick={() => {
                setHomeClosingContext({
                  ...homeClosingContext,
                  title: {
                    ...title,
                    hasTitleAgent: false,
                    hasTitleTransfer: false
                  }
                })
                router.push(aggRoutes[aggRouteName.CLOSINGDAY].route)
              }}
            >
              Skip, for now
            </Button>
        </div>
        </CardContent>
      </Card>
    </div>
    )
}

export default FindExistingTitle;