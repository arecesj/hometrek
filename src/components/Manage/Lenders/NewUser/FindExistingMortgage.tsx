'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { useAppContext } from '@/context'
import { getPlaidLiabilities } from "@/client/plaid";
import { manageRouteName, manageRoutes } from '@/constants/routes'
import { useToast } from "@/components/ui/use-toast"
import ConnectMortgage from "../ConnectMortgage"


const FindExistingMortgage = () => {
  const { homeClosingContext, homeClosingContext: { lenders } , setHomeClosingContext } = useAppContext()
  const [isDisabled, setDisabled] = useState<boolean>(homeClosingContext?.lenders?.hasOwnLender)
  const [isConnected, setConnected] = useState<boolean>(!!homeClosingContext?.lenders?.plaidAccessToken)
  const router = useRouter()
  const { toast } = useToast()

  const onConnectionSuccess = async (accessToken: string) => {
    const response = await getPlaidLiabilities(accessToken)
    if(response.ok) {
      const { liabilities: { mortgage }} = await response.json()
      setHomeClosingContext({
        ...homeClosingContext,
        lenders: {
          ...lenders,
          hasOwnLender: true,
          plaidAccessToken: accessToken,
          mortgageDetails: {
            accountId: mortgage[0].account_id,
            accountNumber: mortgage[0].account_number,
            currentLateFee: mortgage[0].current_late_fee,
            escrowBalance: mortgage[0].escrow_balance,
            hasPMI: mortgage[0].has_pmi,
            hasPrepaymentPenalty: mortgage[0].has_prepayment_penalty,
            interestRatePercentage: mortgage[0].interest_rate.percentage,
            interestRateType: mortgage[0].interest_rate.type,
            lastPaymentAmount: mortgage[0].last_payment_amount,
            lastPaymentDate: mortgage[0].last_payment_date,
            loanTerm: mortgage[0].loan_term,
            loanTypeDescription: mortgage[0].loan_type_description,
            maturityDate: mortgage[0].maturity_date,
            nextMonthlyPayment: mortgage[0].next_monthly_payment,
            nextPaymentDueDate: mortgage[0].next_payment_due_date,
            originationDate: mortgage[0].origination_date,
            originationPrincipalAmount: mortgage[0].origination_principal_amount,
            pastDueAmount: mortgage[0].past_due_amount,
            city: mortgage[0].property_address.city,
            country: mortgage[0].property_address.country,
            postalCode: mortgage[0].property_address.post_code,
            region: mortgage[0].property_address.region,
            street: mortgage[0].property_address.street,
            ytdInterestPaid: mortgage[0].ytd_interest_paid,
            ytdPrincipalPaid: mortgage[0].ytd_principal_paid,
          }
        },
      })
      setConnected(true)
    } else {
      return toast({
        variant: "destructive",
        title: "Oh no! We're unable to grab your mortgage right now.",
        description: "Let's try again later.",
      })
    }
    router.push(manageRoutes[manageRouteName.INSPECTIONS].route)
  }

  const onNext = () => {
    if(isDisabled) {
      setHomeClosingContext({
        ...homeClosingContext,
        lenders: {
          ...lenders,
          hasOwnLender: true,
        }
      })
      router.push(manageRoutes[manageRouteName.INSPECTIONS].route)
    }
  }

  const onSkip = () => {
    setHomeClosingContext({
      ...homeClosingContext,
      lenders: {
        ...lenders,
        hasOwnLender: false
      }
    })
    router.push(manageRoutes[manageRouteName.INSPECTIONS].route)
  }

  
  return (
    <div className="flex justify-center">
      <ConnectMortgage
        isDisabled={isDisabled}
        setDisabled={setDisabled}
        isConnected={isConnected}
        onConnectionSuccess={onConnectionSuccess}
        onNext={onNext}
        onSkip={onSkip}
      />
    </div>
    )
}

export default FindExistingMortgage;