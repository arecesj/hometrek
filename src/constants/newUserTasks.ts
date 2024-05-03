import {v4 as uuidv4} from "uuid"

export const generateNewUserTasks = (homeClosingContext: HomeClosingContext) => {
  const { lenders, inspections, appraisals, insurance, title, closingDay } = homeClosingContext

  return [
    {
      id: `HT${uuidv4()}`,
      task: "Connect HomeTrek with your mortgage lender via Plaid's secure platform",
      status: lenders?.hasOwnLender ? "done" : "todo",
      category: "lenders",
      priority: "medium"
    },
    {
      id: `HT${uuidv4()}`,
      task: "Input your inspection information so that we can blah blah blah",
      status: inspections?.hasInspected ? "done" : inspections?.hasInspector ? "inprogress" : "todo",
      category: "inspections",
      priority: "medium"
    },
    {
      id: `HT${uuidv4()}`,
      task: "Add in your appraiser's information so that we can help you keep track",
      status: appraisals?.hasAppraised ? "done" : appraisals?.hasAppraiser ? "inprogress" : "todo",
      category: "appraisals",
      priority: "medium"
    },
    {
      id: `HT${uuidv4()}`,
      task: "Connect HomeTrek with your insurance provider via Canopy Connect's secure platform",
      status: insurance?.hasInsurance ? "done" : "todo",
      category: "insurance",
      priority: "medium"
    },
    {
      id: `HT${uuidv4()}`,
      task: "Connect HomeTrek blah blah blah",
      status: (title?.hasTitleAgent && title?.hasTitleTransfer) ? "done" : (title?.hasTitleAgent || title?.hasTitleTransfer) ? "inprogress" : "todo",
      category: "title",
      priority: "medium"
    },
    {
      id: `HT${uuidv4()}`,
      task: "Gotta close this stuff out, man!",
      status: closingDay?.hasClosed ? "done" : "inprogress",
      category: "closingday",
      priority: "high"
    },
  ]
}
