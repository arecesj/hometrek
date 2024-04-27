'use client'

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
import PlaidButton from '@/components/PlaidButton'


const FindExistingMortgage = () => {
  const { aggContext, aggContext: { lenders } , setAggContext } = useAppContext()
  const router = useRouter();

  const onConnectionSuccess = (accessToken: string) => {
    setAggContext({
      ...aggContext,
      lenders: {
        ...lenders,
        hasLender: true,
        accessToken,
      }
    })
    router.push(aggRoutes[aggRouteName.INSPECTIONS].route)
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
            {"Let's aggregate your mortgage information"}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-7">
          <div className="flex items-center justify-center space-x-2 py-4 px-6">
            <PlaidButton
              className="w-[275px] h-[80px]"
              onConnectionSuccess={onConnectionSuccess}
            />
            <div>
              - OR -
            </div>
            <Button
              variant="outline"
              className="w-[275px] h-[80px]"
              onClick={() => {
                setAggContext({
                  ...aggContext,
                  lenders: {
                    ...lenders,
                    hasLender: false
                  }
                })
                router.push(aggRoutes[aggRouteName.INSPECTIONS].route)
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

export default FindExistingMortgage;