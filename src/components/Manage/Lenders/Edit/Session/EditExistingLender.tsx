'use client'

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"
import TaskDetails from "../../../Edit/TaskDetails";
import LenderDetails from "../LenderDetails";
import EditSubheader from "../../../Edit/EditSubHeader";
import { deleteLender, getLender, updateLender } from "@/client/lenders";
import { getTask, updateTask } from "@/client/tasks";
import ConnectExistingMortgage from "../ConnectExistingMortgage";
import { getPlaidLiabilities } from "@/client/plaid";
import LoadingSpinner from "@/components/LoadingSpinner";

const EditExistingLender = () => {
  const router = useRouter()
  const { toast } = useToast()
  
  const [existingLenders, setExistingLenders] = useState<LendersContext>()
  const [existingTask, setExistingTask] = useState<TaskContext>()
  const [editedLenderDetails, setEditedLenderDetails] = useState<LendersContext>(null)
  const [editedTask, setEditedTask] = useState<TaskContext>(null)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isConnected, setConnected] = useState<boolean>(false)

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

  const updateExistingLender = async () => {
    const [lendersResponse, tasksResponse] = await Promise.all([updateLender(editedLenderDetails), updateTask(editedTask)])
    if (lendersResponse.ok && tasksResponse.ok) {
      successToast("Successfully updated your lender information!", "Redirecting you back to the previous page.")
      router.back()
    }
    else {
      failureToast("Oh no! There was an issue updating your lender", lendersResponse.statusText)
    }
  }

  const deleteExistingLender = async () => {
    const response = await deleteLender(existingLenders.id ?? "")
    if (response.ok) {
      successToast("Successfully deleted your lender!", "Redirecting you back to the previous page.")
      router.back()
    }
    else {
      failureToast("Oh no! There was an issue deleting your lender", response.statusText)
    }
  }

  const onConnectionSuccess = async (accessToken: string) => {
    const getPlaidLiabilitiesResp = await getPlaidLiabilities(accessToken)
    if(getPlaidLiabilitiesResp.ok) {
      const { liabilities: { mortgage }} = await getPlaidLiabilitiesResp.json()
      const m = mortgage[0]
      const updateLenderResponse = await updateLender({
        hasOwnLender: true,
          plaidAccessToken: accessToken,
          mortgageDetails: {
            accountId: m.account_id,
            accountNumber: m.account_number,
            currentLateFee: m.current_late_fee,
            escrowBalance: m.escrow_balance,
            hasPMI: m.has_pmi,
            hasPrepaymentPenalty: m.has_prepayment_penalty,
            interestRatePercentage: m.interest_rate.percentage,
            interestRateType: m.interest_rate.type,
            lastPaymentAmount: m.last_payment_amount,
            lastPaymentDate: m.last_payment_date,
            loanTerm: m.loan_term,
            loanTypeDescription: m.loan_type_description,
            maturityDate: m.maturity_date,
            nextMonthlyPayment: m.next_monthly_payment,
            nextPaymentDueDate: m.next_payment_due_date,
            originationDate: m.origination_date,
            originationPrincipalAmount: m.origination_principal_amount,
            pastDueAmount: m.past_due_amount,
            city: m.property_address.city,
            country: m.property_address.country,
            postalCode: m.property_address.post_code,
            region: m.property_address.region,
            street: m.property_address.street,
            ytdInterestPaid: m.ytd_interest_paid,
            ytdPrincipalPaid: m.ytd_principal_paid,
          }
      })
      if(updateLenderResponse.ok) {
        successToast("Successfully connected your account.", "Updating the page now!")
        setConnected(true)
        // TODO: This should be a boolean that triggers another GET for lenders
        router.refresh()
      } else {
        failureToast("Uh oh! Something went wrong.", "Unable to update lender information right now")
      }
    } else {
      failureToast("Uh oh! Something went wrong.", "Unable to connect to Plaid right now")
    }
  }

  useEffect(() => {
    async () => {
      const lenderResp = await getLender()
      const lender = await lenderResp.json()
      setExistingLenders(lender)

      const taskResp = await getTask()
      const tasks = await taskResp.json()
      const existingTask = tasks?.find(t => t.category === "lenders") ?? {} as TaskContext
      setExistingTask(existingTask)
      setEditedTask(existingTask)
    }
    setLoading(false)
  }, [])
  
  return(
    <div>
      <EditSubheader
        subHeaderContent="Edit your existing lender details"
        onUpdate={() => updateExistingLender()}
        onDelete={() => deleteExistingLender()}
        onCancel={() => router.back()}
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start md:gap-8 lg:col-span-2">
          {!!existingLenders?.hasOwnLender ? (
            <LenderDetails
              existingLenders={existingLenders}
              editedLenderDetails={editedLenderDetails}
              setEditedLenderDetails={setEditedLenderDetails}
            />
          ) : (
            <ConnectExistingMortgage
              onConnectionSuccess={onConnectionSuccess}
              isConnected={isConnected}
            />
          )}
        </div>
        <TaskDetails
          existingTask={existingTask}
          editedTask={editedTask}
          setEditedTask={setEditedTask}
        />
      </div>
      )}
    </div>
  )
}

export default EditExistingLender