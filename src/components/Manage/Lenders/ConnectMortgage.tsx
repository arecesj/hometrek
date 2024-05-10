'use client'

import { FC } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import PlaidButton from "@/components/PlaidButton";

type ConnectMortgageProps = {
  isDisabled: boolean;
  setDisabled: (isDisabled: boolean) => void;
  isConnected: boolean;
  onConnectionSuccess: (accessToken: string) => void;
  onNext: () => void;
  onSkip: () => void;
  
}
const ConnectMortgage: FC<ConnectMortgageProps> = (props) => {
  const {
    isDisabled,
    setDisabled,
    isConnected,
    onConnectionSuccess,
    onNext,
    onSkip
  } = props
  
  return (
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
          isDisabled={isDisabled}
          isConnected={isConnected}
          onConnectionSuccess={onConnectionSuccess}
        />
      </div>
      <div className="pl-1 flex justify-center space-x-2">
        <Checkbox id="track" checked={isDisabled} onClick={() => {
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
  )
}

export default ConnectMortgage