import {v4 as uuidv4} from "uuid"

export const generateNewUserTasks = (homeClosingContext: HomeClosingContext) => {
  const { lenders, inspections, appraisals, insurance, title, closingDay } = homeClosingContext

  return [
    {
      id: `HT${uuidv4()}`,
      task: "Manage your mortgage lender via our secure platform",
      status: lenders?.hasOwnLender ? "done" : "todo",
      category: "lenders",
      priority: "medium"
    },
    {
      id: `HT${uuidv4()}`,
      task: "Track the status of your home inspection",
      status: inspections?.hasInspected ? "done" : inspections?.hasInspector ? "inprogress" : "todo",
      category: "inspections",
      priority: "medium"
    },
    {
      id: `HT${uuidv4()}`,
      task: "Add in your appraiser to know your home's value",
      status: appraisals?.hasAppraised ? "done" : appraisals?.hasAppraiser ? "inprogress" : "todo",
      category: "appraisals",
      priority: "medium"
    },
    {
      id: `HT${uuidv4()}`,
      task: "Connect your insurance provider via our secure platform",
      status: insurance?.hasInsurance ? "done" : "todo",
      category: "insurance",
      priority: "medium"
    },
    {
      id: `HT${uuidv4()}`,
      task: "Select your home title company",
      status: (title?.hasTitleAgent && title?.hasTitleTransfer) ? "done" : (title?.hasTitleAgent || title?.hasTitleTransfer) ? "inprogress" : "todo",
      category: "title",
      priority: "medium"
    },
    {
      id: `HT${uuidv4()}`,
      task: "Share the status with your realty and/or legal teams",
      status: closingDay?.hasClosed ? "done" : "inprogress",
      category: "closingday",
      priority: "high"
    },
  ]
}
