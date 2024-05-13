'use client'

import { FC } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PlaidButton from "@/components/PlaidButton";

type ConnectExistingMortgageProps = {
  onConnectionSuccess: (accessToken: string) => void
  isConnected: boolean
}

const ConnectExistingMortgage: FC<ConnectExistingMortgageProps> = (props) => {
  const { onConnectionSuccess, isConnected } = props

  return (
    <Card className="w-[850px] h-[290px]">
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
            isDisabled={false}
            isConnected={isConnected}
            onConnectionSuccess={onConnectionSuccess}
          />
        </div>
      </CardContent>
    </Card>
    )
}

export default ConnectExistingMortgage;
