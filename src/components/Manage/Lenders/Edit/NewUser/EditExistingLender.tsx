'use client'

import {  useState } from "react"
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"
import TaskDetails from "../../../Edit/TaskDetails";
import LenderDetails from "../LenderDetails";
import EditSubheader from "../../../Edit/EditSubHeader";
import { getPlaidLiabilities } from "@/client/plaid";
import ConnectExistingMortgage from "../ConnectExistingMortgage";
import { useAppContext } from "@/context";
import { manageRouteName, manageRoutes } from "@/constants/routes";

const EditExistingLender = () => {
  const router = useRouter()
  const { toast } = useToast()
  
  const { homeClosingContext, setHomeClosingContext } = useAppContext()
  const existingTask = !!homeClosingContext.tasks ? homeClosingContext?.tasks?.find(t => t?.category === "lenders") : {} as TaskContext
  const [editedLenderDetails, setEditedLenderDetails] = useState<LendersContext>(homeClosingContext.lenders ?? null)
  const [editedTask, setEditedTask] = useState<TaskContext>(existingTask ?? null)
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
    const updatedTasks = homeClosingContext.tasks.map(task => {
      if(task.id === existingTask.id) {
        task = editedTask
      }
      return task;
    })    
    setHomeClosingContext({
      ...homeClosingContext,
      lenders: {
        ...homeClosingContext.lenders,
        ...editedLenderDetails
      },
      tasks: updatedTasks,
    })
    successToast("Successfully updated your lender information!", "Redirecting you back to the previous page.")
    router.push(manageRoutes[manageRouteName.DASHBOARD].route)
  }

  const deleteExistingLender = async () => {
    const updatedTasks = !!homeClosingContext.tasks && homeClosingContext.tasks.map(task => {
      if(!!task && task?.id === existingTask.id) {
        task.status = "todo"
      }
      return task; 
    })
    setHomeClosingContext({
      ...homeClosingContext,
      lenders: null,
      tasks: updatedTasks,
    })
    successToast("Successfully deleted your lender!", "Redirecting you back to the previous page.")
    setConnected(false)
    router.back()
  }

  const onConnectionSuccess = async (accessToken: string) => {
    const getPlaidLiabilitiesResp = await getPlaidLiabilities(accessToken)
    if(getPlaidLiabilitiesResp.ok) {
      const { liabilities: { mortgage }} = await getPlaidLiabilitiesResp.json()
      const m = mortgage[0]
      setHomeClosingContext({
        ...homeClosingContext,
        lenders: {
          ...homeClosingContext.lenders,
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
        }
      })
      successToast("Successfully connected your account.", "Updating the page now!")
      setConnected(true)
    } else {
      failureToast("Uh oh! Something went wrong.", "Unable to connect to Plaid right now")
    }
  }
  
  return(
    <div>
      <EditSubheader
        subHeaderContent="Edit your existing lender details"
        onUpdate={() => updateExistingLender()}
        onDelete={() => deleteExistingLender()}
        onDeleteText="Disconnect lender"
        onCancel={() => router.back()}
      />
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start md:gap-8 lg:col-span-2">
          {!!homeClosingContext.lenders?.hasOwnLender ? (
            <LenderDetails
              existingLenderDetails={homeClosingContext.lenders}
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
    </div>
  )
}

export default EditExistingLender