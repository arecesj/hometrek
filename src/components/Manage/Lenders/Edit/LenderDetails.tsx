'use client'

import { Dispatch, FC, SetStateAction } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatDate, formatToUSD } from "@/lib/utils";

type LenderDetailsProps = {
  existingLenderDetails: LendersContext;
}

const LenderDetails: FC<LenderDetailsProps> = (props) => {
  const {
    existingLenderDetails,
  } = props

  const {
    mortgageDetails: {
      street,
      region,
      city,
      originationPrincipalAmount,
      loanTerm,
      loanTypeDescription,
      interestRatePercentage,
      interestRateType,
      originationDate,
      maturityDate,
      nextMonthlyPayment,
      nextPaymentDueDate,
      ytdInterestPaid,
      ytdPrincipalPaid
    }
  } = existingLenderDetails

  return (
    <div>
      <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              Mortgage Details
            </CardTitle>
            <CardDescription>
              Here are your mortgage details
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
              <div className="grid gap-4 pb-6">
                <div className="grid grid-cols-3 items-center gap-4">
                  <div>
                    <Label htmlFor="address" className="text-right">
                      Address
                    </Label>
                    <Input id="address" value={`${street}, ${city}, ${region}`} className="col-span-3" disabled />
                  </div>
                  <div>
                    <Label htmlFor="loan_amount" className="text-right">
                      Loan Amount
                    </Label>
                    <Input id="loan_amount" value={formatToUSD(`${originationPrincipalAmount}`)} className="col-span-3" disabled />
                  </div>
                  <div>
                    <Label htmlFor="loan_terms" className="text-right">
                        Loan Terms
                    </Label>
                    <Input id="loan_terms" value={`${loanTerm} - ${loanTypeDescription}`} className="col-span-3" disabled />
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <div>
                    <Label htmlFor="interest_rate" className="text-right">
                      Interest Rate
                    </Label>
                    <Input id="interest_rate" value={`${interestRatePercentage}% - ${interestRateType}`} className="col-span-3" disabled />
                  </div>
                  <div>
                    <Label htmlFor="loan_terms" className="text-right">
                      Origination Date
                    </Label>
                    <Input id="loan_terms" value={formatDate(`${originationDate}`)} className="col-span-3" disabled />
                  </div>
                  <div>
                    <Label htmlFor="name" className="text-right">
                      Maturity Date
                    </Label>
                    <Input id="name" value={formatDate(`${maturityDate}`)} className="col-span-3" disabled />
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <div>
                    <Label htmlFor="monthly_payment_amount" className="text-right">
                      Monthly Payment Amount
                    </Label>
                    <Input id="monthly_payment_amount" value={`${formatToUSD(`${nextMonthlyPayment}`)} on ${formatDate(`${nextPaymentDueDate}`)}`} className="col-span-3" disabled />
                  </div>
                  <div>
                    <Label htmlFor="ytd_principal_paid" className="text-right">
                      Principal Paid (year to date)
                    </Label>
                    <Input id="ytd_principal_paid" value={formatToUSD(`${ytdPrincipalPaid}`)} className="col-span-3" disabled />
                  </div>
                  <div>
                    <Label htmlFor="ytd_interest_paid" className="text-right">
                      Interest Paid (year to date)
                    </Label>
                    <Input id="ytd_interest_paid" value={formatToUSD(`${ytdInterestPaid}`)} className="col-span-3" disabled />
                  </div>
                </div>
              </div>
          </CardContent>
      </Card>
    </div>
  )
}

export default LenderDetails